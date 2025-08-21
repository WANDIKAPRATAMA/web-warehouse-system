import { DashboardRepository } from "../interfaces/dashboard-interface";
import { getDashboardServices } from "../services/dashboard-service";

class DashboardRestRepository implements DashboardRepository {
  async getDashboardRepository(token: string) {
    return await getDashboardServices(token);
  }
}

export function newDashboardRepository() {
  return new DashboardRestRepository();
}
