'use client';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { Plus } from 'lucide-react';
import { columns } from './components/columns';
import { CategoryColumn } from './components/columns';
import ApiList from '@/components/ui/api-list';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { set } from 'date-fns';
import { Billboard, Category } from '@/types';

export default function Categories() {
  const [categories, setCategories] = useState<CategoryColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(
    function () {
      getCategories();
      async function getCategories() {
        try {
          const response = await axios.get(`/api/${params.storeId}/categories`);
          const data = await response.data;

          if (data.length > 0) {
            /*   const billboards = await axios.get(
              `/api/${params.storeId}/billboards`,
            );
            const billboardData = await billboards.data; */

            //this is just test data, the above should be used when we have billboards
            const billboardData = [
              {
                id: 'billboard1',
                name: 'billboard 1',
                image: 'image',
                storeId: 'storeId',
              },
              {
                id: 'billboard2',
                name: 'billboard 2',
                image: 'image',
                storeId: 'storeId',
              },
            ];

            const formattedCategories = await formatCategories(
              data,
              billboardData,
            );
            setCategories(formattedCategories);
          } else {
            setCategories([]);
          }
        } catch (error) {
          toast.error(
            'Something went wrong. Could not connect to server. Please try again',
          );
        } finally {
          setLoading(false);
        }
      }

      async function formatCategories(
        categories: Category[],
        billboards: Billboard[],
      ) {
        const formattedCategories = categories.map(function (
          category: Category,
        ) {
          return {
            id: category.id,
            name: category.name,
            billboard: billboards.find(function (billboard: Billboard) {
              return billboard.id === category.billboardId;
            })?.name,
          };
        });

        return formattedCategories;
      }
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
        loading={loading}
      />

      <Heading title="API Routes" description="Endpoints for categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
}
