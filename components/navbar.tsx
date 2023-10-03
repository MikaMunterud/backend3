'use client';

import {
  NavigationMenu,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { useParams, usePathname } from 'next/navigation';

interface NavbarProps {
  links: { label: string; href: string }[];
}

export default function Navbar({ links }: NavbarProps) {
  const params = useParams();
  const pathname = usePathname();

  console.log(pathname.replace(/\/$/, ''));

  return (
    <NavigationMenu className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {links.map(function (link) {
        const isActive =
          `/${params.storeId}${link.href}` === pathname ||
          `/${params.storeId}${link.href}` === pathname + '/';

        return (
          <NavigationMenuLink
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive ? 'text-black dark:text-white' : 'text-muted-foreground'
            }`}
            key={link.href}
            href={`/${params.storeId}${link.href}`}
          >
            {link.label}
          </NavigationMenuLink>
        );
      })}
    </NavigationMenu>
  );
}
