"use client";
import { Button } from "@/components/ui/button";
import { ColumnConfig, DynamicTable } from "@/components/ui/dynamic-table";
import { DynamicFormDrawer } from "@/components/ui/form-dynamic-drawer";
import { HeaderComp } from "@/components/ui/header-comp";
import { Typography } from "@/components/ui/typography";
import {
  createProductStockAction,
  updateProductStockAction,
  deleteProductStockAction,
} from "@/lib/actions/product-stock-action";
import {
  ProductStockListItemResponse,
  CreateProductStockRequestSchema,
  UpdateProductStockRequestSchema,
} from "@/lib/validations/product-stock-validation";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Box, Plus } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export default function ProductStockPage({
  init,
  token,
}: {
  init: ProductStockListItemResponse[];
  token: string;
}) {
  const [stocks, setStocks] = useState<ProductStockListItemResponse[]>(init);
  const [currentStock, setCurrentStock] = useState<{
    mode: "create" | "edit" | "delete";
    data?: ProductStockListItemResponse;
  } | null>(null);

  const handleCreateStock = useCallback(
    async (data: z.infer<typeof CreateProductStockRequestSchema>) => {
      try {
        const resp = await createProductStockAction(token, data);
        if (resp.status !== "success" || !resp.payload.data) {
          toast.error(resp.message);
          return { success: false, message: resp.message };
        }
        toast.success(resp.message);
        setStocks((prev) => [
          ...prev,
          resp.payload.data as ProductStockListItemResponse,
        ]);
        return { success: true, message: resp.message };
      } catch (err: any) {
        toast.error(err?.message ?? "Unexpected error");
        return { success: false, message: err?.message ?? "Unexpected error" };
      } finally {
        setCurrentStock(null);
      }
    },
    [token]
  );

  const handleUpdateStock = useCallback(
    async (
      id: string,
      data: z.infer<typeof UpdateProductStockRequestSchema>
    ) => {
      try {
        const resp = await updateProductStockAction(token, id, data);
        if (resp.status !== "success" || !resp.payload.data) {
          toast.error(resp.message);
          return { success: false, message: resp.message };
        }
        toast.success(resp.message);
        setStocks((prev) =>
          prev.map((stock) =>
            stock.id === id ? { ...stock, ...resp.payload.data } : stock
          )
        );
        return { success: true, message: resp.message };
      } catch (err: any) {
        toast.error(err?.message ?? "Unexpected error");
        return { success: false, message: err?.message ?? "Unexpected error" };
      } finally {
        setCurrentStock(null);
      }
    },
    [token]
  );

  const handleDeleteStock = useCallback(
    async (id: string) => {
      try {
        const resp = await deleteProductStockAction(token, id);
        if (resp.status !== "success") {
          toast.error(resp.message);
          return { success: false, message: resp.message };
        }
        toast.success(resp.message);
        setStocks((prev) => prev.filter((stock) => stock.id !== id));
        return { success: true, message: resp.message };
      } catch (err: any) {
        toast.error(err?.message ?? "Unexpected error");
        return { success: false, message: err?.message ?? "Unexpected error" };
      } finally {
        setCurrentStock(null);
      }
    },
    [token]
  );

  const handleSubmit = useCallback(
    async (data: any, mode: "create" | "edit" | "delete") => {
      if (mode === "create") {
        return await handleCreateStock(data);
      } else if (mode === "edit" && currentStock?.data) {
        return await handleUpdateStock(currentStock.data.id, data);
      } else if (mode === "delete" && currentStock?.data) {
        return await handleDeleteStock(currentStock.data.id);
      }
    },
    [currentStock, handleCreateStock, handleUpdateStock, handleDeleteStock]
  );

  useEffect(() => {
    setStocks(init);
  }, [init]);

  const columns: ColumnConfig<ProductStockListItemResponse>[] = [
    {
      header: "Product",
      accessorKey: "product_name",
      cellRenderer: (value) => (
        <Typography.Small className="font-medium">{value}</Typography.Small>
      ),
    },
    {
      header: "Warehouse",
      accessorKey: "warehouse_name",
      cellRenderer: (value) => <Typography.Small>{value}</Typography.Small>,
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
      cellRenderer: (value) => <Typography.Small>{value}</Typography.Small>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cellRenderer: (value) => (
        <Typography.Small className="capitalize">{value}</Typography.Small>
      ),
    },
    {
      header: "Updated At",
      accessorKey: "updated_at",
      cellRenderer: (value) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Typography.Small className="text-muted-foreground">
              {new Date(value).toLocaleDateString()}
            </Typography.Small>
          </TooltipTrigger>
          <TooltipContent>
            <Typography.Small>
              {new Date(value).toLocaleString()}
            </Typography.Small>
          </TooltipContent>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="container space-y-6  min-h-screen dark:bg-gray-900">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <HeaderComp
          title="Product Stocks"
          description="Manage product stock entries"
          icon={<Box className="size-4" />}
        />
        <Button size="sm" onClick={() => setCurrentStock({ mode: "create" })}>
          <Plus className="mr-2 h-4 w-4" />
          Add Stock
        </Button>
      </div>
      <div className="rounded-md border overflow-hidden dark:border-gray-700">
        <DynamicTable<ProductStockListItemResponse>
          columns={columns}
          data={stocks}
          onRowSelected={(mode, row) => setCurrentStock({ mode, data: row })}
          withOutPagination
        />
      </div>
      <DynamicFormDrawer
        schema={
          currentStock?.mode === "create"
            ? CreateProductStockRequestSchema
            : UpdateProductStockRequestSchema
        }
        defaultValues={
          currentStock?.data && currentStock.mode !== "delete"
            ? {
                quantity: currentStock.data.quantity,
              }
            : undefined
        }
        mode={currentStock?.mode || "create"}
        isOpen={!!currentStock}
        onClose={() => setCurrentStock(null)}
        // @ts-ignore
        onSubmit={handleSubmit}
        // @ts-ignore
        onDelete={(data) => handleDeleteStock(data)}
        title={`${
          currentStock?.mode === "create"
            ? "Add"
            : currentStock?.mode === "edit"
            ? "Edit"
            : "Delete"
        } Product Stock`}
        description={
          currentStock?.mode === "delete"
            ? "Are you sure you want to delete this stock entry?"
            : "Manage product stock details"
        }
        submitButtonText={
          currentStock?.mode === "create" ? "Add Stock" : "Save Changes"
        }
        deleteButtonText="Confirm Delete"
        fieldConfigs={{
          //  @ts-ignore
          product_id: {
            type: "text",
            label: "Product ID",
            placeholder: "Enter product UUID",
            description: "Unique identifier for the product",
          },
          warehouse_location_id: {
            type: "text",
            label: "Warehouse Location ID",
            placeholder: "Enter warehouse location UUID",
            description: "Unique identifier for the warehouse location",
          },
          quantity: {
            type: "number",
            label: "Quantity",
            placeholder: "Enter stock quantity",
            description: "Quantity of the product in stock",
          },
        }}
      />
    </div>
  );
}
