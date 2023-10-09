import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse, NextRequest } from 'next/server';


export async function POST(request: Request,
    { params }: { params: { storeId: string }}) {
    try {
     const { userId } = auth()

        interface Body {
            name: string;
            img: string;
            categoryId: string;
            price: number;
            isFeatured: boolean;
            isArchived: boolean;
            sizeId: string;
            colorId: string;
        }

        const { name, img, categoryId, price, isFeatured, isArchived, sizeId, colorId }: Body = await request.json();
        const { storeId } = params;

        if(!userId) {
            return new NextResponse('Not authorized', { status: 401 })
          }

        if(!storeId) {
            return new NextResponse('storeId is required', { status: 400 }) 
        }

         if (!name) {
            return NextResponse.json({ status: 400, body: { err: 'Name is required' } })
        }

        if (!img) {
            return NextResponse.json({ status: 400, body: { err: 'Image is required' } })
        }

        if (!categoryId) {
            return NextResponse.json({ status: 400, body: { err: 'CategoryId is required' } })
        }

        if (!price) {
            return NextResponse.json({ status: 400, body: { err: 'Price is required' } })
        }

        if (!isFeatured) {
            return NextResponse.json({ status: 400, body: { err: 'isFeautured is required' } })
        }

        if (!isArchived) {
            return NextResponse.json({ status: 400, body: { err: 'isArchived is required' } })
        }

        if (!sizeId) {
            return NextResponse.json({ status: 400, body: { err: 'SizeId is required' } })
        }
        
        if (!colorId) {
            return NextResponse.json({ status: 400, body: { err: 'ColorId is required' } })
        }

        const result = await prismadb.product.createMany({
            data: {
                name,
                img,
                storeId,
                categoryId,
                price,
                isFeatured,
                isArchived,
                sizeId,
                colorId

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