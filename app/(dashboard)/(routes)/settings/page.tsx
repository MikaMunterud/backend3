import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash } from 'lucide-react';
import { SettingsForm } from './components/settings-form';

export default function Settings() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage store preferences.
          </p>
        </div>
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
