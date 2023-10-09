'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import SettingsForm from './components/settings-form';

import { AlertModal } from '@/components/modals/alert-modal';
import { toast } from 'react-hot-toast';
import axios from 'axios';

type SettingsIdProps = {
  name: string;
};

export default function Settings() {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [initialData, setInitialData] = useState<SettingsIdProps | null>(null);

  useEffect(
    function () {
      setMounted(false);
      getStore();

      async function getStore() {
        try {
          const response = await axios.get(`/api/stores/${params.storeId}/`);

          //this might need to be changed depending on how the data is sent from the api route
          const data = await response.data;

          setInitialData(data);
        } catch (error: any) {
          router.push(`/${params.storeId}/settings`);
          toast.error(
            'Something went wrong. Store not found. Please try again.',
          );
        } finally {
          setMounted(true);
        }
      }
    },
    [params.storeId, router],
  );

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);

      router.refresh();
      router.push('/');

      toast.success('Store deleted.');
    } catch (error: any) {
      toast.error('Something went wrong. Store not deleted. Please try again.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  if (!mounted) {
    return (
      <Heading
        title="Loading"
        description={'Getting initial store information...'}
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
        type={'store'}
      />

      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences." />

        <Button
          className="px-3 m-0"
          variant="destructive"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <SettingsForm initialData={initialData} />
      <Separator />
    </>
  );
}
