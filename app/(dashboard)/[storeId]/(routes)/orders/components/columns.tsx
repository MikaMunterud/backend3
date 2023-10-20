'use client';

import { CellAction } from '@/components/cell-actions';
import { ColumnDef } from '@tanstack/react-table';

export type OrderColumn = {
  id: string;
  name: string;
  phone: string;
  address: string;
  totalPrice: string;
  isPaid: boolean;
  created: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total price',
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid',
  },
  {
    accessorKey: 'created',
    header: 'Order date',
  },
  {
    accessorKey: 'updated',
    header: 'Last revised',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction route={'orders'} id={row.original.id} />,
  },
];
