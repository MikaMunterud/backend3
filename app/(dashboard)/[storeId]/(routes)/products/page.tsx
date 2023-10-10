"use client";

import Heading from "@/components/ui/heading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { ProductColumn, columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

import ApiList from "@/components/ui/api-list";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function Products() {
  const params = useParams();
  const [products, setProducts] = useState<ProductColumn[]>([]);

  useEffect(
    function () {
      async function getProducts() {
        const response = await axios.get(`/api/${params.storeId}/products`);
        const data = await response.data.body.products;

        setProducts(data);
      }
      getProducts();
    },
    [params.storeId]
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${products.length})`}
          description="Manage products for your store"
        />

        <Link href={`/${params.storeId}/products/new`}>
          <Button>
            <Plus className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <Separator />

      <DataTable
        searchKey="name"
        columns={columns}
        data={products}
        route="products"
      />

      <Heading title="API Routes" description="Endpoints for products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
}
