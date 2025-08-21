import { ProductRepository } from "../interfaces/product-interface";
import {
  createProductRest,
  getProductByIdRest,
  updateProductRest,
  deleteProductRest,
  getProductsListRest,
} from "../services/product-services";
import {
  ProductResponse,
  DeleteProductResponse,
  ProductListItemResponse,
  CreateProductRequest,
  UpdateProductRequest,
  PaginationRequest,
} from "../validations/product-validation";

export class RestProductRepository implements ProductRepository {
  async createProduct(
    token: string,
    data: CreateProductRequest
  ): Promise<APIResponse<ProductResponse | null>> {
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
    return createProductRest(token, data);
  }

  async getProductById(
    token: string,
    id: string
  ): Promise<APIResponse<ProductResponse | null>> {
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
    return getProductByIdRest(token, id);
  }

  async updateProduct(
    token: string,
    id: string,
    data: UpdateProductRequest
  ): Promise<APIResponse<ProductResponse | null>> {
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
    return updateProductRest(token, id, data);
  }

  async deleteProduct(
    token: string,
    id: string
  ): Promise<APIResponse<DeleteProductResponse | null>> {
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
    return deleteProductRest(token, id);
  }

  async getProductsList(
    token: string,
    query?: PaginationRequest
  ): Promise<APIResponse<ProductListItemResponse[] | null>> {
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
    return getProductsListRest(token, query);
  }
}

export function newProductRepository(): ProductRepository {
  return new RestProductRepository();
}
