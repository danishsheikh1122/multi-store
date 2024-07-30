import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; colorId: string } }
) {
  //storeId comes magically from dashboard>[storeId] coz same folder name rakhenge tho uske params ko access akrsakte hai aapna
  try {
    const body = await req.json();
    const { name, value } = body;

    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ status: 401, messsage: "not authenticated" });
    if (!name)
      return NextResponse.json({ status: 400, messsage: "Name is required" });
    if (!value)
      return NextResponse.json({ status: 400, messsage: "Value is required" });
    if (!params.storeId)
      return NextResponse.json({
        status: 400,
        messsage: "storeId is required",
      });

    if (!params.colorId)
      return NextResponse.json({
        status: 400,
        messsage: "colorId is required",
      });

    const isExists = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!isExists)
      return NextResponse.json({ status: 403, messsage: "Unauthorized" });

    const sizes = await prisma.color.updateMany({
      where: { id: params.colorId },
      data: { name, value },
    });

    return NextResponse.json({ status: 200, sizes });
  } catch (e) {
    return NextResponse.json({
      error: e,
      message: "[COLOR_PATCH_ROUTE]",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { colorId: string; storeId: string } }
) {
  //storeId comes magically from dashboard>[storeId] coz same folder name rakhenge tho uske params ko access akrsakte hai aapna
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ status: 401, messsage: "not authenticated" });
    if (!params.colorId)
      return NextResponse.json({
        status: 404,
        messsage: "ColorId is required",
      });

    const isExists = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!isExists)
      return NextResponse.json({ status: 403, messsage: "Unauthorized" });

    const res = await prisma.color.deleteMany({
      where: { id: params.colorId },
    });

    if (!res)
      return NextResponse.json({ status: 404, messsage: "store not found" });

    return NextResponse.json({ status: 200, res });
  } catch (e) {
    return NextResponse.json({
      error: e,
      message: "[COLOR_DELETE_FROM_SIZEPAGE]",
    });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { colorId: string } }
) {
  try {
    if (!params.colorId)
      return NextResponse.json({
        status: 404,
        messsage: "SizeId is required",
      });
    const res = await prisma.color.findUnique({
      where: { id: params.colorId },
    });

    return NextResponse.json({ status: 200, res });
  } catch (e) {
    console.log("[COLOR_GET]", e);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
