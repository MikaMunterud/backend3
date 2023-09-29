'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, PlusCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Store } from 'lucide-react';

interface StoreSwitcherProps {
  stores: { label: string; value: string }[];
}

export function StoreSwitcher({ stores }: StoreSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

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
          {value
            ? stores.find((store) => store.value === value)?.label
            : 'Select store...'}
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
                key={store.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Store className="mr-2 h-4 w-4" />
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === store.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {store.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup>
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
