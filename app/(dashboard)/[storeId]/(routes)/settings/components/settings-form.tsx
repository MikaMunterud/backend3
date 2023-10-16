'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { toast } from 'react-hot-toast';
import axios from 'axios';

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Store name must be at least 1 characters.',
    })
    .max(20, { message: 'Store name must be at most 50 characters.' }),
});

type SettingsFormValues = z.infer<typeof formSchema>;

interface SettingsFormProps {
  initialData: { name: string } | null;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: '' },
  });

  async function onSubmit(values: SettingsFormValues) {
    try {
      setLoading(true);

      const name = values.name.trim();

      await axios.patch(`/api/stores/${params.storeId}`, { name });

      window.location.reload();
      router.push(`/${params.storeId}/settings`);
      toast.success('Store name updated.');
    } catch (error: any) {
      toast.error(
        'Something went wrong. Store name was not updated. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div className="grid grid-cols-3 gap-8">
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <Button disabled={loading} type="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
}
