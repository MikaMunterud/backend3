'use client';

import Header from '@/components/header';
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header links={dashboardLinks} />
      <main className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      </main>
    </>
  );
}
