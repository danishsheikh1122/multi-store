import prisma from "@/prisma/client";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prisma.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: { orderItems: { include: { product: true } } },
  });
  const orderTotal = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);
    return total + orderTotal;
  }, 0);
  return orderTotal;
};
