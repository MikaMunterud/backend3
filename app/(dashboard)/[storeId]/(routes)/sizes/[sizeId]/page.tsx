'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

import { Separator } from '@radix-ui/react-dropdown-menu';

import SizeForm from './components/size-form';

import { AlertModal } from '@/components/modals/alert-modal';
import toast from 'react-hot-toast';
import axios from 'axios';

type SizeIdProps = {
  id: string;
  name: string;
  value: string;
};

export default function SizeId() {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [initialData, setInitialData] = useState<SizeIdProps | null>(null);

  const newSize: boolean = params.sizeId === 'new';

  useEffect(
    function () {
      if (!newSize) {
        getSize();
      }

      setMounted(true);

      async function getSize() {
        try {
          const response = await axios.get(
            `/api/${params.storeId}/sizes/${params.sizeId}`,
          );

          //this might need to be changed depending on how the data is sent from the api route
          const data = response.data.body.result;

          setInitialData(data);
        } catch (error: any) {
          router.push(`/${params.storeId}/sizes`);
          toast.error(
            'Something went wrong. Size not found. Please try again.',
          );
        } finally {
          setMounted(true);
        }
      }
    },
    [params.storeId, params.sizeId, newSize, router],
  );

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`);
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success('Size deleted.');
    } catch (error: any) {
      toast.error('Make sure you removed all products using this size first.');
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
          newSize
            ? 'Loading size form....'
            : 'Getting initial size information...'
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
      />

      <div className="flex items-center justify-between">
        <Heading
          title={newSize ? 'Create size' : 'Edit size'}
          description={
            newSize ? 'Add a new size for your store' : 'Edit your size'
          }
        />
        {newSize ? null : (
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

      <SizeForm initialData={initialData} />
    </>
  );
}
