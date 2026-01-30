'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Header, PageContainer, Grid, AnimatedSection, SectionHeader } from '@/components/layout';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendIndicator } from '@/components/ui/trend-indicator';
import { AreaChart } from '@/components/ui/charts';
import { formatCurrency, formatSmartDate, formatPercentage } from '@/lib/utils';
import { 
  Newspaper, 
  PiggyBank, 
  Wallet, 
  TrendingUp, 
  ArrowRight,
  Globe,
  Bitcoin,
  Landmark
} from 'lucide-react';
import Link from 'next/link';

// Mock data imports
import { mockNewsArticles, mockDailyDigest } from '@/data/mock-news';
import { mockFinancialKPIs, mockFinancialHistory } from '@/data/mock-finance';
import { mockPortfolioSummary, mockPortfolioHistory } from '@/data/mock-crypto';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DASHBOARD PAGE
 * Visão global do sistema com cards-resumo e feed unificado
 * ═══════════════════════════════════════════════════════════════════════════
 */

export function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  return (
    <>
      <Header
        title="Dashboard"
        subtitle="Visão geral do teu sistema pessoal"
        lastUpdated={new Date().toISOString()}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <PageContainer>
        {/* KPI Cards */}
        <AnimatedSection className="mb-8">
          <Grid cols={4} gap="md">
            {/* News KPI */}
            <StatCard
              title="Notícias Hoje"
              value={mockDailyDigest.totalCount.toString()}
              subtitle={`${mockDailyDigest.highlights.length} destaques`}
              icon={Newspaper}
              iconColor="text-info"
              onClick={() => {}}
            />

            {/* Finance KPI */}
            <StatCard
              title="Balanço Mensal"
              value={formatCurrency(mockFinancialKPIs.currentMonth.balance)}
              trend={mockFinancialKPIs.currentMonth.comparisonToPreviousMonth.savingsRateChange}
              trendLabel="vs mês anterior"
              icon={PiggyBank}
              iconColor="text-success"
              onClick={() => {}}
            />

            {/* Crypto KPI */}
            <StatCard
              title="Portfólio Cripto"
              value={formatCurrency(mockPortfolioSummary.totalValueUsd, 'USD')}
              trend={mockPortfolioSummary.change24h.percentage}
              trendLabel="últimas 24h"
              icon={Wallet}
              iconColor="text-accent"
              onClick={() => {}}
            />

            {/* Savings Rate */}
            <StatCard
              title="Taxa de Poupança"
              value={formatPercentage(mockFinancialKPIs.currentMonth.savingsRate, { showSign: false })}
              trend={mockFinancialKPIs.currentMonth.comparisonToPreviousMonth.savingsRateChange}
              icon={TrendingUp}
              iconColor="text-warning"
              onClick={() => {}}
            />
          </Grid>
        </AnimatedSection>

        {/* Main content - 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - News & Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* News Highlights */}
            <AnimatedSection delay={0.1}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Newspaper className="h-5 w-5 text-info" />
                      Últimas Notícias
                    </CardTitle>
                    <Link href="/news">
                      <Button variant="ghost" size="sm">
                        Ver todas
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockDailyDigest.highlights.slice(0, 5).map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <NewsItem article={article} />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Portfolio Performance Chart */}
            <AnimatedSection delay={0.2}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      Evolução do Portfólio
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <TrendIndicator value={mockPortfolioSummary.change30d.percentage} size="md" />
                      <span className="text-body-sm text-foreground-secondary">30 dias</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <AreaChart
                    data={mockPortfolioHistory.map(d => ({
                      date: d.date,
                      valor: d.totalValueUsd,
                    }))}
                    xKey="date"
                    yKeys={[{ key: 'valor', name: 'Valor (USD)', color: 'hsl(217, 91%, 60%)' }]}
                    height={280}
                    formatValue={(v) => formatCurrency(v, 'USD', { compact: true })}
                    formatXAxis={(d) => d.slice(5)} // MM-DD
                  />
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Right column - Financial Summary & Quick Stats */}
          <div className="space-y-6">
            {/* Financial Snapshot */}
            <AnimatedSection delay={0.15}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <PiggyBank className="h-5 w-5 text-success" />
                      Finanças do Mês
                    </CardTitle>
                    <Link href="/finance">
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FinancialRow
                    label="Rendimentos"
                    value={formatCurrency(mockFinancialKPIs.currentMonth.income.total)}
                    trend={mockFinancialKPIs.currentMonth.comparisonToPreviousMonth.incomeChange}
                    color="text-success"
                  />
                  <FinancialRow
                    label="Despesas"
                    value={formatCurrency(mockFinancialKPIs.currentMonth.expenses.total)}
                    trend={mockFinancialKPIs.currentMonth.comparisonToPreviousMonth.expensesChange}
                    color="text-error"
                    invertTrend
                  />
                  <div className="h-px bg-border my-3" />
                  <FinancialRow
                    label="Poupança"
                    value={formatCurrency(mockFinancialKPIs.currentMonth.balance)}
                    isBold
                  />
                  
                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-label-sm mb-2">
                      <span className="text-foreground-secondary">Taxa de poupança</span>
                      <span className="font-medium text-foreground">
                        {formatPercentage(mockFinancialKPIs.currentMonth.savingsRate, { showSign: false })}
                      </span>
                    </div>
                    <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${mockFinancialKPIs.currentMonth.savingsRate * 100}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-success to-success/60 rounded-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Crypto Quick Stats */}
            <AnimatedSection delay={0.2}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-accent" />
                      Portfólio Cripto
                    </CardTitle>
                    <Link href="/crypto">
                      <Button variant="ghost" size="icon">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <CryptoRow
                    label="Valor Total"
                    value={formatCurrency(mockPortfolioSummary.totalValueUsd, 'USD')}
                    change={mockPortfolioSummary.change24h.percentage}
                  />
                  <CryptoRow
                    label="PnL Total"
                    value={formatCurrency(mockPortfolioSummary.totalUnrealizedPnl || 0, 'USD')}
                    change={mockPortfolioSummary.totalUnrealizedPnlPercentage || 0}
                    isProfit
                  />
                  <CryptoRow
                    label="Exposição DeFi"
                    value={formatPercentage(mockPortfolioSummary.riskMetrics.defiExposure, { showSign: false })}
                  />
                  <CryptoRow
                    label="Rewards Pendentes"
                    value={formatCurrency(mockPortfolioSummary.totalPendingRewards, 'USD')}
                    highlight
                  />
                  
                  {/* Risk indicator */}
                  <div className="mt-4 pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-label-sm text-foreground-secondary">Risco de Liquidação</span>
                      <Badge 
                        variant={
                          mockPortfolioSummary.riskMetrics.liquidationRisk === 'none' ? 'success' :
                          mockPortfolioSummary.riskMetrics.liquidationRisk === 'low' ? 'success' :
                          mockPortfolioSummary.riskMetrics.liquidationRisk === 'medium' ? 'warning' : 'error'
                        }
                      >
                        {mockPortfolioSummary.riskMetrics.liquidationRisk === 'none' ? 'Nenhum' :
                         mockPortfolioSummary.riskMetrics.liquidationRisk === 'low' ? 'Baixo' :
                         mockPortfolioSummary.riskMetrics.liquidationRisk === 'medium' ? 'Médio' : 'Alto'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Insights */}
            <AnimatedSection delay={0.25}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">💡 Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockFinancialKPIs.insights.slice(0, 3).map((insight, index) => (
                    <div
                      key={insight.id}
                      className={`p-3 rounded-lg border ${
                        insight.type === 'success' ? 'bg-success/5 border-success/20' :
                        insight.type === 'warning' ? 'bg-warning/5 border-warning/20' :
                        'bg-info/5 border-info/20'
                      }`}
                    >
                      <p className={`text-body-sm font-medium ${
                        insight.type === 'success' ? 'text-success' :
                        insight.type === 'warning' ? 'text-warning' :
                        'text-info'
                      }`}>
                        {insight.title}
                      </p>
                      <p className="text-label-sm text-foreground-secondary mt-1">
                        {insight.description}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </PageContainer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

