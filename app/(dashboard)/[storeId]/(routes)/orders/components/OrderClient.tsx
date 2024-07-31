"use client";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { columns, OrderColumn } from "./columns";

interface Props {
  data: OrderColumn[];
}

const OrderClient: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage Orders for your store"
      ></Heading>
      <Separator></Separator>
      <DataTable columns={columns} data={data} searchKey="products"></DataTable>
    </>
  );
};

export default OrderClient;
