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

    def calculate_metrics_from_dict(self, weights_dict):
        # Validate input
        if not isinstance(weights_dict, dict):
            raise ValueError("weights_dict must be a dictionary with tickers as keys and weights as values.")
        
        # Check if all tickers in the dict are valid
        if set(weights_dict.keys()) != set(self.tickers):
            raise ValueError("weights_dict keys must match the tickers used in the portfolio.")
        
        # Extract weights in the correct order
        weights = np.array([weights_dict[ticker] for ticker in self.tickers])

        # Validate the weights sum to 1
        if not np.isclose(np.sum(weights), 1):
            raise ValueError("The sum of weights must be equal to 1.")

        # Calculate and return the metrics
        return self.metrics(weights)


# Example usage
portfolio = ['NVDA', 'SBUX']
window_start = '2018-01-01'
window_end = '2024-01-01'

# Create an instance of ModernPortfolio
modern_portfolio = ModernPortfolio(portfolio, window_start, window_end)

# Define a dictionary with ticker weights
weights_dict = {'NVDA': 0.6, 'SBUX': 0.4}

# Calculate metrics using the dictionary
portfolio_return, portfolio_std, sharpe_ratio = modern_portfolio.calculate_metrics_from_dict(weights_dict)

# Print the results
print(f"Portfolio Return: {portfolio_return:.2%}")
print(f"Portfolio Standard Deviation: {portfolio_std:.2%}")
print(f"Portfolio Sharpe Ratio: {sharpe_ratio:.4f}")
