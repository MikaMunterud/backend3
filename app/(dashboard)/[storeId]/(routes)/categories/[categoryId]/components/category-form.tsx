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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import axios from 'axios';
import { toast } from 'react-hot-toast';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Category name must be at least 2 characters.' }),
  billboardId: z
    .string()
    .min(1, { message: 'Category name must have a billboard.' }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: { id: string; name: string; billboardId: string } | null;
  billboards: { id: string; title: string }[] | [];
}

export default function CategoryForm({
  initialData,
  billboards,
}: CategoryFormProps) {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      billboardId: '',
    },
  });

  async function onSubmit(data: CategoryFormValues) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data,
        );

        toast.success('Size updated.');
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
        toast.success('Category created.');
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);
    } catch (error: any) {
      toast.error(
        'Something went wrong. Category not updated. Please try again.',
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
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map(function (billboard) {
                        return (
                          <SelectItem key={billboard.id} value={billboard.id}>
                            {billboard.title}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {initialData ? 'Save changes' : 'Create category'}
          </Button>
        </form>
      </Form>
    </>
  );
}
