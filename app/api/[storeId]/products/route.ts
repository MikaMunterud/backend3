import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

/* ----------POST------------ */

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    /*     const { userId } = auth(); */

    interface Body {
      name: string;
      img: string;
      categoryId: string;
      price: number;
      isFeatured: boolean;
      isArchived: boolean;
      sizeId: string;
      colorId: string;
    }

    const {
      name,
      img,
      categoryId,
      price,
      isFeatured,
      isArchived,
      sizeId,
      colorId,
    }: Body = await request.json();
    const { storeId } = params;

    /*    if (!userId) {
      return new NextResponse("Not authorized", { status: 401 });
    }  */

    const result = await prismadb.product.createMany({
      data: {
        name,
        img,
        storeId,
        categoryId,
        price,
        isFeatured,
        isArchived,
        sizeId,
        colorId,
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

/* ----------GET------------ */

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = params;

    const store = await prismadb.store.findUnique({
      where: {
        id: storeId,
      },
    });

    if (!store) {
      return NextResponse.json({
        status: 404,
        body: { message: `Store with ID ${storeId} not found` },
      });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json({ status: 200, body: { products } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      const errorMessage = err.message;
      return NextResponse.json({ status: 400, body: { errorMessage } });
    } else {
      return NextResponse.json({ status: 500, body: { err } });
    }
  }
}

