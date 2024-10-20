'use client';

import { PortfolioItem } from '@/types/schema';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RowActions from './row-actions';

const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount);
};

const formatPercent = (value: number, decimals: number = 2) => {
    return `${(value * 100).toFixed(decimals)}%`;
};

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

export const columns: ColumnDef<PortfolioItem>[] = [
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
        accessorKey: 'weight',
        header: ({ column }) => sortableHeader(column, 'Weight'),
        cell: ({ row }) => {
            const weight = parseFloat(row.getValue('weight'));
            return (
                <div className="text-right font-medium">
                    {formatPercent(weight)}
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
