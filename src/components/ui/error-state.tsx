'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { AlertTriangle, RefreshCw, WifiOff, ServerCrash } from 'lucide-react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ERROR STATE COMPONENT
 * Error display with retry option
 * ═══════════════════════════════════════════════════════════════════════════
 */

interface ErrorStateProps {
  title?: string;
  message?: string;
  variant?: 'default' | 'network' | 'server';
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Algo correu mal',
  message = 'Ocorreu um erro ao carregar os dados.',
  variant = 'default',
  onRetry,
  className,
}: ErrorStateProps) {
  const icons = {
    default: AlertTriangle,
    network: WifiOff,
    server: ServerCrash,
  };

  const Icon = icons[variant];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-6 text-center',
        className
      )}
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-error/10 blur-2xl rounded-full" />
        <div className="relative p-4 rounded-2xl bg-error/10 border border-error/20">
          <Icon className="h-8 w-8 text-error" />
        </div>
      </div>
      
      <h3 className="text-body-lg font-medium text-foreground mb-1">{title}</h3>
      
      <p className="text-body-sm text-foreground-secondary max-w-sm mb-4">
        {message}
      </p>
      
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </Button>
      )}
    </div>
  );
}

/**
 * Inline error message
 */
interface ErrorMessageProps {
  message: string;
  className?: string;
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg bg-error/10 border border-error/20 text-error text-body-sm',
        className
      )}
    >
      <AlertTriangle className="h-4 w-4 shrink-0" />
      <span>{message}</span>
    </div>
  );
}
