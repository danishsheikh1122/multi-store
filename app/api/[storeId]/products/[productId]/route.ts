import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeId: string; productId: string } }
) {
  //storeId comes magically from dashboard>[storeId] coz same folder name rakhenge tho uske params ko access akrsakte hai aapna
  try {
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

    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ status: 401, messsage: "not authenticated" });
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
    
    if (!params.productId)
      return NextResponse.json({
        status: 400,
        messsage: "productId is required",
      });

    const isExists = await prisma.store.findFirst({
      where: { id: params.storeId, userId },
    });
    if (!isExists)
      return NextResponse.json({ status: 403, messsage: "Unauthorized" });

    await prisma.product.update({
      where: { id: params.productId },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isArchived,
        isFeatured,
      },
    });

    const product = await prisma.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json({ status: 200, product });
  } catch (e) {
    return NextResponse.json({
      error: e,
      message: "[PRODUCT_PATCH]",
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  //storeId comes magically from dashboard>[storeId] coz same folder name rakhenge tho uske params ko access akrsakte hai aapna
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ status: 401, messsage: "not authenticated" });
    const res = await prisma.product.deleteMany({
      where: { id: params.productId },
    });

    if (!res)
      return NextResponse.json({ status: 404, messsage: "store not found" });

    return NextResponse.json({ status: 200, res });
  } catch (e) {
    return NextResponse.json({
      error: e,
      message: "[PRODUCT_DELETE]",
    });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId)
      return NextResponse.json({
        status: 404,
        messsage: "productId is required",
      });
    const res = await prisma.product.findUnique({
      where: { id: params.productId },
      include: { images: true, category: true, size: true, color: true },
    });

    return NextResponse.json({ status: 200, res });
  } catch (e) {
    console.log("[PRODUCT_GET]", e);
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }
}
