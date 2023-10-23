import Header from '@/components/header';
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

const dashboardLinks = [
  { label: 'Overview', href: '/' },
  { label: 'Billboards', href: '/billboards' },
  { label: 'Categories', href: '/categories' },
  { label: 'Sizes', href: '/sizes' },
  { label: 'Colors', href: '/colors' },
  { label: 'Products', href: '/products' },
  { label: 'Orders', href: '/orders' },
  { label: 'Settings', href: '/settings' },
  // Add more links as needed
];

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Header links={dashboardLinks} />
      <main className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      </main>
    </>
  );
}
