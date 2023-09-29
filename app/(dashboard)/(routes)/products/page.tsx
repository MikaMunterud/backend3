import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Plus } from 'lucide-react';

export default function Products() {
  const productAmount: number = 2;
  const color = { backgroundColor: '#cecece' };

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Products ({productAmount})
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage products for your store
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <div>
        <div className="flex items-center py-4">
          <Input className="max-w-sm" placeholder="Search" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Archived</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Archived</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>
                  <div className="flex items-center gap-x-2">
                    {color.backgroundColor}
                    <div
                      className="h-6 w-6 rounded-full border"
                      style={color}
                    ></div>
                  </div>
                </TableCell>
                <TableCell>September 28th, 2023</TableCell>
                <TableCell>
                  <Button className="h-8 w-8 p-0" variant="ghost">
                    ...
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button className="h-10  px-4 py-2" variant="outline" disabled>
            Previous
          </Button>
          <Button className="h-10  px-4 py-2" variant="outline" disabled>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
