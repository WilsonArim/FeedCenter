'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { formatPercentage, getTrend, getTrendColor } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Trend, Percentage } from '@/types';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TREND INDICATOR COMPONENT
 * Shows value change with direction arrow and color
 * ═══════════════════════════════════════════════════════════════════════════
 */

interface TrendIndicatorProps {
  value: Percentage;
  showIcon?: boolean;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Override automatic trend detection */
  trend?: Trend;
  /** Invert colors (for expenses where down is good) */
  invertColors?: boolean;
}

export function TrendIndicator({
  value,
  showIcon = true,
  showValue = true,
  size = 'md',
  className,
  trend: trendOverride,
  invertColors = false,
}: TrendIndicatorProps) {
  const trend = trendOverride ?? getTrend(value);
  
  // Determine color based on trend and inversion
  const getColor = () => {
    if (trend === 'neutral') return 'text-foreground-secondary';
    
    const isPositive = trend === 'up';
    const shouldBeGreen = invertColors ? !isPositive : isPositive;
    
    return shouldBeGreen ? 'text-success' : 'text-error';
  };

  const Icon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;

  const sizes = {
    sm: { text: 'text-label-sm', icon: 'h-3 w-3' },
    md: { text: 'text-body-sm', icon: 'h-4 w-4' },
    lg: { text: 'text-body-md', icon: 'h-5 w-5' },
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium',
        getColor(),
        sizes[size].text,
        className
      )}
    >
      {showIcon && <Icon className={sizes[size].icon} />}
      {showValue && formatPercentage(value)}
    </span>
  );
}
