import { PortfolioItem } from '@/types/schema';
import { useState, useContext, createContext } from 'react';

const PortfolioContext = createContext<
    | {
          portfolioItems: PortfolioItem[];
          addPortfolioItem: (item: PortfolioItem) => void;
      }
    | undefined
>(undefined);

export const PortfolioProvider = (children: React.ReactNode) => {
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);

    const addPortfolioItem = (item: PortfolioItem) => {
        setPortfolioItems((prevItems) => [...prevItems, item]);
    };

    return (
        <PortfolioContext.Provider value={{ portfolioItems, addPortfolioItem }}>
            {children}
        </PortfolioContext.Provider>
    );
};

export const usePortfolio = () => {
    const context = useContext(PortfolioContext);
    if (!context) {
        throw new Error(`usePortfolio must be used within a PortfolioProvider`);
    }
    return context;
};
