import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } },
) {
  try {
    if (!params.billboardId) {
      return new NextResponse('BillboardId is required', { status: 400 });
    }

    const result = await prismadb.billboard.findUnique({
      where: { id: params.billboardId },
    });

    if (result === null) {
      return new NextResponse('No product found', { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Not authorized', { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse('BillboardId is required', { status: 400 });
    }

    const result = await prismadb.billboard.delete({
      where: { id: params.billboardId },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { billboardId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Not authorized', { status: 401 });
    }

    if (!params.billboardId) {
      return new NextResponse('BillboardId is required', { status: 400 });
    }

    interface Body {
      name: string;
      image: string;
    }

    const { name, image }: Body = await request.json();

    const result = await prismadb.billboard.update({
      where: { id: params.billboardId },
      data: {
        name,
        image,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
