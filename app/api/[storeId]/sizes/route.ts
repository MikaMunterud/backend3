import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
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
      value: string;
    }

    const { name, value }: Body = await req.json();

    if (!name) {
      return NextResponse.json({
        error: 'Name is required and has to be a string',
        status: 400,
      });
    }
    if (!value) {
      return NextResponse.json({
        error: 'Value is required and has to be a string',
        status: 400,
      });
    }

    const result = await prismadb.size.create({
      data: {
        name,
        value,
        storeId,
      },
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return NextResponse.json({ error: 'StoreId is required', status: 400 });
    }

    const result = await prismadb.size.findMany({
      where: { storeId: storeId },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, error });
  }
}
