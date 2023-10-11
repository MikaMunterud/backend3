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

import prismadb from '@/lib/prismadb';
import axios from 'axios'; // Import Axios

import { ProductForm } from './components/product-form';
import { useEffect, useState } from 'react';

const ProductPage = ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const apiUrl = '/api/products';
  const [productData, setProductData] = useState(null);
  const [categories, setCategories] = useState(null);
  const [colors, setColors] = useState(null);
  const [sizes, setSizes] = useState(null);

  const mockCategories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothing' },
    { id: '3', name: 'Home Decor' },
  ];

  const mockSizes = [
    { id: '1', name: 'Small' },
    { id: '2', name: 'Medium' },
    { id: '3', name: 'Large' },
  ];

  const mockColors = [
    { id: '1', name: 'Red' },
    { id: '2', name: 'Blue' },
    { id: '3', name: 'Green' },
  ];

  const fetchData = async () => {
    try {
      // Fetch product data
      const productResponse = await axios.get(apiUrl);
      setProductData(productResponse.data.result);

      // Fetch categories, colors, and sizes
      const categoriesResponse = await axios.get('/api/categories');
      setCategories(categoriesResponse.data);

      const colorsResponse = await axios.get('/api/colors');
      setColors(colorsResponse.data);

      const sizesResponse = await axios.get('/api/sizes');
      setSizes(sizesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={mockCategories}
          sizes={mockSizes}
          colors={mockColors}
          // categories={categories}
          // colors={colors}
          // sizes={sizes}
          initialData={productData}
        />
      </div>
    </div>
  );
};

export default ProductPage;
