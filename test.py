import requests

local_url = 'http://127.0.0.1:5000/portfolio'
render_url = 'https://hermes-api-ttic.onrender.com/portfolio'

tickers = ['NVDA', 'SBUX']

params = {
    'tickers': ','.join(tickers),
    'start_date': '2018-01-01',
    'end_date': '2024-01-01'
}

res = requests.get(render_url, params=params)

print(res.json())