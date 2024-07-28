import prisma from "@/prisma/client";
import React from "react";
import BillBoardForm from "./components/BillBoardForm";

const FinalBillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prisma.billboards.findUnique({
    where: { id: params.billboardId },
  });
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardForm initialData={billboard}></BillBoardForm>
      </div>
    </div>
  );
};

export default FinalBillboardPage;
