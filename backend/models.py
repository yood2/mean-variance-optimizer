import yfinance as yf
import numpy as np
import pandas as pd
from scipy.optimize import minimize

class Portfolio:
    def __init__(self):
        self.tickers = []
        self.data = pd.DataFrame()
        self.optimized_weights = {}

    def __str__(self):
        return (f'Tickers: {self.tickers} \n Data: {self.data} \n Weights: {self.optimized_weights}')

    def add_ticker(self, ticker):
        if ticker in self.tickers:
            raise ValueError(f'{ticker} is already in the portfolio.')
        
        self.tickers.append(ticker)
        stock_data = yf.download(ticker, start="2023-01-01", end="2024-01-01")['Adj Close']
        self.data[ticker] = stock_data
        self.calculate_mean_variance()
    
    def remove_ticker(self, ticker):
        if ticker not in self.tickers:
            raise ValueError(f'{ticker} not in portfolio.')

        self.tickers.remove(ticker)
        self.data.drop(columns=ticker, inplace=True)
        self.calculate_mean_variance()

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
        self.optimized_weights = dict(zip(self.tickers, result.x))
        return self.optimized_weights

    def get_optimized_weights(self):
        return self.optimized_weights