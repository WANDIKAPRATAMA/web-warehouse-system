import { ProductCategoryRepository } from "../interfaces/product-categories-interface";
import {
  createProductCategoryRest,
  getProductCategoryByIdRest,
  updateProductCategoryRest,
  deleteProductCategoryRest,
  getProductCategoriesListRest,
} from "../services/product-categories-service";
import {
  ProductCategoryResponse,
  DeleteProductCategoryResponse,
  ProductCategoryListItemResponse,
  CreateProductCategoryRequest,
  UpdateProductCategoryRequest,
} from "../validations/product-categories-validation";
import { PaginationRequest } from "../validations/product-validation";

export class RestProductCategoryRepository
  implements ProductCategoryRepository
{
  async createProductCategory(
    token: string,
    data: CreateProductCategoryRequest
  ): Promise<APIResponse<ProductCategoryResponse | null>> {
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
    return createProductCategoryRest(token, data);
  }

  async getProductCategoryById(
    token: string,
    id: string
  ): Promise<APIResponse<ProductCategoryResponse | null>> {
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
    return getProductCategoryByIdRest(token, id);
  }

  async updateProductCategory(
    token: string,
    id: string,
    data: UpdateProductCategoryRequest
  ): Promise<APIResponse<ProductCategoryResponse | null>> {
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
    return updateProductCategoryRest(token, id, data);
  }

  async deleteProductCategory(
    token: string,
    id: string
  ): Promise<APIResponse<DeleteProductCategoryResponse | null>> {
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
    return deleteProductCategoryRest(token, id);
  }

  async getProductCategoriesList(
    token: string,
    query?: PaginationRequest
  ): Promise<APIResponse<ProductCategoryListItemResponse[] | null>> {
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
    return getProductCategoriesListRest(token, query);
  }
}

export function newProductCategoryRepository(): ProductCategoryRepository {
  return new RestProductCategoryRepository();
}
