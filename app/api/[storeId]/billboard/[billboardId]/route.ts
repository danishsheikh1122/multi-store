import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  //storeId comes magically from dashboard>[storeId] coz same folder name rakhenge tho uske params ko access akrsakte hai aapna
  try {
    const body = await req.json();
    const { label, imageUrl } = body;

    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ status: 401, messsage: "not authenticated" });
    if (!label)
      return NextResponse.json({ status: 400, messsage: "label is required" });
    if (!imageUrl)
      return NextResponse.json({
        status: 400,
        messsage: "imageUrl is required",
      });

    if (!params.billboardId)
      return NextResponse.json({
        status: 400,
        messsage: "billboardId is required",
      });

    const isExists = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!isExists)
      return NextResponse.json({ status: 403, messsage: "Unauthorized" });

    const billboard = await prisma.billboards.updateMany({
      where: { id: params.billboardId },
      data: { label, imageUrl },
    });

    return NextResponse.json({ status: 200, billboard });
  } catch (e) {
    return NextResponse.json({
      error: e,
      message: "[BILLBOARD_PATCH_BILLBOARDIDROUTE ]",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { billboardId: string } }
) {
  //storeId comes magically from dashboard>[storeId] coz same folder name rakhenge tho uske params ko access akrsakte hai aapna
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ status: 401, messsage: "not authenticated" });
    const res = await prisma.billboards.delete({
      where: { id: params.billboardId },
    });

    if (!res)
      return NextResponse.json({ status: 404, messsage: "store not found" });

    return NextResponse.json({ status: 200, res });
  } catch (e) {
    return NextResponse.json({
      error: e,
      message: "[BILLBOARD_DELETE_FROM_BILLBOARDMAINPAGE]",
    });
  }
}
