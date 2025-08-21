import { Skeleton } from "@/components/ui/skeleton"; // Pastikan path ini sesuai struktur proyekmu

export function ClientsSkeleton() {
  return (
    <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col items-center justify-center relative overflow-hidden">
      <ul className="flex gap-6 flex-nowrap overflow-hidden w-full justify-center">
        {[1, 2, 3].map((_, idx) => (
          <li
            key={idx}
            className="w-[90vw] max-w-full relative rounded-2xl border border-b-0 border-slate-800 p-5 md:p-16 md:w-[60vw]"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
          >
            <blockquote>
              {/* Quote skeleton */}
              <Skeleton className="h-5 w-full mb-2 bg-gray-600/60" />
              <Skeleton className="h-5 w-[95%] mb-2 bg-gray-600/60" />
              <Skeleton className="h-5 w-[90%] mb-4 bg-gray-600/60" />

              {/* Avatar and name/position */}
              <div className="mt-6 flex flex-row items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full bg-gray-500/40" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32 bg-gray-600/60" />
                  <Skeleton className="h-4 w-24 bg-gray-600/40" />
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
}
