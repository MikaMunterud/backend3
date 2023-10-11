'use client';

import { CellAction } from '@/components/cell-actions';
import { ColumnDef } from '@tanstack/react-table';

export type CategoryColumn = {
  id: string;
  name: string;
  billboardId: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'billboardId',
    header: 'Billboard',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction route={'categories'} id={row.original.id} />,
  },
];
