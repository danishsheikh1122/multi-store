import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });

    const data = await req.json();
    const { name, value } = data;

    if (!name)
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );

    if (!value)
      return NextResponse.json(
        { message: "value is required" },
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
    const created = await prisma.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    if (!created)
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

    return NextResponse.json({ status: 200, data: created });
  } catch (e) {
    console.error("[COLOR_POST]", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
//below one is optional but dont do anything to it coz the code is working lol:))
export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 400 });
    if (!params.colorId)
      return new NextResponse("SizeId is required", { status: 400 });

    const storeExists = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });

    if (!storeExists)
      return NextResponse.json({ status: 404, message: "Store not found" });

    const res = await prisma.sizes.deleteMany({
      where: { storeId: params.colorId },
    });

    return NextResponse.json(res);
  } catch (e) {
    console.error("[COLOR_DELETE]", e);
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

    const res = await prisma.color.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(res);
  } catch (e) {
    console.error("[COLOR_GET]", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
