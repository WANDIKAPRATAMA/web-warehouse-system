"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";
import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useZodToastErrors } from "@/hooks/use-zod-toast";
import { Separator } from "./separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select";
import { Plus, SquareArrowOutUpRight, Trash, Send } from "lucide-react";
import Outer from "../atoms/outer";
import ContainerIcons from "./container-icons";
import { TransitionIcon } from "./transition-icon";
import { Textarea } from "./textarea";

type FormFieldConfig = {
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "textarea"
    | "custom"
    | "enum";

  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  customComponent?: React.ComponentType<{ field: any }>;
  options?: { label: string; value: string | number }[];
  arrayItemConfig?: FormFieldConfig;
};

type FormSchemaType<T extends z.ZodTypeAny> = z.infer<T>;

interface DynamicFormDrawerProps<T extends z.ZodTypeAny> {
  schema: T;
  fieldConfigs?: Record<keyof FormSchemaType<T>, FormFieldConfig>;
  defaultValues?: Partial<FormSchemaType<T>>;
  mode: "create" | "edit" | "delete";
  isOpen: boolean;
  onClose: (
    mode: "create" | "edit" | "delete",
    data?: FormSchemaType<T>
  ) => void;
  onSubmit: (
    data: FormSchemaType<T>,
    mode: "create" | "edit" | "delete"
  ) => Promise<{ success: boolean; message: string }>;
  onDelete?: (
    data: FormSchemaType<T>
  ) => Promise<{ success: boolean; message: string }>;
  title?: string;
  description?: string;
  submitButtonText?: string;
  deleteButtonText?: string;
  isMobile?: boolean;
  className?: string;
}

