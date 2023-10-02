import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
  const body = await req.json();
  const { name } = body;
  
  const resp = await prismadb.store.create({ data: { name }})

    return NextResponse.json(resp);
  } catch (error) {
    return NextResponse.json({error})
  }
}
