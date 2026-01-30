'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Header, PageContainer, Grid, AnimatedSection, SectionHeader } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { StatCard, MiniStat } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendIndicator } from '@/components/ui/trend-indicator';
import { AreaChart, BarChart, DonutChart } from '@/components/ui/charts';
import { DataTable, Column } from '@/components/ui/data-table';
import { EmptyTransactionsState } from '@/components/ui/empty-state';
import {
  cn,
  formatCurrency,
  formatPercentage,
  formatDate,
  formatMonthYear,
  expenseCategoryLabels,
  incomeCategoryLabels,
} from '@/lib/utils';
import {
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Wallet,
  CreditCard,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Info,
} from 'lucide-react';
import type { Transaction, MonthlyFinancialSummary, FinancialInsight } from '@/types';

// Mock data
import {
  mockTransactions,
  mockMonthlySummaries,
  mockFinancialKPIs,
  mockFinancialHistory,
  mockInsights,
} from '@/data/mock-finance';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FINANCE PAGE
 * Vida financeira pessoal com gráficos e KPIs
 * ═══════════════════════════════════════════════════════════════════════════
 */

export function FinancePage() {
  const [selectedMonth, setSelectedMonth] = React.useState('2024-01');
  const currentMonth = mockFinancialKPIs.currentMonth;

  // Prepare chart data
  const incomeVsExpensesData = mockFinancialHistory.map((d) => ({
    date: d.date,
    Rendimentos: d.income,
    Despesas: d.expenses,
  }));

  const savingsRateData = mockFinancialHistory.map((d) => ({
    date: d.date,
    'Taxa de Poupança': d.savingsRate * 100,
  }));

  // Expense breakdown for donut chart
  const expenseBreakdownData = Object.entries(currentMonth.expenses.breakdown)
    .filter(([_, value]) => value > 0)
    .map(([key, value]) => ({
      name: expenseCategoryLabels[key] || key,
      value,
    }))
    .sort((a, b) => b.value - a.value);

  // Mandatory vs Optional for donut chart
  const expenseNatureData = [
    { name: 'Obrigatórias', value: currentMonth.expenses.mandatory, color: 'hsl(0, 84%, 60%)' },
    { name: 'Opcionais', value: currentMonth.expenses.optional, color: 'hsl(38, 92%, 50%)' },
  ];

  return (
    <>
      <Header
        title="Finanças Pessoais"
        subtitle={formatMonthYear(new Date(selectedMonth + '-01'))}
      />

      <PageContainer>
        {/* KPI Cards */}
        <AnimatedSection className="mb-8">
          <Grid cols={4} gap="md">
            <StatCard
              title="Rendimento Total"
              value={formatCurrency(currentMonth.income.total)}
              trend={currentMonth.comparisonToPreviousMonth.incomeChange}
              trendLabel="vs mês anterior"
              icon={ArrowUpRight}
              iconColor="text-success"
            />
            <StatCard
              title="Despesas Totais"
              value={formatCurrency(currentMonth.expenses.total)}
              trend={currentMonth.comparisonToPreviousMonth.expensesChange}
              invertTrend
              trendLabel="vs mês anterior"
              icon={ArrowDownRight}
              iconColor="text-error"
            />
            <StatCard
              title="Balanço"
              value={formatCurrency(currentMonth.balance)}
              icon={PiggyBank}
              iconColor={currentMonth.balance >= 0 ? 'text-success' : 'text-error'}
            />
            <StatCard
              title="Taxa de Poupança"
              value={formatPercentage(currentMonth.savingsRate, { showSign: false })}
              trend={currentMonth.comparisonToPreviousMonth.savingsRateChange}
              icon={TrendingUp}
              iconColor="text-accent"
            />
          </Grid>
        </AnimatedSection>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Income vs Expenses Chart */}
          <AnimatedSection delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Rendimentos vs Despesas
                </CardTitle>
                <CardDescription>Evolução mensal</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={incomeVsExpensesData}
                  xKey="date"
                  yKeys={[
                    { key: 'Rendimentos', name: 'Rendimentos', color: 'hsl(142, 71%, 45%)' },
                    { key: 'Despesas', name: 'Despesas', color: 'hsl(0, 84%, 60%)' },
                  ]}
                  height={300}
                  formatValue={(v) => formatCurrency(v, 'EUR', { compact: true })}
                  formatXAxis={(d) => d.slice(5)} // MM only
                  showLegend
                />
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Savings Rate Chart */}
          <AnimatedSection delay={0.15}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PiggyBank className="h-5 w-5 text-success" />
                  Taxa de Poupança
                </CardTitle>
                <CardDescription>Evolução mensal (%)</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={savingsRateData}
                  xKey="date"
                  yKeys={[
                    { key: 'Taxa de Poupança', name: 'Taxa de Poupança', color: 'hsl(142, 71%, 45%)' },
                  ]}
                  height={300}
                  formatValue={(v) => `${v.toFixed(0)}%`}
                  formatXAxis={(d) => d.slice(5)}
                />
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* Expense Analysis Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Expense Breakdown Donut */}
          <AnimatedSection delay={0.2}>
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5 text-warning" />
                  Por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart
                  data={expenseBreakdownData}
                  height={250}
                  formatValue={(v) => formatCurrency(v)}
                />
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Mandatory vs Optional */}
          <AnimatedSection delay={0.22}>
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-error" />
                  Obrigatórias vs Opcionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart
                  data={expenseNatureData}
                  height={250}
                  formatValue={(v) => formatCurrency(v)}
                />
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-body-sm">
                    <span className="text-foreground-secondary">Obrigatórias</span>
                    <span className="font-medium text-foreground">
                      {formatPercentage(currentMonth.expenses.mandatory / currentMonth.expenses.total, { showSign: false })}
                    </span>
                  </div>
                  <div className="flex justify-between text-body-sm">
                    <span className="text-foreground-secondary">Opcionais</span>
                    <span className="font-medium text-foreground">
                      {formatPercentage(currentMonth.expenses.optional / currentMonth.expenses.total, { showSign: false })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Key Metrics */}
          <AnimatedSection delay={0.24}>
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-info" />
                  Métricas Chave
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <MiniStat
                  label="Burn Rate Diário"
                  value={formatCurrency(currentMonth.burnRate)}
                />
                <MiniStat
                  label="Despesas Fixas / Rendimento"
                  value={formatPercentage(currentMonth.expenses.mandatory / currentMonth.income.total, { showSign: false })}
                />
                <MiniStat
                  label="Média Mensal (YTD)"
                  value={formatCurrency(mockFinancialKPIs.yearToDate.averageMonthlyExpenses)}
                />
                <MiniStat
                  label="Poupança Média (YTD)"
                  value={formatCurrency(mockFinancialKPIs.yearToDate.averageMonthlySavings)}
                />
                <div className="h-px bg-border my-3" />
                <MiniStat
                  label="Total Poupado (YTD)"
                  value={formatCurrency(mockFinancialKPIs.yearToDate.totalIncome - mockFinancialKPIs.yearToDate.totalExpenses)}
                />
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* Insights */}
        <AnimatedSection delay={0.26} className="mb-8">
          <SectionHeader
            title="💡 Análises Automáticas"
            description="Insights baseados nos teus dados financeiros"
          />
          <Grid cols={3} gap="md">
            {mockInsights.map((insight, index) => (
              <InsightCard key={insight.id} insight={insight} index={index} />
            ))}
          </Grid>
        </AnimatedSection>

        {/* Recent Transactions */}
        <AnimatedSection delay={0.3}>
          <SectionHeader
            title="Transações Recentes"
            description="Últimos movimentos registados"
            action={
              <Button variant="secondary" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            }
          />
          <TransactionsTable transactions={mockTransactions} />
        </AnimatedSection>
      </PageContainer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INSIGHT CARD
