'use client';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { OrderColumn, columns } from './components/columns';
import { DataTable } from '@/components/ui/data-table';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Order } from '@/types';
import { format } from 'date-fns';

import { ApiAlert } from '@/components/ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';

export default function Orders() {
  const [orders, setOrders] = useState<OrderColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const origin = useOrigin();

  useEffect(
    function () {
      async function getSizes() {
        try {
          const response = await axios.get(`/api/${params.storeId}/orders`);

          //this might need to be changed depending on how the data is sent from the api route
          const data = await response.data;

          if (data.length > 0) {
            const formattedOrders = data.map(function (order: Order) {
              return {
                id: order.id,
                name: order.name,
                phone: order.phone,
                address: order.address,
                totalPrice: `${Number(order.totalPrice).toFixed(2)} kr`,
                isPaid: order.isPaid,
                created: format(new Date(order.created), 'do MMM yyyy'),
                updated: format(new Date(order.updated), 'do MMM yyyy'),
              };
            });

            setOrders(formattedOrders);
          } else {
            setOrders([]);
          }
        } catch (error) {
          toast.error(
            'Something went wrong. Could not connect to server. Please try again',
          );
        } finally {
          setLoading(false);
        }
      }
      getSizes();
    },
    [params.storeId],
  );

  return (
    <>
      <Heading
        title={`Orders (${orders.length})`}
        description={'Manage orders för your store'}
      />

      <Separator />

      <DataTable
        searchKey="name"
        columns={columns}
        data={orders}
        route="orders"
        loading={loading}
      />

      <Heading title="API Routes" description="Endpoints for orders" />
      <Separator />
      <ApiAlert
        title="POST"
        description={`${origin}/api/${params.storeId}/orders`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${origin}/api/${params.storeId}/orders`}
        variant="admin"
      />
      <ApiAlert
        title="GET"
        description={`${origin}/api/${params.storeId}/orders/{orderId}`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${origin}/api/${params.storeId}/orders/{orderId}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${origin}/api/${params.storeId}/orders/{orderId}`}
        variant="admin"
      />
    </>
  );
}
