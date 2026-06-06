import * as React from 'react';
import { cn } from '@/lib/utils';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('shimmer animate-shimmer rounded-xs bg-muted', className)}
      {...props}
    />
  )
);
Skeleton.displayName = 'Skeleton';

const CollegeCardSkeleton = () => (
  <div className="flex flex-col space-y-lg rounded-md border border-border bg-card p-lg shadow-elevation-2">
    <div className="flex items-start justify-between">
      <div className="space-y-sm">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-6 w-10" />
    </div>
    <div className="flex gap-sm">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-14" />
    </div>
    <div className="flex items-center justify-between">
      <div className="space-y-xs">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="flex items-center gap-xs">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-5 w-8" />
      </div>
    </div>
    <div className="flex gap-sm pt-lg">
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-10 w-10" />
    </div>
  </div>
);

const StatsCardSkeleton = () => (
  <div className="rounded-md border border-border bg-card p-lg shadow-elevation-2">
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-5 w-5" />
    </div>
    <Skeleton className="mt-sm h-7 w-20" />
  </div>
);

export { Skeleton, CollegeCardSkeleton, StatsCardSkeleton };
