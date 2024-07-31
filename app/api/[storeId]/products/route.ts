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
    const {
      name,
      price,
      images,
      sizeId,
      categoryId,
      colorId,
      isFeatured,
      isArchived,
    } = data;

    if (!name)
      return NextResponse.json(
        { message: "name is required" },
        { status: 400 }
      );

    if (!price)
      return NextResponse.json(
        { message: "price is required" },
        { status: 400 }
      );
    if (!images || !images.length)
      return NextResponse.json(
        { message: "images are required" },
        { status: 400 }
      );
    if (!sizeId)
      return NextResponse.json(
        { message: "sizeId is required" },
        { status: 400 }
      );
    if (!categoryId)
      return NextResponse.json(
        { message: "categoryId is required" },
        { status: 400 }
      );
    if (!colorId)
      return NextResponse.json(
        { message: "colorId is required" },
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
    const created = await prisma.product.create({
      data: {
        name,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        price,
        colorId,
        categoryId,
        sizeId,
        isFeatured,
        isArchived,
        storeId: params.storeId,
      },
    });

    if (!created)
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });

    return NextResponse.json({ status: 200, data: created });
  } catch (e) {
    console.error("[PRODUCTS_POST]", e);
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
    const { searchParams } = new URL(req.url);//this is search params like query params most convenient way to do this 
    const categoryId = searchParams.get("categoryId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const isFeatured = searchParams.get("isFeatured");
    //end 
    if (!params.storeId)
      return new NextResponse("storeId is required", { status: 400 });

    const res = await prisma.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        colorId,
        sizeId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        category: true,
        images: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(res);
  } catch (e) {
    console.error("[PRODUCTS_GET]", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
