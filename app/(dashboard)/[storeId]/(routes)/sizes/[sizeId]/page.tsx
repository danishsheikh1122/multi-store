import prisma from "@/prisma/client";
import React from "react";
import SizeFormSettings from "./components/SizesFormSettings";

const FinalSizePage = async ({
  params,
}: {
  params: { sizeId: string };
}) => {
  const sizes = await prisma.sizes.findUnique({
    where: { id: params.sizeId},
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeFormSettings initialData={sizes}></SizeFormSettings>
      </div>
    </div>
  );
};

export default FinalSizePage;
