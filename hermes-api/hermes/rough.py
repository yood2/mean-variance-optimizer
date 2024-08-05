import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.optimize import minimize
import yfinance as yf

# Define stock symbols and fetch historical data
symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN']
data = yf.download(symbols, start='2018-01-01', end='2023-01-01')['Adj Close']

# Calculate daily returns
returns = data.pct_change().dropna()

# Calculate expected returns and covariance matrix
expected_returns = returns.mean()
cov_matrix = returns.cov()

# Define risk-free rate (e.g., 2% for U.S. Treasury)
risk_free_rate = 0.02

# Function to calculate portfolio performance
def portfolio_performance(weights, expected_returns, cov_matrix):
    returns = np.dot(weights, expected_returns)
    volatility = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
    return returns, volatility

# Function to minimize (negative Sharpe Ratio)
def negative_sharpe_ratio(weights, expected_returns, cov_matrix, risk_free_rate):
    p_returns, p_volatility = portfolio_performance(weights, expected_returns, cov_matrix)
    return -(p_returns - risk_free_rate) / p_volatility

# Constraints and bounds for optimization
constraints = {'type': 'eq', 'fun': lambda x: np.sum(x) - 1}
bounds = tuple((0, 1) for _ in range(len(symbols)))

# Initial guess for weights
initial_weights = np.array([1/len(symbols)] * len(symbols))

# Optimize portfolio for maximum Sharpe Ratio
result = minimize(negative_sharpe_ratio, initial_weights, args=(expected_returns, cov_matrix, risk_free_rate),
                  method='SLSQP', bounds=bounds, constraints=constraints)

# Get optimal weights
optimal_weights = result.x

# Calculate efficient frontier
def calculate_efficient_frontier(expected_returns, cov_matrix, risk_free_rate, num_portfolios=10000):
    results = np.zeros((3, num_portfolios))
    weights_record = []
    
    for i in range(num_portfolios):
        weights = np.random.random(len(symbols))
        weights /= np.sum(weights)
        weights_record.append(weights)
        
        p_returns, p_volatility = portfolio_performance(weights, expected_returns, cov_matrix)
        
        results[0,i] = p_volatility
        results[1,i] = p_returns
        results[2,i] = (p_returns - risk_free_rate) / p_volatility
    
    return results, weights_record

# Generate portfolios
num_portfolios = 10000
results, weights = calculate_efficient_frontier(expected_returns, cov_matrix, risk_free_rate, num_portfolios)

# Plot efficient frontier
plt.figure(figsize=(10, 6))
plt.scatter(results[0,:], results[1,:], c=results[2,:], cmap='viridis', marker='o')
plt.colorbar(label='Sharpe Ratio')
plt.xlabel('Volatility')
plt.ylabel('Expected Returns')
plt.title('Efficient Frontier')
plt.show()
