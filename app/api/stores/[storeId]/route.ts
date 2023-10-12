import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const body = await req.json();
    const { name } = body;

    const { storeId } = params;

    if (!name) {
      return new Response('Missing name', { status: 400 });
    }

    if (!params.storeId) {
      return new Response('Missing storeId', { status: 400 });
    }

    const updatedStore = await prismadb.store.updateMany({
      where: {
        id: storeId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.log('[PATCH in stores]', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

// DELETE

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { storeId } = params;

    if (!params.storeId) {
      return new Response('Missing storeId', { status: 400 });
    }

    const storeOrders = await prismadb.order.deleteMany({
      where: {
        storeId,
      },
    });

    const storeProducts = await prismadb.product.deleteMany({
      where: {
        storeId,
      },
    });

    const storeColors = await prismadb.color.deleteMany({
      where: {
        storeId,
      },
    });

    const storeSizes = await prismadb.size.deleteMany({
      where: {
        storeId,
      },
    });

    const storeCategories = await prismadb.category.deleteMany({
      where: {
        storeId,
      },
    });

    const storeBillboards = await prismadb.billboard.deleteMany({
      where: {
        storeId,
      },
    });

    const store = await prismadb.store.deleteMany({
      where: {
        id: storeId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[DELETE in stores]', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Not authorized', { status: 401 });
    }

    const { storeId } = params;

    if (!params.storeId) {
      return new Response('Missing storeId', { status: 400 });
    }

    const result = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
      select: {
        name: true,
      },
    });

    if (result === null) {
      return new NextResponse('No store found', { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
