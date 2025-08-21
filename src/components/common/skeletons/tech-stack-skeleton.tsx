import { Skeleton } from "@/components/ui/skeleton";
import { Code } from "lucide-react";

export function TechStackSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-16 max-lg:mt-10 overflow-hidden">
      {/* Infinite Moving Cards Skeleton */}
      <div className="flex gap-4 md:gap-16 animate-pulse">
        {[...Array(8)].map((_, index) => (
          <div
            key={`tech-skeleton-${index}`}
            className="flex flex-row md:max-w-60 max-w-32 gap-2 items-center justify-center"
          >
            {/* Logo Placeholder */}
            <Skeleton className="md:w-10 w-5 md:h-10 h-5 rounded-full" />

            {/* Tech Name Placeholder */}
            <Skeleton className="h-5 md:h-6 w-16 md:w-24 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function EmptyTechStackState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full p-4 inline-block">
        <Code className="w-8 h-8 text-purple-600 dark:text-purple-400" />
      </div>

      <h3 className="text-xl font-medium">Tech Stack Coming Soon</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md">
        We're currently curating our technology stack. Check back later to see
        what powers our platform.
      </p>
    </div>
  );
}
