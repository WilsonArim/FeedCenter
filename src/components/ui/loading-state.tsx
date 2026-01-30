'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * LOADING STATE COMPONENT
 * Loading indicators and spinners
 * ═══════════════════════════════════════════════════════════════════════════
 */

interface LoadingStateProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingState({ text, size = 'md', className }: LoadingStateProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-12', className)}>
      <LoadingSpinner size={size} />
      {text && (
        <p className="text-body-sm text-foreground-secondary animate-pulse">{text}</p>
      )}
    </div>
  );
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={cn('relative', sizes[size], className)}>
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-border" />
      {/* Spinning indicator */}
      <div
        className={cn(
          'absolute inset-0 rounded-full border-2 border-transparent border-t-accent animate-spin'
        )}
      />
    </div>
  );
}

/**
 * Dots loading animation
 */
export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce"
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}

/**
 * Full page loading overlay
 */
export function LoadingOverlay({ text = 'A carregar...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-border" />
          <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-transparent border-t-accent animate-spin" />
        </div>
        <p className="text-body-md text-foreground-secondary">{text}</p>
      </div>
    </div>
  );
}

/**
 * Skeleton pulse for cards
 */
export function LoadingPulse({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-lg bg-background-tertiary animate-pulse',
        className
      )}
    />
  );
}
