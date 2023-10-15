import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const { storeId } = params;

    interface Body {
      name: string;
      image: string;
      value: string;
    }

    const { name, image }: Body = await request.json();

    if (!userId) {
      return NextResponse.json({
        error: 'Unauthorized',
        status: 401,
      });
    }

    if (!storeId) {
      return NextResponse.json({ error: 'StoreId is required', status: 400 });
    }

    if (!name) {
      return NextResponse.json({
        error: 'Name is required and has to be a string',
        status: 400,
      });
    }

    if (!image) {
      return NextResponse.json({
        error: 'Image is required.',
        status: 400,
      });
    }

    const result = await prismadb.billboard.create({
      data: {
        name,
        image,
        storeId,
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return NextResponse.json(
        { error: 'StoreId is required' },
        { status: 400 },
      );
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(billboards, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
