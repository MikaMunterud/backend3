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
import { useParams } from 'next/navigation';
import Heading from '@/components/ui/heading';

const ProductPage = () => {
  const apiUrl = '/api/products';
  const [productData, setProductData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [mounted, setMounted] = useState(false);
  const params = useParams();

  const newProduct = params.productId === 'new';

  useEffect(() => {
    fetchData();

    async function fetchData() {
      try {
        // Fetch product data
        const productResponse = await axios.get(apiUrl);
        const product = await productResponse.data;
        setProductData(product);

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
  }, [params.storeId]);

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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={productData}
        />
      </div>
    </div>
  );
};

export default ProductPage;
