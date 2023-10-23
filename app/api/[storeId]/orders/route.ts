import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

export async function POST(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return NextResponse.json({ error: 'StoreId is required.', status: 400 });
    }

    interface Body {
      name: string;
      address: string;
      email: string;
      phone: string;
      totalPrice: number;
      storeId: string;
      orderItems: {
        productId: string;
        quantity: number;
      }[];
    }

    const { name, address, email, phone, totalPrice, orderItems }: Body =
      await request.json();

    const result = await prismadb.order.create({
      data: {
        name,
        address,
        email,
        phone,
        totalPrice,
        storeId,
      },
    });

    if (!result) {
      return NextResponse.json({
        error: 'Order could not be created.',
        status: 400,
      });
    }

    const orderItemsData = orderItems.map((item) => ({
      orderId: result.id,
      productId: item.productId,
      quantity: item.quantity,
    }));

    const res = await prismadb.orderItem.createMany({
      data: orderItemsData,
    });

    return NextResponse.json({ res, result }, { status: 201 });
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const errorMessage = error.message;
      return NextResponse.json({ status: 400, body: { errorMessage } });
    }
    return NextResponse.json({ error, status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authorized', status: 401 });
    }

    const { storeId } = params;

    if (!storeId) {
      return NextResponse.json({ error: 'StoreId is required.', status: 400 });
    }

    const orders = await prismadb.order.findMany({ where: { storeId } });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
