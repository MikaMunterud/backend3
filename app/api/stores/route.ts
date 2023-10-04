import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body: { name: string} = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const store = await prismadb.store.create({ data: { name, userId } });

    return NextResponse.json(store);
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const stores = await prismadb.store.findMany({});

    return NextResponse.json(stores);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
