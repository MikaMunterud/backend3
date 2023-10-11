"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import { columns } from "./components/columns";
import { CategoryColumn } from "./components/columns";
import ApiList from "@/components/ui/api-list";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState<CategoryColumn[]>([]);
  const params = useParams();

  useEffect(
    function () {
      async function getCategories() {
        const response = await axios.get(`/api/${params.storeId}/categories`);

        const data = await response.data.body.categories;

        setCategories(data);
      }
      getCategories();
    },
    [params.storeId]
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${categories.length})`}
          description="Manage categories for your store"
        />

        <Link href={`/${params.storeId}/categories/new`}>
          <Button>
            <Plus className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <Separator />

      <DataTable
        searchKey="name"
        columns={columns}
        data={categories}
        route="categories"
      />

      <Heading title="API Routes" description="Endpoints for categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
}
