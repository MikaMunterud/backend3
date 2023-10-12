// import prismadb from '@/lib/prismadb';

// import { ProductForm } from './components/product-form';

// const ProductPage = async ({
//   params,
// }: {
//   params: { productId: string; storeId: string };
// }) => {
//   const product = await prismadb.product.findUnique({
//     where: {
//       id: params.productId,
//     },
//     include: {
//       images: true,
//     },
//   });

//   const categoriesData = await prismadb.category.findMany({
//     where: {
//       storeId: params.storeId,
//     },
//   });

//   const categories = categoriesData.map(({ id, name }) => ({ id, name }));

//   const sizes = await prismadb.size.findMany({
//     where: {
//       storeId: params.storeId,
//     },
//   });

//   const colors = await prismadb.color.findMany({
//     where: {
//       storeId: params.storeId,
//     },
//   });

//   return (
//     <div className="flex-col">
//       <div className="flex-1 space-y-4 p-8 pt-6">
//         <ProductForm
//           categories={categories}
//           colors={colors}
//           sizes={sizes}
//           initialData={product}
//         />
//       </div>
//     </div>
//   );
// };

// export default ProductPage;

// ========================
'use client';

import axios from 'axios'; // Import Axios

import { ProductForm } from './components/product-form';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Heading from '@/components/ui/heading';
import { AlertModal } from '@/components/modals/alert-modal';

import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Separator } from '@/components/ui/separator';

const ProductPage = () => {
  const [productData, setProductData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const newProduct = params.productId === 'new';

  useEffect(() => {
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

        const colorsResponse = await axios.get(`/api/${params.storeId}/colors`);
        const colors = await colorsResponse.data;
        setColors(colors);

        const sizesResponse = await axios.get(`/api/${params.storeId}/sizes`);
        const sizes = await sizesResponse.data.body.result;
        setSizes(sizes);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setMounted(true);
      }
    }
  }, [params.storeId, params.productId, newProduct]);

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
};

export default ProductPage;
