'use client';

import Heading from '@/components/ui/heading';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

import { ColorColumn, columns } from './components/columns';
import { DataTable } from '@/components/ui/data-table';

import ApiList from '@/components/ui/api-list';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Colors() {
  const [colors, setColors] = useState<ColorColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(
    function () {
      async function getSizes() {
        try {
          const response = await axios.get(`/api/${params.storeId}/colors`);

          const data = await response.data;

          setColors(data);
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
          title={`Colors (${colors.length})`}
          description="Manage colors for your store"
        />

        <Link href={`/${params.storeId}/colors/new`}>
          <Button>
            <Plus className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      <Separator />

      <DataTable
        searchKey="name"
        columns={columns}
        data={colors}
        route="colors"
        loading={loading}
      />

      <Heading title="API Routes" description="Endpoints for colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
}