export function DynamicFormDrawer<T extends z.ZodTypeAny>({
  schema,
  fieldConfigs,
  defaultValues,
  mode,
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  title,
  description,
  submitButtonText,
  deleteButtonText,
  isMobile = false,
  className,
}: DynamicFormDrawerProps<T>) {
  const [isPending, startTransition] = useTransition();
  const toastError = useZodToastErrors();
  //   @ts-ignore
  const form = useForm<FormSchemaType<T>>({
    // @ts-ignore
    resolver: zodResolver(schema),
    defaultValues: defaultValues as FormSchemaType<T>,
  });

  // Reset form when defaultValues or mode changes
  useEffect(() => {
    form.reset(defaultValues as FormSchemaType<T>);
  }, [defaultValues, mode, form]);

  const handleSubmit = async (data: FormSchemaType<T>) => {
    startTransition(async () => {
      const result = await onSubmit(data, mode);
      if (result) {
        if (result.success) {
          toast.success(result.message);
          onClose(mode, data);
        } else {
          toast.error(result.message);
        }
      }
    });
  };

  const handleDelete = async () => {
    if (!onDelete || mode !== "delete") return;

    startTransition(async () => {
      const data = form.getValues();
      const result = await onDelete(data);
      if (result) {
        if (result.success) {
          toast.success(result.message);
          onClose(mode, data);
        } else {
          toast.error(result.message);
        }
      }
    });
  };

  const renderFormField = (name: keyof FormSchemaType<T>) => {
    const config = fieldConfigs?.[name] || { type: "text" };
    const schemaField = (schema as any).shape[name]; // Mengakses `shape` dari schema Zod

    let enumOptions: { label: string; value: string | number }[] = [];
    if (schemaField && schemaField._def && schemaField._def.values) {
      enumOptions = schemaField._def.values.map((val: string | number) => ({
        label: String(val).charAt(0).toUpperCase() + String(val).slice(1),
        value: val,
      }));
    }

    const finalOptions = config.options || enumOptions;

    // Logika untuk melewatkan rendering field 'country'
    // Jika nama field adalah 'country' dan PhoneInput akan menanganinya, jangan render.
    // Kita cek apakah ada field 'phone_number' di schema utama dan apakah tipenya string
    // atau jika di fieldConfigs ada phone_number dengan type "tel".
    const hasPhoneNumberFieldInSchema =
      (schema as any).shape.phone_number instanceof z.ZodString;

    return (
      <FormField
        // @ts-ignore
        control={form.control}
        // @ts-ignore
        name={name}
        render={({ field }) => (
          <FormItem className={config.className}>
            <FormLabel>
              {config.label || String(name).replace(/_/g, " ")}
            </FormLabel>
            <FormControl>
              {config.type === "custom" && config.customComponent ? (
                <config.customComponent field={field} />
              ) : config.type === "textarea" ? (
                <Textarea
                  {...field}
                  placeholder={config.placeholder}
                  // className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              ) : config.type === "enum" ? (
                <Select
                  onValueChange={field.onChange}
                  // Pastikan value adalah string untuk Select Shadcn
                  defaultValue={field.value ? String(field.value) : undefined}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        config.placeholder ||
                        `Select a ${
                          config.label || String(name).replace(/_/g, " ")
                        }`
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {finalOptions.map((option) => (
                      <SelectItem
                        key={String(option.value)}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  type={config.type}
                  placeholder={config.placeholder}
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => {
                    if (schemaField instanceof z.ZodNumber) {
                      field.onChange(
                        e.target.value === "" ? null : Number(e.target.value)
                      );
                    } else {
                      field.onChange(e.target.value);
                    }
                  }}
                />
              )}
            </FormControl>
            {config.description && (
              <FormDescription>{config.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && onClose(mode)}
      direction={isMobile ? "bottom" : "right"}
    >
      <DrawerContent
        className={cn(
          "p-6 max-w-md w-full max-h-screen flex flex-col",
          className
        )}
      >
        <div className="flex flex-col gap-6 h-full">
          {/* Header */}
          <div className="space-y-2">
            <DrawerTitle>
              <Outer.Row>
                <ContainerIcons
                  variant={mode !== "delete" ? "gray" : "red"}
                  className="size-8"
                >
                  {mode === "create" && <Plus className="w-4 h-4" />}
                  {mode === "edit" && (
                    <SquareArrowOutUpRight className="w-4 h-4" />
                  )}
                  {mode === "delete" && <Trash className="w-4 h-4" />}
                </ContainerIcons>
                <Outer.Col className="gap-1">
                  {title ||
                    `${
                      mode === "create"
                        ? "Create"
                        : mode === "edit"
                        ? "Edit"
                        : "Delete"
                      // @ts-ignore
                    } ${String(schema._def.typeName).replace("Schema", "")}`}
                  {description && (
                    <DrawerDescription>{description}</DrawerDescription>
                  )}
                </Outer.Col>
              </Outer.Row>
            </DrawerTitle>
            <Separator />
          </div>

          {/* Form */}
          {/* @ts-ignore */}
          <Form {...form}>
            <form
              // @ts-ignore
              onSubmit={form.handleSubmit(handleSubmit, (e) => {
                console.log("VALIDATION ERROR", e);
                toastError(e);
              })}
              className="flex flex-col h-full"
            >
              {/* Scrollable form fields */}
              <ScrollArea className="flex-1 overflow-y-auto pr-4">
                <div className="space-y-4 mb-20 px-2">
                  {/* @ts-ignore */}
                  {Object.keys(schema.shape).map((name) => (
                    <div key={name}>
                      {renderFormField(name as keyof FormSchemaType<T>)}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Sticky bottom section */}
              <div className="sticky bottom-0 bg-background pt-4 pb-2 -mx-6 px-6 border-t">
                <div className="flex justify-end gap-2 mt-4">
                  {mode === "delete" ? (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => onClose(mode)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                      >
                        <TransitionIcon isPending={isPending}>
                          <Trash className="size-4" />
                        </TransitionIcon>
                        {deleteButtonText || "Confirm Delete"}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        disabled={isPending}
                      >
                        Reset
                      </Button>
                      <Button type="submit" disabled={isPending}>
                        <TransitionIcon isPending={isPending}>
                          <Send className="size-4" />
                        </TransitionIcon>
                        {submitButtonText ||
                          (mode === "create" ? "Create" : "Update")}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
