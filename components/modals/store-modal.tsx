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

export default function StoreModal() {
  const { isOpen, onClose } = useModalStore();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'Store name must be at least 2 characters.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { name } = values;
      const response = await axios.post('/api/stores', { name });
      console.log(response.data);
      onClose();
      window.location.reload();
    } catch (error) {
      console.log(error);
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
                          <Input placeholder="E-Commerce" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="space-x-2 flex items-center justify-end w-full">
                    <Button variant="outline" onClick={(e) => onClose()}>
                      Cancel
                    </Button>
                    <Button type="submit">Continue</Button>
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
