import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) redirect("/");

  const store = await prisma.store.findFirst({ where: { userId } });

  if (store) {
    redirect(`/${store.id}`);
  }
  return <>{children}</>;
}
