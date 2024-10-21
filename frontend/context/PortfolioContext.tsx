import { Portfolio, Stock } from '@/types/schema';
import { useState, useContext, createContext } from 'react';

interface PortfolioContextType {
    portfolio: Portfolio;
    addStock: (stock: Stock) => void;
    updateStock: (ticker: string, updatedStock: Partial<Stock>) => void;
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
    const [portfolio, setPortfolio] = useState<Portfolio>({
        AAPL: { ticker: 'AAPL', currentPrice: 10, quantity: 1 },
    });

    const addStock = (stock: Stock) => {
        setPortfolio((prevPortfolio) => ({
            ...prevPortfolio,
            [stock.ticker]: stock,
        }));
    };

    const updateStock = (ticker: string, updatedStock: Partial<Stock>) => {
        console.log('updating stock!');
        setPortfolio((prevPortfolio) => ({
            ...prevPortfolio,
            [ticker]: {
                ...prevPortfolio[ticker],
                ...updatedStock,
            },
        }));
    };

    const removeStock = (ticker: string) => {
        setPortfolio((prevPortfolio) => {
            const newPortfolio = { ...prevPortfolio };
            delete newPortfolio[ticker];
            return newPortfolio;
        });
    };

    return (
        <PortfolioContext.Provider
            value={{ portfolio, addStock, updateStock, removeStock }}
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
