// products-interface.ts

import {
  CreateProductRequest,
  ProductResponse,
  UpdateProductRequest,
  DeleteProductResponse,
  PaginationRequest,
  ProductListItemResponse,
} from "../validations/product-validation";

export interface ProductRepository {
  createProduct(
    token: string,
    data: CreateProductRequest
  ): Promise<APIResponse<ProductResponse | null>>;

  getProductById(
    token: string,
    id: string
  ): Promise<APIResponse<ProductResponse | null>>;

  updateProduct(
    token: string,
    id: string,
    data: UpdateProductRequest
  ): Promise<APIResponse<ProductResponse | null>>;

  deleteProduct(
    token: string,
    id: string
  ): Promise<APIResponse<DeleteProductResponse | null>>;

  getProductsList(
    token: string,
    query?: PaginationRequest
  ): Promise<APIResponse<ProductListItemResponse[] | null>>;
}
