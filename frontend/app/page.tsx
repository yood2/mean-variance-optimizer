'use client';

import Portfolio from '@/components/table/table';
import { PortfolioProvider } from '@/context/PortfolioContext';

export default function Home() {
    return (
        <>
            <PortfolioProvider>
                <Portfolio />
            </PortfolioProvider>
        </>
    );
}
