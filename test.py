import requests

'''
TESTING OPTIMIZE
'''
# tickers = ['NVDA', 'SBUX']
# params = {
#     'tickers': ','.join(tickers),
#     'start_date': '2018-01-01',
#     'end_date': '2024-01-01'
# }
# local_url = 'http://127.0.0.1:5000/portfolio'
# render_url = 'https://hermes-api-ttic.onrender.com/portfolio'
# res = requests.get(render_url, params=params)
# print(res.json())



'''
TESTING CALCULATE
'''
portfolio = {'NVDA': 0.5, 'SBUX': 0.5}
params = {
    'portfolio': portfolio,
    'start_date': '2018-01-01',
    'end_date': '2024-01-01'
}
local_url = 'http://127.0.0.1:5000/calculate'

res = requests.post(local_url, json=params)
print(res.json())