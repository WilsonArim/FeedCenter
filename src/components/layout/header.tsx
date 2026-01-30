'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { formatSmartDate } from '@/lib/utils';
import { Bell, Search, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HEADER COMPONENT
 * Top navigation bar with search and actions
 * ═══════════════════════════════════════════════════════════════════════════
 */

interface HeaderProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  actions?: React.ReactNode;
}

export function Header({
  title,
  subtitle,
  lastUpdated,
  onRefresh,
  isRefreshing = false,
  showSearch = false,
  searchPlaceholder = 'Pesquisar...',
  onSearch,
  actions,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left side - Title */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {(subtitle || lastUpdated) && (
            <p className="text-label-sm text-foreground-tertiary">
              {subtitle || (lastUpdated && `Atualizado ${formatSmartDate(lastUpdated)}`)}
            </p>
          )}
        </div>

        {/* Right side - Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          {showSearch && (
            <form onSubmit={handleSearch} className="hidden md:block">
              <Input
                variant="search"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </form>
          )}

          {/* Refresh button */}
          {onRefresh && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onRefresh}
              disabled={isRefreshing}
              aria-label="Atualizar"
            >
              <RefreshCw
                className={cn('h-4 w-4', isRefreshing && 'animate-spin')}
              />
            </Button>
          )}

          {/* Notifications */}
          <Button variant="ghost" size="icon" aria-label="Notificações">
            <div className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent" />
            </div>
          </Button>

          {/* Custom actions */}
          {actions}
        </div>
      </div>
    </header>
  );
}

/**
 * Page header for section titles within a page
 */
interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-6', className)}>
      <div>
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="text-body-sm text-foreground-secondary mt-0.5">
            {description}
          </p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
