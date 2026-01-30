/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FINANCIAL & CRYPTO CALCULATIONS
 * Lógica de negócio para cálculos automáticos
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type {
  Transaction,
  MonthlyFinancialSummary,
  FinancialInsight,
  FinancialKPIs,
  CryptoPosition,
  CryptoPortfolioSummary,
  Percentage,
  ExpenseCategory,
  IncomeCategory,
  CryptoAssetType,
  BlockchainNetwork,
} from '@/types';
import { generateId, sum, average, calculatePercentageChange } from './utils';

// ─────────────────────────────────────────────────────────────────────────────
// FINANCIAL CALCULATIONS
// ─────────────────────────────────────────────────────────────────────────────

/** Calculate monthly summary from transactions */
export function calculateMonthlySummary(
  transactions: Transaction[],
  month: string, // YYYY-MM format
  previousSummary?: MonthlyFinancialSummary
): MonthlyFinancialSummary {
  const monthTransactions = transactions.filter(t => 
    t.date.startsWith(month)
  );
  
  // Separate income and expenses
  const incomeTransactions = monthTransactions.filter(t => t.type === 'income');
  const expenseTransactions = monthTransactions.filter(t => t.type === 'expense');
  
  // Calculate income breakdown
  const incomeBreakdown = incomeTransactions.reduce((acc, t) => {
    const category = t.category as IncomeCategory;
    acc[category] = (acc[category] || 0) + t.amount;
    return acc;
  }, {} as Record<IncomeCategory, number>);
  
  const totalIncome = sum(incomeTransactions.map(t => t.amount));
  const salaryIncome = incomeBreakdown.salary || 0;
  const otherIncome = totalIncome - salaryIncome;
  
  // Calculate expense breakdown
  const expenseBreakdown = expenseTransactions.reduce((acc, t) => {
    const category = t.category as ExpenseCategory;
    acc[category] = (acc[category] || 0) + t.amount;
    return acc;
  }, {} as Record<ExpenseCategory, number>);
  
  const totalExpenses = sum(expenseTransactions.map(t => t.amount));
  const mandatoryExpenses = sum(
    expenseTransactions.filter(t => t.nature === 'mandatory').map(t => t.amount)
  );
  const optionalExpenses = totalExpenses - mandatoryExpenses;
  
  // Calculate KPIs
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? balance / totalIncome : 0;
  
  // Days in month (approximate)
  const daysInMonth = 30;
  const burnRate = totalExpenses / daysInMonth;
  
  // Comparison to previous month
  const comparisonToPreviousMonth = previousSummary
    ? {
        incomeChange: calculatePercentageChange(totalIncome, previousSummary.income.total),
        expensesChange: calculatePercentageChange(totalExpenses, previousSummary.expenses.total),
        savingsRateChange: savingsRate - previousSummary.savingsRate,
      }
    : {
        incomeChange: 0,
        expensesChange: 0,
        savingsRateChange: 0,
      };
  
  return {
    month,
    income: {
      total: totalIncome,
      bySalary: salaryIncome,
      byOther: otherIncome,
      breakdown: incomeBreakdown,
    },
    expenses: {
      total: totalExpenses,
      mandatory: mandatoryExpenses,
      optional: optionalExpenses,
      breakdown: expenseBreakdown,
    },
    balance,
    savingsRate,
    burnRate,
    comparisonToPreviousMonth,
  };
}

