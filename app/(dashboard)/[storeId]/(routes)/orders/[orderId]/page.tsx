'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { Order, OrderItem, Product } from '@/types';
import { ProductColumn, columns } from './components/columns';
import { Button } from '@/components/ui/button';
import { PiggyBank } from 'lucide-react';

export default function Orders() {
  const [orders, setOrders] = useState<ProductColumn[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<Order | null>();
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          `/api/${params.storeId}/orders/${params.orderId}`,
        );
        const data = await response.data;

        if (data.orderItems.length > 0) {
          const responseProduct = await axios.get(
            `/api/${params.storeId}/products`,
          );
          const dataProduct = await responseProduct.data;

          const formattedOrders = await formatOrders(data, dataProduct);
          setOrders(formattedOrders);
          setOrderData(data.order);
        } else {
          setOrderData(null);
          setOrders([]);
        }
      } catch (error) {
        toast.error(
          'Something went wrong. Could not connect to server. Please try again.',
        );
      } finally {
        setMounted(true);
      }
    }

    async function formatOrders(
      data: { order: Order; orderItems: OrderItem[] },
      dataProduct: Product[],
    ) {
      const formattedOrders = data.orderItems.map((item) => {
        const product = dataProduct.filter(function (product) {
          return product.id === item.productId;
        });

        const productAmount = (
          item.quantity * Number(product[0].price)
        ).toFixed(2);

        return {
          price: product[0].price.toFixed(2),
          name: product[0].name,
          quantity: item.quantity,
          totalPrice: `${productAmount} kr`,
        };
      });
      return formattedOrders;
    }

    fetchOrders();
  }, [params.storeId, params.orderId]);

  const updatePrice = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `/api/${params.storeId}/orders/${params.orderId}`,
      );

      if (response.status === 200) {
        toast.success('Order marked as paid');
        router.push(`/${params.storeId}/orders`);
      } else {
        toast.error(
          'Something went wrong. Could not update order. Please try again.',
        );
      }
    } catch (error) {
      toast.error(
        'Something went wrong. Could not update order. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <Heading
        title="Loading"
        description={'Getting initial order information...'}
      />
    );
  }

  if (!orderData) {
    return (
      <>
        <Heading title={`Order overview`} description="Update your order" />
        <Separator />
        <h2 className="text-xl font-bold">
          Order not found. Please try again.
        </h2>
      </>
    );
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Order overview`} description="Update your order" />
        {orderData.isPaid ? null : (
          <Button disabled={loading} onClick={() => updatePrice()}>
            Mark as paid
            <PiggyBank className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>

      <Separator />
      <div className="grid grid-cols-3 my-4">
        <div className="px-4 sm:p-6 col-start-1 col-span-1 row-start-1">
          <h2 className="text-xl font-bold">This order will be shipped to:</h2>
          <p>{orderData.name}</p>
          <p>{orderData.address}</p>
        </div>

        <div className="px-4 sm:p-6 col-start-3 col-span-1 row-start-1">
          <h2 className="text-xl font-bold ">Contact information:</h2>
          <p>{orderData.email}</p>
          <p>{orderData.phone}</p>
        </div>

        <div className="px-4 sm:p-6 col-start-3 col-span-2 row-start-2">
          <h2 className="text-xl font-bold">Total price:</h2>
          <p>{`${Number(orderData.totalPrice).toFixed(2)} kr`}</p>
        </div>

        <div className="px-4 sm:p-6 col-start-1 col-span-2 row-start-2">
          <h2 className="text-xl font-bold">Order number:</h2>
          <p>{orderData.id}</p>
        </div>
      </div>

      <Separator />
      <DataTable
        searchKey="name"
        columns={columns}
        data={orders}
        route="orders"
        loading={loading}
      />

      <Separator />
    </>
  );
}
