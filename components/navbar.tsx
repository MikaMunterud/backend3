'use client';

import {
  NavigationMenu,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

interface NavbarProps {
  links: { label: string; href: string }[];
  currentUrl: string;
}

export default function Navbar({ links, currentUrl }: NavbarProps) {
  return (
    <NavigationMenu className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {links.map(function (link, index: any) {
        const isActive = `${link.href}` === currentUrl;

        return (
          <NavigationMenuLink
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive ? 'text-black dark:text-white' : 'text-muted-foreground'
            }`}
            key={index}
            href={`${link.href}`}
          >
            {link.label}
          </NavigationMenuLink>
        );
      })}
    </NavigationMenu>
  );
}
