import {
  CreateProductCategoryRequest,
  ProductCategoryResponse,
  UpdateProductCategoryRequest,
  DeleteProductCategoryResponse,
  ProductCategoryListItemResponse,
} from "../validations/product-categories-validation";
import { PaginationRequest } from "../validations/product-validation";

export interface ProductCategoryRepository {
  createProductCategory(
    token: string,
    data: CreateProductCategoryRequest
  ): Promise<APIResponse<ProductCategoryResponse | null>>;

  getProductCategoryById(
    token: string,
    id: string
  ): Promise<APIResponse<ProductCategoryResponse | null>>;

  updateProductCategory(
    token: string,
    id: string,
    data: UpdateProductCategoryRequest
  ): Promise<APIResponse<ProductCategoryResponse | null>>;

  deleteProductCategory(
    token: string,
    id: string
  ): Promise<APIResponse<DeleteProductCategoryResponse | null>>;

  getProductCategoriesList(
    token: string,
    query?: PaginationRequest
  ): Promise<APIResponse<ProductCategoryListItemResponse[] | null>>;
}
