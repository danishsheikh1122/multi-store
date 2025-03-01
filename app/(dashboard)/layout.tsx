import NavBarForAdmin from "@/components/NavBarForAdmin";
import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");
  const store = await prisma.store.findFirst({
    where: { id: params.storeId, userId },
  });
  if (!store) redirect("/");
  return (
    <>
      <NavBarForAdmin></NavBarForAdmin>
      {children}
    </>
  );
}
