import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";
import { faker } from "@faker-js/faker";
import { formatISO } from "date-fns";
import { formatCurrencyNaira } from "@/lib/formatCurrency";
import SalesChart from "./_components/chart";
export default function Home() {
  // Generate fake data using Faker.js
  const totalRevenue = faker.finance.amount({
    min: 100000,
    max: 500000,
    dec: 2,
  });
  const totalOrders = faker.number.int({ min: 1000, max: 5000 });
  const totalCustomers = faker.number.int({ min: 500, max: 2000 });

  // Generate fake graph data
  const graphData = Array.from({ length: 30 }, (_, i) => ({
    name: formatISO(faker.date.recent({ days: 30 })), // Use full ISO date strings
    sales: faker.number.int({ min: 10000, max: 50000 }),
  }));

  return (
    <div className="px-8 py-10 bg-black text-neutral-200">
      <p className="text-heading2-bold">Dashboard</p>
      <Separator className="bg-neutral-700 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <Card className="bg-natural-900">
          <CardHeader className="flex flex-row justify-between items-center text-neutral-300">
            <CardTitle>Total Revenue</CardTitle>
            <CircleDollarSign className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalRevenue}</p>
          </CardContent>
        </Card>

        <Card className="bg-natural-900">
          <CardHeader className="flex flex-row justify-between items-center text-neutral-300">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{formatCurrencyNaira(totalOrders)}</p>
          </CardContent>
        </Card>

        <Card className="bg-natural-900">
          <CardHeader className="flex flex-row justify-between items-center text-neutral-300">
            <CardTitle>Total Customer</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalCustomers}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-10 bg-natural-900">
        <CardHeader>
          <CardTitle>Sales Chart ($)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
    </div>
  );
}
