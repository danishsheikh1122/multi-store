import prisma from "@/prisma/client";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const data = await req.json();
    const { name } = data;

    if (!name)
      return NextResponse.json(
        { message: "Name is required" },
        { status: 400 }
      );
 
    const created = await prisma.store.create({
      data: {
        name,
        userId,
      },
    });

    if (!created)
      return NextResponse.json({ message: "Data not stored" }, { status: 500 });

    return NextResponse.json({ status: 200, data: created });
  } catch (e) {
    console.error("[STORES_POST]", e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
