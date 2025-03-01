import React from "react";
import prisma from "@/prisma/client";
import { format } from "date-fns";
import CategoriesClient from "./components/categoriesClient";
import { CategoriesColumn } from "./components/columns";
const CategoryPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prisma.category.findMany({
    where: { storeId: params.storeId },
    include: { billboard: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedCategories: CategoriesColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do,yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoryPage;
