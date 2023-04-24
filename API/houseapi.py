from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import pandas as pd

app = FastAPI()

class ScoringItem(BaseModel):
    Builder: int
    Dealer: int 
    Owner: int 
    UNDER_CONSTRUCTION: int
    RERA: int
    BHK_NO: int
    SQUARE_FT: float
    READY_TO_MOVE: int
    RESALE: int
    LONGITUDE: float
    LATITUDE: float

with open('house.pkl','rb') as f:
    model = pickle.load(f)


@app.put('/house')
async def scoring_endpoint(item:ScoringItem):
    df = pd.DataFrame([item.dict().values()], columns=item.dict().keys())
    house = model.predict(df)
    return {"prediction": float(house)}