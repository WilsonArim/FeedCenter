'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header, PageContainer, Grid, AnimatedSection, SectionHeader } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { StatCard, MiniStat } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendIndicator } from '@/components/ui/trend-indicator';
import { AreaChart, DonutChart } from '@/components/ui/charts';
import { DataTable, Column, AssetCell, ValueCell } from '@/components/ui/data-table';
import { EmptyPositionsState } from '@/components/ui/empty-state';
import {
  cn,
  formatCurrency,
  formatPercentage,
  formatCryptoAmount,
  formatSmartDate,
  cryptoAssetTypeLabels,
  networkLabels,
} from '@/lib/utils';
import {
  Wallet,
  TrendingUp,
  Shield,
  Coins,
  Layers,
  ChevronDown,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  Sparkles,
  PieChart,
  Activity,
  Lock,
  Droplets,
  Percent,
} from 'lucide-react';
import type { CryptoPosition, CryptoAssetType, BlockchainNetwork } from '@/types';

// Mock data
import {
  mockPositions,
  mockPortfolioSummary,
  mockPortfolioHistory,
  mockWallets,
  mockProtocols,
  mockPrices,
} from '@/data/mock-crypto';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CRYPTO PAGE
 * Portfólio cripto & DeFi inspirado em jup.ag
 * ═══════════════════════════════════════════════════════════════════════════
 */

type ViewMode = 'all' | 'wallet' | 'defi';
type AssetTypeFilter = CryptoAssetType | 'all';

