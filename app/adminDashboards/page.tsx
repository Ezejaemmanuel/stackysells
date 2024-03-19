import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";
import { faker } from "@faker-js/faker";
import { formatISO } from "date-fns";
import { formatCurrencyNaira } from "@/lib/formatCurrency";
import SalesChart from "./_components/chart";
import "./custom-button.css";
import { checkAuth, getUserAuth } from "@/lib/auth/utils";
import Link from "next/link";
export default async function Home() {
  await checkAuth();
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
    <div className="bg-black py-10 text-neutral-200 md:px-8">
      <div className="flex flex-row justify-between">
        <p className="text-heading2-bold">Dashboard</p>
        <button className="custom-btn-1 bg-white">
          <Link href={"/adminDashboards/allProducts"}>Products</Link>
        </button>
      </div>
      <Separator className="my-5 bg-neutral-700" />

      <div className="grid grid-cols-2 gap-10 md:grid-cols-3">
        <Card className="bg-natural-900">
          <CardHeader className="flex flex-row items-center justify-between text-neutral-300">
            <CardTitle>Total Revenue</CardTitle>
            <CircleDollarSign className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalRevenue}</p>
          </CardContent>
        </Card>

        <Card className="bg-natural-900">
          <CardHeader className="flex flex-row items-center justify-between text-neutral-300">
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{formatCurrencyNaira(totalOrders)}</p>
          </CardContent>
        </Card>

        <Card className="bg-natural-900">
          <CardHeader className="flex flex-row items-center justify-between text-neutral-300">
            <CardTitle>Total Customer</CardTitle>
            <UserRound className="max-sm:hidden" />
          </CardHeader>
          <CardContent>
            <p className="text-body-bold">{totalCustomers}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-natural-900 mt-10">
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
