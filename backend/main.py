## FastAPI Imports
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from mangum import Mangum
from typing import List
from portfolio import Portfolio
    
app = FastAPI()
handler = Mangum(app)

origins = [
    "http://localhost:3000"
]

class TickerRequest(BaseModel):
    tickers: List[str]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow only specified origins
    allow_credentials=True,
    allow_methods=["*"],     # Allow all HTTP methods
    allow_headers=["*"],     # Allow all headers
)

@app.get('/')
async def root():
    return {"message": "Hello World"}

@app.put("/portfolio")
async def add_tickers(request: TickerRequest):
    portfolio = Portfolio("2020-01-01", "2023-01-01")

    for ticker in request.tickers:
        try:
            portfolio.add_ticker(ticker)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
    
    portfolio.calculate_mean_variance()
    res = portfolio.get_portfolio_information()
    return {"res": res}