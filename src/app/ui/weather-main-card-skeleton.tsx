import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function WeatherMainCardSkeleton() {
  return (
    <Card className="p-9">
      <div className="mb-8 flex flex-col-reverse items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <Skeleton className="h-14 w-32" />
          <Skeleton className="mt-2 h-8 w-48" />
        </div>
        <Skeleton className="size-36 md:size-20" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex items-center">
          <Skeleton className="mr-2 size-6" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex items-center">
          <Skeleton className="mr-2 size-6" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex items-center">
          <Skeleton className="mr-2 size-6" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex items-center">
          <Skeleton className="mr-2 size-6" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </Card>
  );
} 