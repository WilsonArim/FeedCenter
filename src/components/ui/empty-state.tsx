'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { LucideIcon, Inbox, Search, FileX, Wallet } from 'lucide-react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * EMPTY STATE COMPONENT
 * Displayed when no data is available
 * ═══════════════════════════════════════════════════════════════════════════
 */

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'search' | 'error';
  className?: string;
}

export function EmptyState({
  icon: CustomIcon,
  title,
  description,
  action,
  variant = 'default',
  className,
}: EmptyStateProps) {
  const icons = {
    default: Inbox,
    search: Search,
    error: FileX,
  };

  const Icon = CustomIcon || icons[variant];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-6 text-center',
        className
      )}
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 bg-accent/10 blur-2xl rounded-full" />
        <div className="relative p-4 rounded-2xl bg-background-tertiary border border-border">
          <Icon className="h-8 w-8 text-foreground-tertiary" />
        </div>
      </div>
      
      <h3 className="text-body-lg font-medium text-foreground mb-1">{title}</h3>
      
      {description && (
        <p className="text-body-sm text-foreground-secondary max-w-sm mb-4">
          {description}
        </p>
      )}
      
      {action && (
        <Button variant="secondary" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Pre-built empty states
export function EmptyNewsState() {
  return (
    <EmptyState
      icon={Inbox}
      title="Sem notícias"
      description="Ainda não há notícias disponíveis. O bot irá atualizar em breve."
    />
  );
}

export function EmptySearchState({ query }: { query?: string }) {
  return (
    <EmptyState
      variant="search"
      title="Sem resultados"
      description={
        query
          ? `Não foram encontrados resultados para "${query}".`
          : 'Tenta ajustar os filtros de pesquisa.'
      }
    />
  );
}

export function EmptyTransactionsState() {
  return (
    <EmptyState
      icon={Wallet}
      title="Sem transações"
      description="Ainda não há transações registadas neste período."
    />
  );
}

export function EmptyPositionsState() {
  return (
    <EmptyState
      icon={Wallet}
      title="Sem posições"
      description="Ainda não há posições no portfólio. O bot irá sincronizar em breve."
    />
  );
}
