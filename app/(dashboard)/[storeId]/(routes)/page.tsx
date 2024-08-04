import { getSalesCount } from "@/actions/get-salescount";
import { getTotalRevenue } from "@/actions/get-totalRevenue";
import { getProductsInStock } from "@/actions/get-totalRevenue copy";
import { getGraphRevenue } from "@/actions/getGraphRevenue";
import OverView from "@/components/OverView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";

import { CreditCardIcon, IndianRupeeIcon, PackageIcon } from "lucide-react";
import React from "react";

interface DashboardProps {
  params: { storeId: string };
}
const DashboardPage: React.FC<DashboardProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const productCount = await getProductsInStock(params.storeId);
  const graphRevenue = await getGraphRevenue(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title={"Dashboard"}
          description="Overview of your store"
        ></Heading>
        <Separator></Separator>
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <IndianRupeeIcon className="h-4 w-4 text-muted-foreground"></IndianRupeeIcon>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salesCount} </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <PackageIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productCount} </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-6 ">
            {/* <OverView data={[]}></OverView> */}
            recharts not working
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
