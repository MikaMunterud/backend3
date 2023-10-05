'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { redirect, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Store name must be at least 1 characters.',
  }),
});

export function SettingsForm() {
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const name = values.name.trim();
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, { name });
      window.location.reload();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <div className="grid grid-cols-3 gap-8">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Update store name..." {...field} />
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
  );
}
