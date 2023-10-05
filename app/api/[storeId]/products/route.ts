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
            category: string;
            price: number;
            isFeatured: boolean;
            isArchived: boolean;
            size: string;
            color: string;
        }

        const { name, img, category, price, isFeatured, isArchived, size, color }: Body = await request.json();
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

        if (!category) {
            return NextResponse.json({ status: 400, body: { err: 'Category is required' } })
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

        if (!size) {
            return NextResponse.json({ status: 400, body: { err: 'Size is required' } })
        }
        
        if (!color) {
            return NextResponse.json({ status: 400, body: { err: 'Color is required' } })
        }

        const result = await prismadb.product.createMany({
            data: {
                name,
                img,
                storeId,
                category,
                price,
                isFeatured,
                isArchived,
                size,
                color

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