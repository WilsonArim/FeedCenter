'use client';

import * as React from 'react';
import {
  AreaChart as RechartsAreaChart,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Area,
  Bar,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { cn } from '@/lib/utils';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CHART COMPONENTS
 * Premium charts with Recharts - consistent styling
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Chart colors
const CHART_COLORS = [
  'hsl(217, 91%, 60%)',  // Blue
  'hsl(142, 71%, 45%)',  // Green
  'hsl(262, 83%, 58%)',  // Purple
  'hsl(38, 92%, 50%)',   // Amber
  'hsl(0, 84%, 60%)',    // Red
  'hsl(199, 89%, 48%)',  // Cyan
];

// Shared axis styles
const axisStyle = {
  fontSize: 11,
  fontFamily: 'var(--font-sans), Inter, system-ui',
  fill: 'hsl(215, 15%, 55%)',
};

const gridStyle = {
  strokeDasharray: '3 3',
  stroke: 'hsl(215, 15%, 15%)',
  strokeOpacity: 0.5,
};

// Custom tooltip
interface CustomTooltipProps extends TooltipProps<number, string> {
  formatValue?: (value: number) => string;
  formatLabel?: (label: string) => string;
}

function CustomTooltip({
  active,
  payload,
  label,
  formatValue = (v) => v.toLocaleString('pt-PT'),
  formatLabel = (l) => l,
}: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-background-elevated border border-border rounded-lg p-3 shadow-elevation-4">
      <p className="text-label-sm text-foreground-secondary mb-2">{formatLabel(label)}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-body-sm text-foreground-secondary">{entry.name}:</span>
          <span className="text-body-sm font-medium text-foreground number-display">
            {formatValue(entry.value as number)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AREA CHART
// ─────────────────────────────────────────────────────────────────────────────

interface AreaChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: { key: string; name: string; color?: string }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  formatValue?: (value: number) => string;
  formatXAxis?: (value: string) => string;
  gradient?: boolean;
  className?: string;
}

export function AreaChart({
  data,
  xKey,
  yKeys,
  height = 300,
  showGrid = true,
  showLegend = false,
  formatValue,
  formatXAxis,
  gradient = true,
  className,
}: AreaChartProps) {
  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {gradient && (
            <defs>
              {yKeys.map((y, i) => (
                <linearGradient key={y.key} id={`gradient-${y.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={y.color || CHART_COLORS[i]} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={y.color || CHART_COLORS[i]} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
          )}
          {showGrid && <CartesianGrid {...gridStyle} vertical={false} />}
          <XAxis
            dataKey={xKey}
            tick={axisStyle}
            tickLine={false}
            axisLine={{ stroke: 'hsl(215, 15%, 15%)' }}
            tickFormatter={formatXAxis}
          />
          <YAxis
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatValue}
          />
          <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
          {showLegend && <Legend />}
          {yKeys.map((y, i) => (
            <Area
              key={y.key}
              type="monotone"
              dataKey={y.key}
              name={y.name}
              stroke={y.color || CHART_COLORS[i]}
              strokeWidth={2}
              fill={gradient ? `url(#gradient-${y.key})` : y.color || CHART_COLORS[i]}
              fillOpacity={gradient ? 1 : 0.1}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BAR CHART
// ─────────────────────────────────────────────────────────────────────────────

interface BarChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: { key: string; name: string; color?: string }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  formatValue?: (value: number) => string;
  formatXAxis?: (value: string) => string;
  stacked?: boolean;
  className?: string;
}

export function BarChart({
  data,
  xKey,
  yKeys,
  height = 300,
  showGrid = true,
  showLegend = false,
  formatValue,
  formatXAxis,
  stacked = false,
  className,
}: BarChartProps) {
  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid {...gridStyle} vertical={false} />}
          <XAxis
            dataKey={xKey}
            tick={axisStyle}
            tickLine={false}
            axisLine={{ stroke: 'hsl(215, 15%, 15%)' }}
            tickFormatter={formatXAxis}
          />
          <YAxis
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatValue}
          />
          <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
          {showLegend && <Legend />}
          {yKeys.map((y, i) => (
            <Bar
              key={y.key}
              dataKey={y.key}
              name={y.name}
              fill={y.color || CHART_COLORS[i]}
              radius={[4, 4, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LINE CHART
// ─────────────────────────────────────────────────────────────────────────────

interface LineChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKeys: { key: string; name: string; color?: string }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  showDots?: boolean;
  formatValue?: (value: number) => string;
  formatXAxis?: (value: string) => string;
  className?: string;
}

export function LineChart({
  data,
  xKey,
  yKeys,
  height = 300,
  showGrid = true,
  showLegend = false,
  showDots = false,
  formatValue,
  formatXAxis,
  className,
}: LineChartProps) {
  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          {showGrid && <CartesianGrid {...gridStyle} vertical={false} />}
          <XAxis
            dataKey={xKey}
            tick={axisStyle}
            tickLine={false}
            axisLine={{ stroke: 'hsl(215, 15%, 15%)' }}
            tickFormatter={formatXAxis}
          />
          <YAxis
            tick={axisStyle}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatValue}
          />
          <Tooltip content={<CustomTooltip formatValue={formatValue} />} />
          {showLegend && <Legend />}
          {yKeys.map((y, i) => (
            <Line
              key={y.key}
              type="monotone"
              dataKey={y.key}
              name={y.name}
              stroke={y.color || CHART_COLORS[i]}
              strokeWidth={2}
              dot={showDots}
              activeDot={{ r: 4, strokeWidth: 2 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PIE / DONUT CHART
// ─────────────────────────────────────────────────────────────────────────────

interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: PieChartData[];
  height?: number;
  innerRadius?: number;
  showLabels?: boolean;
  showLegend?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
}

export function PieChart({
  data,
  height = 300,
  innerRadius = 0,
  showLabels = false,
  showLegend = true,
  formatValue = (v) => v.toLocaleString('pt-PT'),
  className,
}: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius="80%"
            paddingAngle={2}
            dataKey="value"
            label={
              showLabels
                ? ({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`
                : false
            }
            labelLine={showLabels}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color || CHART_COLORS[index % CHART_COLORS.length]}
                stroke="hsl(220, 20%, 4%)"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const item = payload[0].payload as PieChartData;
              const percentage = ((item.value / total) * 100).toFixed(1);
              return (
                <div className="bg-background-elevated border border-border rounded-lg p-3 shadow-elevation-4">
                  <p className="text-body-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-body-sm text-foreground-secondary">
                    {formatValue(item.value)} ({percentage}%)
                  </p>
                </div>
              );
            }}
          />
          {showLegend && <Legend />}
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DonutChart(props: Omit<PieChartProps, 'innerRadius'>) {
  return <PieChart {...props} innerRadius={60} />;
}