interface NewsItemProps {
  article: typeof mockNewsArticles[0];
}

function NewsItem({ article }: NewsItemProps) {
  const categoryIcon = {
    national: Landmark,
    international: Globe,
    crypto: Bitcoin,
  };
  const Icon = categoryIcon[article.category];

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-background-tertiary transition-colors group"
    >
      <div className="p-2 rounded-lg bg-background-tertiary group-hover:bg-background-elevated transition-colors">
        <Icon className="h-4 w-4 text-foreground-secondary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-body-sm font-medium text-foreground line-clamp-2 group-hover:text-accent transition-colors">
          {article.title}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-label-sm text-foreground-tertiary">{article.source.name}</span>
          <span className="text-foreground-muted">•</span>
          <span className="text-label-sm text-foreground-tertiary">
            {formatSmartDate(article.publishedAt)}
          </span>
        </div>
      </div>
      {article.sentiment && (
        <Badge 
          variant={
            article.sentiment === 'positive' ? 'success' :
            article.sentiment === 'negative' ? 'error' : 'default'
          }
          size="sm"
        >
          {article.sentiment === 'positive' ? '↑' : article.sentiment === 'negative' ? '↓' : '→'}
        </Badge>
      )}
    </a>
  );
}

interface FinancialRowProps {
  label: string;
  value: string;
  trend?: number;
  color?: string;
  isBold?: boolean;
  invertTrend?: boolean;
}

function FinancialRow({ label, value, trend, color, isBold, invertTrend }: FinancialRowProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-body-sm text-foreground-secondary">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`number-display ${isBold ? 'font-semibold text-foreground' : color || 'text-foreground'}`}>
          {value}
        </span>
        {trend !== undefined && (
          <TrendIndicator value={trend} size="sm" showIcon={false} invertColors={invertTrend} />
        )}
      </div>
    </div>
  );
}

interface CryptoRowProps {
  label: string;
  value: string;
  change?: number;
  isProfit?: boolean;
  highlight?: boolean;
}

function CryptoRow({ label, value, change, isProfit, highlight }: CryptoRowProps) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-body-sm text-foreground-secondary">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`number-display font-medium ${
          highlight ? 'text-accent' :
          isProfit && change && change > 0 ? 'text-success' :
          isProfit && change && change < 0 ? 'text-error' :
          'text-foreground'
        }`}>
          {value}
        </span>
        {change !== undefined && (
          <TrendIndicator value={change} size="sm" showIcon={false} />
        )}
      </div>
    </div>
  );
}
