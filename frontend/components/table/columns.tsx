'use client';

import { useState, useEffect } from 'react';
import { Stock } from '@/types/schema';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Row } from '@tanstack/react-table';
import RowActions from './row-actions';
import { Input } from '@/components/ui/input';
import { usePortfolio } from '@/context/PortfolioContext';

const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
};

const formatPercent = (value: number, decimals: number = 2) => {
    return `${(value * 100).toFixed(decimals)}%`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortableHeader = (column: any, label: string) => {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            {label}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );
};

const EditableCell = ({
    row,
    accessorKey,
}: {
    row: Row<Stock>;
    accessorKey: string;
}) => {
    const { updateStock } = usePortfolio();
    const initialValue = row.getValue(accessorKey) as number | string;
    const [value, setValue] = useState<number | string>(initialValue);

    useEffect(() => {
        const updatedStock: Partial<Stock> = {
            [accessorKey]: value,
        };
        updateStock(row.getValue('ticker'), updatedStock);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(parseFloat(e.target.value));
    };

    return (
        <Input type="number" value={value} onChange={handleChange} min={0} />
    );
};

export const columns: ColumnDef<Stock>[] = [
    {
        accessorKey: 'ticker',
        header: ({ column }) => sortableHeader(column, 'Ticker'),
    },
    {
        accessorKey: 'quantity',
        header: ({ column }) => sortableHeader(column, 'Quantity'),
        cell: ({ row }) => {
            return <EditableCell row={row} accessorKey="quantity" />;
        },
    },
    {
        accessorKey: 'buyPrice',
        header: ({ column }) => sortableHeader(column, 'Buy Price'),
        cell: ({ row }) => {
            return <EditableCell row={row} accessorKey="buyPrice" />;
        },
    },
    {
        accessorKey: 'currentPrice',
        header: ({ column }) => sortableHeader(column, 'Curr. Price'),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('currentPrice'));
            return (
                <div className="text-right font-medium">
                    {formatCurrency(amount)}
                </div>
            );
        },
    },
    {
        accessorKey: 'optimalWeight',
        header: ({ column }) => sortableHeader(column, 'Opt. Weight'),
        cell: ({ row }) => {
            const optimalWeight = parseFloat(row.getValue('optimalWeight'));
            return (
                <div className="text-right font-medium">
                    {formatPercent(optimalWeight)}
                </div>
            );
        },
    },
    {
        accessorKey: 'expectedReturn',
        header: ({ column }) => sortableHeader(column, 'Exp. Return'),
        cell: ({ row }) => {
            const expectedReturn = parseFloat(row.getValue('expectedReturn'));
            return (
                <div className="text-right font-medium">
                    {formatPercent(expectedReturn)}
                </div>
            );
        },
    },
    {
        accessorKey: 'volatility',
        header: ({ column }) => sortableHeader(column, 'Volatility'),
        cell: ({ row }) => {
            const volatility = parseFloat(row.getValue('volatility'));
            return (
                <div className="text-right font-medium">
                    {formatPercent(volatility)}
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            return <RowActions input={row.original} />;
        },
    },
];
