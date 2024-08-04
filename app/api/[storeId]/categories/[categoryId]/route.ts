import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  //storeId comes magically from dashboard>[storeId] coz same folder name rakhenge tho uske params ko access akrsakte hai aapna
  try {
    const body = await req.json();
    const { name, billboardId } = body;

    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ status: 401, messsage: "not authenticated" });
    if (!name)
      return NextResponse.json({ status: 400, messsage: "Name is required" });
    if (!billboardId)
      return NextResponse.json({
        status: 400,
        messsage: "BillboardId is required",
      });

    if (!params.categoryId)
      return NextResponse.json({
        status: 400,
        messsage: "categoryId is required",
      });

    const isExists = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!isExists)
      return NextResponse.json({ status: 403, messsage: "Unauthorized" });

    const billboard = await prisma.category.updateMany({
      where: { id: params.categoryId },
      data: { name, billboardId },
    });

    return NextResponse.json({ status: 200, billboard });
  } catch (e) {
    return NextResponse.json({
      error: e,
      message: "[CATEGORYID_PATCH_ROUTE]",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  //storeId comes magically from dashboard>[storeId] coz same folder name rakhenge tho uske params ko access akrsakte hai aapna
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ status: 401, messsage: "not authenticated" });
    const res = await prisma.category.delete({
      where: { id: params.categoryId },
    });

    if (!res)
      return NextResponse.json({ status: 404, messsage: "store not found" });

    const isExists = await prisma.store.deleteMany({
      where: { id: params.storeId, userId },
    });
    if (!isExists)
      return NextResponse.json({ status: 403, messsage: "Unauthorized" });

    return NextResponse.json({ status: 200, res });
  } catch (e) {
    return NextResponse.json({
      error: e,
      message: "[CATEGORY_DELETE_FROM_BILLBOARDMAINPAGE]",
    });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId)
      return NextResponse.json({
        status: 404,
        messsage: "CaregoryId is required",
      });
    const res = await prisma.category.findUnique({
      where: { id: params.categoryId },
      include: { billboard: true },
    });

    return NextResponse.json(res);
  } catch (e) {
    console.log("[CATEGORY_GET]", e);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
