import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET() { }

export async function DELETE(
    req: Request,
    { params }: { params: { sizeId: string } },
) {
    try {
        /*         const { userId } = auth()
        
                if (!userId) {
                    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
                } */

        if (!params.sizeId) {
            return new NextResponse('sizeId required', { status: 400 });
        }

        const { sizeId } = params;

        const res = await prismadb.size.delete({
            where: { id: sizeId },
        })
        return NextResponse.json(`${res.name} is now deleted`, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })

    }
}

export async function PATCH() { }
