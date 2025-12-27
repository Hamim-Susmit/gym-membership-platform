import { Skeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-6 w-44" />
      <Skeleton className="h-40" />
    </div>
  );
}
