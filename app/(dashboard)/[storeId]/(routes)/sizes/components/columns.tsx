'use client';

import { CellAction } from '@/components/cell-actions';
import { ColumnDef } from '@tanstack/react-table';

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
};

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'value',
    header: 'Value',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction route={'sizes'} id={row.original.id} />,
  },
];
