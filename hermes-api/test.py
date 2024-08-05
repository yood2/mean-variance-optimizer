import requests

url = 'http://127.0.0.1:5000/portfolio'

requests.put(url, json={'NVDA': 0.5, 'SBUX': 0.5})

res = requests.get(url)

print(res.json())