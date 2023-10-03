import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { name } = body;

    const storeId = parseInt(params.storeId, 10);

    if (!name) {
      return new Response("Missing name", { status: 400 });
    }

    if (!params.storeId) {
      return new Response("Missing storeId", { status: 400 });
    }

    const updatedStore = await prismadb.store.updateMany({
      where: {
        id: storeId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.log("[PATCH in stores]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// DELETE

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const storeId = parseInt(params.storeId, 10);

    if (!params.storeId) {
      return new Response("Missing storeId", { status: 400 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: storeId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[DELETE in stores]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
