'use client';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

import { BillboardColumn, columns } from './components/columns';
import { DataTable } from '@/components/ui/data-table';

import ApiList from '@/components/ui/api-list';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function Billboards() {
  const [billboards, setBillboards] = useState<BillboardColumn[]>([]);
  const params = useParams();

  useEffect(
    function () {
      async function getSizes() {
        const response = await axios.get(`/api/${params.storeId}/billboards`);

        //this might need to be changed depending on how the data is sent from the api route
        const data = await response.data.body.result;

        setBillboards(data);
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

        <Button>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Separator />

      <DataTable
        searchKey="title"
        columns={columns}
        data={billboards}
        route="billboards"
      />

      <Heading title="API Routes" description="Endpoints for billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
}
