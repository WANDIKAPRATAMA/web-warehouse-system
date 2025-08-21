import { apiFetch } from "../utils/fetch";
import { DashboardResponse } from "../validations/dashboard-validation";

export async function getDashboardServices(
  token: string
): Promise<APIResponse<DashboardResponse | null>> {
  try {
    return apiFetch<DashboardResponse>("/dashboard/", "GET", {
      Authorization: `Bearer ${token}`,
    });
  } catch (error) {
    return {
      status: "error",
      status_code: 500,
      message: "Unexpected server error",
      payload: {
        data: null,
        errors: [],
      },
    };
  }
}
