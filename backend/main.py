## FastAPI Imports
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from mangum import Mangum
from typing import List
## Portfolio Imports
import yfinance as yf
import numpy as np
import pandas as pd
from scipy.optimize import minimize

'''------------------------------------------------------------------------------------------'''
class Portfolio:
    def __init__(self):
        self.tickers = []
        self.data = pd.DataFrame()
        self.stock_data = {}
        self.optimized_weights = {}
        self.start_date = "2023-01-01"
        self.end_date= "2024-01-01"

    def __str__(self):
        return (f'Tickers: {self.tickers} \n Data: {self.data} \n Weights: {self.optimized_weights}')

    def add_ticker(self, ticker):
        if ticker in self.tickers:
            raise ValueError(f'{ticker} is already in the portfolio.')
        
        self.tickers.append(ticker)
        stock_data = yf.download(ticker, start= self.start_date, end= self.end_date)['Adj Close']
        self.data[ticker] = stock_data

        price = float(stock_data.iloc[-1])  # Most recent price as a float
        mean = float(stock_data.mean() * 252)  # Annualized mean return as a float
        volatility = float(stock_data.std() * np.sqrt(252))  # Annualized volatility as a float

        self.stock_data[ticker] = {
            "price": price,
            "mean": mean,
            "volatility": volatility,
        }
    
    # def remove_ticker(self, ticker):
    #     if ticker not in self.tickers:
    #         raise ValueError(f'{ticker} not in portfolio.')

    #     self.tickers.remove(ticker)
    #     self.data.drop(columns=ticker, inplace=True)
    #     self.calculate_mean_variance()

    #     return {
    #         "weights": self.get_optimized_weights()
    #     }

    def calculate_mean_variance(self):
        returns = self.data.pct_change().dropna()
        mean_returns = returns.mean() * 252  # annualized return
        cov_matrix = returns.cov() * 252     # annualized covariance
        num_assets = len(self.tickers)

        def portfolio_volatility(weights):
            return np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))

        constraints = ({'type': 'eq', 'fun': lambda weights: np.sum(weights) - 1})
        bounds = tuple((0, 1) for _ in range(num_assets))
        initial_guess = num_assets * [1. / num_assets]
        result = minimize(portfolio_volatility, initial_guess, method='SLSQP', bounds=bounds, constraints=constraints)
        self.optimized_weights = dict(zip(self.tickers, map(float, result.x)))

    def get_portfolio_information(self):
        return {
            "tickers": self.tickers,
            "stock_data": self.stock_data,
            "optimized_weights": self.optimized_weights,
        }
    

'''------------------------------------------------------------------------------------------'''
app = FastAPI()
handler = Mangum(app)
portfolio = Portfolio()

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
    portfolio = Portfolio()

    for ticker in request.tickers:
        try:
            portfolio.add_ticker(ticker)
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
    
    portfolio.calculate_mean_variance()
    res = portfolio.get_portfolio_information()
    return {"res": res}