import { WarehouseLocationRepository } from "../interfaces/warehouse-location-interfacec";
import {
  createWarehouseLocationRest,
  getWarehouseLocationByIdRest,
  updateWarehouseLocationRest,
  deleteWarehouseLocationRest,
  getWarehouseLocationsListRest,
} from "../services/warehouse-location-service";
import { PaginationRequest } from "../validations/product-validation";
import {
  CreateWarehouseLocationRequest,
  WarehouseLocationResponse,
  UpdateWarehouseLocationRequest,
  DeleteWarehouseLocationResponse,
  WarehouseLocationListItemResponse,
} from "../validations/warehouse-validation";

export class RestWarehouseLocationRepository
  implements WarehouseLocationRepository
{
  async createWarehouseLocation(
    token: string,
    data: CreateWarehouseLocationRequest
  ): Promise<APIResponse<WarehouseLocationResponse | null>> {
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
    return createWarehouseLocationRest(token, data);
  }

  async getWarehouseLocationById(
    token: string,
    id: string
  ): Promise<APIResponse<WarehouseLocationResponse | null>> {
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
    return getWarehouseLocationByIdRest(token, id);
  }

  async updateWarehouseLocation(
    token: string,
    id: string,
    data: UpdateWarehouseLocationRequest
  ): Promise<APIResponse<WarehouseLocationResponse | null>> {
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
    return updateWarehouseLocationRest(token, id, data);
  }

  async deleteWarehouseLocation(
    token: string,
    id: string
  ): Promise<APIResponse<DeleteWarehouseLocationResponse | null>> {
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
    return deleteWarehouseLocationRest(token, id);
  }

  async getWarehouseLocationsList(
    token: string,
    query?: PaginationRequest
  ): Promise<APIResponse<WarehouseLocationListItemResponse[] | null>> {
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
    return getWarehouseLocationsListRest(token, query);
  }
}

export function newWarehouseLocationRepository(): WarehouseLocationRepository {
  return new RestWarehouseLocationRepository();
}
