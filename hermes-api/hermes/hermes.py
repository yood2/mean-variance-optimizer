import numpy as np
import pandas as pd
import yfinance as yf
from scipy.optimize import minimize

class ModernPortfolio:
    def __init__(self, tickers, start_date, end_date, data_type='Adj Close'):
        self.tickers = tickers
        self.start_date = start_date
        self.end_date = end_date
        self.data_type = data_type
        self.risk_free_rate = self.calculate_risk_free()
        self.data = yf.download(self.tickers, start=self.start_date, end=self.end_date)[self.data_type]
        self.returns = self.data.pct_change().dropna()
        self.expected_returns = self.returns.mean()
        self.covariance = self.returns.cov()
        self.bounds = [(0, 1) for _ in range(len(self.expected_returns))]
        self.initial_guess = [1.0 / len(self.expected_returns) for _ in range(len(self.expected_returns))]
        self.constraints = ({'type': 'eq', 'fun': self.weight_constraint})

    def calculate_risk_free(self):
        data = yf.Ticker('^IRX')  # 3-month T-Bill
        history = data.history(period='1d')
        latest = history['Close'].iloc[-1]
        return latest / 100

    def metrics(self, weights):
        portfolio_return = np.dot(weights, self.expected_returns)
        portfolio_var = np.dot(weights.T, np.dot(self.covariance, weights))
        portfolio_std = np.sqrt(portfolio_var)
        sharpe = (portfolio_return - self.risk_free_rate) / portfolio_std
        return portfolio_return, portfolio_std, sharpe

    def negative_sharpe_ratio(self, weights):
        return -self.metrics(weights)[2]

    def weight_constraint(self, weights):
        return np.sum(weights) - 1

    def format_weights_as_dict(self, weights):
        formatted_weights = {}
        for asset, weight in zip(self.tickers, weights):
            rounded_weight = float(round(weight, 4))
            formatted_weights[asset] = rounded_weight
        return formatted_weights
    
    def optimize_portfolio(self):
        result = minimize(
            self.negative_sharpe_ratio,
            self.initial_guess,
            method='SLSQP',
            bounds=self.bounds,
            constraints=self.constraints
        )
        optimal_weights = result.x
        return self.format_weights_as_dict(optimal_weights)


# # Example usage
# portfolio = ['NVDA', 'SBUX']
# window_start = '2018-01-01'
# window_end = '2024-01-01'

# # Create an instance of ModernPortfolio
# modern_portfolio = ModernPortfolio(portfolio, window_start, window_end)

# # Optimize and get the optimal weights as a dictionary
# optimal_weights_dict = modern_portfolio.optimize_portfolio()
# print(optimal_weights_dict)
