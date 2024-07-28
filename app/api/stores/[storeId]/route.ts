import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  //storeId comes magically from dashboard>[storeId] coz same folder name rakhenge tho uske params ko access akrsakte hai aapna
  try {
    const body = await req.json();
    const { name } = body;

    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ status: 401, messsage: "not authenticated" });
    if (!name)
      return NextResponse.json({ status: 400, messsage: "name is required" });

    const res = await prisma.store.update({
      where: { id: params.storeId },
      data: { name },
    });
    if (!res)
      return NextResponse.json({ status: 404, messsage: "store not found" });
    return NextResponse.json({ status: 200, res });
  } catch (e) {
    return NextResponse.json({
      error: e,
      message: "[path req error from saving store setting ]",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string; type: string } }
) {
  //storeId comes magically from dashboard>[storeId] coz same folder name rakhenge tho uske params ko access akrsakte hai aapna
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ status: 401, messsage: "not authenticated" });
    const res = await prisma.store.delete({
      where: { id: params.storeId },
    });

    if (!res)
      return NextResponse.json({ status: 404, messsage: "store not found" });

    return NextResponse.json({ status: 200, res });
  } catch (e) {
    return NextResponse.json({
      error: e,
      message: "[path req error from deleting store setting ]",
    });
  }
}
