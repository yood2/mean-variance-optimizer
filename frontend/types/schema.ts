export interface Stock {
    ticker: string;
    buyPrice: number;
    currentPrice: number;
    quantity: number;
    optimalWeight?: number;
    expectedReturn?: number;
    volatility?: number;
}

export interface Portfolio {
    [ticker: string]: Stock;
}
