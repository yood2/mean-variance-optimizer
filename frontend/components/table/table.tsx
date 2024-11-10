import { useEffect, useState } from 'react';
import { Stock } from '@/types/schema';
import DataTable from './data-table';
import { columns } from './columns';
import { usePortfolio } from '@/context/PortfolioContext';
import { PopoverButton } from './popover-button';
import useFetch from '@/hooks/useFetch';

export default function Table() {
    const { portfolio } = usePortfolio();
    const values: Stock[] = Object.values(portfolio);

    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch the data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await useFetch(); // Call the async useFetch function
                setApiData(result); // Store the API data in state
            } catch (e) {
                setError(e.message); // Handle any errors
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchData(); // Trigger the fetch
    }, []); // Empty dependency array ensures it only runs on mount

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={values} />
            <PopoverButton />
            <p>{JSON.stringify(portfolio, null, 2)}</p>
            {/* Display the fetched API data */}
            <p>{JSON.stringify(apiData, null, 2)}</p>
        </div>
    );
}
