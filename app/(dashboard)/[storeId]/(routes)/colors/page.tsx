import { CellAction } from '@/components/cell-actions';
import ApiList from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
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

export default function Colors() {
  const colorsAmount: number = 1;
  const color = { backgroundColor: '#cecece' };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${colorsAmount})`}
          description="Manage colors for your store"
        />

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
                <TableHead>Value</TableHead>
                <TableHead>Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
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
                  <CellAction route={'colors'} id={'dataID'} />
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
      <Heading title="API Routes" description="Endpoints for colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
}
