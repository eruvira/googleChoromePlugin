from fastapi import FastAPI, status, HTTPException
import uvicorn
import pickle
from feature_extraction import generate_data_set
import numpy as np
from pydantic import BaseModel
from database import SessionLocal
from typing import List
import models

app = FastAPI()

class Item(BaseModel):
    url: str

    class Config:
        orm_mode=True

class Url(BaseModel):
    id: int
    url: str

    class Config:
        orm_mode=True
class Id(BaseModel):
    id: int

    class Config:
        orm_mode=True

db=SessionLocal()

@app.get('/blocks', response_model=List[Url], status_code=200)
def getting_block_url():
    items=db.query(models.Item).all()

    return items

@app.post('/block', response_model=Item, status_code=status.HTTP_201_CREATED)
def block_url(item:Item):
    new_item=models.Item( url=item.url)

    db.add(new_item)
    db.commit()
    return new_item

@app.delete('/delete', response_model=Item, status_code=status.HTTP_200_OK)
def delete(item:Id):
    item_to_delete = db.query(models.Item).filter(models.Item.id == item.id).first()

    if item_to_delete is None:
        raise HTTPException(status_code = status.HTTP_404_NOT_FOUND, detail = "Url not found")

    db.delete(item_to_delete)
    db.commit()
    return item_to_delete


@app.post('/check')
def predict(item: Item):

    model = pickle.load(open("model.dat", "rb"))
    data = generate_data_set(item.url)
    formated_data = np.reshape(data, (1,30))
    predicted_data = model.predict(formated_data)

    return {'result': str(predicted_data).replace(' [', '').replace('[', '').replace(']', '')}


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)