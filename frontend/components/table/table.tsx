import { Stock } from '@/types/schema';
import DataTable from './data-table';
import { columns } from './columns';
import { usePortfolio } from '@/context/PortfolioContext';
import { PopoverButton } from './popover-button';

export default function Table() {
    const { portfolio } = usePortfolio();
    const values: Stock[] = Object.values(portfolio);

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={values} />
            <PopoverButton />
            <p>{JSON.stringify(portfolio, null, 2)}</p>
        </div>
    );
}
