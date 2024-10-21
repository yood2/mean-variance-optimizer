import { Stock } from '@/types/schema';
import DataTable from './data-table';
import { columns } from './columns';
import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '../ui/button';

export default function Table() {
    const { portfolio } = usePortfolio();

    const values: Stock[] = Object.values(portfolio);

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={values} />
            <Button>Add Stock</Button>
            <p>{JSON.stringify(portfolio, null, 2)}</p>
        </div>
    );
}
