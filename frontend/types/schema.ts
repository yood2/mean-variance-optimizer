export interface Stock {
    ticker: string;
    currentPrice?: number;
    optimalWeight?: number;
    expectedReturn?: number;
    volatility?: number;
}

export interface ApiResponse {
    res: {
        tickers?: string[];
        stock_data?: Record<
            string,
            {
                price: number;
                mean: number;
                volatility: number;
            }
        >;
        optimized_weights?: Record<string, number>;
    };
}
