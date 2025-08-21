import { newProductCategoryRepository } from "../repositorys/product-categories-repository";
import {
  CreateProductCategoryRequest,
  ProductCategoryResponse,
  UpdateProductCategoryRequest,
  DeleteProductCategoryResponse,
  ProductCategoryListItemResponse,
} from "../validations/product-categories-validation";
import { PaginationRequest } from "../validations/product-validation";

export async function createProductCategoryAction(
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
  const repo = newProductCategoryRepository();
  return repo.createProductCategory(token, data);
}

export async function getProductCategoryByIdAction(
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
  const repo = newProductCategoryRepository();
  return repo.getProductCategoryById(token, id);
}

export async function updateProductCategoryAction(
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
  const repo = newProductCategoryRepository();
  return repo.updateProductCategory(token, id, data);
}

export async function deleteProductCategoryAction(
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
  const repo = newProductCategoryRepository();
  return repo.deleteProductCategory(token, id);
}

export async function getProductCategoriesListAction(
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
  const repo = newProductCategoryRepository();
  return repo.getProductCategoriesList(token, query);
}
