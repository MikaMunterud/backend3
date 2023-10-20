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
import { Color } from '@/types';

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Color name must be at least 1 characters.' })
    .max(20, { message: 'Color name must be at most 20 characters.' }),
  value: z
    .string()
    .min(4, { message: 'Value must be a valid hex code.' })
    .max(9, { message: 'Value must be a valid hex code.' })
    .regex(/^#/, { message: 'Value must be a valid hex code.' }),
});

type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps {
  initialData: Color | null;
}

export default function ColorForm({ initialData }: ColorFormProps) {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
    },
  });

  async function onSubmit(data: ColorFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data,
        );
        toast.success('Color updated.');
        router.push(`/${params.storeId}/colors`);
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
        toast.success('Color created.');
        router.refresh();
        router.push(`/${params.storeId}/colors`);
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        toast.error('Color already exists.');
      } else {
        toast.error(
          'Something went wrong. Color not updated. Please try again.',
        );
      }
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
                      placeholder="Color name"
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
                  <FormLabel htmlFor="color-picker">Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-6">
                      <Input
                        disabled={loading}
                        placeholder="Color value"
                        {...field}
                      />
                      <FormLabel
                        className="h-6 w-6 p-5 relative rounded-full border flex justify-center items-center"
                        htmlFor="color-picker"
                        style={{ backgroundColor: field.value }}
                      >
                        <Input
                          id="color-picker"
                          className="absolute mt-4 mr-4 flex opacity-0"
                          disabled={loading}
                          type="color"
                          {...field}
                        />
                      </FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {initialData ? 'Save changes' : 'Create color'}
          </Button>
        </form>
      </Form>
    </>
  );
}
