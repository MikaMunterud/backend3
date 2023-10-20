'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import ImageUpload from '@/components/ui/image-upload';
import { useState } from 'react';
import { Billboard } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

// Define the form schema. This will be used to validate the form values.
const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must be at least one character.' })
    .max(50, { message: 'Name must be less than 50 characters.' }),
  img: z.string().min(1, { message: 'At least one image is required.' }),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData: Billboard | null;
}

export function BillboardForm({ initialData }: BillboardFormProps) {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  let defaultValues;

  if (initialData) {
    defaultValues = {
      name: initialData.name,
      img: initialData.img,
    };
  }

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: '',
      img: '',
    },
  });

  //havent had the chance to test this, but should be same to the other error problems we had. So I fixed it the same way. 
  async function onSubmit(values: BillboardFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          values,
        );

        toast.success('Billboard updated.');
        router.push(`/${params.storeId}/billboards`);
      } else {
        const res = await axios.post(`/api/${params.storeId}/billboards`, values);
        if (res.data.status === 500) {
          toast.error('Billboard already exists.');
        } else {
          toast.success('billboard created.');
          router.refresh();
          router.push(`/${params.storeId}/billboards`);
        }
      }

    } catch (error: any) {
      toast.error(
        'Something went wrong. Billboard not updated. Please try again.',
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
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      placeholder="Billboard name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {initialData ? 'Save changes' : 'Create billboard'}
          </Button>
        </form>
      </Form>
    </>
  );
}
