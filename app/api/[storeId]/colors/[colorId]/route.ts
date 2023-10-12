import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { colorId: string } },
) {
  try {
    const { colorId } = params;

    const color = await prismadb.color.findUnique({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json(color, { status: 200 });
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      const errorMessage = err.message;

      return NextResponse.json({ status: 400, body: { errorMessage } });
    } else {
      return NextResponse.json({ status: 500, body: { err } });
    }
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { colorId: string } },
) {
  try {
    const { colorId } = params;

    const result = await prismadb.color.delete({
      where: {
        id: colorId,
      },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      const errorMessage = err.message;
      return NextResponse.json(errorMessage, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { colorId: string } },
) {
  try {
    const { name, value } = await request.json();

    const { colorId } = params;

    const result = await prismadb.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      const errorMessage = err.message;
      return NextResponse.json(errorMessage, { status: 400 });
    } else {
      return NextResponse.json(err, { status: 500 });
    }
  }
}
