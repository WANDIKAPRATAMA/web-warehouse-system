import { Skeleton } from "@/components/ui/skeleton";

export function FloatingNavSkeleton() {
  return (
    <div
      className="flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-5 rounded-lg border border-black/.1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] items-center justify-center space-x-4"
      style={{
        backdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "rgba(17, 25, 40, 0.75)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.125)",
      }}
    >
      {[...Array(5)].map((_, idx) => (
        <div
          key={`nav-skeleton-${idx}`}
          className="relative flex items-center space-x-1"
        >
          {/* Icon placeholder (hidden on mobile) */}
          <Skeleton className="h-5 w-5 rounded-full block sm:hidden" />

          {/* Text placeholder */}
          <Skeleton className="h-4 w-16 sm:w-20 rounded-md" />
        </div>
      ))}
    </div>
  );
}

// Versi alternatif dengan animasi lebih halus
export function AnimatedNavbarSkeletonV2() {
  return (
    <div className="flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-8 py-4 rounded-lg bg-gray-900/80 backdrop-blur-sm border border-gray-800 shadow-lg items-center justify-center gap-6">
      {[...Array(5)].map((_, idx) => (
        <div key={`nav-skeleton-${idx}`} className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full hidden sm:block" />
          <Skeleton className="h-4 w-[60px] sm:w-[80px] rounded-full" />
        </div>
      ))}
    </div>
  );
}
