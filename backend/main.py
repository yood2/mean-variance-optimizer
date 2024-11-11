from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from portfolio import Portfolio

app = FastAPI()
portfolio = Portfolio()

class TickerRequest(BaseModel):
    tickers: List[str]

@app.get('/')
async def root():
    return {"message": "Hello World"}

@app.put("/portfolio")
async def add_tickers(request: TickerRequest):
    portfolio = Portfolio()

    for ticker in request.tickers:
        try:
            portfolio.add_ticker(ticker)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
    
    portfolio.calculate_mean_variance()
    res = portfolio.get_portfolio_information()
    return {"res": res}