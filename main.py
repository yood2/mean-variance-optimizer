import requests
import pandas as pd

from api import get_key

# API KEY GOES HERE #####
key = get_key()
#########################


'''
DATA NEEDED:
- Historical stock prices from API
- Expected Returns (calculated from average historical prices)
- Risk-free rate (government treasury bills?)
- Market returns (historical market index, S&P 500?)
- Covariance Matrix (covariance between all pairs of stock, calculated from historical returns of stock)
- Stock beta (beta measures volatilty relative to market)
'''

# FIRST FETCH HISTORICAL DATA
def fetch_historical_prices(key, symbol):
    output = 'compact'
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&output={output}&apikey={key}'
    r = requests.get(url)
    data = r.json()
    return data

print(fetch_historical_prices(key, 'IBM'))

def calculate_daily_returns(raw):
    returns = raw.pct_change().dropna()
    return returns

print(calculate_daily_returns(fetch_historical_prices(key, 'IBM')))







# CALCULATE EXPECTED RETURNS AND COVARIANCE MATRIX
# Maybe use numpy or pandas for this

# ESTIMATE RISK-FREE RATE
# Use treasury bills

# IMPLEMENT MODERN PORTFOLIO THEORY
# How will we calculate expected portfolio return and volatility at different asset weightings?
# What optimization techniques will we use to find optimal weights that minimze risk? Or maximize return for a given risk?

# PLOT FUNCTION to visualize efficient frontier
# use matplotlib