export function CryptoPage() {
  const [viewMode, setViewMode] = React.useState<ViewMode>('all');
  const [assetTypeFilter, setAssetTypeFilter] = React.useState<AssetTypeFilter>('all');
  const [networkFilter, setNetworkFilter] = React.useState<BlockchainNetwork | 'all'>('all');
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Filter positions
  const filteredPositions = React.useMemo(() => {
    let positions = mockPositions;

    if (viewMode === 'wallet') {
      positions = positions.filter((p) => p.type === 'wallet');
    } else if (viewMode === 'defi') {
      positions = positions.filter((p) => p.type !== 'wallet');
    }

    if (assetTypeFilter !== 'all') {
      positions = positions.filter((p) => p.type === assetTypeFilter);
    }

    if (networkFilter !== 'all') {
      positions = positions.filter((p) => p.wallet.network === networkFilter);
    }

    return positions.sort((a, b) => b.valueUsd - a.valueUsd);
  }, [viewMode, assetTypeFilter, networkFilter]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Allocation data for charts
  const allocationByNetwork = Object.entries(mockPortfolioSummary.allocationByNetwork)
    .filter(([_, data]) => data.value > 0)
    .map(([network, data]) => ({
      name: networkLabels[network as BlockchainNetwork] || network,
      value: data.value,
    }))
    .sort((a, b) => b.value - a.value);

  const allocationByType = Object.entries(mockPortfolioSummary.allocationByType)
    .filter(([_, data]) => data.value > 0)
    .map(([type, data]) => ({
      name: cryptoAssetTypeLabels[type as CryptoAssetType] || type,
      value: data.value,
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <>
      <Header
        title="Portfólio Cripto"
        subtitle={`${mockPortfolioSummary.positionCount} posições em ${mockPortfolioSummary.walletCount} carteiras`}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      <PageContainer>
        {/* Portfolio Value Hero */}
        <AnimatedSection className="mb-8">
          <Card variant="gradient" className="relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-secondary/10 blur-[80px] rounded-full" />
            
            <CardContent className="relative z-10 p-8">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                {/* Main value */}
                <div>
                  <p className="text-label-md text-foreground-secondary mb-2">Valor Total do Portfólio</p>
                  <div className="flex items-baseline gap-4">
                    <h1 className="text-display-lg font-bold text-foreground number-display">
                      {formatCurrency(mockPortfolioSummary.totalValueUsd, 'USD')}
                    </h1>
                    <TrendIndicator
                      value={mockPortfolioSummary.change24h.percentage}
                      size="lg"
                    />
                  </div>
                  <p className="text-body-sm text-foreground-tertiary mt-2">
                    ≈ {formatCurrency(mockPortfolioSummary.totalValueEur, 'EUR')}
                  </p>
                </div>

                {/* Quick stats */}
                <div className="flex flex-wrap gap-6">
                  <QuickStat
                    label="PnL Total"
                    value={formatCurrency(mockPortfolioSummary.totalUnrealizedPnl || 0, 'USD', { showSign: true })}
                    subValue={formatPercentage(mockPortfolioSummary.totalUnrealizedPnlPercentage || 0)}
                    isPositive={(mockPortfolioSummary.totalUnrealizedPnl || 0) > 0}
                  />
                  <QuickStat
                    label="24h"
                    value={formatCurrency(mockPortfolioSummary.change24h.valueUsd, 'USD', { showSign: true })}
                    subValue={formatPercentage(mockPortfolioSummary.change24h.percentage)}
                    isPositive={mockPortfolioSummary.change24h.valueUsd > 0}
                  />
                  <QuickStat
                    label="7d"
                    value={formatCurrency(mockPortfolioSummary.change7d.valueUsd, 'USD', { showSign: true })}
                    subValue={formatPercentage(mockPortfolioSummary.change7d.percentage)}
                    isPositive={mockPortfolioSummary.change7d.valueUsd > 0}
                  />
                  <QuickStat
                    label="30d"
                    value={formatCurrency(mockPortfolioSummary.change30d.valueUsd, 'USD', { showSign: true })}
                    subValue={formatPercentage(mockPortfolioSummary.change30d.percentage)}
                    isPositive={mockPortfolioSummary.change30d.valueUsd > 0}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* KPI Row */}
        <AnimatedSection delay={0.1} className="mb-8">
          <Grid cols={4} gap="md">
            <StatCard
              title="Exposição DeFi"
              value={formatPercentage(mockPortfolioSummary.riskMetrics.defiExposure, { showSign: false })}
              icon={Layers}
              iconColor="text-accent"
            />
            <StatCard
              title="Rewards Pendentes"
              value={formatCurrency(mockPortfolioSummary.totalPendingRewards, 'USD')}
              icon={Sparkles}
              iconColor="text-warning"
            />
            <StatCard
              title="APY Médio"
              value={formatPercentage(mockPortfolioSummary.averageApy, { showSign: false })}
              subtitle={`≈ ${formatCurrency(mockPortfolioSummary.projectedMonthlyYield, 'USD')}/mês`}
              icon={Percent}
              iconColor="text-success"
            />
            <StatCard
              title="Risco de Liquidação"
              value={
                mockPortfolioSummary.riskMetrics.liquidationRisk === 'none' ? 'Nenhum' :
                mockPortfolioSummary.riskMetrics.liquidationRisk === 'low' ? 'Baixo' :
                mockPortfolioSummary.riskMetrics.liquidationRisk === 'medium' ? 'Médio' : 'Alto'
              }
              icon={Shield}
              iconColor={
                mockPortfolioSummary.riskMetrics.liquidationRisk === 'none' ||
                mockPortfolioSummary.riskMetrics.liquidationRisk === 'low'
                  ? 'text-success'
                  : mockPortfolioSummary.riskMetrics.liquidationRisk === 'medium'
                    ? 'text-warning'
                    : 'text-error'
              }
            />
          </Grid>
        </AnimatedSection>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Portfolio Evolution */}
          <AnimatedSection delay={0.15} className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-accent" />
                  Evolução do Portfólio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={mockPortfolioHistory.map((d) => ({
                    date: d.date,
                    Valor: d.totalValueUsd,
                  }))}
                  xKey="date"
                  yKeys={[{ key: 'Valor', name: 'Valor (USD)' }]}
                  height={280}
                  formatValue={(v) => formatCurrency(v, 'USD', { compact: true })}
                  formatXAxis={(d) => d.slice(5)}
                />
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Allocation by Network */}
          <AnimatedSection delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-accent-secondary" />
                  Por Rede
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DonutChart
                  data={allocationByNetwork}
                  height={220}
                  formatValue={(v) => formatCurrency(v, 'USD', { compact: true })}
                />
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>

        {/* View Mode Tabs */}
        <AnimatedSection delay={0.25} className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* View tabs */}
            <div className="flex items-center gap-2">
              {(['all', 'wallet', 'defi'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-body-sm font-medium transition-all',
                    viewMode === mode
                      ? 'bg-accent text-white'
                      : 'bg-background-secondary text-foreground-secondary hover:bg-background-tertiary border border-border'
                  )}
                >
                  {mode === 'all' ? 'Todos' : mode === 'wallet' ? 'Wallet' : 'DeFi'}
                  <span className={cn(
                    'ml-2 px-1.5 py-0.5 rounded text-label-sm',
                    viewMode === mode ? 'bg-white/20' : 'bg-background-tertiary'
                  )}>
                    {mode === 'all'
                      ? mockPositions.length
                      : mode === 'wallet'
                        ? mockPositions.filter((p) => p.type === 'wallet').length
                        : mockPositions.filter((p) => p.type !== 'wallet').length}
                  </span>
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              {/* Network filter */}
              <select
                value={networkFilter}
                onChange={(e) => setNetworkFilter(e.target.value as BlockchainNetwork | 'all')}
                className="px-3 py-2 rounded-lg bg-background-secondary border border-border text-body-sm text-foreground"
              >
                <option value="all">Todas as redes</option>
                {Object.entries(networkLabels).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>

              {/* Asset type filter */}
              {viewMode !== 'wallet' && (
                <select
                  value={assetTypeFilter}
                  onChange={(e) => setAssetTypeFilter(e.target.value as AssetTypeFilter)}
                  className="px-3 py-2 rounded-lg bg-background-secondary border border-border text-body-sm text-foreground"
                >
                  <option value="all">Todos os tipos</option>
                  {Object.entries(cryptoAssetTypeLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Positions Table */}
        <AnimatedSection delay={0.3}>
          <PositionsTable positions={filteredPositions} />
        </AnimatedSection>

        {/* Protocols Section */}
        {viewMode !== 'wallet' && (
          <AnimatedSection delay={0.35} className="mt-8">
            <SectionHeader
              title="Protocolos"
              description="Exposição por protocolo DeFi"
            />
            <ProtocolsGrid />
          </AnimatedSection>
        )}
      </PageContainer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QUICK STAT
// ─────────────────────────────────────────────────────────────────────────────

interface QuickStatProps {
  label: string;
  value: string;
  subValue?: string;
  isPositive?: boolean;
}

function QuickStat({ label, value, subValue, isPositive }: QuickStatProps) {
  return (
    <div className="text-right">
      <p className="text-label-sm text-foreground-tertiary mb-1">{label}</p>
      <p className={cn(
        'text-body-md font-semibold number-display',
        isPositive === undefined ? 'text-foreground' :
        isPositive ? 'text-success' : 'text-error'
      )}>
        {value}
      </p>
      {subValue && (
        <p className={cn(
          'text-label-sm number-display',
          isPositive === undefined ? 'text-foreground-secondary' :
          isPositive ? 'text-success' : 'text-error'
        )}>
          {subValue}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// POSITIONS TABLE
// ─────────────────────────────────────────────────────────────────────────────

interface PositionsTableProps {
  positions: CryptoPosition[];
}

function PositionsTable({ positions }: PositionsTableProps) {
  const typeIcons: Record<CryptoAssetType, React.ElementType> = {
    wallet: Wallet,
    staking: Lock,
    lp: Droplets,
    lending: Coins,
    borrowing: Coins,
    farming: Sparkles,
    vault: Shield,
    nft: Layers,
  };

  const columns: Column<CryptoPosition>[] = [
    {
      key: 'asset',
      header: 'Ativo',
      accessor: (row) => (
        <AssetCell
          symbol={row.token.symbol}
          name={row.secondaryToken 
            ? `${row.token.symbol}/${row.secondaryToken.symbol}`
            : row.token.name}
          network={networkLabels[row.wallet.network]}
        />
      ),
    },
    {
      key: 'type',
      header: 'Tipo',
      accessor: (row) => {
        const Icon = typeIcons[row.type];
        return (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-foreground-secondary" />
            <span className="text-body-sm text-foreground-secondary">
              {cryptoAssetTypeLabels[row.type]}
            </span>
          </div>
        );
      },
    },
    {
      key: 'amount',
      header: 'Quantidade',
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground number-display">
            {formatCryptoAmount(row.amount)} {row.token.symbol}
          </span>
          {row.secondaryAmount && row.secondaryToken && (
            <span className="text-label-sm text-foreground-tertiary number-display">
              {formatCryptoAmount(row.secondaryAmount)} {row.secondaryToken.symbol}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'value',
      header: 'Valor',
      align: 'right',
      accessor: (row) => (
        <ValueCell
          value={formatCurrency(row.valueUsd, 'USD')}
          subValue={formatCurrency(row.valueEur, 'EUR')}
        />
      ),
      sortable: true,
      sortFn: (a, b) => a.valueUsd - b.valueUsd,
    },
    {
      key: 'pnl',
      header: 'PnL',
      align: 'right',
      accessor: (row) => (
        row.unrealizedPnlUsd !== undefined ? (
          <div className="flex flex-col items-end">
            <span className={cn(
              'font-medium number-display',
              row.unrealizedPnlUsd >= 0 ? 'text-success' : 'text-error'
            )}>
              {formatCurrency(row.unrealizedPnlUsd, 'USD', { showSign: true })}
            </span>
            {row.unrealizedPnlPercentage !== undefined && (
              <TrendIndicator value={row.unrealizedPnlPercentage} size="sm" showIcon={false} />
            )}
          </div>
        ) : (
          <span className="text-foreground-muted">—</span>
        )
      ),
    },
    {
      key: 'apy',
      header: 'APY',
      align: 'right',
      accessor: (row) => (
        row.apy ? (
          <Badge variant="success" size="sm">
            {formatPercentage(row.apy, { showSign: false })}
          </Badge>
        ) : (
          <span className="text-foreground-muted">—</span>
        )
      ),
    },
    {
      key: 'protocol',
      header: 'Protocolo',
      accessor: (row) => (
        row.protocol ? (
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-background-tertiary flex items-center justify-center text-[10px] font-bold">
              {row.protocol.name.slice(0, 2).toUpperCase()}
            </div>
            <span className="text-body-sm text-foreground-secondary">{row.protocol.name}</span>
          </div>
        ) : (
          <span className="text-foreground-muted">—</span>
        )
      ),
    },
  ];

  if (positions.length === 0) {
    return <EmptyPositionsState />;
  }

  return (
    <DataTable
      data={positions}
      columns={columns}
      keyExtractor={(row) => row.id}
      stickyHeader
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROTOCOLS GRID
// ─────────────────────────────────────────────────────────────────────────────

function ProtocolsGrid() {
  return (
    <Grid cols={4} gap="md">
      {mockPortfolioSummary.allocationByProtocol.map((item, index) => (
        <motion.div
          key={item.protocol.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card variant="interactive">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent-secondary/20 flex items-center justify-center">
                  <span className="text-body-sm font-bold text-accent">
                    {item.protocol.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.protocol.name}</p>
                  <p className="text-label-sm text-foreground-tertiary">
                    {networkLabels[item.protocol.network]}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-body-sm text-foreground-secondary">Valor</span>
                <span className="font-medium text-foreground number-display">
                  {formatCurrency(item.value, 'USD', { compact: true })}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-body-sm text-foreground-secondary">Exposição</span>
                <span className="text-body-sm text-foreground-secondary number-display">
                  {formatPercentage(item.percentage, { showSign: false })}
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Grid>
  );
}
