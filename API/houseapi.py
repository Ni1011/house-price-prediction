from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd

app = FastAPI()

# Allow all origins to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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


@app.post('/house')
async def scoring_endpoint(item:ScoringItem):
    df = pd.DataFrame([item.dict().values()], columns=item.dict().keys())
    house = model.predict(df)
    return {"prediction": float(house)}