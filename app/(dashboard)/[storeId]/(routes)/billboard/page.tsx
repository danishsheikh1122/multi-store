import React from "react";
import BillboardClient from "./components/BillboardClient";
import prisma from "@/prisma/client";
import { BillboardColumn } from "./components/columns";
import { format } from "date-fns";
const BillboardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prisma.billboards.findMany({
    where: { storeId: params.storeId },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedBillboard: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do,yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
