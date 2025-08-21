"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useMemo, useCallback, startTransition } from "react";

export const PaginationAction = ({
  pagination,
}: {
  pagination: IPagination;
}) => {
  const totalPages = pagination.total_pages;
  const maxVisiblePages = 5;

  const { push, replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Hitung rentang halaman hanya saat currentPage atau totalPages berubah
  const [startPage, endPage] = useMemo(() => {
    let start = Math.max(
      1,
      pagination.current_page - Math.floor(maxVisiblePages / 2)
    );
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return [start, end];
  }, [pagination.current_page, totalPages]);

  // Fungsi updateSearchParams hanya dibuat ulang saat searchParams atau pathname berubah
  const updateSearchParams = useCallback(
    (newParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    },
    [searchParams, pathname, replace]
  );

  // Callback ganti halaman
  const onPageChange = useCallback(
    (page: number) => {
      updateSearchParams({ page: page.toString() });
    },
    [updateSearchParams]
  );
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (pagination.current_page > 1)
                onPageChange(pagination.current_page - 1);
            }}
            isActive={pagination.current_page > 1}
          />
        </PaginationItem>

        {startPage > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(1);
              }}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {startPage > 2 && (
          <PaginationItem>
            <span className="px-4">...</span>
          </PaginationItem>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <PaginationItem key={startPage + i}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(startPage + i);
              }}
              isActive={pagination.current_page === startPage + i}
            >
              {startPage + i}
            </PaginationLink>
          </PaginationItem>
        ))}

        {endPage < totalPages - 1 && (
          <PaginationItem>
            <span className="px-4">...</span>
          </PaginationItem>
        )}

        {endPage < totalPages && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onPageChange(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (pagination.current_page < totalPages)
                onPageChange(pagination.current_page + 1);
            }}
            isActive={pagination.current_page < totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
