'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

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

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Size } from '@/types';

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Size name must be at least 1 character.' })
    .max(20, { message: 'Size name must be at most 20 characters.' }),
  value: z
    .string()
    .min(1, { message: 'Size value must be at least 1 character.' })
    .max(20, { message: 'Size value must be at most 20 characters.' }),
});

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeFormProps {
  initialData: Size | null;
}

export default function SizeForm({ initialData }: SizeFormProps) {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  let defaultValues;

  if (initialData) {
    defaultValues = {
      name: initialData.name,
      value: initialData.value,
    };
  }

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: '',
      value: '',
    },
  });

  async function onSubmit(data: SizeFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/sizes/${params.sizeId}`,
          data,
        );

        toast.success('Size updated.');
        router.push(`/${params.storeId}/sizes`);
      } else {
        const res = await axios.post(`/api/${params.storeId}/sizes`, data);
        if (res.data.status === 500) {
          toast.error('Size already exists.');
        } else {
          toast.success('Size created.');
          router.refresh();
          router.push(`/${params.storeId}/sizes`);
        }
      }

    } catch (error: any) {
      toast.error(
        'Something went wrong. Size not updated. Please try again.',
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
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {initialData ? 'Save changes' : 'Create size'}
          </Button>
        </form>
      </Form>
    </>
  );
}
