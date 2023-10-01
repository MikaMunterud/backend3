import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextApiRequest, response: NextApiResponse) {

    const result = await prisma.test.createMany({
        data: {
            name: "test1"
        }
    });
    return NextResponse.json(result)

}
