import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import joblib
import os
import seaborn as sns
import matplotlib.pyplot as plt

print("Starting model evaluation...")

# --- 1. Load Model and Vectorizer ---
try:
    model = joblib.load('model.joblib')
    vectorizer = joblib.load('vectorizer.joblib')
    print("✅ Model and vectorizer loaded successfully.")
except FileNotFoundError:
    print("❌ Error: 'model.joblib' or 'vectorizer.joblib' not found.")
    print("Please run 'train_model.py' first.")
    exit()

# --- 2. Load and Prepare the Test Data ---
# We must use the exact same data preparation steps and random_state
# to ensure we are evaluating on the correct, unseen test set.
fake_path = 'Fake.csv'
true_path = 'True.csv'

if not os.path.exists(fake_path) or not os.path.exists(true_path):
    print(f"Error: Make sure '{fake_path}' and '{true_path}' are in the model directory.")
    exit()

df_fake = pd.read_csv(fake_path)
df_true = pd.read_csv(true_path)
df_fake['label'] = 'FAKE'
df_true['label'] = 'REAL'
df = pd.concat([df_fake, df_true], ignore_index=True)
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

df['title'] = df['title'].fillna('')
df['text'] = df['text'].fillna('')
df['full_text'] = df['title'] + ' ' + df['text']

X = df['full_text']
y = df['label']

# Use the same split to get the same test set
_, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

print(f"Loaded {len(X_test)} articles for testing.")

# --- 3. Make Predictions on Test Data ---
print("Making predictions on the test set...")
X_test_vec = vectorizer.transform(X_test)
y_pred = model.predict(X_test_vec)

# --- 4. Generate and Print Evaluation Metrics ---
accuracy = accuracy_score(y_test, y_pred)
print("\n--- Model Evaluation Report ---")
print(f"Accuracy: {accuracy:.2%}\n")

# Classification Report
print("Classification Report:")
print(classification_report(y_test, y_pred, target_names=['FAKE', 'REAL']))

# Confusion Matrix
print("Confusion Matrix:")
cm = confusion_matrix(y_test, y_pred)
print(cm)
print("\n(Matrix format: [[True Negative, False Positive], [False Negative, True Positive]])")
print("  - True Negative (TN): Correctly predicted REAL")
print("  - False Positive (FP): Incorrectly predicted FAKE (was REAL)")
print("  - False Negative (FN): Incorrectly predicted REAL (was FAKE) - **This is the worst kind of error!**")
print("  - True Positive (TP): Correctly predicted FAKE")


# --- 5. Visualize the Confusion Matrix ---
print("\nGenerating confusion matrix plot...")
plt.figure(figsize=(8, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=['FAKE', 'REAL'], yticklabels=['FAKE', 'REAL'])
plt.xlabel('Predicted Label')
plt.ylabel('True Label')
plt.title('Confusion Matrix')
# Save the plot to a file
plot_path = 'confusion_matrix.png'
plt.savefig(plot_path)
print(f"✅ Confusion matrix plot saved to '{plot_path}'")
print("--- End of Report ---")

