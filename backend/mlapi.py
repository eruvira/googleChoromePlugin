from fastapi import FastAPI
import uvicorn
import pickle
from feature_extraction import generate_data_set
import numpy as np
from pydantic import BaseModel

class Item(BaseModel):
    url: str

app = FastAPI(debug=True)

@app.post('/check')
def predict(item: Item):
    model = pickle.load(open("model.dat", "rb"))
    data = generate_data_set(item.url)
    formated_data = np.reshape(data, (1,30))
    predicted_data = model.predict(formated_data)

    return {'result': str(predicted_data).replace(' [', '').replace('[', '').replace(']', '')}

if __name__ == '__main__':
    uvicorn.run(app)