'use client';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { OrderColumn, columns } from './components/columns';
import { DataTable } from '@/components/ui/data-table';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Orders() {
  const [orders, setOrders] = useState<OrderColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(
    function () {
      async function getSizes() {
        try {
          const response = await axios.get(`/api/${params.storeId}/orders`);

          //this might need to be changed depending on how the data is sent from the api route
          const data = await response.data.body.result;

          setOrders(data);
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
        searchKey="products"
        columns={columns}
        data={orders}
        route="orders"
        loading={loading}
      />
    </>
  );
}
