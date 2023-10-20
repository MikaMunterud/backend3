import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function GET(
  request: Request,
  { params }: { params: { storeId: string; orderId: string } }
){
  try {
    const { storeId } = params;

    if (!storeId) {
      return NextResponse.json({ error: "StoreId is required.", status: 400 });
    }

    const { orderId } = params;

    if (!orderId) {
      return NextResponse.json({ error: "OrderId is required.", status: 400 });
    }

    const orders = await prismadb.order.findMany({
      where: {
        id: orderId
      }
    })

    if (orders.length === 0){
      return NextResponse.json({ error: "No orders were found.", status: 400 });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error){
    return NextResponse.json(error, { status: 500 });
  }
}


export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; orderId: string } }
) {
  try {
    const { storeId } = params;

    if (!storeId) {
      return NextResponse.json({ error: "StoreId is required.", status: 400 });
    }

    const { orderId } = params;

    if (!orderId) {
      return NextResponse.json({ error: "OrderId is required.", status: 400 });
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
