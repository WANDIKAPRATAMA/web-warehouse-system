import { z } from "zod";

export const CreateProductCategoryRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export type CreateProductCategoryRequest = z.infer<
  typeof CreateProductCategoryRequestSchema
>;

export const UpdateProductCategoryRequestSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

export type UpdateProductCategoryRequest = z.infer<
  typeof UpdateProductCategoryRequestSchema
>;

export const PaginationRequestSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
});

export type PaginationRequest = z.infer<typeof PaginationRequestSchema>;

export type ProductCategoryResponse = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

export type ProductCategoryListItemResponse = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type DeleteProductCategoryResponse = Record<string, never>;
