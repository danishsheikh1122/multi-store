import prisma from "@/prisma/client";
import React from "react";
import CategoryForm from "./components/CategoryForm";

const FinalCategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const category = await prisma.category.findUnique({
    where: { id: params.categoryId },
  });
  const billboards = await prisma.billboards.findMany({
    where: { storeId: params.storeId },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards}></CategoryForm>
      </div>
    </div>
  );
};

export default FinalCategoryPage;
