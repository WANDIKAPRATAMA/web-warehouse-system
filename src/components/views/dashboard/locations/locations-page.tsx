"use client";
import { Button } from "@/components/ui/button";
import { ColumnConfig, DynamicTable } from "@/components/ui/dynamic-table";
import { DynamicFormDrawer } from "@/components/ui/form-dynamic-drawer";
import { HeaderComp } from "@/components/ui/header-comp";
import { Typography } from "@/components/ui/typography";
import {
  createWarehouseLocationAction,
  updateWarehouseLocationAction,
  deleteWarehouseLocationAction,
} from "@/lib/actions/warehouse-location-action";
import {
  WarehouseLocationListItemResponse,
  CreateWarehouseLocationRequestSchema,
  UpdateWarehouseLocationRequestSchema,
} from "@/lib/validations/warehouse-validation";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { LocationEdit, Plus } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import z from "zod";

export default function WarehouseLocationPage({
  init,
  token,
}: {
  init: WarehouseLocationListItemResponse[];
  token: string;
}) {
  const [locations, setLocations] =
    useState<WarehouseLocationListItemResponse[]>(init);
  const [currentLocation, setCurrentLocation] = useState<{
    mode: "create" | "edit" | "delete";
    data?: WarehouseLocationListItemResponse;
  } | null>(null);

  const handleCreateLocation = useCallback(
    async (data: z.infer<typeof CreateWarehouseLocationRequestSchema>) => {
      try {
        const resp = await createWarehouseLocationAction(token, data);
        console.log(
          "🚀 ~ WarehouseLocationPage ~ resp:",
          resp.status !== "success",
          "not data",
          !resp.payload.data
        );
        if (resp.status !== "success" || !resp.payload.data) {
          console.log("GAGAL CREATENYA");
          toast.error(resp.message);
          return { success: false, message: resp.message };
        }
        console.log("SUKSESSS KOK CREATENYA");
        toast.success(resp.message);
        setLocations((prev) => [
          ...prev,
          resp.payload.data as WarehouseLocationListItemResponse,
        ]);
        return { success: true, message: resp.message };
      } catch (err: any) {
        console.log("Masuk ke catch", err);
        toast.error(err?.message ?? "Unexpected error");
        return { success: false, message: err?.message ?? "Unexpected error" };
      } finally {
        setCurrentLocation(null);
      }
    },
    [token]
  );

  const handleUpdateLocation = useCallback(
    async (
      id: string,
      data: z.infer<typeof UpdateWarehouseLocationRequestSchema>
    ) => {
      try {
        const resp = await updateWarehouseLocationAction(token, id, data);
        if (resp.status !== "success" || !resp.payload.data) {
          toast.error(resp.message);
          return { success: false, message: resp.message };
        }
        toast.success(resp.message);
        setLocations((prev) =>
          prev.map((location) =>
            location.id === id
              ? { ...location, ...resp.payload.data }
              : location
          )
        );
        return { success: true, message: resp.message };
      } catch (err: any) {
        toast.error(err?.message ?? "Unexpected error");
        return { success: false, message: err?.message ?? "Unexpected error" };
      } finally {
        setCurrentLocation(null);
      }
    },
    [token]
  );

  const handleDeleteLocation = useCallback(
    async (id: string) => {
      try {
        const resp = await deleteWarehouseLocationAction(token, id);
        if (resp.status !== "success") {
          toast.error(resp.message);
          return { success: false, message: resp.message };
        }
        toast.success(resp.message);
        setLocations((prev) => prev.filter((location) => location.id !== id));
        return { success: true, message: resp.message };
      } catch (err: any) {
        toast.error(err?.message ?? "Unexpected error");
        return { success: false, message: err?.message ?? "Unexpected error" };
      } finally {
        setCurrentLocation(null);
      }
    },
    [token]
  );

  const handleSubmit = useCallback(
    async (data: any, mode: "create" | "edit" | "delete") => {
      if (mode === "create") {
        return await handleCreateLocation(data);
      } else if (mode === "edit" && currentLocation?.data) {
        return await handleUpdateLocation(currentLocation.data.id, data);
      } else if (mode === "delete" && currentLocation?.data) {
        return await handleDeleteLocation(currentLocation.data.id);
      }
    },
    [
      currentLocation,
      handleCreateLocation,
      handleUpdateLocation,
      handleDeleteLocation,
    ]
  );

  useEffect(() => {
    setLocations(init);
  }, [init]);

  const columns: ColumnConfig<WarehouseLocationListItemResponse>[] = [
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
  ];

  return (
    <div className="container min-h-screen dark:bg-gray-900">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <HeaderComp
          title="Warehouse Locations"
          description="Manage warehouse location entries"
          icon={<LocationEdit className="size-4" />}
        />
        <Button
          size="sm"
          onClick={() => setCurrentLocation({ mode: "create" })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>
      <div className="rounded-md border overflow-hidden dark:border-gray-700">
        <DynamicTable<WarehouseLocationListItemResponse>
          columns={columns}
          data={locations}
          onRowSelected={(mode, row) => setCurrentLocation({ mode, data: row })}
          withOutPagination
        />
      </div>
      <DynamicFormDrawer
        schema={
          currentLocation?.mode === "create"
            ? CreateWarehouseLocationRequestSchema
            : UpdateWarehouseLocationRequestSchema
        }
        defaultValues={
          currentLocation?.data && currentLocation.mode !== "delete"
            ? {
                name: currentLocation.data.name,
                description: currentLocation.data.description,
              }
            : undefined
        }
        mode={currentLocation?.mode || "create"}
        isOpen={!!currentLocation}
        onClose={() => setCurrentLocation(null)}
        // @ts-ignore
        onSubmit={handleSubmit}
        // @ts-ignore
        onDelete={(data) => handleDeleteLocation(currentLocation?.data?.id)}
        title={`${
          currentLocation?.mode === "create"
            ? "Add"
            : currentLocation?.mode === "edit"
            ? "Edit"
            : "Delete"
        } Warehouse Location`}
        description={
          currentLocation?.mode === "delete"
            ? "Are you sure you want to delete this warehouse location?"
            : "Manage warehouse location details"
        }
        submitButtonText={
          currentLocation?.mode === "create" ? "Add Location" : "Save Changes"
        }
        deleteButtonText="Confirm Delete"
        fieldConfigs={{
          name: {
            type: "text",
            label: "Name",
            placeholder: "Enter warehouse location name",
            description: "Name of the warehouse location",
          },
          description: {
            type: "textarea",
            label: "Description",
            placeholder: "Enter location description (optional)",
            description: "Detailed description of the warehouse location",
          },
        }}
      />
    </div>
  );
}
