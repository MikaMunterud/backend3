import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    const { productId } = params;

    if (!productId) {
      return NextResponse.json({ error: 'productId is required', status: 400 });
    }

    const result = await prismadb.product.findUnique({
      where: { id: productId },
    });

    if (result === null) {
      return NextResponse.json({ error: 'No product found', status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authorized', status: 401 });
    }

    const { productId } = params;

    if (!productId) {
      return NextResponse.json({ error: 'ProductId is required', status: 400 });
    }

    const result = await prismadb.product.delete({
      where: { id: productId },
    });
    const resName = result.name;
    return NextResponse.json(`${resName} is deleted`, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authorized', status: 401 });
    }

    const { productId } = params;

    if (!productId) {
      return NextResponse.json({ error: 'ProductId is required', status: 400 });
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
    }: Body = await req.json();

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

    const result = await prismadb.product.update({
      where: { id: params.productId },
      data: {
        name,
        img,
        description,
        categoryId,
        price,
        isFeatured,
        isArchived,
        sizeId,
        colorId,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error }, { status: 409 });
    } else if (error.code === 'P2000') {
      return NextResponse.json({ error }, { status: 414 });
    } else {
      return NextResponse.json({ error }, { status: 500 });
    }
  }
}
