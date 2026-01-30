'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card } from './card';
import { TrendIndicator } from './trend-indicator';
import type { Trend, Percentage } from '@/types';
import { LucideIcon } from 'lucide-react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * STAT CARD COMPONENT
 * KPI card with trend indicator
 * ═══════════════════════════════════════════════════════════════════════════
 */

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: Percentage;
  trendLabel?: string;
  trendDirection?: Trend;
  invertTrend?: boolean;
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
  onClick?: () => void;
}

export function StatCard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  trendDirection,
  invertTrend,
  icon: Icon,
  iconColor = 'text-accent',
  className,
  onClick,
}: StatCardProps) {
  return (
    <Card
      variant={onClick ? 'interactive' : 'default'}
      className={cn('relative overflow-hidden', className)}
      onClick={onClick}
    >
      {/* Background glow effect */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-radial opacity-30 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-label-md text-foreground-secondary">{title}</span>
          {Icon && (
            <div className={cn('p-2 rounded-lg bg-background-tertiary', iconColor)}>
              <Icon className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-3">
          <span className="text-display-sm font-semibold text-foreground number-display">
            {value}
          </span>
          {trend !== undefined && (
            <TrendIndicator
              value={trend}
              trend={trendDirection}
              invertColors={invertTrend}
              size="sm"
            />
          )}
        </div>

        {/* Subtitle / Trend Label */}
        {(subtitle || trendLabel) && (
          <p className="mt-2 text-label-sm text-foreground-tertiary">
            {trendLabel && trend !== undefined && (
              <span className="mr-1">
                {trend >= 0 ? '↑' : '↓'}
              </span>
            )}
            {subtitle || trendLabel}
          </p>
        )}
      </div>
    </Card>
  );
}

/**
 * Mini stat for inline display
 */
interface MiniStatProps {
  label: string;
  value: string;
  trend?: Percentage;
  className?: string;
}

export function MiniStat({ label, value, trend, className }: MiniStatProps) {
  return (
    <div className={cn('flex items-center justify-between py-2', className)}>
      <span className="text-body-sm text-foreground-secondary">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-body-sm font-medium text-foreground number-display">{value}</span>
        {trend !== undefined && (
          <TrendIndicator value={trend} size="sm" showIcon={false} />
        )}
      </div>
    </div>
  );
}
