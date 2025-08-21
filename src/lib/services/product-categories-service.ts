import { ZodError } from "zod";
import { apiFetch, handleZodError } from "../utils/fetch";
import {
  CreateProductCategoryRequest,
  ProductCategoryResponse,
  CreateProductCategoryRequestSchema,
  UpdateProductCategoryRequest,
  UpdateProductCategoryRequestSchema,
  DeleteProductCategoryResponse,
  ProductCategoryListItemResponse,
} from "../validations/product-categories-validation";
import {
  PaginationRequest,
  PaginationRequestSchema,
} from "../validations/product-validation";

export async function createProductCategoryRest(
  token: string,
  data: CreateProductCategoryRequest
): Promise<APIResponse<ProductCategoryResponse | null>> {
  try {
    const validatedData = CreateProductCategoryRequestSchema.safeParse(data);
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
    return apiFetch<ProductCategoryResponse>(
      "/product-categories",
      "POST",
      { Authorization: `Bearer ${token}` },
      validatedData.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ProductCategoryResponse>(error);
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

export async function getProductCategoryByIdRest(
  token: string,
  id: string
): Promise<APIResponse<ProductCategoryResponse | null>> {
  try {
    return apiFetch<ProductCategoryResponse>(
      `/product-categories/${id}`,
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

export async function updateProductCategoryRest(
  token: string,
  id: string,
  data: UpdateProductCategoryRequest
): Promise<APIResponse<ProductCategoryResponse | null>> {
  try {
    const validatedData = UpdateProductCategoryRequestSchema.safeParse(data);
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
    return apiFetch<ProductCategoryResponse>(
      `/product-categories/${id}`,
      "PUT",
      { Authorization: `Bearer ${token}` },
      validatedData.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ProductCategoryResponse>(error);
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

export async function deleteProductCategoryRest(
  token: string,
  id: string
): Promise<APIResponse<DeleteProductCategoryResponse | null>> {
  try {
    return apiFetch<DeleteProductCategoryResponse>(
      `/product-categories/${id}`,
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

export async function getProductCategoriesListRest(
  token: string,
  query?: PaginationRequest
): Promise<APIResponse<ProductCategoryListItemResponse[] | null>> {
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
    return apiFetch<ProductCategoryListItemResponse[]>(
      "/product-categories",
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
      return handleZodError<ProductCategoryListItemResponse[]>(error);
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
