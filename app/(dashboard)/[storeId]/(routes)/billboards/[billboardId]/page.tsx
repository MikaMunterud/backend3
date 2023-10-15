'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import { AlertModal } from '@/components/modals/alert-modal';
import toast from 'react-hot-toast';
import axios from 'axios';
import { BillboardForm } from './components/billboard-form';
import { Billboard } from '@/types';

export default function BillboardId() {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [initialData, setInitialData] = useState<Billboard | null>(null);

  const newBillboard: boolean = params.billboardId === 'new';

  useEffect(
    function () {
      getBillboard();

      async function getBillboard() {
        try {
          if (!newBillboard) {
            const response = await axios.get(
              `/api/${params.storeId}/billboards/${params.billboardId}`,
            );

            const data = response.data;

            setInitialData(data);
          } else {
            setInitialData(null);
          }
        } catch (error: any) {
          router.push(`/${params.storeId}/billboards`);
          toast.error(
            'Something went wrong. Billboard not found. Please try again.',
          );
        } finally {
          setMounted(true);
        }
      }
    },
    [params.storeId, params.billboardId, newBillboard, router],
  );

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${params.sizeId}`);
      router.refresh();
      router.push(`/${params.storeId}/sizes`);
      toast.success('Billboard deleted.');
    } catch (error: any) {
      toast.error(
        'Make sure you removed all categories using this billboard first.',
      );
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
          newBillboard
            ? 'Loading billboard form....'
            : 'Getting initial billboard information...'
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
        type={'billboard'}
      />

      <div className="flex items-center justify-between">
        <Heading
          title={newBillboard ? 'Create billboard' : 'Edit billboard'}
          description={
            newBillboard
              ? 'Add a new billboard for your store'
              : 'Edit your billboard'
          }
        />
        {newBillboard ? null : (
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

      <BillboardForm initialData={initialData} />
    </>
  );
}
