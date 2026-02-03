import { Skeleton } from '@/components/ui/skeleton';

interface BlogCardSkeletonProps {
  count?: number;
}

export function BlogCardSkeleton({ count = 1 }: BlogCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card-elevated h-full flex flex-col">
          {/* Image skeleton */}
          <Skeleton className="w-full aspect-video rounded-t-lg" />
          
          <div className="p-6 flex flex-col flex-1">
            {/* Category badge */}
            <Skeleton className="h-5 w-20 mb-3" />
            
            {/* Title */}
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4 mb-3" />
            
            {/* Excerpt */}
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            
            {/* Meta */}
            <div className="mt-auto flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

interface CaseStudyCardSkeletonProps {
  count?: number;
}

export function CaseStudyCardSkeleton({ count = 1 }: CaseStudyCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="card-elevated h-full flex flex-col p-6">
          {/* Icon and Industry */}
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div>
              <Skeleton className="h-3 w-20 mb-2" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* Title */}
          <Skeleton className="h-6 w-full mb-3" />

          {/* Context */}
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6 mb-1" />
          <Skeleton className="h-4 w-4/5 mb-4" />

          {/* View Link */}
          <div className="mt-auto">
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      ))}
    </>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12">
      {/* Hero section */}
      <Skeleton className="h-6 w-24 mb-4" />
      <Skeleton className="h-12 w-full mb-2" />
      <Skeleton className="h-12 w-3/4 mb-6" />
      
      {/* Meta */}
      <div className="flex gap-4 mb-8">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
      
      {/* Featured image */}
      <Skeleton className="w-full aspect-video rounded-xl mb-8" />
      
      {/* Content */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
}

export function CaseStudyDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12">
      {/* Hero section */}
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="w-14 h-14 rounded-lg" />
        <div>
          <Skeleton className="h-3 w-24 mb-2" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
      
      <Skeleton className="h-12 w-full mb-2" />
      <Skeleton className="h-12 w-3/4 mb-8" />
      
      {/* Content grid */}
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <Skeleton className="h-4 w-16 mb-3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div>
            <Skeleton className="h-4 w-24 mb-3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <Skeleton className="h-4 w-20 mb-3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
