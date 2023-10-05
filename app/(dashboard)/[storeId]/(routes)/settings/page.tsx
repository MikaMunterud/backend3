'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash } from 'lucide-react';
import { SettingsForm } from './components/settings-form';
import Heading from '@/components/ui/heading';
import { redirect, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AlertModal } from '@/components/modals/alert-modal';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function Settings() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      window.location.reload();
      window.location.href = '/';

      toast.success('Store deleted.');
    } catch (error: any) {
      toast.error('Something went wrong. Store not deleted. Please try again.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
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
      <SettingsForm />
      <Separator />
    </>
  );
}
