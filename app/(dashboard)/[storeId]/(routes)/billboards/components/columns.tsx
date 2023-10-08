'use client';

import { CellAction } from '@/components/cell-actions';
import { ColumnDef } from '@tanstack/react-table';

export type BillboardColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction route={'sizes'} id={row.original.id} />,
  },
];
