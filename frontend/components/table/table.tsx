import { Stock } from '@/types/schema';
import { DataTable } from './data-table';
import { columns } from './columns';
import { usePortfolio } from '@/context/PortfolioContext';

export default function Table() {
    const { portfolio } = usePortfolio();
    const values: Stock[] = Object.values(portfolio);

    return (
        <>
            <DataTable columns={columns} data={values} />
        </>
    );
}
