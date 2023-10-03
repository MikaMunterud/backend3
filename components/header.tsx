import React from 'react';
import Navbar from './navbar';
import { StoreSwitcher } from './store-switcher';
import { ThemeToggle } from './theme.toggle';
import { UserButton } from '@clerk/nextjs';
import axios from 'axios';
interface HeaderProps {
  links: { label: string; href: string }[];
}
export default function Header({ links }: HeaderProps) {
  const [stores, setStores] = React.useState([]);

  React.useEffect(function () {
    async function getStores() {
      const response = await axios.get('/api/stores');
      const data = await response.data;

      setStores(data);
    }
    getStores();
  }, []);

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
