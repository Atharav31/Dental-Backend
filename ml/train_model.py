import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib
import json

# Load your data
with open('prescriptions.json') as f:
    data = json.load(f)

df = pd.DataFrame(data)

# For demonstration: predict the first medicine name based on diagnosis
df['first_medicine'] = df['medicines'].apply(lambda meds: meds[0]['name'] if meds else None)

# Features (X) and target (y)
X = df[['diagnosis']]
y = df['first_medicine']

# Convert categorical text to numbers
X_encoded = pd.get_dummies(X)

# Train the model
model = DecisionTreeClassifier()
model.fit(X_encoded, y)

# Save the model and the encoding columns
joblib.dump(model, 'prescription_model.pkl')
joblib.dump(list(X_encoded.columns), 'model_columns.pkl')
print("Model trained and saved!")
