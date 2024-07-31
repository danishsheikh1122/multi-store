"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: Boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products", //type name should be match
    header: "Products",
  },
  {
    accessorKey: "phone", //type name should be match
    header: "Phone",
  },
  {
    accessorKey: "address", //type name should be match
    header: "Address",
  },
  {
    accessorKey: "totalPrice", //type name should be match
    header: "Total Price",
  },
  {
    accessorKey: "isPaid", //type name should be match
    header: "Paid",
  },
];
 