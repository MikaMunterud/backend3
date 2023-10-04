import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, CreditCard, Package } from 'lucide-react';
import Heading from '@/components/ui/heading';

export default function Dashboard() {
  const value1: string = 'Value 1';
  /*   const value2: string = 'Value 2';
  const value3: string = 'Value 3'; */

  return (
    <>
      <Heading title="Dashboard" description="Overview of your store" />

      <Separator />
      <div className="grid gap-4 grid-cols-3">
        {/* Total Revenue */}
        <Card>
          <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="tracking-tight text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">value1 </div>
          </CardContent>
        </Card>

        {/* Sales */}
        <Card>
          <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="tracking-tight text-sm font-medium">
              Sales
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">value1 </div>
          </CardContent>
        </Card>

        {/* Products In Stock */}
        <Card>
          <CardHeader className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="tracking-tight text-sm font-medium">
              Products In Stock
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">value1 </div>
          </CardContent>
        </Card>
      </div>

      {/* Overview */}

      <Card>
        <CardHeader className="flex flex-col space-y-1.5 p-6">
          <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
            Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="recharts-responsive-container"> </div>
        </CardContent>
      </Card>
    </>
  );
}
