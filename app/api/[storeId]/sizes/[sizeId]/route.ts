import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET() { }

export async function DELETE() { }

export async function PATCH(
    req: Request,
    { params }: { params: { sizeId: string } },
) {
    /*     const { userId } = auth()
    
        if (!userId) {
            return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
        } */

    try {
        const body = await req.json()
        const { sizeId } = params

        const res = await prismadb.size.update({
            where: { id: sizeId },
            data: {
                name: body.name,
                value: body.value
            },
        })
        return NextResponse.json(`${res.name} is now updated`, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }

}
