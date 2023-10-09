'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Copy, Edit, MoreHorizontal, Trash, Settings } from 'lucide-react';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { toast } from 'react-hot-toast';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { AlertModal } from '@/components/modals/alert-modal';
import { Separator } from '@/components/ui/separator';

interface CellActionProps {
  route: string;
  id: string;
}

export function CellAction({ route, id }: CellActionProps) {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  let title: string = '';
  let description: string = '';

  if (route === 'billboards') {
    title = 'Billboard';
    description =
      'Make sure you removed all categories using this billboard first.';
  }

  if (route === 'categories') {
    title = 'Category';
    description =
      'Make sure you removed all products using this category first.';
  }

  if (route === 'sizes') {
    title = 'Size';
    description = 'Make sure you removed all products using this size first.';
  }

  if (route === 'colors') {
    title = 'Color';
    description = 'Make sure you removed all products using this color first.';
  }

  if (route === 'products') {
    title = 'Product';
    description =
      'Something went wrong, product was not deleted. Please try again.';
  }

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success(`${title} Id copied to the clipboard.`);
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/${route}/${id}`);
      router.refresh();
      toast.success(`${route} deleted.`);
    } catch (error) {
      toast.error(description);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        type={title}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="px-2 pt-1 inline-flex items-center">
            <Settings className="mr-2 h-4 w-4" />
            Actions
          </DropdownMenuLabel>
          <Separator />
          <DropdownMenuItem onClick={() => onCopy(id)}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/${route}/${id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
