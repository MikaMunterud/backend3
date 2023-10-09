'use client';

import Heading from '@/components/ui/heading';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

import { CategoryColumn, columns } from './components/columns';
import { DataTable } from '@/components/ui/data-table';

import ApiList from '@/components/ui/api-list';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState<CategoryColumn[]>([]);
  const params = useParams();

  useEffect(
    function () {
      async function getSizes() {
        const response = await axios.get(`/api/${params.storeId}/categories`);

        //this might need to be changed depending on how the data is sent from the api route
        const data = await response.data.body.result;

        setCategories(data);
      }
      getSizes();
    },
    [params.storeId],
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
