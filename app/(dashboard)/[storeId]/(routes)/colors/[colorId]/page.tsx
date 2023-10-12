'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import ColorForm from './components/color-form';

import { AlertModal } from '@/components/modals/alert-modal';
import toast from 'react-hot-toast';
import axios from 'axios';

type ColorIdProps = {
  id: string;
  name: string;
  value: string;
};

export default function ColorId() {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [initialData, setInitialData] = useState<ColorIdProps | null>(null);

  const newColor: boolean = params.colorId === 'new';

  useEffect(
    function () {
      getColor();

      async function getColor() {
        try {
          if (!newColor) {
            const response = await axios.get(
              `/api/${params.storeId}/colors/${params.colorId}`,
            );

            const data = response.data;

            setInitialData(data);
          } else {
            setInitialData(null);
          }
        } catch (error: any) {
          router.push(`/${params.storeId}/colors`);
          toast.error(
            'Something went wrong. Category not found. Please try again.',
          );
        } finally {
          setMounted(true);
        }
      }
    },
    [params.storeId, params.colorId, newColor, router],
  );

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success('Color deleted.');
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
          newColor
            ? 'Loading color form....'
            : 'Getting initial color information...'
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
        type={'color'}
      />

      <div className="flex items-center justify-between">
        <Heading
          title={newColor ? 'Create color' : 'Edit color'}
          description={
            newColor ? 'Add a new color for your store' : 'Edit your color'
          }
        />
        {newColor ? null : (
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

      <ColorForm initialData={initialData} />
    </>
  );
}
