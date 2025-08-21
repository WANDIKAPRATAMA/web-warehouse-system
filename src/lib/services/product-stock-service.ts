import { ZodError } from "zod";
import { apiFetch, handleZodError } from "../utils/fetch";
import {
  CreateProductStockRequest,
  ProductStockResponse,
  CreateProductStockRequestSchema,
  UpdateProductStockRequest,
  UpdateProductStockRequestSchema,
  DeleteProductStockResponse,
  ProductStockListItemResponse,
} from "../validations/product-stock-validation";
import {
  PaginationRequest,
  PaginationRequestSchema,
} from "../validations/product-validation";

export async function createProductStockRest(
  token: string,
  data: CreateProductStockRequest
): Promise<APIResponse<ProductStockResponse | null>> {
  try {
    const validatedData = CreateProductStockRequestSchema.safeParse(data);
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
    const response = await apiFetch<ProductStockResponse>(
      "/product-stocks",
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
          errors: [
            {
              field: "product_id",
              message: "Duplicate stock entry for product and warehouse",
            },
          ],
        },
      };
    }
    return response;
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ProductStockResponse>(error);
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

export async function getProductStockByIdRest(
  token: string,
  id: string
): Promise<APIResponse<ProductStockResponse | null>> {
  try {
    return apiFetch<ProductStockResponse>(`/product-stocks/${id}`, "GET", {
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

export async function updateProductStockRest(
  token: string,
  id: string,
  data: UpdateProductStockRequest
): Promise<APIResponse<ProductStockResponse | null>> {
  try {
    const validatedData = UpdateProductStockRequestSchema.safeParse(data);
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
    return apiFetch<ProductStockResponse>(
      `/product-stocks/${id}`,
      "PUT",
      { Authorization: `Bearer ${token}` },
      validatedData.data
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleZodError<ProductStockResponse>(error);
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

export async function deleteProductStockRest(
  token: string,
  id: string
): Promise<APIResponse<DeleteProductStockResponse | null>> {
  try {
    return apiFetch<DeleteProductStockResponse>(
      `/product-stocks/${id}`,
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

export async function getProductStocksListRest(
  token: string,
  query?: PaginationRequest
): Promise<APIResponse<ProductStockListItemResponse[] | null>> {
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
    return apiFetch<ProductStockListItemResponse[]>(
      "/product-stocks",
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
      return handleZodError<ProductStockListItemResponse[]>(error);
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
