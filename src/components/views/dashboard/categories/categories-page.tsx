"use client";
import { Button } from "@/components/ui/button";
import { ColumnConfig, DynamicTable } from "@/components/ui/dynamic-table";
import { DynamicFormDrawer } from "@/components/ui/form-dynamic-drawer";
import { Typography } from "@/components/ui/typography";
import {
  createProductCategoryAction,
  updateProductCategoryAction,
  deleteProductCategoryAction,
} from "@/lib/actions/product-categories-action";
import {
  ProductCategoryListItemResponse,
  CreateProductCategoryRequestSchema,
  UpdateProductCategoryRequestSchema,
} from "@/lib/validations/product-categories-validation";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { FolderCog2, Plus } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import z, { success } from "zod";
import { HeaderComp } from "@/components/ui/header-comp";
import { error } from "console";

export default function ProductCategoryPage({
  init,
  token,
}: {
  init: ProductCategoryListItemResponse[];
  token: string;
}) {
  const [categories, setCategories] =
    useState<ProductCategoryListItemResponse[]>(init);
  const [currentCategory, setCurrentCategory] = useState<{
    mode: "create" | "edit" | "delete";
    data?: ProductCategoryListItemResponse;
  } | null>(null);

  const handleCreateCategory = useCallback(
    async (data: z.infer<typeof CreateProductCategoryRequestSchema>) => {
      try {
        const resp = await createProductCategoryAction(token, data);
        console.log("🚀 ~ ProductCategoryPage ~ resp:", resp);
        if (resp.status !== "success" || !resp.payload.data) {
          toast.error(resp.message);
          return { success: false, message: resp.message };
        }
        toast.success(resp.message);
        setCategories((prev) => [
          ...prev,
          resp.payload.data as ProductCategoryListItemResponse,
        ]);
        return { success: true, message: resp.message };
      } catch (err: any) {
        toast("Whoops", {
          description: err?.message ?? "Unexpected error",
        });
        return { success: false, message: err?.message ?? "Unexpected error" };
      } finally {
        setCurrentCategory(null);
      }
    },
    [token]
  );

  const handleUpdateCategory = useCallback(
    async (
      id: string,
      data: z.infer<typeof UpdateProductCategoryRequestSchema>
    ) => {
      try {
        const resp = await updateProductCategoryAction(token, id, data);
        if (resp.status !== "success" || !resp.payload.data) {
          toast.error(resp.message);
          return { success: false, message: resp.message };
        }
        toast.success(resp.message);
        setCategories((prev) =>
          prev.map((category) =>
            category.id === id
              ? { ...category, ...resp.payload.data }
              : category
          )
        );
        return { success: true, message: resp.message };
      } catch (err: any) {
        toast.error(err?.message ?? "Unexpected error");
        return { success: false, message: err?.message ?? "Unexpected error" };
      } finally {
        setCurrentCategory(null);
      }
    },
    [token]
  );

  const handleDeleteCategory = useCallback(
    async (id: string) => {
      try {
        const resp = await deleteProductCategoryAction(token, id);
        console.log("🚀 ~ ProductCategoryPage ~ resp:", resp);
        if (resp.status !== "success") {
          toast.error(resp.message);
          return { success: false, message: resp.message };
        }
        toast.success(resp.message);
        setCategories((prev) => prev.filter((category) => category.id !== id));
        return { success: true, message: resp.message };
      } catch (err: any) {
        toast.error(err.message ?? "Unexpected error");

        return { success: false, message: err?.message ?? "Unexpected error" };
      } finally {
        setCurrentCategory(null);
      }
    },
    [token]
  );

  const handleSubmit = useCallback(
    async (data: any, mode: "create" | "edit" | "delete") => {
      if (mode === "create") {
        return await handleCreateCategory(data);
      } else if (mode === "edit" && currentCategory?.data) {
        return await handleUpdateCategory(currentCategory.data.id, data);
      } else if (mode === "delete" && currentCategory?.data) {
        return await handleDeleteCategory(currentCategory.data.id);
      }
      return {
        success: false,
        message: "unknown action",
      };
    },
    [
      currentCategory,
      handleCreateCategory,
      handleUpdateCategory,
      handleDeleteCategory,
    ]
  );

  useEffect(() => {
    setCategories(init);
  }, [init]);

  const columns: ColumnConfig<ProductCategoryListItemResponse>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cellRenderer: (value) => (
        <Typography.Small className="font-medium">{value}</Typography.Small>
      ),
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
    <div className="min-h-screen space-y-6  dark:bg-gray-900">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <HeaderComp
          title="Product Categories"
          description="Manage product categories"
          icon={<FolderCog2 className="h-10 w-10" />}
        />
        <Button
          size="sm"
          onClick={() => setCurrentCategory({ mode: "create" })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
      <div className="rounded-md border overflow-hidden dark:border-gray-700">
        <DynamicTable<ProductCategoryListItemResponse>
          columns={columns}
          data={categories}
          onRowSelected={(mode, row) => setCurrentCategory({ mode, data: row })}
          withOutPagination
        />
      </div>
      <DynamicFormDrawer
        schema={
          currentCategory?.mode === "create"
            ? CreateProductCategoryRequestSchema
            : UpdateProductCategoryRequestSchema
        }
        defaultValues={
          currentCategory?.data && currentCategory.mode !== "delete"
            ? {
                name: currentCategory.data.name,
                description: currentCategory.data.description,
              }
            : undefined
        }
        mode={currentCategory?.mode || "create"}
        isOpen={!!currentCategory}
        onClose={() => setCurrentCategory(null)}
        onSubmit={handleSubmit}
        onDelete={(data) => handleSubmit(data, "delete")}
        title={`${
          currentCategory?.mode === "create"
            ? "Add"
            : currentCategory?.mode === "edit"
            ? "Edit"
            : "Delete"
        } Product Category`}
        description={
          currentCategory?.mode === "delete"
            ? "Are you sure you want to delete this category?"
            : "Manage product category details"
        }
        submitButtonText={
          currentCategory?.mode === "create" ? "Add Category" : "Save Changes"
        }
        deleteButtonText="Confirm Delete"
        fieldConfigs={{
          name: {
            type: "text",
            label: "Name",
            placeholder: "Enter category name",
            description: "Name of the product category",
          },
          description: {
            type: "textarea",
            label: "Description",
            placeholder: "Enter category description (optional)",
            description: "Detailed description of the category",
          },
        }}
      />
    </div>
  );
}
