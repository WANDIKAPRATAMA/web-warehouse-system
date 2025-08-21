"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Outer from "@/components/atoms/outer";
import { trimUnderScore, capitalizeFirst } from "@/lib/utils/text";
import CopyButton from "./copy-button";

// CHANGEDD

export type TableActionItem<T = Record<string, any>> = {
  label: (row: T) => string;
  action: (row: T) => void;
  icon?: React.ReactNode;
  variant?: "default" | "destructive";
  group?: string;
};

export interface ColumnConfig<T = Record<string, any>> {
  header: string;
  accessorKey: keyof T | string;
  cellRenderer?: (value: any, row: T) => React.ReactNode;
}

export interface ExcelLikeTableProps<T = Record<string, any>> {
  columns: ColumnConfig<T>[] | (keyof T)[];
  data: T[];
  withOutPagination?: boolean;
  onRowSelected?: (mode: "delete" | "edit", row: T) => void;
  withOutActions?: boolean;
  actions?: TableActionItem<T>[] | ((row: T) => TableActionItem<T>[]);
  defaultActions?: boolean;
}

export function DynamicTable<T extends Record<string, any>>({
  columns: columnsConfig,
  data,
  withOutPagination = false,
  withOutActions = false,
  onRowSelected,
  actions = [],
  defaultActions = true,
}: ExcelLikeTableProps<T>) {
  // Convert simple string headers to full column config if needed
  const normalizedColumns = React.useMemo(() => {
    if (columnsConfig.length === 0) return [];

    if (typeof columnsConfig[0] === "string") {
      return (columnsConfig as string[]).map((header) => ({
        header: trimUnderScore(capitalizeFirst(header?.toString() || "")),
        accessorKey: header,
      }));
    }
    return columnsConfig as ColumnConfig[];
  }, [columnsConfig]);

  const getActionItems = React.useCallback(
    (row: T): TableActionItem<T>[] => {
      const defaultItems: TableActionItem<T>[] = defaultActions
        ? [
            {
              label: () => "Edit",
              action: () => onRowSelected?.("edit", row),
            },
            {
              label: () => "Delete",
              action: () => onRowSelected?.("delete", row),
              variant: "destructive",
            },
          ]
        : [];

      const customActions =
        typeof actions === "function" ? actions(row) : actions;

      return [
        ...(customActions.length === 0 ? defaultItems : []),

        {
          label: () => "Copy as JSON",
          action: () => navigator.clipboard.writeText(JSON.stringify(row)),
          group: "Copy",
        },
        {
          label: () => "Copy as Text",
          action: () => navigator.clipboard.writeText(JSON.stringify(row)),
          group: "Copy",
        },
        ...customActions,
      ];
    },
    [actions, defaultActions, onRowSelected]
  );

  const columns = React.useMemo<ColumnDef<T>[]>(() => {
    const baseColumns: ColumnDef<T>[] = normalizedColumns.map((column) => ({
      accessorKey: column.accessorKey as string,
      header: column.header,
      cell: ({ row, column: col }) => {
        const value = row.getValue(col.id);
        const originalRow = row.original as T;

        // Abaikan jika kolom adalah 'actions'
        if (col.id === "actions") {
          return null;
        }

        // @ts-ignore
        if (column.cellRenderer) {
          return (
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <div className="text-left">
                  {/* @ts-ignore */}
                  {column.cellRenderer(value, originalRow)}
                </div>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-48">
                <ContextMenuItem
                  // onClick={() =>
                  //   navigator.clipboard.writeText(String(value ?? ""))
                  // }
                  className="truncate"
                  asChild
                >
                  <Outer.Row>
                    <CopyButton value={String(value ?? "")} />
                    Copy Cell
                  </Outer.Row>
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          );
        }

        return (
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div className="text-left">{value?.toString() || ""}</div>
            </ContextMenuTrigger>

            <ContextMenuContent className="w-48">
              <ContextMenuItem
                // onClick={() =>
                //   navigator.clipboard.writeText(String(value ?? ""))
                // }
                className="truncate"
                asChild
              >
                <Outer.Row>
                  <CopyButton value={String(value ?? "")} />
                  Copy Cell
                </Outer.Row>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        );
      },
    }));

    if (!withOutActions) {
      baseColumns.push({
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const originalRow = row.original as T;
          const actionItems = getActionItems(originalRow);

          const groupedActions = actionItems.reduce<
            Record<string, TableActionItem<T>[]>
          >((acc, item) => {
            const group = item.group || "Actions";
            if (!acc[group]) acc[group] = [];
            acc[group].push(item);
            return acc;
          }, {});

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                  size="icon"
                >
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <ScrollArea className="pr-4">
                  {Object.entries(groupedActions).map(
                    ([group, items], index) => (
                      <React.Fragment key={group + index}>
                        {index > 0 && <DropdownMenuSeparator />}
                        {group !== "Actions" && (
                          <DropdownMenuGroup>
                            <div className="text-xs text-muted-foreground px-2 py-1">
                              {group}
                            </div>
                          </DropdownMenuGroup>
                        )}
                        <DropdownMenuGroup>
                          {items.some(
                            (item) =>
                              item.label(originalRow) === "Copy as Text" ||
                              item.label(originalRow) === "Copy as JSON"
                          ) && (
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                Copy
                              </DropdownMenuSubTrigger>
                              <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                  {items.map((item) => {
                                    if (
                                      item.label(originalRow) === "Copy as Text"
                                    ) {
                                      return (
                                        <DropdownMenuItem
                                          key="copy-text"
                                          onSelect={(e) => e.preventDefault()}
                                          className="items-center gap-2"
                                        >
                                          <CopyButton
                                            value={Object.entries(originalRow)
                                              .map(
                                                ([key, val]) => `${key}: ${val}`
                                              )
                                              .join("\n")}
                                          />
                                          {item.label(originalRow)}
                                        </DropdownMenuItem>
                                      );
                                    }

                                    if (
                                      item.label(originalRow) === "Copy as JSON"
                                    ) {
                                      return (
                                        <DropdownMenuItem
                                          key="copy-json"
                                          onSelect={(e) => e.preventDefault()}
                                          className="items-center gap-2"
                                        >
                                          <CopyButton
                                            value={JSON.stringify(
                                              originalRow,
                                              null,
                                              2
                                            )}
                                          />
                                          {item.label(originalRow)}
                                        </DropdownMenuItem>
                                      );
                                    }

                                    return null;
                                  })}
                                </DropdownMenuSubContent>
                              </DropdownMenuPortal>
                            </DropdownMenuSub>
                          )}

                          {items.map((item) => {
                            if (
                              item.label(originalRow) === "Copy as Text" ||
                              item.label(originalRow) === "Copy as JSON"
                            ) {
                              return null;
                            }

                            return (
                              <DropdownMenuItem
                                key={item.label(originalRow)}
                                onClick={(e) => {
                                  e.preventDefault();
                                  item.action(originalRow);
                                }}
                                className={
                                  item.variant === "destructive"
                                    ? "text-destructive"
                                    : ""
                                }
                              >
                                {item.icon && item.icon}
                                {item.label(originalRow)}
                              </DropdownMenuItem>
                            );
                          })}
                        </DropdownMenuGroup>
                      </React.Fragment>
                    )
                  )}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      });
    }

    return baseColumns;
  }, [normalizedColumns, getActionItems, withOutActions]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10, // Set default to 10 rows per page
      },
    },
  });

  return (
    <div className="w-full flex-col justify-start gap-6">
      <div className="rounded-md border border-gray-300 dark:border-gray-700">
        <Table className="min-w-full">
          <TableHeader className="sticky top-0 bg-background z-20 rounded-md">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  const isLastColumn = index === headerGroup.headers.length - 1;
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "whitespace-nowrap bg-muted",
                        isLastColumn && "sticky right-0 z-10 border-l "
                      )}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => {
                    const isLastColumn =
                      index === row.getVisibleCells().length - 1;
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "whitespace-nowrap bg-background", // <- penting
                          isLastColumn && "sticky right-0 z-[10] border-l"
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!withOutPagination && (
        <div className="sticky bottom-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 border-t">
          <div className="text-sm text-muted-foreground">
            Showing {table.getRowModel().rows.length} of {data.length} row(s)
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
