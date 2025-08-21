import { Skeleton } from "@/components/ui/skeleton";
import { Lightbulb } from "lucide-react";

export function ApproachSkeleton() {
  return (
    <section className="w-full py-20">
      {/* Heading Skeleton */}
      <div className="text-center mb-16">
        <Skeleton className="h-10 w-3/4 mx-auto mb-2 bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-8 w-1/2 mx-auto bg-purple-300 dark:bg-purple-900/50" />
      </div>

      {/* Cards Grid */}
      <div className="my-20 flex flex-col lg:flex-row items-center justify-center w-full gap-8">
        {[1, 2, 3].map((phase) => (
          <CardCustomSkeleton key={phase} phaseNumber={phase} />
        ))}
      </div>
    </section>
  );
}

function CardCustomSkeleton({ phaseNumber }: { phaseNumber: number }) {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] max-w-sm w-full mx-auto p-4 relative lg:h-[35rem] rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Phase Icon Skeleton */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Skeleton className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
      </div>

      {/* Hidden Content (appears on hover in real component) */}
      <div className="relative z-20 px-10 opacity-100">
        {/* Title Skeleton */}
        <Skeleton className="h-8 w-3/4 mx-auto mt-4 bg-gray-300 dark:bg-gray-600" />

        {/* Description Skeleton */}
        <div className="mt-6 space-y-2">
          <Skeleton className="h-4 w-full bg-gray-300/80 dark:bg-gray-600/80" />
          <Skeleton className="h-4 w-5/6 bg-gray-300/80 dark:bg-gray-600/80" />
          <Skeleton className="h-4 w-4/6 bg-gray-300/80 dark:bg-gray-600/80" />
        </div>
      </div>

      {/* Background Effect Placeholder */}
      <div
        className={`absolute inset-0 rounded-3xl overflow-hidden ${
          phaseNumber === 1
            ? "bg-emerald-900/30"
            : phaseNumber === 2
            ? "bg-pink-900/30"
            : "bg-purple-900/30"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50" />
      </div>
    </div>
  );
}

export function EmptyApproachState() {
  return (
    <section className="w-full py-20 text-center">
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full p-6 inline-block mb-6">
        <Lightbulb className="w-16 h-16 text-purple-600 dark:text-purple-400" />
      </div>

      <h2 className="text-3xl font-bold mb-3">Our Approach</h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
        We're currently preparing our unique methodology. Check back soon to
        learn about our innovative approach.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="bg-purple-100 dark:bg-purple-900/30 rounded-full p-3 inline-block mb-4">
              <Skeleton className="h-8 w-8 rounded-full bg-purple-300 dark:bg-purple-600" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-3 bg-gray-300 dark:bg-gray-600" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
              <Skeleton className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
