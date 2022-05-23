from fastapi import FastAPI
import uvicorn
import pickle
from feature_extraction import generate_data_set
import numpy as np


app = FastAPI(debug=True)

@app.get('/')
def home():
    return {'text': 'hello'}

@app.get('/predict')
def predict(url:str):
    model = pickle.load(open("model.dat", "rb"))
    data = generate_data_set(url)
    formated_data = np.reshape(data, (1,30))
    predicted_data = model.predict(formated_data)

    return {'result': str(predicted_data).replace(' [', '').replace('[', '').replace(']', '')}

if __name__ == '__main__':
    uvicorn.run(app)