import { ProductStockRepository } from "../interfaces/product-stock-interface";
import {
  createProductStockRest,
  getProductStockByIdRest,
  updateProductStockRest,
  deleteProductStockRest,
  getProductStocksListRest,
} from "../services/product-stock-service";
import {
  CreateProductStockRequest,
  ProductStockResponse,
  UpdateProductStockRequest,
  DeleteProductStockResponse,
  ProductStockListItemResponse,
} from "../validations/product-stock-validation";
import { PaginationRequest } from "../validations/product-validation";

export class RestProductStockRepository implements ProductStockRepository {
  async createProductStock(
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
    return createProductStockRest(token, data);
  }

  async getProductStockById(
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
    return getProductStockByIdRest(token, id);
  }

  async updateProductStock(
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
    return updateProductStockRest(token, id, data);
  }

  async deleteProductStock(
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
    return deleteProductStockRest(token, id);
  }

  async getProductStocksList(
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
    return getProductStocksListRest(token, query);
  }
}

export function newProductStockRepository(): ProductStockRepository {
  return new RestProductStockRepository();
}
