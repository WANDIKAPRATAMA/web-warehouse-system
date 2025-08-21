import { newProductStockRepository } from "../repositorys/product-stock-repository";
import {
  CreateProductStockRequest,
  ProductStockResponse,
  UpdateProductStockRequest,
  DeleteProductStockResponse,
  ProductStockListItemResponse,
} from "../validations/product-stock-validation";
import { PaginationRequest } from "../validations/product-validation";

export async function createProductStockAction(
  token: string,
  data: CreateProductStockRequest
): Promise<APIResponse<ProductStockResponse | null>> {
  if (!token) {
    return {
      status: "error",
      status_code: 401,
      message: "Unauthorized",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
  const repo = newProductStockRepository();
  return repo.createProductStock(token, data);
}

export async function getProductStockByIdAction(
  token: string,
  id: string
): Promise<APIResponse<ProductStockResponse | null>> {
  if (!token) {
    return {
      status: "error",
      status_code: 401,
      message: "Unauthorized",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
  const repo = newProductStockRepository();
  return repo.getProductStockById(token, id);
}

export async function updateProductStockAction(
  token: string,
  id: string,
  data: UpdateProductStockRequest
): Promise<APIResponse<ProductStockResponse | null>> {
  if (!token) {
    return {
      status: "error",
      status_code: 401,
      message: "Unauthorized",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
  const repo = newProductStockRepository();
  return repo.updateProductStock(token, id, data);
}

export async function deleteProductStockAction(
  token: string,
  id: string
): Promise<APIResponse<DeleteProductStockResponse | null>> {
  if (!token) {
    return {
      status: "error",
      status_code: 401,
      message: "Unauthorized",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
  const repo = newProductStockRepository();
  return repo.deleteProductStock(token, id);
}

export async function getProductStocksListAction(
  token: string,
  query?: PaginationRequest
): Promise<APIResponse<ProductStockListItemResponse[] | null>> {
  if (!token) {
    return {
      status: "error",
      status_code: 401,
      message: "Unauthorized",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
  const repo = newProductStockRepository();
  return repo.getProductStocksList(token, query);
}
