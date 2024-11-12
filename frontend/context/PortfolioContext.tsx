import { useState, useEffect, useContext, createContext } from 'react';
import { ApiResponse, Stock } from '@/types/schema';

interface PortfolioContextType {
    portfolio: Stock[];
    tickers: string[];
    addStock: (ticker: string) => void;
    removeStock: (ticker: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
    undefined
);

export const PortfolioProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [portfolio, setPortfolio] = useState<Stock[]>([]);
    const [tickers, setTickers] = useState<string[]>([]);

    // Function to fetch portfolio data based on tickers
    useEffect(() => {
        const fetchPortfolio = async () => {
            const url = process.env.NEXT_PUBLIC_API;

            try {
                const response = await fetch(`${url}/portfolio`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tickers }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch portfolio data');
                }

                const apiResponse: ApiResponse = await response.json();
                const newPortfolio = parseApiData(apiResponse);
                setPortfolio(newPortfolio);
            } catch (error) {
                console.error('Error fetching portfolio data:', error);
                setPortfolio([]);
            }
        };

        if (tickers.length > 0) {
            fetchPortfolio();
        } else {
            setPortfolio([]);
        }
    }, [tickers]);

    const addStock = (ticker: string) => {
        setTickers((prevTickers) => {
            if (!prevTickers.includes(ticker)) {
                return [...prevTickers, ticker];
            }
            return prevTickers;
        });
    };

    const removeStock = (ticker: string) => {
        setTickers((prevTickers) => prevTickers.filter((t) => t !== ticker));
    };

    return (
        <PortfolioContext.Provider
            value={{ portfolio, tickers, addStock, removeStock }}
        >
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error('usePortfolio must be used within a PortfolioProvider');
    }
    return context;
};

// convert api response to table data
function parseApiData(response: ApiResponse): Stock[] {
    const {
        tickers = [],
        stock_data = {},
        optimized_weights = {},
    } = response.res;

    const res = tickers.map((ticker: string) => ({
        ticker,
        currentPrice: stock_data[ticker]?.price,
        optimalWeight: optimized_weights[ticker],
        expectedReturn: stock_data[ticker]?.mean,
        volatility: stock_data[ticker]?.volatility,
    }));

    console.log(tickers);

    return res;
}
