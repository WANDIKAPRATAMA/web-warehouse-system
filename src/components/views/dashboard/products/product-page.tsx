"use client";
import { Button } from "@/components/ui/button";
import { ColumnConfig, DynamicTable } from "@/components/ui/dynamic-table";
import { DynamicFormDrawer } from "@/components/ui/form-dynamic-drawer";
import { HeaderComp } from "@/components/ui/header-comp";
import { Typography } from "@/components/ui/typography";
import {
  createProductAction,
  updateProductAction,
  deleteProductAction,
} from "@/lib/actions/product-action";
import {
  ProductListItemResponse,
  CreateProductRequestSchema,
  UpdateProductRequestSchema,
} from "@/lib/validations/product-validation";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Plus, ShoppingBasket } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import z from "zod";
import { findSourceMap } from "module";

export default function ProductPage({
  init,
  token,
}: {
  init: ProductListItemResponse[];
  token: string;
}) {
  const [products, setProducts] = useState<ProductListItemResponse[]>(init);
  const [currentProduct, setCurrentProduct] = useState<{
    mode: "create" | "edit" | "delete";
    data?: ProductListItemResponse;
  } | null>(null);

  const handleCreateProduct = useCallback(
    async (data: z.infer<typeof CreateProductRequestSchema>) => {
      try {
        const resp = await createProductAction(token, data);
        if (resp.status !== "success" || !resp.payload.data) {
          toast.error(resp.message);
          return { success: false, message: resp.message };
        }
        toast.success(resp.message);
        setProducts((prev) => [
          ...prev,
          resp.payload.data as ProductListItemResponse,
        ]);
        return { success: true, message: resp.message };
      } catch (err: any) {
        toast.error(err?.message ?? "Unexpected error");
        return { success: false, message: err?.message ?? "Unexpected error" };
      } finally {
        setCurrentProduct(null);
      }
    },
    [token]
  );

  const handleUpdateProduct = useCallback(
    async (id: string, data: z.infer<typeof UpdateProductRequestSchema>) => {
      try {
        if (!data.category_id || !data.name || !data.sku) {
          return { success: false, message: "Please fill all the fields" };
        }

        const resp = await updateProductAction(token, id, {
          category_id: data.category_id,
          name: data.name,
          sku: data.sku,
          description: data.description,
        });
        if (resp.status !== "success" || !resp.payload.data) {
          toast.error(resp.message);
          return { success: false, message: resp.message };
        }
        toast.success(resp.message);
        setProducts((prev) =>
          prev.map((product) =>
            product.id === id ? { ...product, ...resp.payload.data } : product
          )
        );
        return { success: true, message: resp.message };
      } catch (err: any) {
        toast.error(err?.message ?? "Unexpected error");
        return { success: false, message: err?.message ?? "Unexpected error" };
      } finally {
        setCurrentProduct(null);
      }
    },
    [token]
  );

  const handleDeleteProduct = useCallback(
    async (id: string) => {
      try {
        const resp = await deleteProductAction(token, id);
        if (resp.status !== "success") {
          toast.error(resp.message);
          return { success: false, message: resp.message };
        }
        toast.success(resp.message);
        setProducts((prev) => prev.filter((product) => product.id !== id));
        return { success: true, message: resp.message };
      } catch (err: any) {
        toast.error(err?.message ?? "Unexpected error");
        return { success: false, message: err?.message ?? "Unexpected error" };
      } finally {
        setCurrentProduct(null);
      }
    },
    [token]
  );

  const handleSubmit = useCallback(
    async (data: any, mode: "create" | "edit" | "delete") => {
      if (mode === "create") {
        return await handleCreateProduct(data);
      } else if (mode === "edit" && currentProduct?.data) {
        return await handleUpdateProduct(currentProduct.data.id, data);
      } else if (mode === "delete" && currentProduct?.data) {
        return await handleDeleteProduct(currentProduct.data.id);
      }
    },
    [
      currentProduct,
      handleCreateProduct,
      handleUpdateProduct,
      handleDeleteProduct,
    ]
  );

  useEffect(() => {
    setProducts(init);
  }, [init]);

  const columns: ColumnConfig<ProductListItemResponse>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cellRenderer: (value) => (
        <Typography.Small className="font-medium">{value}</Typography.Small>
      ),
    },
    {
      header: "SKU",
      accessorKey: "sku",
      cellRenderer: (value) => <Typography.Small>{value}</Typography.Small>,
    },
    {
      header: "Category",
      accessorKey: "category_name",
      cellRenderer: (value) => <Typography.Small>{value}</Typography.Small>,
    },
    {
      header: "Description",
      accessorKey: "description",
      cellRenderer: (value) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Typography.Small className="line-clamp-2 text-muted-foreground">
              {value || "-"}
            </Typography.Small>
          </TooltipTrigger>
          {value && (
            <TooltipContent className="max-w-[300px]">
              <Typography.Small>{value}</Typography.Small>
            </TooltipContent>
          )}
        </Tooltip>
      ),
    },
    {
      header: "Created At",
      accessorKey: "created_at",
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
    <div className="container min-h-screen dark:bg-gray-900">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <HeaderComp
          title="Products"
          description="Manage product entries"
          icon={<ShoppingBasket className="size-4" />}
        />
        <Button size="sm" onClick={() => setCurrentProduct({ mode: "create" })}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      <div className="rounded-md border overflow-hidden dark:border-gray-700">
        <DynamicTable<ProductListItemResponse>
          columns={columns}
          data={products}
          onRowSelected={(mode, row) => setCurrentProduct({ mode, data: row })}
          withOutPagination
        />
      </div>
      <DynamicFormDrawer
        schema={
          currentProduct?.mode === "create"
            ? CreateProductRequestSchema
            : UpdateProductRequestSchema
        }
        defaultValues={
          currentProduct?.data && currentProduct.mode !== "delete"
            ? {
                name: currentProduct.data.name,
                sku: currentProduct.data.sku,
                category_id: currentProduct.data.category_id,
                description: currentProduct.data.description,
              }
            : undefined
        }
        mode={currentProduct?.mode || "create"}
        isOpen={!!currentProduct}
        onClose={() => setCurrentProduct(null)}
        // @ts-ignore
        onSubmit={handleSubmit}
        onDelete={() => handleDeleteProduct(currentProduct?.data?.id || "")}
        title={`${
          currentProduct?.mode === "create"
            ? "Add"
            : currentProduct?.mode === "edit"
            ? "Edit"
            : "Delete"
        } Product`}
        description={
          currentProduct?.mode === "delete"
            ? "Are you sure you want to delete this product?"
            : "Manage product details"
        }
        submitButtonText={
          currentProduct?.mode === "create" ? "Add Product" : "Save Changes"
        }
        deleteButtonText="Confirm Delete"
        fieldConfigs={{
          name: {
            type: "text",
            label: "Name",
            placeholder: "Enter product name",
            description: "Name of the product",
          },
          sku: {
            type: "text",
            label: "SKU",
            placeholder: "Enter product SKU",
            description: "Stock Keeping Unit for the product",
          },
          category_id: {
            type: "text",
            label: "Category ID",
            placeholder: "Enter category UUID",
            description: "Unique identifier for the product category",
          },
          description: {
            type: "textarea",
            label: "Description",
            placeholder: "Enter product description (optional)",
            description: "Detailed description of the product",
          },
        }}
      />
    </div>
  );
}
