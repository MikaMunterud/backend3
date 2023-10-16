'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import SizeForm from './components/size-form';

import { AlertModal } from '@/components/modals/alert-modal';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Size } from '@/types';

export default function SizeId() {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [initialData, setInitialData] = useState<Size | null>(null);

  const newSize: boolean = params.sizeId === 'new';

  useEffect(
    function () {
      getSize();

      async function getSize() {
        try {
          if (!newSize) {
            const response = await axios.get(
              `/api/${params.storeId}/sizes/${params.sizeId}`,
            );

            const data = response.data;

            setInitialData(data);
          } else {
            setInitialData(null);
          }
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
        type={'size'}
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
