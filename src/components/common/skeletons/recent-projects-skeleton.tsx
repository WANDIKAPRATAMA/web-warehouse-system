import { Skeleton } from "@/components/ui/skeleton";
import { FolderOpen } from "lucide-react";

export function RecentProjectsSkeleton() {
  return (
    <div className="py-20 animate-pulse">
      {/* Heading Skeleton */}
      <div className="text-center mb-16">
        <Skeleton className="h-10 w-3/4 mx-auto mb-2 bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-8 w-1/2 mx-auto bg-purple-300 dark:bg-purple-900/50" />
      </div>

      {/* Projects Grid Skeleton */}
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {[...Array(3)].map((_, index) => (
          <div
            key={`project-skeleton-${index}`}
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
          >
            <div className="relative w-full h-full">
              {/* Project Image Placeholder */}
              <div className="relative sm:w-96 w-[80vw] h-[20vh] lg:h-[30vh] mb-10 overflow-hidden rounded-3xl bg-gray-800 dark:bg-gray-700">
                <Skeleton className="absolute inset-0 w-full h-full" />
              </div>

              {/* Title Placeholder */}
              <Skeleton className="h-6 w-3/4 mb-2 bg-gray-300 dark:bg-gray-600" />

              {/* Description Placeholder */}
              <div className="space-y-2 mb-6">
                <Skeleton className="h-4 w-full bg-gray-300/80 dark:bg-gray-600/80" />
                <Skeleton className="h-4 w-5/6 bg-gray-300/80 dark:bg-gray-600/80" />
              </div>

              {/* Tech Icons & Link Placeholder */}
              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={`icon-${i}`}
                      className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      style={{
                        transform: `translateX(-${5 * i + 2}px)`,
                      }}
                    >
                      <Skeleton className="w-6 h-6 rounded-full bg-gray-500 dark:bg-gray-400" />
                    </div>
                  ))}
                </div>

                <div className="flex items-center">
                  <Skeleton className="h-4 w-24 bg-purple-300 dark:bg-purple-900/50" />
                  <Skeleton className="w-4 h-4 ml-3 rounded-full bg-purple-300 dark:bg-purple-900/50" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyProjectsState() {
  return (
    <div className="py-20 text-center">
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full p-6 inline-block mb-6">
        <FolderOpen className="w-16 h-16 text-purple-600 dark:text-purple-400" />
      </div>

      <h1 className="text-3xl font-bold mb-3">Recent Projects</h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
        We're currently preparing our portfolio. Check back soon to see our
        latest work.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <Skeleton className="w-full h-48 rounded-lg bg-gray-200 dark:bg-gray-700 mb-4" />
            <Skeleton className="h-6 w-3/4 mb-3 bg-gray-300 dark:bg-gray-600" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700" />
            </div>
            <div className="flex mt-4 gap-2">
              {[...Array(3)].map((_, j) => (
                <Skeleton
                  key={j}
                  className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
