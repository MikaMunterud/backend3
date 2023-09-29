'use client';

import Header from '@/components/header';
import { usePathname } from 'next/navigation';

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

const exampleStores = [
  { label: 'Store-1', value: 'Store-1' },
  { label: 'Store-2', value: 'Store-2' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <Header
        links={dashboardLinks}
        currentUrl={pathname}
        stores={exampleStores}
      />

      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      </div>
    </>
  );
}
