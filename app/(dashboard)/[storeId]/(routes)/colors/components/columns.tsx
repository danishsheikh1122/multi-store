"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type colorColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
} ;

export const columns: ColumnDef<colorColumn>[] = [
  {
    accessorKey: "name", //type name should be match
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex gap-x-2 items-center">
        {row.original.value}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.value }}
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
