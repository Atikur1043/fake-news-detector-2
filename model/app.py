from flask import Flask, request, jsonify
from transformers import pipeline
import torch

app = Flask(__name__)

# Use this working model instead
model_name = "distilbert-base-uncased-finetuned-sst-2-english"
classifier = pipeline("text-classification", model=model_name, device=-1)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({"error": "Text input is required"}), 400
            
        result = classifier(text)[0]
        prediction = "fake" if result['label'] == "NEGATIVE" else "real"
        confidence = result['score']
        
        return jsonify({
            "prediction": prediction,
            "confidence": confidence,
            "explanation": f"Model predicts {prediction} with {confidence:.0%} confidence"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)