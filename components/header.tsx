import StoreSwitcher from './store-switcher';
import Navbar from './navbar';

import { ThemeToggle } from './theme.toggle';
import { UserButton, auth } from '@clerk/nextjs';

import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';

interface HeaderProps {
  links: { label: string; href: string }[];
}
export default async function Header({ links }: HeaderProps) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const stores = await prismadb.store.findMany({ where: { userId } });

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher stores={stores} />
        <Navbar links={links} />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
