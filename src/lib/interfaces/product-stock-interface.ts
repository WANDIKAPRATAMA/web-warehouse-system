import {
  CreateProductStockRequest,
  ProductStockResponse,
  UpdateProductStockRequest,
  DeleteProductStockResponse,
  ProductStockListItemResponse,
} from "../validations/product-stock-validation";
import { PaginationRequest } from "../validations/product-validation";

export interface ProductStockRepository {
  createProductStock(
    token: string,
    data: CreateProductStockRequest
  ): Promise<APIResponse<ProductStockResponse | null>>;

  getProductStockById(
    token: string,
    id: string
  ): Promise<APIResponse<ProductStockResponse | null>>;

  updateProductStock(
    token: string,
    id: string,
    data: UpdateProductStockRequest
  ): Promise<APIResponse<ProductStockResponse | null>>;

  deleteProductStock(
    token: string,
    id: string
  ): Promise<APIResponse<DeleteProductStockResponse | null>>;

  getProductStocksList(
    token: string,
    query?: PaginationRequest
  ): Promise<APIResponse<ProductStockListItemResponse[] | null>>;
}
