import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

export async function GET(
  request: Request,
  { params }: { params: { storeId: string; orderId: string } },
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

    const { orderId } = params;

    if (!orderId) {
      return NextResponse.json({ error: 'OrderId is required.', status: 400 });
    }

    const order = await prismadb.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) {
      return NextResponse.json({ error: 'No orders were found.', status: 400 });
    }

    const orderItems = await prismadb.orderItem.findMany({
      where: {
        orderId: order.id,
      },
    });

    if (!orderItems) {
      return NextResponse.json({
        error: 'No order items were found.',
        status: 400,
      });
    }

    return NextResponse.json({ order, orderItems }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; orderId: string } },
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

    const { orderId } = params;

    if (!orderId) {
      return NextResponse.json({ error: 'OrderId is required.', status: 400 });
    }

    const updatedOrder = await prismadb.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
      },
    });

    return NextResponse.json({ status: 200, body: { updatedOrder } });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
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
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ error: 'Not authorized', status: 401 });
    }

    const { orderId } = params;

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
