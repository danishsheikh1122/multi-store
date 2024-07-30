import prisma from "@/prisma/client";
import React from "react";
import ColorFormSettings from "./components/ColorFormSettings";

const FinalColorPage = async ({
  params,
}: {
  params: { colorId: string };
}) => {
  const color = await prisma.color.findUnique({
    where: { id: params.colorId},
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorFormSettings initialData={color}></ColorFormSettings>
      </div>
    </div>
  );
};

export default FinalColorPage;
