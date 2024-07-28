"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { Billboards } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface Props {
  data: BillboardColumn[];
}

const BillboardClient: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        ></Heading>
        <Button onClick={() => router.push(`/${params.storeId}/billboard/new`)}>
          <Plus className="mr-2 h-4 w-4"></Plus>Add New
        </Button>
      </div>
      <Separator></Separator>
      <DataTable columns={columns} data={data} searchKey="label"></DataTable>
    </>
  );
};

export default BillboardClient;
