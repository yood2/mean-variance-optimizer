export interface PortfolioItem {
    ticker: string;
    currentPrice: number;
    weight: number;
    optimalWeight?: number;
    expectedReturn?: number;
    volatility?: number;
}
