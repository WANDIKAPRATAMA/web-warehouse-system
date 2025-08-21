import { newWarehouseLocationRepository } from "../repositorys/warehouse-location-repository";
import { PaginationRequest } from "../validations/product-validation";
import {
  CreateWarehouseLocationRequest,
  WarehouseLocationResponse,
  UpdateWarehouseLocationRequest,
  DeleteWarehouseLocationResponse,
  WarehouseLocationListItemResponse,
} from "../validations/warehouse-validation";

export async function createWarehouseLocationAction(
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
  const repo = newWarehouseLocationRepository();
  return repo.createWarehouseLocation(token, data);
}

export async function getWarehouseLocationByIdAction(
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
  const repo = newWarehouseLocationRepository();
  return repo.getWarehouseLocationById(token, id);
}

export async function updateWarehouseLocationAction(
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
  const repo = newWarehouseLocationRepository();
  return repo.updateWarehouseLocation(token, id, data);
}

export async function deleteWarehouseLocationAction(
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
  const repo = newWarehouseLocationRepository();
  return repo.deleteWarehouseLocation(token, id);
}

export async function getWarehouseLocationsListAction(
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
  const repo = newWarehouseLocationRepository();
  return repo.getWarehouseLocationsList(token, query);
}
