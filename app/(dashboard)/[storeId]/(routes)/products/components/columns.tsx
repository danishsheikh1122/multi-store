"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  size: string;
  color: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name", //type name should be match
    header: "Name",
  },
  {
    accessorKey: "isArchived", //type name shoud be match
    header: "Archived",
  },
  {
    accessorKey: "isFeatured", //type name should be match
    header: "Featured",
  },
  {
    accessorKey: "price", //type name should be match
    header: "Price",
  },
  {
    accessorKey: "category", //type name should be match
    header: "Category",
  },
  {
    accessorKey: "size", //type name should be match
    header: "Size",
  },
  {
    accessorKey: "color", //type name should be match
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        ></div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}></CellAction>,
  },
];
