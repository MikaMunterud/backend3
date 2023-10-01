import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { name } = body;
  
  const store = await prismadb.store.create({ data: { name }})

  return NextResponse.json(store);
}
