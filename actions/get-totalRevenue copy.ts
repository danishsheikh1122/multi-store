import prisma from "@/prisma/client";

export const getProductsInStock = async (storeId: string) => {
  const productCount = await prisma.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });
  return productCount;
};
