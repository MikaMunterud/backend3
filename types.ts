export interface Product {
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
}

export interface Category {
  id: string;
  name: string;
  storeId: string;
  billboardId: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
  storeId: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
  storeId: string;
}

export interface Billboard {
  id: string;
  name: string;
  img: string;
  storeId: string;
}

export interface Order {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  totalPrice: number;
  isPaid: boolean;
  store: string;
  created: Date;
  updated: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
}
