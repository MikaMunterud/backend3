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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import ImageUpload from '@/components/ui/image-upload';
import { useState } from 'react';
import { Category, Color, Product, Size } from '@/types';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Textarea } from '@/components/ui/textarea';

// Define the form schema. This will be used to validate the form values.
const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name must be at least one character.' })
    .max(20, { message: 'Name must be less than 50 characters.' }),
  img: z
    .object({ url: z.string() })
    .array()
    .min(1, { message: 'At least one image is required.' })
    .max(1, { message: 'Only one image is allowed.' }),
  description: z
    .string()
    .min(1, { message: 'Description must be at least one character.' })
    .max(200, { message: 'Description must be less than 200 characters.' }),
  price: z.coerce
    .number()
    .min(0.1, { message: 'Price is required' })
    .max(999999.99, { message: 'Price must be less than 1 000 000.' }),
  categoryId: z.string().min(1, { message: 'Category is required.' }),
  colorId: z.string().min(1, { message: 'Color is required.' }),
  sizeId: z.string().min(1, { message: 'Size is required.' }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  categories: Category[] | [];
  colors: Color[] | [];
  sizes: Size[] | [];
  initialData: Product | null;
}

export function ProductForm({
  categories,
  colors,
  sizes,
  initialData,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  let defaultValues;

  if (initialData) {
    defaultValues = {
      name: initialData.name,
      img: [{ url: initialData.img }], //this uses only the first image of a product
      description: initialData.description,
      price: initialData.price,
      categoryId: initialData.categoryId,
      colorId: initialData.colorId,
      sizeId: initialData.sizeId,
      isFeatured: initialData.isFeatured,
      isArchived: initialData.isArchived,
    };
  }

  // 1. Define your form.
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: '',
      img: [],
      description: '',
      categoryId: '',
      colorId: '',
      sizeId: '',
      isFeatured: false,
      isArchived: false,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: ProductFormValues) {
    const { isFeatured, isArchived } = values;

    // Custom validation to ensure only one of isFeatured or isArchived can be true
    if (isFeatured && isArchived) {
      form.setError('isFeatured', {
        type: 'manual',
        message: 'Only one of Featured or Archived can be true.',
      });
      form.setError('isArchived', {
        type: 'manual',
        message: 'Only one of Featured or Archived can be true.',
      });
      return;
    }

    //this uses only the first image of a product
    const product = {
      name: values.name,
      img: values.img[0].url,
      description: values.description,
      price: values.price,
      categoryId: values.categoryId,
      colorId: values.colorId,
      sizeId: values.sizeId,
      isFeatured: values.isFeatured,
      isArchived: values.isArchived,
    };

    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          product,
        );
        toast.success('Product updated.');
        router.push(`/${params.storeId}/products`);
      } else {
        await axios.post(`/api/${params.storeId}/products`, product);
        toast.success('Product created.');
        router.refresh();
        router.push(`/${params.storeId}/products`);
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        toast.error('Product already exists.');
      } else {
        toast.error(
          'Something went wrong. Product not updated. Please try again.',
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
          <FormField
            control={form.control}
            name="img"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((img) => img.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
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
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
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
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
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
                          placeholder="Select a size"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
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
                          placeholder="Select a color"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      className="resize-none"
                      placeholder="Product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Checkbox for accepting terms and conditions */}
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                    {form.formState.errors.isFeatured && (
                      <FormMessage>
                        {form.formState.errors.isFeatured.message}
                      </FormMessage>
                    )}
                  </div>
                </FormItem>
              )}
            />

            {/* Checkbox for accepting terms and conditions */}
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                    {form.formState.errors.isArchived && (
                      <FormMessage>
                        {form.formState.errors.isArchived.message}
                      </FormMessage>
                    )}
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {initialData ? 'Save changes' : 'Create product'}
          </Button>
        </form>
      </Form>
    </>
  );
}
