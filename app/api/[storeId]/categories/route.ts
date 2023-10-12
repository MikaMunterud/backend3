import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    //const { userId } = auth()
    const { storeId } = params;

    interface Body {
      name: string;
      billboardId: string;
    }

    const { name, billboardId }: Body = await request.json();

    // if (!userId) {
    //   return NextResponse.json({ body: {error: 'Not authorized'}, status: 401 })
    // }

    if (!storeId) {
      return NextResponse.json(
        { error: 'StoreId is required' },
        { status: 400 },
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required and has to be a string' },
        { status: 400 },
      );
    }

    if (!billboardId) {
      return NextResponse.json(
        { error: 'Billboard is required and has to be a string' },
        { status: 400 },
      );
    }

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
  { params }: { params: { storeId: string } },
) {
  try {
    const { storeId } = params;

    const categories = await prismadb.category.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      const errorMessage = err.message;

      return NextResponse.json({ status: 400, body: { errorMessage } });
    } else {
      return NextResponse.json({ status: 500, body: { err } });
    }
  }
}
