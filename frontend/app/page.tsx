'use client';

import Settings from '@/components/settings/settings';
import Portfolio from '@/components/table/table';
import { PortfolioProvider } from '@/context/PortfolioContext';

export default function Home() {
    return (
        <>
            <PortfolioProvider>
                <div className="container mx-auto py-10">
                    <Settings />
                    <Portfolio />
                </div>
            </PortfolioProvider>
        </>
    );
}
