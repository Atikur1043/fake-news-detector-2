from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

app = Flask(__name__)
CORS(app)

try:
    model = joblib.load('model.joblib')
    vectorizer = joblib.load('vectorizer.joblib')
    print("✅ Model and vectorizer loaded successfully.")
except Exception as e:
    print(f"❌ Error loading model: {e}")
    exit()

@app.route('/api/model/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text or not isinstance(text, str) or len(text.strip()) == 0:
            return jsonify({"error": "Text input is required."}), 400
            
        vectorized_text = vectorizer.transform([text])
        prediction_proba = model.predict_proba(vectorized_text)[0]
        
        if model.classes_[0] == 'FAKE':
            fake_proba, real_proba = prediction_proba[0], prediction_proba[1]
        else:
            real_proba, fake_proba = prediction_proba[0], prediction_proba[1]

        if fake_proba > real_proba:
            prediction = 'fake'
            confidence = float(fake_proba)
        else:
            prediction = 'real'
            confidence = float(real_proba)
            
        return jsonify({
            "prediction": prediction,
            "confidence": confidence
        })
        
    except Exception as e:
        print(f"An error occurred during prediction: {e}")
        return jsonify({"error": "An internal server error occurred."}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