// ─────────────────────────────────────────────────────────────────────────────

interface InsightCardProps {
  insight: FinancialInsight;
  index: number;
}

function InsightCard({ insight, index }: InsightCardProps) {
  const typeConfig = {
    success: {
      icon: CheckCircle,
      bg: 'bg-success/5',
      border: 'border-success/20',
      iconColor: 'text-success',
    },
    warning: {
      icon: AlertCircle,
      bg: 'bg-warning/5',
      border: 'border-warning/20',
      iconColor: 'text-warning',
    },
    info: {
      icon: Info,
      bg: 'bg-info/5',
      border: 'border-info/20',
      iconColor: 'text-info',
    },
  };

  const config = typeConfig[insight.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={cn(config.bg, 'border', config.border)}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={cn('p-2 rounded-lg', config.bg)}>
              <Icon className={cn('h-5 w-5', config.iconColor)} />
            </div>
            <div className="flex-1">
              <h4 className={cn('font-medium text-body-sm', config.iconColor)}>
                {insight.title}
              </h4>
              <p className="text-body-sm text-foreground-secondary mt-1">
                {insight.description}
              </p>
              {insight.comparison && (
                <p className="text-label-sm text-foreground-tertiary mt-2">
                  {insight.comparison}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TRANSACTIONS TABLE
// ─────────────────────────────────────────────────────────────────────────────

interface TransactionsTableProps {
  transactions: Transaction[];
}

function TransactionsTable({ transactions }: TransactionsTableProps) {
  const columns: Column<Transaction>[] = [
    {
      key: 'description',
      header: 'Descrição',
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'p-2 rounded-lg',
              row.type === 'income' ? 'bg-success/10' : 'bg-error/10'
            )}
          >
            {row.type === 'income' ? (
              <ArrowUpRight className="h-4 w-4 text-success" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-error" />
            )}
          </div>
          <div>
            <p className="font-medium text-foreground">{row.description}</p>
            <p className="text-label-sm text-foreground-tertiary">
              {row.type === 'income'
                ? incomeCategoryLabels[row.category] || row.category
                : expenseCategoryLabels[row.category] || row.category}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Data',
      accessor: (row) => (
        <span className="text-foreground-secondary text-body-sm">
          {formatDate(row.date, 'd MMM')}
        </span>
      ),
      sortable: true,
      sortFn: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      key: 'nature',
      header: 'Tipo',
      accessor: (row) => (
        row.type === 'expense' && row.nature ? (
          <Badge variant={row.nature === 'mandatory' ? 'error' : 'warning'} size="sm">
            {row.nature === 'mandatory' ? 'Obrigatória' : 'Opcional'}
          </Badge>
        ) : (
          <Badge variant="success" size="sm">Rendimento</Badge>
        )
      ),
    },
    {
      key: 'amount',
      header: 'Valor',
      align: 'right',
      accessor: (row) => (
        <span
          className={cn(
            'font-medium number-display',
            row.type === 'income' ? 'text-success' : 'text-error'
          )}
        >
          {row.type === 'income' ? '+' : '-'}
          {formatCurrency(row.amount)}
        </span>
      ),
      sortable: true,
      sortFn: (a, b) => a.amount - b.amount,
    },
  ];

  if (transactions.length === 0) {
    return <EmptyTransactionsState />;
  }

  return (
    <DataTable
      data={transactions}
      columns={columns}
      keyExtractor={(row) => row.id}
    />
  );
}
