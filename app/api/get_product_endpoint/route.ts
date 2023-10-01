import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function get_product_endpoint() {
    const res = await prisma.test.findMany();
    console.log(res);
}
get_product_endpoint();
