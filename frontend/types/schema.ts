export interface Stock {
    ticker: string;
    quantity: number;
    buyPrice: number;
    currentPrice?: number;
    optimalWeight?: number;
    expectedReturn?: number;
    volatility?: number;
}

export interface Portfolio {
    [ticker: string]: Stock;
}
