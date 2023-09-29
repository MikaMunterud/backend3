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

export default function Orders() {
  const ordersAmount: number = 0;

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Orders ({ordersAmount})
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage orders for your store
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
                <TableHead>Products</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Paid</TableCell>
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
