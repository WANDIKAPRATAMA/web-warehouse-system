import { DashboardResponse } from "../validations/dashboard-validation";

export interface DashboardRepository {
  getDashboardRepository(
    token: string
  ): Promise<APIResponse<DashboardResponse | null>>;
}
