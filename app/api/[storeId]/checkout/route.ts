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
            phone: number;//int??
            storeId: string;
        }

        const { name, adress, email, phone }: Body = await request.json();

        const result = await prismadb.order.create({
            data: {
                name,
                adress,
                email,
                phone,
                storeId
            },
        });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error, status: 500 });
    }
}

