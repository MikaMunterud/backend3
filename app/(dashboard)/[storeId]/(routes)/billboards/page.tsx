'use client';

import Heading from '@/components/ui/heading';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

import { BillboardColumn, columns } from './components/columns';
import { DataTable } from '@/components/ui/data-table';

import ApiList from '@/components/ui/api-list';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Billboards() {
  const [billboards, setBillboards] = useState<BillboardColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(
    function () {
      async function getSizes() {
        try {
          const response = await axios.get(`/api/${params.storeId}/billboards`);

          const data = await response.data;

          setBillboards(data);
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
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${billboards.length})`}
          description="Manage billboards for your store"
        />

        <Link href={`/${params.storeId}/billboards/new`}>
          <Button>
            <Plus className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <Separator />

      <DataTable
        searchKey="name"
        columns={columns}
        data={billboards}
        route="billboards"
        loading={loading}
      />

      <Heading title="API Routes" description="Endpoints for billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
}
