'use client';

import { Table } from '@tanstack/react-table';
import { DataTableColumnOptions } from './data-table-column-options';
import AddStock from './add-stock';
import Debug from '../debug/debug';
import Settings from '../settings/settings';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <AddStock />
                <Settings />
                <Debug />
            </div>
            <div className="flex flex-1 items-center space-x-2">
                <DataTableViewOptions />
                <DataTableColumnOptions table={table} />
            </div>
        </div>
    );
}
