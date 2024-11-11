from fastapi import FastAPI

app = FastAPI()

@app.get('/')
async def root():
    return {"message": "Hello World"}

@app.get('/stock/{ticker}')
async def get_stock(ticker):
    ticker = ticker
    return {"message": f'${ticker}'}