import Navbar from './navbar';
import { StoreSwitcher } from './store-switcher';
import { ThemeToggle } from './theme.toggle';
import { UserButton } from '@clerk/nextjs';

interface HeaderProps {
  links: { label: string; href: string }[];
  currentUrl: string;
  stores: { label: string; value: string }[];
}
export default function Header({ links, currentUrl, stores }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher stores={stores} />
        <Navbar links={links} currentUrl={currentUrl} />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
