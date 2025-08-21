import { ZodError } from "zod";
import { apiFetch, handleZodError } from "../utils/fetch";
import {
  PaginationRequest,
  PaginationRequestSchema,
} from "../validations/product-validation";
import {
  CreateWarehouseLocationRequest,
  WarehouseLocationResponse,
  CreateWarehouseLocationRequestSchema,
  UpdateWarehouseLocationRequest,
  UpdateWarehouseLocationRequestSchema,
  DeleteWarehouseLocationResponse,
  WarehouseLocationListItemResponse,
} from "../validations/warehouse-validation";

export async function createWarehouseLocationRest(
  token: string,
  data: CreateWarehouseLocationRequest
): Promise<APIResponse<WarehouseLocationResponse | null>> {
  try {
    const validatedData = CreateWarehouseLocationRequestSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: "error",
        status_code: 400,
        message: "Validation failed",
        payload: {
          data: null,
          errors: validatedData.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
      };
    }
    return apiFetch<WarehouseLocationResponse>(
      "/warehouse-locations",
      "POST",
      { Authorization: `Bearer ${token}` },
      validatedData.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<WarehouseLocationResponse>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function getWarehouseLocationByIdRest(
  token: string,
  id: string
): Promise<APIResponse<WarehouseLocationResponse | null>> {
  try {
    return apiFetch<WarehouseLocationResponse>(
      `/warehouse-locations/${id}`,
      "GET",
      { Authorization: `Bearer ${token}` }
    );
  } catch (error) {
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function updateWarehouseLocationRest(
  token: string,
  id: string,
  data: UpdateWarehouseLocationRequest
): Promise<APIResponse<WarehouseLocationResponse | null>> {
  try {
    const validatedData = UpdateWarehouseLocationRequestSchema.safeParse(data);
    if (!validatedData.success) {
      return {
        status: "error",
        status_code: 400,
        message: "Validation failed",
        payload: {
          data: null,
          errors: validatedData.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
      };
    }
    return apiFetch<WarehouseLocationResponse>(
      `/warehouse-locations/${id}`,
      "PUT",
      { Authorization: `Bearer ${token}` },
      validatedData.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<WarehouseLocationResponse>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function deleteWarehouseLocationRest(
  token: string,
  id: string
): Promise<APIResponse<DeleteWarehouseLocationResponse | null>> {
  try {
    return apiFetch<DeleteWarehouseLocationResponse>(
      `/warehouse-locations/${id}`,
      "DELETE",
      { Authorization: `Bearer ${token}` }
    );
  } catch (error) {
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}

export async function getWarehouseLocationsListRest(
  token: string,
  query?: PaginationRequest
): Promise<APIResponse<WarehouseLocationListItemResponse[] | null>> {
  try {
    const validatedQuery = PaginationRequestSchema.safeParse(query || {});
    if (!validatedQuery.success) {
      return {
        status: "error",
        status_code: 400,
        message: "Validation failed",
        payload: {
          data: null,
          errors: validatedQuery.error.issues.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
      };
    }
    return apiFetch<WarehouseLocationListItemResponse[]>(
      "/warehouse-locations",
      "GET",
      { Authorization: `Bearer ${token}` },
      undefined,
      {
        page: validatedQuery.data.page.toString(),
        limit: validatedQuery.data.limit.toString(),
        sort_by: "created_at",
        order: "asc",
        status: "available",
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<WarehouseLocationListItemResponse[]>(error);
    }
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}
