import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });

    const data = await req.json();
    const { label, imageUrl } = data;

    if (!label)
      return NextResponse.json(
        { message: "Label is required" },
        { status: 400 }
      );

    if (!imageUrl)
      return NextResponse.json(
        { message: "Imageurl is required" },
        { status: 400 }
      );

    if (!params.storeId)
      return NextResponse.json(
        { message: "storeId is required" },
        { status: 400 }
      );

    const storeExists = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeExists)
      return NextResponse.json({ status: 404, message: "Store not found" });
    const created = await prisma.billboards.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    if (!created)
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

    return NextResponse.json({ status: 200, data: created });
  } catch (e) {
    console.error("[BILLBOARDS_POST]", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 400 });
    if (!params.billboardId)
      return new NextResponse("BillboardId is required", { status: 400 });

    const storeExists = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeExists)
      return NextResponse.json({ status: 404, message: "Store not found" });

    const res = await prisma.billboards.deleteMany({
      where: { storeId: params.billboardId },
    });

    return NextResponse.json(res);
  } catch (e) {
    console.error("[BILLBOARDS_DELETE]", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId)
      return new NextResponse("storeId is required", { status: 400 });

    const res = await prisma.billboards.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(res);
  } catch (e) {
    console.error("[BILLBOARDS_GET]", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
