import prismadb from '@/lib/prismadb';
import { Prisma } from '@prisma/client';
//import { auth } from '@clerk/nextjs';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const { name, img } = await request.json();

        /*         if (!name) {
                    return NextResponse.json({ status: 400, body: { err: 'Name is required' } })
                } else if (!img) {
                    return NextResponse.json({ status: 400, body: { err: 'Image is required' } })
                } */

        const result = await prismadb.product.createMany({
            data: {
                name,
                img,
            }
        });
        return NextResponse.json({ status: 201, body: { result } })
    } catch (err) {
        return NextResponse.json({ status: 500, body: { err } })
    }
}

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const result = await prismadb.product.findMany();
        return NextResponse.json({ status: 200, body: { result } })
    } catch (err) {
        return NextResponse.json({ status: 500, body: { err } })
    }
}