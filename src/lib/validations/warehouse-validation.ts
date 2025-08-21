import { z } from "zod";

export const CreateWarehouseLocationRequestSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export type CreateWarehouseLocationRequest = z.infer<
  typeof CreateWarehouseLocationRequestSchema
>;

export const UpdateWarehouseLocationRequestSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
});

export type UpdateWarehouseLocationRequest = z.infer<
  typeof UpdateWarehouseLocationRequestSchema
>;

export const PaginationRequestSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
});

export type PaginationRequest = z.infer<typeof PaginationRequestSchema>;

export type WarehouseLocationResponse = {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type WarehouseLocationListItemResponse = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

export type DeleteWarehouseLocationResponse = Record<string, never>;
