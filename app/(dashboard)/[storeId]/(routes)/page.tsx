import prisma from "@/prisma/client";
import React from "react";

interface DashboardProps {
  params: { storeId: string };
}
const DashboardPage = async ({ params: { storeId } }: DashboardProps) => {
  const res = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
  });

  return <div>current active store {res?.name}</div>;
};

export default DashboardPage;
