'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Check, ChevronsUpDown, PlusCircle, Store } from 'lucide-react';

import { useModalStore } from '@/hooks/use-store-modal';
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

interface StoreSwitcherProps {
  stores: { id: string; name: string }[];
}

export default function StoreSwitcher({ stores }: StoreSwitcherProps) {
  const router = useRouter();
  const params = useParams();

  const [open, setOpen] = useState(false);
  const { onOpen } = useModalStore();

  const currentStore = stores.find(function (store: {
    id: string;
    name: string;
  }) {
    return store.id == params.storeId;
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          <Store className="mr-2 h-4 w-4" />
          {currentStore?.name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandGroup>
            {stores.map((store) => (
              <CommandItem
                key={store.id}
                onSelect={() => {
                  setOpen(false);
                  router.push(`/${store.id}`);
                }}
              >
                <Store className="mr-2 h-4 w-4" />
                <Check
                  className={`mr-2 h-4 w-4 ${
                    currentStore?.id === store.id ? 'opacity-100' : 'opacity-0'
                  } `}
                />
                {store.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup onClick={(e) => onOpen()}>
            <CommandItem>
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Store
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
