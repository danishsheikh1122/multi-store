"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { Billboards } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface Props {
  data: ProductColumn[];
}

const ProductClient: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products for your store"
        ></Heading>
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4"></Plus>Add New
        </Button>
      </div>
      <Separator></Separator>
      <DataTable columns={columns} data={data} searchKey="name"></DataTable>
      <Heading title="API" description="API calls for Products"></Heading>
      <Separator></Separator>
      <ApiList entityName="products" entityIdName="productId"></ApiList>
    </>
  );
};

export default ProductClient;
