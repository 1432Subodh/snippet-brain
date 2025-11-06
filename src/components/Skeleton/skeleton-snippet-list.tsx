import { Skeleton } from "@/components/ui/skeleton";


function SnippetListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden border-b border-border/40 bg-card/50 backdrop-blur-sm p-4 flex flex-col gap-3 animate-pulse"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-10 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
              <Skeleton className="h-5 w-3/4 rounded" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-12 rounded" />
            <Skeleton className="h-4 w-10 rounded" />
            <Skeleton className="h-4 w-6 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SnippetListSkeleton