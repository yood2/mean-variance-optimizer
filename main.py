import requests

from api import get_key

url = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey={get_key}'
r = requests.get(url)
data = r.json()

print(data)

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
def fetch_historical_prices(stock):
    res = ''
    return res

# CALCULATE EXPECTED RETURNS AND COVARIANCE MATRIX
# Maybe use numpy or pandas for this

# ESTIMATE RISK-FREE RATE
# Use treasury bills

# IMPLEMENT MODERN PORTFOLIO THEORY
# How will we calculate expected portfolio return and volatility at different asset weightings?
# What optimization techniques will we use to find optimal weights that minimze risk? Or maximize return for a given risk?

# PLOT FUNCTION to visualize efficient frontier
# use matplotlib