import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./components/Settingsform";
interface Props {
  params: { storeId: string };
}
const SettingsPage = async ({ params: { storeId } }: Props) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in ");

  const store = await prisma.store.findFirst({
    where: { id: storeId, userId },
  });
  if (!store) redirect("/");
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <SettingsForm initialData={store}></SettingsForm>
      </div>
    </div>
  );
};

export default SettingsPage;
