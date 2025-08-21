import { BentoGrid } from "@/components/atoms/grid";
import { Skeleton } from "@/components/ui/skeleton";

function GridItemSkeleton() {
  return (
    <div
      className="row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4"
      style={{
        background: "rgb(4,7,29)",
        backgroundColor:
          "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
      }}
    >
      {/* Image Skeleton */}
      <div className="relative w-full h-64">
        <Skeleton className="absolute inset-0 w-full h-full object-cover object-center" />
      </div>

      {/* Description + Title Skeleton */}
      <div className="relative flex flex-col px-5 p-5 lg:p-10 space-y-3">
        {/* Description */}
        <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600" />

        {/* Title */}
        <Skeleton className="h-6 w-2/3 bg-gray-400 dark:bg-gray-500 mt-4" />

        {/* Optional Globe or Tech Stack Skeleton Placeholder */}
        <div className="flex gap-2 mt-6">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-8 w-8 rounded-lg bg-[#10132E] opacity-60"
            />
          ))}
        </div>

        {/* Optional Button Skeleton */}
        <div className="mt-6">
          <Skeleton className="h-10 w-40 rounded-md bg-[#161A31]" />
        </div>
      </div>
    </div>
  );
}

export function GridSkeleton() {
  return (
    <section id="about">
      <BentoGrid className="w-full py-20">
        {[1, 2, 3, 4].map((i) => (
          <GridItemSkeleton key={i} />
        ))}
      </BentoGrid>
    </section>
  );
}
