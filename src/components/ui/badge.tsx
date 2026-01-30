'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BADGE COMPONENT
 * Status badges with semantic colors
 * ═══════════════════════════════════════════════════════════════════════════
 */

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-medium rounded-md';

    const variants = {
      default: 'bg-background-tertiary text-foreground-secondary border border-border',
      accent: 'bg-accent/15 text-accent',
      success: 'bg-success/15 text-success',
      warning: 'bg-warning/15 text-warning',
      error: 'bg-error/15 text-error',
      info: 'bg-info/15 text-info',
    };

    const sizes = {
      sm: 'px-1.5 py-0.5 text-[10px] leading-tight',
      md: 'px-2 py-0.5 text-label-sm',
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
