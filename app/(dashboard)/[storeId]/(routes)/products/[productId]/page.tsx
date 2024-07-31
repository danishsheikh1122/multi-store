import prisma from "@/prisma/client";
import React from "react";
import ProductForm from "./components/ProductForm";

const FinalProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const product = await prisma.product.findUnique({
    where: { id: params.productId },
    include: { images: true },
  });
  const category = await prisma.category.findMany({
    where: { storeId: params.storeId },
  });
  const sizes = await prisma.sizes.findMany({
    where: { storeId: params.storeId },
  });
  const color = await prisma.color.findMany({
    where: { storeId: params.storeId },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm categories={category} sizes={sizes} color={color} initialData={product}></ProductForm>
      </div>
    </div>
  );
};

export default FinalProductPage;
