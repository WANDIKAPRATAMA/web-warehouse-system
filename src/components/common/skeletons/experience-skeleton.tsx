import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase } from "lucide-react";

export function ExperienceSkeleton() {
  return (
    <div className="py-20 w-full animate-pulse">
      {/* Heading Skeleton */}
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-3/4 mx-auto mb-2 bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-8 w-1/2 mx-auto bg-purple-300 dark:bg-purple-900/50" />
      </div>

      {/* Experience Cards Grid */}
      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {[...Array(4)].map((_, index) => (
          <div
            key={`exp-skeleton-${index}`}
            className="relative p-[1px] overflow-hidden rounded-[1.75rem]"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: "calc(1.75rem * 0.96)",
            }}
          >
            {/* Moving Border Placeholder */}
            <div className="absolute inset-0 rounded-[1.75rem] bg-gradient-to-r from-purple-900/30 to-blue-900/30 animate-pulse" />

            {/* Card Content */}
            <div className="relative bg-slate-900/[0.8] border border-slate-800 backdrop-blur-xl rounded-[calc(1.75rem*0.96)] p-3 py-6 md:p-5 lg:p-10 h-full">
              <div className="flex lg:flex-row flex-col lg:items-center gap-4">
                {/* Company Logo - 3 versions for responsive */}
                <div className="flex gap-4 lg:gap-0">
                  <Skeleton className="lg:w-32 lg:h-24 w-20 h-16 rounded-lg hidden lg:block" />
                  <Skeleton className="w-20 h-16 rounded-lg hidden md:block lg:hidden" />
                  <Skeleton className="w-16 h-12 rounded-lg block md:hidden" />
                </div>

                {/* Text Content */}
                <div className="lg:ms-5 flex-1">
                  <Skeleton className="h-6 w-3/4 mb-3 bg-gray-300 dark:bg-gray-600" />
                  <Skeleton className="h-4 w-full mb-2 bg-gray-300/80 dark:bg-gray-600/80" />
                  <Skeleton className="h-4 w-5/6 bg-gray-300/80 dark:bg-gray-600/80" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyExperienceState() {
  return (
    <div className="py-20 w-full text-center">
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full p-6 inline-block mb-6">
        <Briefcase className="w-16 h-16 text-purple-600 dark:text-purple-400" />
      </div>

      <h1 className="text-3xl font-bold mb-3">Work Experience</h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
        My professional journey is being prepared. Check back soon to explore my
        career path.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700"
          >
            <Skeleton className="w-24 h-24 mx-auto rounded-lg bg-gray-200 dark:bg-gray-700 mb-4" />
            <Skeleton className="h-6 w-3/4 mx-auto mb-3 bg-gray-300 dark:bg-gray-600" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