/** Generate financial insights based on data */
export function generateFinancialInsights(
  currentMonth: MonthlyFinancialSummary,
  historicalSummaries: MonthlyFinancialSummary[]
): FinancialInsight[] {
  const insights: FinancialInsight[] = [];
  const now = new Date().toISOString();
  
  // Calculate historical averages
  const avgExpenses = average(historicalSummaries.map(s => s.expenses.total));
  const avgSavingsRate = average(historicalSummaries.map(s => s.savingsRate));
  
  // Insight: Spending above average
  if (currentMonth.expenses.total > avgExpenses * 1.15) {
    const percentAbove = ((currentMonth.expenses.total / avgExpenses) - 1) * 100;
    insights.push({
      id: generateId(),
      type: 'warning',
      title: 'Gastos acima da média',
      description: `Este mês gastaste ${percentAbove.toFixed(0)}% acima da tua média histórica.`,
      metric: 'expenses',
      value: currentMonth.expenses.total,
      comparison: `Média: ${avgExpenses.toFixed(0)}€`,
      generatedAt: now,
    });
  }
  
  // Insight: Good savings rate
  if (currentMonth.savingsRate > 0.2) {
    insights.push({
      id: generateId(),
      type: 'success',
      title: 'Excelente taxa de poupança',
      description: `Estás a poupar ${(currentMonth.savingsRate * 100).toFixed(0)}% do teu rendimento este mês.`,
      metric: 'savingsRate',
      value: currentMonth.savingsRate,
      generatedAt: now,
    });
  } else if (currentMonth.savingsRate < 0.05 && currentMonth.savingsRate >= 0) {
    insights.push({
      id: generateId(),
      type: 'warning',
      title: 'Taxa de poupança baixa',
      description: `A tua taxa de poupança está apenas em ${(currentMonth.savingsRate * 100).toFixed(0)}%.`,
      metric: 'savingsRate',
      value: currentMonth.savingsRate,
      generatedAt: now,
    });
  }
  
  // Insight: Negative balance
  if (currentMonth.balance < 0) {
    insights.push({
      id: generateId(),
      type: 'warning',
      title: 'Balanço negativo',
      description: `Estás a gastar mais do que ganhas este mês.`,
      metric: 'balance',
      value: currentMonth.balance,
      generatedAt: now,
    });
  }
  
  // Insight: Fixed expenses ratio
  const fixedExpenseRatio = currentMonth.expenses.mandatory / currentMonth.income.total;
  if (fixedExpenseRatio > 0.5) {
    insights.push({
      id: generateId(),
      type: 'info',
      title: 'Despesas fixas elevadas',
      description: `As despesas obrigatórias representam ${(fixedExpenseRatio * 100).toFixed(0)}% do teu rendimento.`,
      metric: 'fixedRatio',
      value: fixedExpenseRatio,
      generatedAt: now,
    });
  }
  
  // Insight: Income increase
  if (currentMonth.comparisonToPreviousMonth.incomeChange > 0.1) {
    insights.push({
      id: generateId(),
      type: 'success',
      title: 'Rendimento em crescimento',
      description: `O teu rendimento aumentou ${(currentMonth.comparisonToPreviousMonth.incomeChange * 100).toFixed(0)}% face ao mês anterior.`,
      metric: 'incomeChange',
      value: currentMonth.comparisonToPreviousMonth.incomeChange,
      generatedAt: now,
    });
  }
  
  return insights;
}

/** Calculate full financial KPIs */
export function calculateFinancialKPIs(
  currentMonth: MonthlyFinancialSummary,
  historicalSummaries: MonthlyFinancialSummary[]
): FinancialKPIs {
  const allSummaries = [...historicalSummaries, currentMonth];
  
  // Year to date calculations
  const ytdIncome = sum(allSummaries.map(s => s.income.total));
  const ytdExpenses = sum(allSummaries.map(s => s.expenses.total));
  const avgMonthlySavings = average(allSummaries.map(s => s.balance));
  const avgSavingsRate = average(allSummaries.map(s => s.savingsRate));
  const avgMonthlyExpenses = average(allSummaries.map(s => s.expenses.total));
  
  // Trends (comparing last 3 months)
  const recentSummaries = allSummaries.slice(-3);
  const savingsRateTrend = recentSummaries.length >= 2
    ? getTrendFromValues(recentSummaries.map(s => s.savingsRate))
    : 'neutral';
  const expensesTrend = recentSummaries.length >= 2
    ? getTrendFromValues(recentSummaries.map(s => s.expenses.total), true)
    : 'neutral';
  const incomeTrend = recentSummaries.length >= 2
    ? getTrendFromValues(recentSummaries.map(s => s.income.total))
    : 'neutral';
  
  const insights = generateFinancialInsights(currentMonth, historicalSummaries);
  
  return {
    currentMonth,
    yearToDate: {
      totalIncome: ytdIncome,
      totalExpenses: ytdExpenses,
      averageMonthlySavings: avgMonthlySavings,
      averageSavingsRate: avgSavingsRate,
      averageMonthlyExpenses: avgMonthlyExpenses,
    },
    trends: {
      savingsRateTrend,
      expensesTrend,
      incomeTrend,
    },
    insights,
  };
}

