'use client';

import StoreSwitcher from './store-switcher';
import Navbar from './navbar';

import { ThemeToggle } from './theme.toggle';
import { UserButton } from '@clerk/nextjs';

interface HeaderProps {
  links: { label: string; href: string }[];
}
export default function Header({ links }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher />
        <Navbar links={links} />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
