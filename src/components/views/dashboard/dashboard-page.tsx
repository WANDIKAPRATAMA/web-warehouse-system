// app/dashboard/DashboardClient.tsx
"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Package,
  AlertTriangle,
  ShoppingCart,
  PlusCircle,
  Download,
  Box,
  Warehouse,
  User,
  Calendar,
} from "lucide-react";
import { DashboardResponse } from "@/lib/validations/dashboard-validation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

interface DashboardClientProps {
  data: DashboardResponse;
}

export default function DashboardClient({ data }: DashboardClientProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = () => {
    setExporting(true);
    // Simulate export process
    setTimeout(() => setExporting(false), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen  p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Inventory Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Overview of your inventory status and recent activities
            </p>
          </div>
          <Button onClick={handleExport} disabled={exporting} className="gap-2">
            <Download size={16} />
            {exporting ? "Exporting..." : "Export Report"}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Stock
              </CardTitle>
              <Box className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.total_stock.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Across all warehouses
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Products
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {data.number_of_products.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Total products in inventory
              </p>
            </CardContent>
          </Card>

          {data?.low_stock_items?.length > 0 && (
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Low Stock Items
                </CardTitle>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-500">
                  {data.low_stock_items.length}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Needs restocking soon
                </p>
              </CardContent>
            </Card>
          )}

          {data?.out_of_stock_items?.length > 0 && (
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Out of Stock
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600 dark:text-red-500">
                  {data.out_of_stock_items.length}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Urgent restocking needed
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Out of Stock Items */}
          {data?.out_of_stock_items?.length > 0 && (
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-red-500" />
                      Out of Stock Items
                    </CardTitle>
                    <CardDescription>
                      Products that need immediate restocking
                    </CardDescription>
                  </div>
                  <Badge variant="destructive" className="text-sm">
                    {data.out_of_stock_items.length} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {data?.out_of_stock_items?.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Warehouse</TableHead>
                        <TableHead className="text-right">
                          Last Updated
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.out_of_stock_items.slice(0, 5).map((item) => (
                        <TableRow
                          key={`${item.product_id}-${item.warehouse_id}`}
                        >
                          <TableCell>
                            <div className="font-medium">
                              {item.product_name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Updated by {item.updated_by_name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Warehouse className="h-3 w-3" />
                              {item.warehouse_name}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {formatDate(item.updated_at)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    No out of stock items. Great job!
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Low Stock Items */}
          {data?.low_stock_items?.length > 0 && (
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      Low Stock Items
                    </CardTitle>
                    <CardDescription>
                      Products that are running low on stock
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-sm bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
                  >
                    {data.low_stock_items.length} items
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {data?.low_stock_items?.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Warehouse</TableHead>
                        <TableHead className="text-right">Stock</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.low_stock_items.slice(0, 5).map((item) => (
                        <TableRow
                          key={`${item.product_id}-${item.warehouse_id}`}
                        >
                          <TableCell>
                            <div className="font-medium">
                              {item.product_name}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Updated by {item.updated_by_name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Warehouse className="h-3 w-3" />
                              {item.warehouse_name}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Badge
                              variant="outline"
                              className={
                                item.quantity <= 5
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
                              }
                            >
                              {item.quantity} left
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    No low stock items. Well done!
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Additions */}
        {data?.recent_additions?.length > 0 && (
          <Card className="mt-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 text-green-500" />
                    Recently Added Products
                  </CardTitle>
                  <CardDescription>
                    New products added to your inventory
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="text-sm bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                >
                  {data.recent_additions.length} items
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {data?.recent_additions?.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Added By</TableHead>
                      <TableHead className="text-right">Date Added</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.recent_additions.slice(0, 5).map((item) => (
                      <TableRow key={item.product_id}>
                        <TableCell>
                          <div className="font-medium">{item.product_name}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {item.created_by_name}
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              ({item.created_by_email})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(item.created_at)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  No recent product additions
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
