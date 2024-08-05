import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from scipy.optimize import minimize
import yfinance as yf

'''
DATA NEEDED:
- Historical stock prices from API
- Expected Returns (calculated from average historical prices)
- Risk-free rate (government treasury bills?)
- Market returns (historical market index, S&P 500?)
- Covariance Matrix (covariance between all pairs of stock, calculated from historical returns of stock)
- Stock beta (beta measures volatilty relative to market)
'''

############### GLOBAL VARIABLES ######################
portfolio = {'NVDA': 0.5, 'SBUX': 0.5}
window_start = '2018-01-01'
window_end = '2023-01-01'
data_type = 'Adj Close'
risk_free_Rate = 0.02
#######################################################

data = yf.download(list(portfolio.keys()), start=window_start, end=window_end)[data_type]
returns = data.pct_change().dropna()
expected_return = returns.mean()
expected_return['Weight'] = expected_return['Ticker'].map(portfolio)
