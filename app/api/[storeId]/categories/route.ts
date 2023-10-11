import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, storeId, billboardId } = await request.json();

  try {
    const result = await prismadb.category.createMany({
      data: {
        name,
        storeId,
        billboardId,
      },
    });
    return NextResponse.json({ status: 201, body: { result } });
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      const errorMessage = err.message;
      return NextResponse.json({ status: 400, body: { errorMessage } });
    } else {
      return NextResponse.json({ status: 500, body: { err } });
    }
  }
}

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = params;

    const categories = await prismadb.category.findMany({
      where: {
        storeId,
      },
    });
    return NextResponse.json({ status: 200, body: { categories } });
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      const errorMessage = err.message;

      return NextResponse.json({ status: 400, body: { errorMessage } });
    } else {
      return NextResponse.json({ status: 500, body: { err } });
    }
  }
}
