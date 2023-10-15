'use client';

import Heading from '@/components/ui/heading';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

import { ProductColumn, columns } from './components/columns';
import { DataTable } from '@/components/ui/data-table';

import ApiList from '@/components/ui/api-list';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { Category, Product, Color, Size } from '@/types';

export default function Products() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductColumn[]>([]);

  useEffect(
    function () {
      getProducts();

      async function getProducts() {
        try {
          const response = await axios.get(`/api/${params.storeId}/products`);
          const data = await response.data;

          if (data.length > 0) {
            const categories = await axios.get(
              `/api/${params.storeId}/categories`,
            );
            const categoriesData = await categories.data;

            const sizes = await axios.get(`/api/${params.storeId}/sizes`);
            const sizesData = await sizes.data.body.result;

            const colors = await axios.get(`/api/${params.storeId}/colors`);
            const colorsData = await colors.data;

            const formattedProducts = await formatProducts(
              data,
              categoriesData,
              sizesData,
              colorsData,
            );

            setProducts(formattedProducts);
          } else {
            setProducts([]);
          }
        } catch (error) {
          toast.error(
            'Something went wrong. Could not connect to server. Please try again',
          );
        } finally {
          setLoading(false);
        }
      }
      async function formatProducts(
        data: Product[],
        categories: Category[],
        sizes: Size[],
        colors: Color[],
      ) {
        const formattedProducts = data.map(function (product: Product) {
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            category: categories.find(function (category: Category) {
              return category.id === product.categoryId;
            })?.name,
            size: sizes.find(function (size: Size) {
              return size.id === product.sizeId;
            })?.name,

            color: colors.find(function (color: Color) {
              return color.id === product.colorId;
            })?.name,
            colorValue: colors.find(function (color: Color) {
              return color.id === product.colorId;
            })?.value,
            isFeatured: product.isFeatured,
            isArchived: product.isArchived,
            created: format(new Date(product.created), 'do MMM yyyy'),
          };
        });

        return formattedProducts;
      }
    },
    [params.storeId],
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
        loading={loading}
      />

      <Heading title="API Routes" description="Endpoints for products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
}
