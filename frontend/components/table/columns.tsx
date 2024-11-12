'use client';

import { Stock } from '@/types/schema';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ArrowUpDown } from 'lucide-react';
import { MoreHorizontal } from 'lucide-react';

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

export const columns: ColumnDef<Stock>[] = [
    {
        accessorKey: 'ticker',
        header: ({ column }) => sortableHeader(column, 'Ticker'),
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
            return <RowActions row={row.original} />;
        },
    },
];

/**
 * ROW ACTIONS
 */
interface RowActionsProps {
    row: Stock;
}

function RowActions({ row }: RowActionsProps) {
    const { removeStock } = usePortfolio();

    const handleDelete = () => {
        removeStock(row.ticker);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleDelete}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
