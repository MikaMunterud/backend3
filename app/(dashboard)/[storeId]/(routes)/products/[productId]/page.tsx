'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import { AlertModal } from '@/components/modals/alert-modal';
import toast from 'react-hot-toast';
import axios from 'axios';

import { ProductForm } from './components/product-form';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [productData, setProductData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const newProduct = params.productId === 'new';

  useEffect(
    function () {
      fetchData();

      async function fetchData() {
        try {
          // Fetch product data
          if (!newProduct) {
            const productResponse = await axios.get(
              `/api/${params.storeId}/products/${params.productId}`,
            );
            const product = await productResponse.data;
            setProductData(product);
          } else {
            setProductData(null);
          }

          // Fetch categories, colors, and sizes
          const categoriesResponse = await axios.get(
            `/api/${params.storeId}/categories`,
          );
          const categories = await categoriesResponse.data;
          setCategories(categories);

          const colorsResponse = await axios.get(
            `/api/${params.storeId}/colors`,
          );
          const colors = await colorsResponse.data;
          setColors(colors);

          const sizesResponse = await axios.get(`/api/${params.storeId}/sizes`);
          const sizes = await sizesResponse.data;
          setSizes(sizes);
        } catch (error) {
          router.push(`/${params.storeId}/products`);
          toast.error(
            'Something went wrong. Product not found. Please try again.',
          );
        } finally {
          setMounted(true);
        }
      }
    },
    [params.storeId, params.productId, newProduct, router],
  );

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success('Product deleted.');
    } catch (error: any) {
      toast.error(
        'Something went wrong. Product not deleted. Please try again.',
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  if (!mounted) {
    return (
      <Heading
        title="Loading"
        description={
          newProduct
            ? 'Loading product form....'
            : 'Getting initial product information...'
        }
      />
    );
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        type={'product'}
      />

      <div className="flex items-center justify-between">
        <Heading
          title={newProduct ? 'Create product' : 'Edit product'}
          description={
            newProduct
              ? 'Add a new product for your store'
              : 'Edit your product'
          }
        />
        {newProduct ? null : (
          <Button
            disabled={loading}
            variant="destructive"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <ProductForm
        categories={categories}
        colors={colors}
        sizes={sizes}
        initialData={productData}
      />
    </>
  );
}
