# Hermes API
### Modern Portfolio Theory API
Given a portfolio and risk level, return rebalancing options.

### Phase 1: Develop functions to carry out calculations for various metrics (Current)
Go through COMM298 lectures and convert all the mathematical formulas into functions to be used later.

### Phase 2: Develop CLI Program
Will first make a Command Line Interface program to test all of the methods needed to create a fully fleshed analysis tool.

### Phase 3: Front-End Web Application 'Mercury'
Create a ReactJS front-end that will consume the API and have a interactive dashboard.

#### References
https://pypi.org/project/yfinance/
https://flask-restful.readthedocs.io/en/latest/index.html

#### Log
Aug 4, 2024: 
- Scaffolded basic project structure (fetch, process, output).
- Fetching stock data using Alpha Vantage.

Aug 5, 2024: 
- Decided to use yFinance over Alpha Vantage since it offers adjusted close data for free. 
- Migrated code to a Jupyter Notebook to develop models easier using Pandas (easier to visualize than CLI!).
- Started bootstrapped the RESTful API using flask-restful library