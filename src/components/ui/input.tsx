'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * INPUT COMPONENT
 * Form input with search variant
 * ═══════════════════════════════════════════════════════════════════════════
 */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search';
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = 'default', error, ...props }, ref) => {
    const baseStyles = cn(
      'flex w-full rounded-lg bg-background-secondary border text-foreground',
      'placeholder:text-foreground-muted',
      'transition-all duration-200',
      'focus:outline-none focus:ring-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      error
        ? 'border-error focus:border-error focus:ring-error'
        : 'border-border focus:border-accent focus:ring-accent'
    );

    if (variant === 'search') {
      return (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground-muted" />
          <input
            type={type}
            className={cn(
              baseStyles,
              'h-10 pl-10 pr-4 text-body-sm',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1.5">
        <input
          type={type}
          className={cn(
            baseStyles,
            'h-10 px-3 text-body-sm',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="text-label-sm text-error">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
