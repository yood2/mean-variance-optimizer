import { columns } from './columns';
import DataTable from './data-table';
import { PortfolioItem } from '@/types/schema';

async function getData(): Promise<PortfolioItem[]> {
    // Fetch data from your API here.
    return [
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
        // ...
    ];
}

export default async function Portfolio() {
    const data = await getData();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
