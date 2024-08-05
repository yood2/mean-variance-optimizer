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


'''
1. Fetch data
2. Preprocess pricing info into percent change between data points
'''
def fetch(symbols, window_start, window_end, data_type):
    data = (yf.download(symbols, start=window_start, end=window_end)[data_type]).pct_change().dropna()
    return data

'''
EXPECTED RETURN OPTIONS:
1. Historical Average Return, better for long histories
2. CAPM (We need to get beta), uses risk in calculations
3. DDM or GGM, predictable portfolio with dividend paying stocks
'''
def historical_average_return(data):
    return data.mean()





def covariance_matrix(data):
    return data.cov()