'use client';

import { CellAction } from '@/components/cell-actions';
import { ColumnDef } from '@tanstack/react-table';

export type SizeColumn = {
  id: string;
  name: string;
  value: string;
  //   createdAt: string;
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
  /*   {
    accessorKey: 'createdAt',
    header: 'Date',
  }, */

  {
    id: 'actions',
    cell: ({ row }) => <CellAction route={'sizes'} id={row.original.id} />,
  },
];
