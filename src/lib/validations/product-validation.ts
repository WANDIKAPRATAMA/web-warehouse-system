import { z } from "zod";

export const CreateProductRequestSchema = z.object({
  name: z.string().min(1),
  sku: z.string().min(1),
  category_id: z.string().uuid(),
  description: z.string().optional(),
});

export type CreateProductRequest = z.infer<typeof CreateProductRequestSchema>;

export const UpdateProductRequestSchema = z.object({
  name: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  category_id: z.uuid().optional(),
  description: z.string().optional(),
});

export type UpdateProductRequest = z.infer<typeof UpdateProductRequestSchema>;

export const PaginationRequestSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  sortBy: z.enum(["name", "sku", "created_at"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  category_id: z.string().uuid().optional(),
  status: z.enum(["available", "low-stock", "out-of-stock"]).optional(),
});

export type PaginationRequest = z.infer<typeof PaginationRequestSchema>;
export type ProductResponse = {
  id: string;
  name: string;
  sku: string;
  category_id: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type ProductListItemResponse = {
  id: string;
  name: string;
  sku: string;
  category_id: string;
  category_name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type DeleteProductResponse = Record<string, never>;
