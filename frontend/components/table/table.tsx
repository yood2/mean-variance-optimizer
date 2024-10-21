import { useState } from 'react';
import { columns } from './columns';
import DataTable from './data-table';
import { PortfolioItem } from '@/types/schema';

export default function Table() {
    const [portfolioItems] = useState<PortfolioItem[]>([
        {
            ticker: 'AAPL',
            currentPrice: 10,
            weight: 1,
        },
        {
            ticker: 'NVDA',
            currentPrice: 100,
            weight: 1,
        },
        {
            ticker: 'TSLA',
            currentPrice: 50,
            weight: 1,
        },
        {
            ticker: 'MSFT',
            currentPrice: 490,
            weight: 1,
        },
    ]);

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={portfolioItems} />
        </div>
    );
}