// Helper to determine trend from array of values
function getTrendFromValues(
  values: number[],
  invertLogic: boolean = false
): 'up' | 'down' | 'neutral' {
  if (values.length < 2) return 'neutral';
  
  const first = values[0];
  const last = values[values.length - 1];
  const change = (last - first) / Math.abs(first);
  
  if (Math.abs(change) < 0.05) return 'neutral';
  
  const isUp = change > 0;
  return invertLogic
    ? (isUp ? 'down' : 'up')
    : (isUp ? 'up' : 'down');
}

// ─────────────────────────────────────────────────────────────────────────────
// CRYPTO CALCULATIONS
// ─────────────────────────────────────────────────────────────────────────────

/** Calculate portfolio summary from positions */
export function calculatePortfolioSummary(
  positions: CryptoPosition[],
  previousDayValue?: number,
  previousWeekValue?: number,
  previousMonthValue?: number
): CryptoPortfolioSummary {
  const now = new Date().toISOString();
  
  const totalValueUsd = sum(positions.map(p => p.valueUsd));
  const totalValueEur = sum(positions.map(p => p.valueEur));
  const totalCostBasis = sum(positions.map(p => p.costBasisUsd || 0));
  const totalUnrealizedPnl = sum(positions.map(p => p.unrealizedPnlUsd || 0));
  
  // Changes
  const change24h = previousDayValue
    ? {
        valueUsd: totalValueUsd - previousDayValue,
        percentage: calculatePercentageChange(totalValueUsd, previousDayValue),
      }
    : { valueUsd: 0, percentage: 0 };
  
  const change7d = previousWeekValue
    ? {
        valueUsd: totalValueUsd - previousWeekValue,
        percentage: calculatePercentageChange(totalValueUsd, previousWeekValue),
      }
    : { valueUsd: 0, percentage: 0 };
  
  const change30d = previousMonthValue
    ? {
        valueUsd: totalValueUsd - previousMonthValue,
        percentage: calculatePercentageChange(totalValueUsd, previousMonthValue),
      }
    : { valueUsd: 0, percentage: 0 };
  
  // Allocation by type
  const allocationByType = calculateAllocationByKey(
    positions,
    'type',
    totalValueUsd
  ) as Record<CryptoAssetType, { value: number; percentage: Percentage }>;
  
  // Allocation by network
  const allocationByNetwork = positions.reduce((acc, p) => {
    const network = p.wallet.network;
    if (!acc[network]) {
      acc[network] = { value: 0, percentage: 0 };
    }
    acc[network].value += p.valueUsd;
    return acc;
  }, {} as Record<BlockchainNetwork, { value: number; percentage: Percentage }>);
  
  Object.keys(allocationByNetwork).forEach(network => {
    allocationByNetwork[network as BlockchainNetwork].percentage = 
      allocationByNetwork[network as BlockchainNetwork].value / totalValueUsd;
  });
  
  // Allocation by token (top tokens)
  const tokenAllocation: Record<string, { token: typeof positions[0]['token']; value: number }> = {};
  positions.forEach(p => {
    const tokenId = p.token.id;
    if (!tokenAllocation[tokenId]) {
      tokenAllocation[tokenId] = { token: p.token, value: 0 };
    }
    tokenAllocation[tokenId].value += p.valueUsd;
  });
  
  const allocationByToken = Object.values(tokenAllocation)
    .map(({ token, value }) => ({
      token,
      value,
      percentage: value / totalValueUsd,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
  
  // Allocation by protocol
  const protocolAllocation: Record<string, { protocol: NonNullable<typeof positions[0]['protocol']>; value: number }> = {};
  positions.forEach(p => {
    if (p.protocol) {
      const protocolId = p.protocol.id;
      if (!protocolAllocation[protocolId]) {
        protocolAllocation[protocolId] = { protocol: p.protocol, value: 0 };
      }
      protocolAllocation[protocolId].value += p.valueUsd;
    }
  });
  
  const allocationByProtocol = Object.values(protocolAllocation)
    .map(({ protocol, value }) => ({
      protocol,
      value,
      percentage: value / totalValueUsd,
    }))
    .sort((a, b) => b.value - a.value);
  
  // Risk metrics
  const healthFactors = positions
    .filter(p => p.healthFactor !== undefined)
    .map(p => p.healthFactor!);
  
  const healthFactorMin = healthFactors.length > 0
    ? Math.min(...healthFactors)
    : undefined;
  
  const liquidationRisk = healthFactorMin === undefined
    ? 'none'
    : healthFactorMin < 1.1
      ? 'high'
      : healthFactorMin < 1.5
        ? 'medium'
        : 'low';
  
  const defiPositions = positions.filter(p => 
    ['staking', 'lp', 'lending', 'farming', 'vault'].includes(p.type)
  );
  const defiExposure = sum(defiPositions.map(p => p.valueUsd)) / totalValueUsd;
  
  // Diversification score (simplified Herfindahl-Hirschman Index)
  const tokenConcentration = allocationByToken.reduce(
    (sum, { percentage }) => sum + Math.pow(percentage, 2),
    0
  );
  const diversificationScore = Math.round((1 - tokenConcentration) * 100);
  
  // Yield calculations
  const totalPendingRewards = sum(
    positions.flatMap(p => p.rewards?.map(r => r.valueUsd) || [])
  );
  
  const apyPositions = positions.filter(p => p.apy !== undefined && p.apy > 0);
  const weightedApy = apyPositions.length > 0
    ? sum(apyPositions.map(p => (p.apy || 0) * p.valueUsd)) / sum(apyPositions.map(p => p.valueUsd))
    : 0;
  
  const defiValue = sum(defiPositions.map(p => p.valueUsd));
  const projectedMonthlyYield = (weightedApy * defiValue) / 12;
  
  // Unique wallets
  const uniqueWallets = new Set(positions.map(p => p.wallet.id));
  
  return {
    totalValueUsd,
    totalValueEur,
    totalCostBasis,
    totalUnrealizedPnl,
    totalUnrealizedPnlPercentage: totalCostBasis > 0 
      ? totalUnrealizedPnl / totalCostBasis 
      : undefined,
    change24h,
    change7d,
    change30d,
    allocationByType,
    allocationByNetwork,
    allocationByToken,
    allocationByProtocol,
    riskMetrics: {
      healthFactorMin,
      liquidationRisk,
      diversificationScore,
      defiExposure,
    },
    totalPendingRewards,
    averageApy: weightedApy,
    projectedMonthlyYield,
    lastUpdated: now,
    walletCount: uniqueWallets.size,
    positionCount: positions.length,
  };
}

// Helper to calculate allocation by a key
function calculateAllocationByKey<T extends { valueUsd: number }>(
  items: T[],
  key: keyof T,
  total: number
): Record<string, { value: number; percentage: Percentage }> {
  const allocation: Record<string, { value: number; percentage: Percentage }> = {};
  
  items.forEach(item => {
    const keyValue = String((item as Record<string, unknown>)[key as string]);
    const value = item.valueUsd || 0;
    
    if (!allocation[keyValue]) {
      allocation[keyValue] = { value: 0, percentage: 0 };
    }
    allocation[keyValue].value += value;
  });
  
  Object.keys(allocation).forEach(k => {
    allocation[k].percentage = allocation[k].value / total;
  });
  
  return allocation;
}

/** Calculate impermanent loss for LP position */
export function calculateImpermanentLoss(
  initialPrice: number,
  currentPrice: number
): Percentage {
  const priceRatio = currentPrice / initialPrice;
  const il = 2 * Math.sqrt(priceRatio) / (1 + priceRatio) - 1;
  return il;
}

/** Calculate liquidation price based on health factor target */
export function calculateLiquidationPrice(
  collateralValue: number,
  debtValue: number,
  liquidationThreshold: Percentage, // e.g., 0.8
  currentPrice: number
): number {
  // Price at which health factor = 1
  const liquidationPrice = (debtValue * currentPrice) / (collateralValue * liquidationThreshold);
  return liquidationPrice;
}
