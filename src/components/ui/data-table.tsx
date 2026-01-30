'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DATA TABLE COMPONENT
 * Advanced table with sorting, styling inspired by Linear/Stripe
 * ═══════════════════════════════════════════════════════════════════════════
 */

export interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortFn?: (a: T, b: T) => number;
  align?: 'left' | 'center' | 'right';
  width?: string;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  className?: string;
  compact?: boolean;
  stickyHeader?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  emptyMessage = 'Sem dados',
  className,
  compact = false,
  stickyHeader = false,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    const column = columns.find((c) => c.key === sortConfig.key);
    if (!column?.sortFn) return data;

    return [...data].sort((a, b) => {
      const result = column.sortFn!(a, b);
      return sortConfig.direction === 'asc' ? result : -result;
    });
  }, [data, columns, sortConfig]);

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    setSortConfig((current) => {
      if (current?.key !== column.key) {
        return { key: column.key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key: column.key, direction: 'desc' };
      }
      return null;
    });
  };

  const getSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null;

    if (sortConfig?.key !== column.key) {
      return <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="h-3.5 w-3.5 text-accent" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-accent" />
    );
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  if (data.length === 0) {
    return (
      <div className={cn('table-container', className)}>
        <div className="flex items-center justify-center py-12 text-foreground-secondary text-body-sm">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('table-container', className)}>
      <table className="table-base">
        <thead className={cn(stickyHeader && 'sticky top-0 z-10')}>
          <tr className="table-header">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'table-cell',
                  compact ? 'py-2' : 'py-3',
                  alignClasses[column.align || 'left'],
                  column.sortable && 'cursor-pointer select-none hover:text-foreground transition-colors',
                  column.className
                )}
                style={{ width: column.width }}
                onClick={() => handleSort(column)}
              >
                <div
                  className={cn(
                    'inline-flex items-center gap-1.5',
                    column.align === 'right' && 'flex-row-reverse'
                  )}
                >
                  {column.header}
                  {getSortIcon(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={keyExtractor(row)}
              className={cn(
                'table-row',
                onRowClick && 'cursor-pointer'
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    'table-cell',
                    compact ? 'py-2' : 'py-3',
                    alignClasses[column.align || 'left'],
                    column.className
                  )}
                >
                  {column.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Table cell with token/asset display
 */
interface AssetCellProps {
  symbol: string;
  name: string;
  logo?: string;
  network?: string;
}

export function AssetCell({ symbol, name, logo, network }: AssetCellProps) {
  return (
    <div className="flex items-center gap-3">
      {logo ? (
        <img src={logo} alt={symbol} className="h-8 w-8 rounded-full" />
      ) : (
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
          <span className="text-label-sm font-bold text-white">
            {symbol.slice(0, 2).toUpperCase()}
          </span>
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{symbol}</span>
        <span className="text-label-sm text-foreground-tertiary">{name}</span>
      </div>
    </div>
  );
}

/**
 * Table cell with value and change
 */
interface ValueCellProps {
  value: string;
  change?: number;
  subValue?: string;
}

export function ValueCell({ value, change, subValue }: ValueCellProps) {
  return (
    <div className="flex flex-col items-end">
      <span className="font-medium text-foreground number-display">{value}</span>
      {subValue && (
        <span className="text-label-sm text-foreground-tertiary">{subValue}</span>
      )}
      {change !== undefined && (
        <span
          className={cn(
            'text-label-sm number-display',
            change > 0 ? 'text-success' : change < 0 ? 'text-error' : 'text-foreground-tertiary'
          )}
        >
          {change > 0 ? '+' : ''}{(change * 100).toFixed(2)}%
        </span>
      )}
    </div>
  );
}
