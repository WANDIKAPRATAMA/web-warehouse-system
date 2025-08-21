import { z } from "zod";

export const CreateProductStockRequestSchema = z.object({
  product_id: z.uuid(),
  warehouse_location_id: z.uuid(),
  quantity: z.number().int().min(0),
});

export type CreateProductStockRequest = z.infer<
  typeof CreateProductStockRequestSchema
>;

export const UpdateProductStockRequestSchema = z.object({
  quantity: z.number().int().min(0),
});

export type UpdateProductStockRequest = z.infer<
  typeof UpdateProductStockRequestSchema
>;

export const PaginationRequestSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
});

export type PaginationRequest = z.infer<typeof PaginationRequestSchema>;

export type ProductStockResponse = {
  id: string;
  product_id: string;
  warehouse_location_id: string;
  quantity: number;
  status: string;
  updated_at: string;
};

export type ProductStockListItemResponse = {
  id: string;
  product_id: string;
  product_name: string;
  warehouse_location_id: string;
  warehouse_name: string;
  quantity: number;
  status: string;
  updated_at: string;
};

export type DeleteProductStockResponse = Record<string, never>;
