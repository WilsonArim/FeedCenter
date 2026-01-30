'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SKELETON COMPONENT
 * Loading placeholder with shimmer effect
 * ═══════════════════════════════════════════════════════════════════════════
 */

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circular' | 'text';
}

function Skeleton({ className, variant = 'default', ...props }: SkeletonProps) {
  const variants = {
    default: 'rounded-lg',
    circular: 'rounded-full',
    text: 'rounded-md h-4',
  };

  return (
    <div
      className={cn(
        'shimmer',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

// Pre-built skeleton patterns
function SkeletonCard() {
  return (
    <div className="card-base p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-16" />
      </div>
      <Skeleton className="h-10 w-32" />
      <div className="space-y-2">
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-3/4" />
      </div>
    </div>
  );
}

function SkeletonTableRow() {
  return (
    <div className="flex items-center gap-4 py-3 px-4 border-b border-border">
      <Skeleton variant="circular" className="h-8 w-8" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" className="w-32" />
        <Skeleton variant="text" className="w-20" />
      </div>
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-16" />
    </div>
  );
}

function SkeletonChart({ height = 200 }: { height?: number }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-32" />
      </div>
      <Skeleton className="w-full" style={{ height }} />
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonTableRow, SkeletonChart };
