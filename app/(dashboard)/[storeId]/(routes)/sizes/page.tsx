import React from "react";
import SizeClient from "./components/SizeClient";
import prisma from "@/prisma/client";
import { SizeColumn } from "./components/columns";
import { format } from "date-fns";
const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prisma.sizes.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedBillboard: SizeColumn[] = billboards.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do,yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedBillboard} />
      </div>
    </div>
  );
};

export default SizePage;
