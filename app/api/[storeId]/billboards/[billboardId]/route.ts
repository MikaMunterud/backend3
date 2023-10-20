import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } },
) {
  try {
    const { billboardId } = params;

    if (!billboardId) {
      return NextResponse.json({
        error: 'BillboardId is required',
        status: 400,
      });
    }

    const result = await prismadb.billboard.findUnique({
      where: { id: params.billboardId },
    });

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
      return NextResponse.json({ error: 'Not authorized', status: 401 });
    }

    const { billboardId } = params;

    if (!billboardId) {
      return NextResponse.json({
        error: 'BillboardId is required',
        status: 400,
      });
    }

    const result = await prismadb.billboard.delete({
      where: { id: billboardId },
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
      return NextResponse.json({ error: 'Not authorized', status: 401 });
    }

    const { billboardId } = params;

    if (!billboardId) {
      return NextResponse.json({
        error: 'BillboardId is required',
        status: 400,
      });
    }

    interface Body {
      name: string;
      img: string;
    }

    const { name, img }: Body = await request.json();

    if (!name) {
      return NextResponse.json({
        error: 'Name is required and has to be a string',
        status: 400,
      });
    }

    if (!img) {
      return NextResponse.json({ error: 'Image is required.', status: 400 });
    }

    const result = await prismadb.billboard.update({
      where: { id: billboardId },
      data: {
        name,
        img,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.log(error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error }, { status: 409 });
    } else {
      return NextResponse.json({ error }, { status: 500 });
    }
  }
}
