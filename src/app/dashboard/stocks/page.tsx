import PaginationControl from "@/components/common/paginations/pagination-control";
import ErrorComponent from "@/components/common/place-holder/error-component";
import TableSkeleton from "@/components/common/skeletons/table-skeleton";
import ProductStockPage from "@/components/views/dashboard/stocks/stocks-page";
import { getProductStocksListAction } from "@/lib/actions/product-stock-action";
import { authOptions } from "@/lib/services/next-auth-service";
import { getServerSession } from "next-auth";
import { Fragment, Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams?: Promise<{ limit: string; page: string }>;
}) {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <Suspended searchParams={searchParams} />
    </Suspense>
  );
}

async function Suspended({
  searchParams,
}: {
  searchParams?: Promise<{ limit: string; page: string }>;
}) {
  const [resolvedParams, resolvedSession] = await Promise.all([
    searchParams,
    getServerSession(authOptions),
  ]);
  const page =
    typeof resolvedParams?.page === "string" &&
    !isNaN(Number(resolvedParams?.page))
      ? Number(resolvedParams?.page)
      : 1;
  const limit =
    typeof resolvedParams?.limit === "string" &&
    !isNaN(Number(resolvedParams?.limit))
      ? Number(resolvedParams?.limit)
      : 10;
  if (!resolvedSession || resolvedSession.error) {
    return (
      <ErrorComponent
        title="You are not authorized to view this page"
        error={
          resolvedSession?.error ??
          new Error("You are not authorized to view this page")
        }
      />
    );
  }

  const response = await getProductStocksListAction(
    resolvedSession?.user?.accessToken as string,
    { page, limit }
  );

  if (response.status !== "success") {
    return (
      <ErrorComponent
        title="Something went wrong"
        error={
          response?.message ??
          new Error("An error occurred while fetching data")
        }
      />
    );
  }
  const paginations = response.payload.pagination as IPagination;
  return (
    <Fragment>
      <ProductStockPage
        init={response.payload.data ?? []}
        token={resolvedSession?.user?.accessToken as string}
      />
      {paginations && (
        <PaginationControl paginations={paginations} limit={limit} />
      )}
    </Fragment>
  );
}
