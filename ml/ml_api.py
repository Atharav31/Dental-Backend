from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)
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

if __name__ == '__main__':
    app.run(port=5000)
