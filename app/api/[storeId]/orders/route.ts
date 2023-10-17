import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
    request: Request,
    { params }: { params: { storeId: string } },
) {
    try {

        /*         const { userId } = auth();
        
                if (!userId) {
                    return NextResponse.json({ error: 'Not authorized.' }, { status: 401 });
                } */

        const { storeId } = params;

        if (!storeId) {
            return NextResponse.json({ error: 'StoreId is required.', status: 400 });
        }

        interface Body {
            name: string;
            adress: string;
            email: string;
            phone: number;
            storeId: string;
            orderItems: [{
                orderId: string;
                productId: string;
            }]
        }

        const { name, adress, email, phone, orderItems }: Body = await request.json();

        const result = await prismadb.order.createMany({
            data: {
                name,
                adress,
                email,
                phone,
                storeId,
                orderItems: {
                    create: [
                        { orderId: orderItems[0].orderId },
                        { productId: orderItems[0].productId }
                    ]
                }
            },
        });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error, status: 500 });
    }
}

