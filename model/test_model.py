import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib
import os

print("Starting model training process...")

# --- 1. Load and Combine Datasets ---
fake_path = 'Fake.csv'
true_path = 'True.csv'

if not os.path.exists(fake_path) or not os.path.exists(true_path):
    print(f"Error: Make sure '{fake_path}' and '{true_path}' are in the model directory.")
    exit()

print("Loading Fake.csv and True.csv...")
df_fake = pd.read_csv(fake_path)
df_true = pd.read_csv(true_path)

# Add a 'label' column to each dataframe
df_fake['label'] = 'FAKE'
df_true['label'] = 'REAL'

# Combine the two dataframes into one
df = pd.concat([df_fake, df_true], ignore_index=True)

# Shuffle the combined dataset to ensure randomness
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

print("Datasets loaded and combined successfully.")

# --- 2. Prepare Data ---
# Handle any potential missing values in title or text
df['title'] = df['title'].fillna('')
df['text'] = df['text'].fillna('')

# Combine title and text for a richer feature set
df['full_text'] = df['title'] + ' ' + df['text']
X = df['full_text']
y = df['label']

print("Data prepared. Splitting into training and testing sets...")

# --- 3. Split Data ---
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# --- 4. Vectorize Text ---
print("Vectorizing text data...")
vectorizer = TfidfVectorizer(stop_words='english', max_df=0.7, min_df=5)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# --- 5. Train the Model ---
print("Training the Logistic Regression model...")
model = LogisticRegression(max_iter=1000, solver='liblinear')
model.fit(X_train_vec, y_train)

# --- 6. Evaluate and Save ---
accuracy = model.score(X_test_vec, y_test)
print(f"Model trained successfully. Accuracy: {accuracy:.2%}")

print("Saving model to 'model.joblib' and vectorizer to 'vectorizer.joblib'...")
joblib.dump(model, 'model.joblib')
joblib.dump(vectorizer, 'vectorizer.joblib')

print("✅ Training complete. Model and vectorizer have been saved.")

