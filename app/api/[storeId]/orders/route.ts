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
      quantity: item.quantity
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

export async function DELETE(
  request: Request,
  { params }: { params: { orderId: string } },
) {
  try {
    /* Add authentication logic if needed */

    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required.', status: 400 });
    }
    const res = await prismadb.orderItem.deleteMany({
      where: {
        orderId,
      },
    });
    // Attempt to delete the order
    const deleteResult = await prismadb.order.delete({
      where: {
        id: orderId,
      },
    });

    if (!deleteResult) {
      return NextResponse.json({ error: 'Order not found.', status: 404 });
    }

    // If the delete operation was successful, you can return a success response
    return NextResponse.json(
      { message: 'Order deleted successfully.' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      const errorMessage = error.message;
      return NextResponse.json({ status: 400, body: { errorMessage } });
    }
    return NextResponse.json({ error, status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const orders = await prismadb.order.findMany();

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  }
}
