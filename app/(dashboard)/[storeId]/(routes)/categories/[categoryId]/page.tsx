'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import CategoryForm from './components/category-form';

import { AlertModal } from '@/components/modals/alert-modal';
import { toast } from 'react-hot-toast';
import axios from 'axios';

type CategoryIdProps = {
  id: string;
  name: string;
  billboardId: string;
};

type BillboardProps = {
  id: string;
  name: string;
}[];

export default function CategoryId() {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [initialData, setInitialData] = useState<CategoryIdProps | null>(null);
  const [billboards, setBillboards] = useState<BillboardProps | []>([]);

  const newCategory: boolean = params.categoryId === 'new';

  useEffect(
    function () {
      getCategory();

      async function getCategory() {
        try {
          if (!newCategory) {
            const response = await axios.get(
              `/api/${params.storeId}/categories/${params.categoryId}`,
            );

            const data = response.data;

            setInitialData(data);
          } else {
            setInitialData(null);
          }
          getBillboards();
        } catch (error: any) {
          router.push(`/${params.storeId}/categories`);
          toast.error(
            'Something went wrong. Category not found. Please try again.',
          );
        }
      }

      async function getBillboards() {
        try {
          // const response = await axios.get(`/api/${params.storeId}/billboards`);

          //this might need to be changed depending on how the data is sent from the api route
          // const data = response.data;
          const data = [
            { id: 'billboard1', name: 'billboard 1' },
            { id: 'billboard2', name: 'billboard 2' },
          ];

          setBillboards(data);
        } catch (error: any) {
          setBillboards([]);
        } finally {
          setMounted(true);
        }
      }
    },
    [params.storeId, params.categoryId, newCategory, router],
  );

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`,
      );
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success('Category deleted.');
    } catch (error: any) {
      toast.error(
        'Make sure you removed all products using this category first.',
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
          newCategory
            ? 'Loading category form....'
            : 'Getting initial category information...'
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
        type={'category'}
      />

      <div className="flex items-center justify-between">
        <Heading
          title={newCategory ? 'Create category' : 'Edit category'}
          description={
            newCategory
              ? 'Add a new category for your store'
              : 'Edit your category'
          }
        />
        {newCategory ? null : (
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

      <CategoryForm initialData={initialData} billboards={billboards} />
    </>
  );
}
