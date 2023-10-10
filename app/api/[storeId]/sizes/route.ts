import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { string } from 'zod';

export async function POST(req: Request,
  { params }: { params: { storeId: string }}) {
  try {
    //const { userId } = auth()
    const { storeId } = params;
    interface Body {
      name: string;
      value: string;
    }

    const { name, value }: Body = await req.json();

    // if (!userId) {
    //   return NextResponse.json({ body: {error: 'Not authorized'}, status: 401 })
    // }
    if (!name) {
      return NextResponse.json( {error: 'Name is required and has to be a string'}, {status: 400})
    }
    if (!value ) {
      return NextResponse.json({error: 'Value is required and has to be a string'}, {status: 400})
    }
    if (!storeId) {
      return NextResponse.json({error: 'StoreId is required'}, {status: 400})
    }

    const result = await prismadb.size.create(
      { data: { 
          name,
          value,
          storeId }});
    
    return NextResponse.json({body: `${name} was added`, status: 201 });
  } catch (error) {
    return NextResponse.json({error}, {status: 500});
  }
  


}

export async function GET() {}
