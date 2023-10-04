import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash } from 'lucide-react';
import { SettingsForm } from './components/settings-form';
import Heading from '@/components/ui/heading';

export default function Settings() {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences." />

        <Button className="px-3 m-0" variant="destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <SettingsForm />
      <Separator />
    </>
  );
}
