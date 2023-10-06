'use client';

import { CellAction } from '@/components/cell-actions';
import { ColumnDef } from '@tanstack/react-table';

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  //   createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard',
  },
  /*   {
    accessorKey: 'createdAt',
    header: 'Date',
  }, */

  {
    id: 'actions',
    cell: ({ row }) => <CellAction route={'sizes'} id={row.original.id} />,
  },
];
