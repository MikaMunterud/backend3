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

    if (!colorId) {
      return NextResponse.json({
        error: 'ColorId is required.',
        status: 400,
      });
    }

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
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authorized', status: 401 });
    }

    const { colorId } = params;

    if (!colorId) {
      return NextResponse.json({
        error: 'ColorId is required.',
        status: 400,
      });
    }

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
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authorized', status: 401 });
    }

    const { colorId } = params;

    if (!colorId) {
      return NextResponse.json({
        error: 'ColorId is required.',
        status: 400,
      });
    }

    interface Body {
      name: string;
      value: string;
    }

    const { name, value }: Body = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required and has to be a string' },
        { status: 400 },
      );
    }

    if (!value) {
      return NextResponse.json(
        { error: 'Value is required and has to be a string' },
        { status: 400 },
      );
    }

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
