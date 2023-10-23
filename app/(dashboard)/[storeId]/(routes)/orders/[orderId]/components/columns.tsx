"use client";

import { ColumnDef } from "@tanstack/react-table";

export type ProductColumn = {
  name: string | undefined;
  price: string | undefined;
  quantity: number | undefined;
  totalPrice: string | undefined;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
];
