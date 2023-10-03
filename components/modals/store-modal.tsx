'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useModalStore } from '@/hooks/use-store-modal';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'Store name must be at least 1 characters.',
  }),
});

export default function StoreModal() {
  const { isOpen, onClose } = useModalStore();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const { name } = values;

      const response = await axios.post('/api/stores', { name });

      onClose();
      window.location.reload();
      toast.success('Store created.');
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(e) => onClose()}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create store</DialogTitle>
          <DialogDescription>
            Add a new store to manage products and categories
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <div className="space-y-4 py-2 pb-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="E-Commerce"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-x-2 flex items-center justify-end w-full">
                    <Button
                      disabled={loading}
                      variant="outline"
                      onClick={(e) => onClose()}
                    >
                      Cancel
                    </Button>
                    <Button disabled={loading} type="submit">
                      Continue
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
