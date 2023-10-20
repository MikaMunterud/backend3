import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authorized', status: 401 });
    }

    const { storeId } = params;

    if (!storeId) {
      return NextResponse.json({ error: 'StoreId is required', status: 400 });
    }

    interface Body {
      name: string;
      img: string;
    }

    const { name, img }: Body = await request.json();

    if (!name) {
      return NextResponse.json({
        error: 'Name is required and has to be a string',
        status: 400,
      });
    }

    if (!img) {
      return NextResponse.json({
        error: 'Image is required.',
        status: 400,
      });
    }

    const result = await prismadb.billboard.create({
      data: {
        name,
        img,
        storeId,
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error }, { status: 409 });
    } else {
      return NextResponse.json({ error }, { status: 500 });
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

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(billboards, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
