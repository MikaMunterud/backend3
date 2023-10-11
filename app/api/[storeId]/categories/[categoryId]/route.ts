import prismadb from "@/lib/prismadb";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/* -----------DELETE---------------- */

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { categoryId } = params;

    const result = await prismadb.category.delete({
      where: {
        id: categoryId,
      },
    });
    return NextResponse.json({ status: 200, body: { result } });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      const errorMessage = err.message;
      return NextResponse.json({ status: 400, body: { errorMessage } });
    } else {
      return NextResponse.json({ status: 500, body: { err } });
    }
  }
}

/* -----------PATCH---------------- */

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { name } = await req.json();

    const { categoryId } = params;

    const result = await prismadb.category.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof PrismaClientValidationError) {
      const errorMessage = err.message;
      return NextResponse.json({ status: 400, body: { errorMessage } });
    } else {
      return NextResponse.json({ status: 500, body: { err } });
    }
  }
}
