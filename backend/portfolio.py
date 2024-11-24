import yfinance as yf
import numpy as np
import pandas as pd
from scipy.optimize import minimize

import json

class Portfolio:
    def __init__(self, start_date, end_date):
        self.tickers = []
        self.data = pd.DataFrame()
        self.stock_data = {}
        self.optimized_weights = {}
        self.start_date = start_date
        self.end_date = end_date
        self.risk_free_rate = 0

    def __str__(self):
        return (f'Tickers: {self.tickers} \n Data: {self.data} \n Weights: {self.optimized_weights}')

    def add_ticker(self, ticker):
        if ticker in self.tickers:
            raise ValueError(f'{ticker} is already in the portfolio.')
        
        self.tickers.append(ticker)
        stock_data = yf.download(ticker, start= self.start_date, end= self.end_date)['Adj Close']
        self.data[ticker] = stock_data

        daily_returns = stock_data.pct_change().dropna()

        price = stock_data.iloc[-1]  # Most recent price as a float
        mean = daily_returns.mean() * 252  # Annualized mean return as a float
        volatility = daily_returns.std() * np.sqrt(252)  # Annualized volatility as a float

        self.stock_data[ticker] = {
            "price": float(price),
            "mean": float(mean),
            "volatility": float(volatility),
        }
    
    def get_risk_free_rate(self):
        t_bill_data = yf.download('^IRX', start=self.start_date, end=self.end_date)['Close']
        latest_rate = t_bill_data.iloc[-1]/100
        self.risk_free_rate = latest_rate * 4

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

tbill3months = "^IRX"
start_date = "2023-01-01"
end_date = "2024-01-01"

port = Portfolio(start_date, end_date)
port.get_risk_free_rate()

# port.add_ticker('tsla')
# print(port.get_portfolio_information())