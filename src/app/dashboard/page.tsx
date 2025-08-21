// app/dashboard/page.tsx

import { BlankComponent } from "@/components/common/place-holder/blank-component";
import ErrorComponent from "@/components/common/place-holder/error-component";
import DashboardClient from "@/components/views/dashboard/dashboard-page";
import { getDashboard } from "@/lib/actions/dashboard-action";
import { authOptions } from "@/lib/services/next-auth-service";
import { DashboardResponse } from "@/lib/validations/dashboard-validation";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <Suspense fallback={<BlankComponent />}>
      <Suspendedd />
    </Suspense>
  );
}
async function Suspendedd() {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken)
    return (
      <div className="p-8 text-center">
        You are not authorized to view this page
      </div>
    );

  let dashboardData: APIResponse<DashboardResponse | null>;
  try {
    dashboardData = await getDashboard(session.accessToken);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return <div className="p-8 text-center">Failed to load dashboard data</div>;
  }
  if (!dashboardData?.payload?.data)
    return (
      <ErrorComponent
        title="Failed to load dashboard data"
        error={dashboardData.message}
      />
    );

  return <DashboardClient data={dashboardData.payload.data} />;
}
