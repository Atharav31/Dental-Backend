from flask import Flask, request, jsonify
import joblib
import pandas as pd
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS if you call this from a frontend

# --- scikit-learn model setup ---
model = joblib.load('prescription_model.pkl')
model_columns = joblib.load('model_columns.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    input_df = pd.DataFrame([data])
    input_encoded = pd.get_dummies(input_df)
    for col in model_columns:
        if col not in input_encoded:
            input_encoded[col] = 0
    input_encoded = input_encoded[model_columns]
    prediction = model.predict(input_encoded)
    return jsonify({'suggested_medicine': prediction[0]})

# --- Ollama route for diagnosis ---
OLLAMA_URL = 'http://localhost:11434/api/generate'
OLLAMA_MODEL = 'ALIENTELLIGENCE/dentistry:latest'
@app.route('/olama_diagnosis', methods=['POST'])
def olama_diagnosis():
    data = request.get_json()
    symptoms = data.get('symptoms')
    if not symptoms:
        return jsonify({'error': 'No symptoms provided'}), 400

    prompt = f"A patient presents with the following dental symptoms: {symptoms}. What is the most likely diagnosis? give short and ."
    payload = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        "stream": False
    }
    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        result = response.json()
        diagnosis = result.get('response', '').strip()
        return jsonify({'diagnosis': diagnosis})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
