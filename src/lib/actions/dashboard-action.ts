"use server";

import { newDashboardRepository } from "../repositorys/dashboard-repository";

export async function getDashboard(token: string) {
  const dashboardRepository = newDashboardRepository();
  return await dashboardRepository.getDashboardRepository(token);
}
