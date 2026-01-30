'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * BUTTON COMPONENT
 * Premium button with multiple variants
 * ═══════════════════════════════════════════════════════════════════════════
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      'disabled:opacity-50 disabled:pointer-events-none',
      'active:scale-[0.98]'
    );

    const variants = {
      primary: cn(
        'bg-gradient-to-r from-accent to-accent-secondary text-white',
        'hover:opacity-90 hover:shadow-glow-accent'
      ),
      secondary: cn(
        'bg-background-tertiary text-foreground border border-border',
        'hover:bg-background-elevated hover:border-border-secondary'
      ),
      ghost: cn(
        'text-foreground-secondary bg-transparent',
        'hover:bg-background-tertiary hover:text-foreground'
      ),
      danger: cn(
        'bg-error/10 text-error border border-error/20',
        'hover:bg-error/20 hover:border-error/30'
      ),
      success: cn(
        'bg-success/10 text-success border border-success/20',
        'hover:bg-success/20 hover:border-success/30'
      ),
    };

    const sizes = {
      sm: 'h-8 px-3 text-body-sm rounded-md',
      md: 'h-10 px-4 text-body-sm rounded-lg',
      lg: 'h-12 px-6 text-body-md rounded-lg',
      icon: 'h-10 w-10 rounded-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>A carregar...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
