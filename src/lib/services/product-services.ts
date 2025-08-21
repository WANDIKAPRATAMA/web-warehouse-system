// import { apiFetch, handleZodError } from "./api-base"; // Assume imported from base

import { ZodError } from "zod";
import { apiFetch, handleZodError } from "../utils/fetch";
import {
  CreateProductRequest,
  ProductResponse,
  CreateProductRequestSchema,
  UpdateProductRequest,
  UpdateProductRequestSchema,
  DeleteProductResponse,
  PaginationRequest,
  ProductListItemResponse,
  PaginationRequestSchema,
} from "../validations/product-validation";

export async function createProductRest(
  token: string,
  data: CreateProductRequest
): Promise<APIResponse<ProductResponse | null>> {
  try {
    const validatedData = CreateProductRequestSchema.safeParse(data);
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
    const response = await apiFetch<ProductResponse>(
      "/products",
      "POST",
      { Authorization: `Bearer ${token}` },
      validatedData.data
    );
    if (
      response.status === "error" &&
      response.message.toLowerCase().includes("duplicate")
    ) {
      return {
        ...response,
        payload: {
          ...response.payload,
          errors: [{ field: "sku", message: "Duplicate SKU or key violation" }],
        },
      };
    }
    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ProductResponse>(error);
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

export async function getProductByIdRest(
  token: string,
  id: string
): Promise<APIResponse<ProductResponse | null>> {
  try {
    return apiFetch<ProductResponse>(`/products/${id}`, "GET", {
      Authorization: `Bearer ${token}`,
    });
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

export async function updateProductRest(
  token: string,
  id: string,
  data: UpdateProductRequest
): Promise<APIResponse<ProductResponse | null>> {
  try {
    const validatedData = UpdateProductRequestSchema.safeParse(data);
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
    const response = await apiFetch<ProductResponse>(
      `/products/${id}`,
      "PUT",
      { Authorization: `Bearer ${token}` },
      validatedData.data
    );
    if (
      response.status === "error" &&
      response.message.toLowerCase().includes("duplicate")
    ) {
      return {
        ...response,
        payload: {
          ...response.payload,
          errors: [{ field: "sku", message: "Duplicate SKU or key violation" }],
        },
      };
    }
    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ProductResponse>(error);
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

export async function deleteProductRest(
  token: string,
  id: string
): Promise<APIResponse<DeleteProductResponse | null>> {
  try {
    return apiFetch<DeleteProductResponse>(`/products/${id}`, "DELETE", {
      Authorization: `Bearer ${token}`,
    });
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

export async function getProductsListRest(
  token: string,
  query?: PaginationRequest
): Promise<APIResponse<ProductListItemResponse[] | null>> {
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
    return apiFetch<ProductListItemResponse[]>(
      "/products",
      "GET",
      { Authorization: `Bearer ${token}` },
      undefined,
      {
        page: validatedQuery.data.page.toString(),
        pageSize: validatedQuery.data.limit.toString(),
      }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ProductListItemResponse[]>(error);
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
