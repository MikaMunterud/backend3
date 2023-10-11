import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } },
) {
  try {
    const { sizeId } = params;

    const size = await prismadb.size.findUnique({
      where: {
        id: sizeId,
      },
    });

    return NextResponse.json(size, { status: 200 });
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      const errorMessage = err.message;

      return NextResponse.json({ status: 400, body: { errorMessage } });
    } else {
      return NextResponse.json({ status: 500, body: { err } });
    }
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string } },
) {
  /*     const { userId } = auth()
    
        if (!userId) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
        } */

  try {
    const body = await req.json();
    const { sizeId } = params;

    const res = await prismadb.size.update({
      where: { id: sizeId },
      data: {
        name: body.name,
        value: body.value,
      },
    });
    return NextResponse.json(`${res.name} is now updated`, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string } },
) {
  try {
    /*         const { userId } = auth()
        
                if (!userId) {
                    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
                } */

    if (!params.sizeId) {
      return new NextResponse('sizeId required', { status: 400 });
    }

    const { sizeId } = params;

    const res = await prismadb.size.delete({
      where: { id: sizeId },
    });
    return NextResponse.json(`${res.name} is now deleted`, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
