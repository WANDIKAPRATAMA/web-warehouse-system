import { PaginationRequest } from "../validations/product-validation";
import {
  CreateWarehouseLocationRequest,
  WarehouseLocationResponse,
  UpdateWarehouseLocationRequest,
  DeleteWarehouseLocationResponse,
  WarehouseLocationListItemResponse,
} from "../validations/warehouse-validation";

export interface WarehouseLocationRepository {
  createWarehouseLocation(
    token: string,
    data: CreateWarehouseLocationRequest
  ): Promise<APIResponse<WarehouseLocationResponse | null>>;

  getWarehouseLocationById(
    token: string,
    id: string
  ): Promise<APIResponse<WarehouseLocationResponse | null>>;

  updateWarehouseLocation(
    token: string,
    id: string,
    data: UpdateWarehouseLocationRequest
  ): Promise<APIResponse<WarehouseLocationResponse | null>>;

  deleteWarehouseLocation(
    token: string,
    id: string
  ): Promise<APIResponse<DeleteWarehouseLocationResponse | null>>;

  getWarehouseLocationsList(
    token: string,
    query?: PaginationRequest
  ): Promise<APIResponse<WarehouseLocationListItemResponse[] | null>>;
}
