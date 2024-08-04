import { UserButton } from "@clerk/nextjs";
import React from "react";
import MainNavForAdmin from "@/components/MainNavForAdmin";
import Storeswithceradmin from "./storeswithceradmin";
import { auth } from "@clerk/nextjs/server";
import { redirect, useRouter } from "next/navigation";
import prisma from "@/prisma/client";
import { ModeToggle } from "./ui/toggleButton";

const NavBarForAdmin = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const storesData = await prisma.store.findMany({
    where: { userId: userId! },
  });
  return (
    <div className="border-b">
      <div className="flex items-center h-16 px-4">
        <Storeswithceradmin items={storesData}></Storeswithceradmin>
        <MainNavForAdmin className="mx-6"></MainNavForAdmin>
        <div className="ml-auto flex items-center px-4 space-x-4">
          <ModeToggle></ModeToggle>
          <UserButton afterSignOutUrl="/"></UserButton>
        </div>
      </div>
    </div>
  );
};

export default NavBarForAdmin;
