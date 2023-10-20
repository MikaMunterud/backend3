import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse, NextRequest } from 'next/server';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Not authorized', { status: 401 });
    }

    const { storeId } = params;

    if (!storeId) {
      return NextResponse.json({ error: 'StoreId is required', status: 400 });
    }
    interface Body {
      name: string;
      img: string;
      description: string;
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
      description,
      categoryId,
      price,
      isFeatured,
      isArchived,
      sizeId,
      colorId,
    }: Body = await request.json();

    if (!name) {
      return NextResponse.json({
        error: 'Name is required and has to be a string',
        status: 400,
      });
    }

    if (!img) {
      return NextResponse.json({
        error: 'Image is required and has to be a string',
        status: 400,
      });
    }

    if (!description) {
      return NextResponse.json({
        error: 'Description is required and has to be a string',
        status: 400,
      });
    }

    if (!categoryId) {
      return NextResponse.json({
        error: 'Category is required and has to be a string',
        status: 400,
      });
    }

    if (!price) {
      return NextResponse.json({
        error: 'Price is required and has to be a number',
        status: 400,
      });
    }

    if (!sizeId) {
      return NextResponse.json({
        error: 'Size is required and has to be a string',
        status: 400,
      });
    }

    if (!colorId) {
      return NextResponse.json({
        error: 'Color is required and has to be a string',
        status: 400,
      });
    }

    const result = await prismadb.product.createMany({
      data: {
        name,
        img,
        description,
        storeId,
        categoryId,
        price,
        isFeatured,
        isArchived,
        sizeId,
        colorId,
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (err: any) {
    if (err instanceof PrismaClientValidationError) {
      const errorMessage = err.message;
      return NextResponse.json({ errorMessage }, { status: 400 });
    } else if (err.code === 'P2002') {
      return NextResponse.json({ err }, { status: 409 });
    }
    else {
      return NextResponse.json({ err }, { status: 500 });
    }
  }
}

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return NextResponse.json({ error: 'StoreId is required', status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      const errorMessage = err.message;
      return NextResponse.json({ status: 400, errorMessage });
    } else {
      return NextResponse.json({ status: 500, err });
    }
  }
}
