from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import torch
import os

app = Flask(__name__)
CORS(app)

# --- Load Model with Authentication from Environment Variable ---
# This is much more secure. We will set this variable in Render's dashboard.
HF_AUTH_TOKEN = os.environ.get('HF_TOKEN')

if not HF_AUTH_TOKEN:
    print("❌ Error: HF_TOKEN environment variable not set.")
    exit()

model_name = "unitary/unbiased-fake-news-detection-model"
device = 0 if torch.cuda.is_available() else -1

try:
    classifier = pipeline(
        "text-classification",
        model=model_name,
        device=device,
        token=HF_AUTH_TOKEN
    )
    print("✅ Model loaded successfully using authentication token.")
except Exception as e:
    print(f"❌ Failed to load model. Error: {e}")
    exit()

@app.route('/api/model/predict', methods=['POST'])
def predict():
    # ... (the rest of your predict function remains the same)
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text or not isinstance(text, str) or len(text.strip()) == 0:
            return jsonify({"error": "Text input is required and must be a non-empty string."}), 400
            
        result = classifier(text)[0]
        
        prediction = result['label'].lower()
        confidence = result['score']
        
        if confidence < 0.75:
            prediction = "uncertain"
            
        return jsonify({
            "prediction": prediction,
            "confidence": confidence
        })
        
    except Exception as e:
        print(f"An error occurred during prediction: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500

# Note: The if __name__ == '__main__': block is not used by Gunicorn,
# but it's good practice to keep it for local testing.
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)