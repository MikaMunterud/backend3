'use client';

import { CellAction } from '@/components/cell-actions';
import { ColumnDef } from '@tanstack/react-table';

export type BillboardColumn = {
  id: string;
  title: string;
  billboardLabel: string;
  //   createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
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
