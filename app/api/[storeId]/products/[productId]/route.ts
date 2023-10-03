import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { number } from 'zod';

export async function GET(req: Request, { params }: { params: {productId: string }}) {
  try {
    const { userId } = auth()

    if(userId) {
      return new NextResponse('Not authorized', { status: 401 })
    }

    if(!params.productId) {
      return new NextResponse('productId is required', { status: 400 })
    }
    
    const result = await prismadb.product.findUnique({ where: { id: params.productId}})

    if(result === null){
      return new NextResponse('No product found', { status: 404 })
    }
    return NextResponse.json(result, { status: 200 })

  } catch (error) {
    return NextResponse.json({error}, {status: 500})
  }
}

export async function DELETE(req: Request, { params }: { params: {productId: string}}) {
  id: number;
  const result = await prismadb.product.delete({ where: { id: params.productId}})
}

export async function PATCH() {}
