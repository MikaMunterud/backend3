import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

const StoreSchema = z.object({
  name: z.string()
})

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    StoreSchema.parse(body); 

    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const store = await prismadb.store.create({ data: { name } });

    return NextResponse.json(store);
  } catch (error: any) {
    const validationError = fromZodError(error);
    return NextResponse.json(validationError);
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
