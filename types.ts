export type Product = {
  id: string;
  name: string;
  categoryId: string;
  colorId: string;
  created: Date;
  img: string;
  description: string;
  isArchived: boolean;
  isFeatured: boolean;
  price: number;
  sizeId: string;
  storeId: string;
};

export type Category = {
  id: string;
  name: string;
  storeId: string;
  billboardId: string;
};

export type Size = {
  id: string;
  name: string;
  value: string;
  storeId: string;
};

export type Color = {
  id: string;
  name: string;
  value: string;
  storeId: string;
};

export type Billboard = {
  id: string;
  name: string;
  img: string;
  storeId: string;
};
