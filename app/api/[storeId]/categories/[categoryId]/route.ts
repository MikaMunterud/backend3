import prismadb from '@/lib/prismadb';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({
        error: 'Not authorized',
        status: 401,
      });
    }

    const { categoryId } = params;

    if (!categoryId) {
      return NextResponse.json({
        error: 'Category is required and has to be a string',
        status: 400,
      });
    }

    const result = await prismadb.category.delete({
      where: {
        id: categoryId,
      },
    });
    return NextResponse.json({ status: 200, body: { result } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      const errorMessage = err.message;
      return NextResponse.json({ status: 400, body: { errorMessage } });
    } else {
      return NextResponse.json({ status: 500, body: { err } });
    }
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authorized', status: 401 });
    }

    const { categoryId } = params;

    if (!categoryId) {
      return NextResponse.json({
        error: 'CategoryId is required.',
        status: 400,
      });
    }

    const { name, billboardId } = await req.json();

    if (!name) {
      return NextResponse.json({
        error: 'Name is required and has to be a string',
        status: 400,
      });
    }

    if (!billboardId) {
      return NextResponse.json({
        error: 'BillboardId is required.',
        status: 400,
      });
    }

    const result = await prismadb.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    if (err instanceof PrismaClientValidationError) {
      const errorMessage = err.message;
      return NextResponse.json({ errorMessage }, { status: 400 });
    } else if (err.code === 'P2002') {
      return NextResponse.json({ err }, { status: 409 });
    } else {
      return NextResponse.json({ err }, { status: 500 });
    }
  }
}

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    const { categoryId } = params;

    if (!categoryId) {
      return NextResponse.json({
        error: 'Category is required and has to be a string',
        status: 400,
      });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json(category, { status: 200 });
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      const errorMessage = err.message;

      return NextResponse.json({ status: 400, body: { errorMessage } });
    } else {
      return NextResponse.json({ status: 500, body: { err } });
    }
  }
}
