import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authorized.', status: 401 });
    }

    const { storeId } = params;

    if (!storeId) {
      return Response.json({ error: 'StoreId is required.', status: 400 });
    }

    interface Body {
      name: string;
    }

    const { name }: Body = await req.json();

    if (!name) {
      return NextResponse.json({
        error: 'Name is required and has to be a string',
        status: 400,
      });
    }

    const updatedStore = await prismadb.store.updateMany({
      where: {
        id: storeId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedStore, { status: 200 });
  } catch (error) {
    console.log('[PATCH in stores]', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authorized.', status: 401 });
    }

    const { storeId } = params;

    if (!storeId) {
      return Response.json({ error: 'StoreId is required.', status: 400 });
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

    return NextResponse.json(store, { status: 200 });
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
    const { storeId } = params;

    if (!storeId) {
      return Response.json({ error: 'StoreId is required.', status: 400 });
    }

    const result = await prismadb.store.findFirst({
      where: {
        id: storeId,
      },
      select: {
        name: true,
      },
    });

    if (result === null) {
      return NextResponse.json({ error: 'No store found', status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
