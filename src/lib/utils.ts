import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, parseISO, isToday, isYesterday } from 'date-fns';
import { pt } from 'date-fns/locale';
import type { Trend, Percentage } from '@/types';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * UTILITY FUNCTIONS
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────────────────────
// CLASSNAME UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─────────────────────────────────────────────────────────────────────────────
// NUMBER FORMATTING
// ─────────────────────────────────────────────────────────────────────────────

/** Format currency value */
export function formatCurrency(
  value: number,
  currency: string = 'EUR',
  options?: {
    compact?: boolean;
    decimals?: number;
    showSign?: boolean;
  }
): string {
  const { compact = false, decimals, showSign = false } = options || {};
  
  const formatter = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency,
    notation: compact ? 'compact' : 'standard',
    minimumFractionDigits: decimals ?? (compact ? 1 : 2),
    maximumFractionDigits: decimals ?? (compact ? 1 : 2),
    signDisplay: showSign ? 'always' : 'auto',
  });
  
  return formatter.format(value);
}

/** Format large numbers with suffix (K, M, B) */
export function formatCompactNumber(value: number, decimals: number = 1): string {
  const formatter = new Intl.NumberFormat('pt-PT', {
    notation: 'compact',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return formatter.format(value);
}

/** Format percentage */
export function formatPercentage(
  value: Percentage,
  options?: {
    decimals?: number;
    showSign?: boolean;
    multiply?: boolean; // if value is 0.15, multiply to get 15%
  }
): string {
  const { decimals = 2, showSign = true, multiply = true } = options || {};
  
  const displayValue = multiply ? value * 100 : value;
  const sign = showSign && displayValue > 0 ? '+' : '';
  
  return `${sign}${displayValue.toFixed(decimals)}%`;
}

/** Format crypto amount (handle very small and very large numbers) */
export function formatCryptoAmount(value: number, decimals: number = 4): string {
  if (value === 0) return '0';
  
  // Very small numbers
  if (Math.abs(value) < 0.0001) {
    return value.toExponential(2);
  }
  
  // Very large numbers
  if (Math.abs(value) >= 1_000_000) {
    return formatCompactNumber(value, 2);
  }
  
  // Normal range
  const formatter = new Intl.NumberFormat('pt-PT', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });
  
  return formatter.format(value);
}

/** Format number with thousand separators */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('pt-PT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

// ─────────────────────────────────────────────────────────────────────────────
// DATE FORMATTING
// ─────────────────────────────────────────────────────────────────────────────

/** Format date in Portuguese */
export function formatDate(
  date: string | Date,
  formatStr: string = 'd MMM yyyy'
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: pt });
}

/** Format relative time (e.g., "há 2 horas") */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: pt });
}

/** Format smart date (today, yesterday, or date) */
export function formatSmartDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  
  if (isToday(dateObj)) {
    return `Hoje, ${format(dateObj, 'HH:mm', { locale: pt })}`;
  }
  
  if (isYesterday(dateObj)) {
    return `Ontem, ${format(dateObj, 'HH:mm', { locale: pt })}`;
  }
  
  return format(dateObj, "d MMM, HH:mm", { locale: pt });
}

/** Format month/year */
export function formatMonthYear(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMMM yyyy', { locale: pt });
}

// ─────────────────────────────────────────────────────────────────────────────
// TREND UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

/** Get trend from value change */
export function getTrend(change: number, threshold: number = 0.01): Trend {
  if (change > threshold) return 'up';
  if (change < -threshold) return 'down';
  return 'neutral';
}

/** Get trend color class */
export function getTrendColor(trend: Trend): string {
  switch (trend) {
    case 'up':
      return 'text-success';
    case 'down':
      return 'text-error';
    default:
      return 'text-foreground-secondary';
  }
}

/** Get trend icon character */
export function getTrendIcon(trend: Trend): string {
  switch (trend) {
    case 'up':
      return '↑';
    case 'down':
      return '↓';
    default:
      return '→';
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Generate unique ID */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/** Delay execution (for simulating loading states) */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Group array by key */
export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

/** Calculate sum of array values */
export function sum(values: number[]): number {
  return values.reduce((acc, val) => acc + val, 0);
}

/** Calculate average of array values */
export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return sum(values) / values.length;
}

/** Clamp value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Calculate percentage change */
export function calculatePercentageChange(
  current: number,
  previous: number
): Percentage {
  if (previous === 0) return 0;
  return (current - previous) / Math.abs(previous);
}

// ─────────────────────────────────────────────────────────────────────────────
// CHART HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/** Get CSS variable value for charts */
export function getChartColor(colorVar: string): string {
  if (typeof window === 'undefined') return colorVar;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(colorVar)
    .trim();
  return `hsl(${value})`;
}

/** Chart color palette */
export const chartColors = {
  primary: 'hsl(217, 91%, 60%)',
  secondary: 'hsl(262, 83%, 58%)',
  success: 'hsl(142, 71%, 45%)',
  warning: 'hsl(38, 92%, 50%)',
  error: 'hsl(0, 84%, 60%)',
  info: 'hsl(199, 89%, 48%)',
};

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY LABELS
// ─────────────────────────────────────────────────────────────────────────────

export const expenseCategoryLabels: Record<string, string> = {
  housing: 'Habitação',
  utilities: 'Serviços',
  transport: 'Transporte',
  food: 'Alimentação',
  health: 'Saúde',
  insurance: 'Seguros',
  subscriptions: 'Subscrições',
  entertainment: 'Entretenimento',
  education: 'Educação',
  shopping: 'Compras',
  travel: 'Viagens',
  other: 'Outros',
};

export const incomeCategoryLabels: Record<string, string> = {
  salary: 'Vencimento',
  bonus: 'Bónus',
  freelance: 'Freelance',
  investments: 'Investimentos',
  rental: 'Rendas',
  refund: 'Reembolsos',
  gift: 'Ofertas',
  other: 'Outros',
};

export const newsCategoryLabels: Record<string, string> = {
  national: 'Nacional',
  international: 'Internacional',
  crypto: 'Cripto',
};

export const cryptoAssetTypeLabels: Record<string, string> = {
  wallet: 'Wallet',
  staking: 'Staking',
  lp: 'Liquidity Pool',
  lending: 'Lending',
  borrowing: 'Borrowing',
  farming: 'Farming',
  vault: 'Vault',
  nft: 'NFT',
};

export const networkLabels: Record<string, string> = {
  ethereum: 'Ethereum',
  solana: 'Solana',
  bitcoin: 'Bitcoin',
  polygon: 'Polygon',
  arbitrum: 'Arbitrum',
  optimism: 'Optimism',
  avalanche: 'Avalanche',
  bsc: 'BNB Chain',
  base: 'Base',
  other: 'Outro',
};
