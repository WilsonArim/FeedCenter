/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MOCK DATA - PERSONAL FINANCE
 * Dados de exemplo para desenvolvimento
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { 
  Transaction, 
  MonthlyFinancialSummary, 
  FinancialKPIs,
  FinancialDataPoint,
  FinancialInsight 
} from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// TRANSACTIONS
// ─────────────────────────────────────────────────────────────────────────────

export const mockTransactions: Transaction[] = [
  // Income - January
  {
    id: 't1',
    type: 'income',
    amount: 2800,
    currency: 'EUR',
    category: 'salary',
    description: 'Vencimento Janeiro',
    date: '2024-01-25T00:00:00Z',
    recurrence: { isRecurring: true, frequency: 'monthly', dayOfMonth: 25 },
    source: 'Conta Ordenado',
  },
  {
    id: 't2',
    type: 'income',
    amount: 350,
    currency: 'EUR',
    category: 'freelance',
    description: 'Projeto consultoria',
    date: '2024-01-15T00:00:00Z',
    source: 'PayPal',
  },
  
  // Expenses - Mandatory
  {
    id: 't3',
    type: 'expense',
    amount: 650,
    currency: 'EUR',
    category: 'housing',
    nature: 'mandatory',
    description: 'Renda apartamento',
    date: '2024-01-05T00:00:00Z',
    recurrence: { isRecurring: true, frequency: 'monthly', dayOfMonth: 5 },
  },
  {
    id: 't4',
    type: 'expense',
    amount: 85,
    currency: 'EUR',
    category: 'utilities',
    nature: 'mandatory',
    description: 'Eletricidade',
    date: '2024-01-10T00:00:00Z',
    recurrence: { isRecurring: true, frequency: 'monthly' },
  },
  {
    id: 't5',
    type: 'expense',
    amount: 45,
    currency: 'EUR',
    category: 'utilities',
    nature: 'mandatory',
    description: 'Internet fibra',
    date: '2024-01-08T00:00:00Z',
    recurrence: { isRecurring: true, frequency: 'monthly' },
  },
  {
    id: 't6',
    type: 'expense',
    amount: 35,
    currency: 'EUR',
    category: 'utilities',
    nature: 'mandatory',
    description: 'Água',
    date: '2024-01-12T00:00:00Z',
    recurrence: { isRecurring: true, frequency: 'monthly' },
  },
  {
    id: 't7',
    type: 'expense',
    amount: 120,
    currency: 'EUR',
    category: 'insurance',
    nature: 'mandatory',
    description: 'Seguro automóvel',
    date: '2024-01-15T00:00:00Z',
    recurrence: { isRecurring: true, frequency: 'monthly' },
  },
  {
    id: 't8',
    type: 'expense',
    amount: 50,
    currency: 'EUR',
    category: 'transport',
    nature: 'mandatory',
    description: 'Passe mensal',
    date: '2024-01-02T00:00:00Z',
    recurrence: { isRecurring: true, frequency: 'monthly' },
  },
  
  // Expenses - Optional
  {
    id: 't9',
    type: 'expense',
    amount: 280,
    currency: 'EUR',
    category: 'food',
    nature: 'optional',
    description: 'Supermercado',
    date: '2024-01-07T00:00:00Z',
  },
  {
    id: 't10',
    type: 'expense',
    amount: 150,
    currency: 'EUR',
    category: 'food',
    nature: 'optional',
    description: 'Supermercado',
    date: '2024-01-21T00:00:00Z',
  },
  {
    id: 't11',
    type: 'expense',
    amount: 45,
    currency: 'EUR',
    category: 'entertainment',
    nature: 'optional',
    description: 'Jantar fora',
    date: '2024-01-13T00:00:00Z',
  },
  {
    id: 't12',
    type: 'expense',
    amount: 15.99,
    currency: 'EUR',
    category: 'subscriptions',
    nature: 'optional',
    description: 'Netflix',
    date: '2024-01-01T00:00:00Z',
    recurrence: { isRecurring: true, frequency: 'monthly' },
  },
  {
    id: 't13',
    type: 'expense',
    amount: 9.99,
    currency: 'EUR',
    category: 'subscriptions',
    nature: 'optional',
    description: 'Spotify',
    date: '2024-01-01T00:00:00Z',
    recurrence: { isRecurring: true, frequency: 'monthly' },
  },
  {
    id: 't14',
    type: 'expense',
    amount: 89,
    currency: 'EUR',
    category: 'shopping',
    nature: 'optional',
    description: 'Roupa',
    date: '2024-01-20T00:00:00Z',
  },
  {
    id: 't15',
    type: 'expense',
    amount: 35,
    currency: 'EUR',
    category: 'health',
    nature: 'optional',
    description: 'Farmácia',
    date: '2024-01-18T00:00:00Z',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MONTHLY SUMMARIES
// ─────────────────────────────────────────────────────────────────────────────

export const mockMonthlySummaries: MonthlyFinancialSummary[] = [
  {
    month: '2023-10',
    income: {
      total: 2800,
      bySalary: 2800,
      byOther: 0,
      breakdown: { salary: 2800, bonus: 0, freelance: 0, investments: 0, rental: 0, refund: 0, gift: 0, other: 0 },
    },
    expenses: {
      total: 1680,
      mandatory: 985,
      optional: 695,
      breakdown: { housing: 650, utilities: 165, transport: 50, food: 380, health: 40, insurance: 120, subscriptions: 26, entertainment: 120, education: 0, shopping: 89, travel: 0, other: 40 },
    },
    balance: 1120,
    savingsRate: 0.40,
    burnRate: 56,
    comparisonToPreviousMonth: { incomeChange: 0, expensesChange: -0.05, savingsRateChange: 0.03 },
  },
  {
    month: '2023-11',
    income: {
      total: 2800,
      bySalary: 2800,
      byOther: 0,
      breakdown: { salary: 2800, bonus: 0, freelance: 0, investments: 0, rental: 0, refund: 0, gift: 0, other: 0 },
    },
    expenses: {
      total: 1850,
      mandatory: 985,
      optional: 865,
      breakdown: { housing: 650, utilities: 165, transport: 50, food: 420, health: 60, insurance: 120, subscriptions: 26, entertainment: 180, education: 0, shopping: 129, travel: 0, other: 50 },
    },
    balance: 950,
    savingsRate: 0.339,
    burnRate: 61.67,
    comparisonToPreviousMonth: { incomeChange: 0, expensesChange: 0.10, savingsRateChange: -0.061 },
  },
  {
    month: '2023-12',
    income: {
      total: 4200,
      bySalary: 2800,
      byOther: 1400,
      breakdown: { salary: 2800, bonus: 1400, freelance: 0, investments: 0, rental: 0, refund: 0, gift: 0, other: 0 },
    },
    expenses: {
      total: 2450,
      mandatory: 985,
      optional: 1465,
      breakdown: { housing: 650, utilities: 165, transport: 50, food: 520, health: 45, insurance: 120, subscriptions: 26, entertainment: 380, education: 0, shopping: 394, travel: 0, other: 100 },
    },
    balance: 1750,
    savingsRate: 0.417,
    burnRate: 79.03,
    comparisonToPreviousMonth: { incomeChange: 0.50, expensesChange: 0.32, savingsRateChange: 0.078 },
  },
  {
    month: '2024-01',
    income: {
      total: 3150,
      bySalary: 2800,
      byOther: 350,
      breakdown: { salary: 2800, bonus: 0, freelance: 350, investments: 0, rental: 0, refund: 0, gift: 0, other: 0 },
    },
    expenses: {
      total: 1875.97,
      mandatory: 985,
      optional: 890.97,
      breakdown: { housing: 650, utilities: 165, transport: 50, food: 430, health: 35, insurance: 120, subscriptions: 25.98, entertainment: 45, education: 0, shopping: 89, travel: 0, other: 265.99 },
    },
    balance: 1274.03,
    savingsRate: 0.404,
    burnRate: 60.52,
    comparisonToPreviousMonth: { incomeChange: -0.25, expensesChange: -0.234, savingsRateChange: -0.013 },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// INSIGHTS
// ─────────────────────────────────────────────────────────────────────────────

export const mockInsights: FinancialInsight[] = [
  {
    id: 'ins1',
    type: 'success',
    title: 'Excelente taxa de poupança',
    description: 'Estás a poupar 40% do teu rendimento este mês. Continua assim!',
    metric: 'savingsRate',
    value: 0.40,
    generatedAt: '2024-01-25T10:00:00Z',
  },
  {
    id: 'ins2',
    type: 'info',
    title: 'Despesas fixas controladas',
    description: 'As despesas obrigatórias representam 31% do teu rendimento, abaixo do recomendado de 50%.',
    metric: 'fixedRatio',
    value: 0.31,
    generatedAt: '2024-01-25T10:00:00Z',
  },
  {
    id: 'ins3',
    type: 'warning',
    title: 'Alimentação acima da média',
    description: 'Gastaste 12% mais em alimentação comparado com a tua média histórica.',
    metric: 'foodExpenses',
    value: 430,
    comparison: 'Média: 380€',
    generatedAt: '2024-01-25T10:00:00Z',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// KPIs
// ─────────────────────────────────────────────────────────────────────────────

export const mockFinancialKPIs: FinancialKPIs = {
  currentMonth: mockMonthlySummaries[3],
  yearToDate: {
    totalIncome: 12950,
    totalExpenses: 7855.97,
    averageMonthlySavings: 1273.51,
    averageSavingsRate: 0.39,
    averageMonthlyExpenses: 1963.99,
  },
  trends: {
    savingsRateTrend: 'up',
    expensesTrend: 'down',
    incomeTrend: 'up',
  },
  insights: mockInsights,
};

// ─────────────────────────────────────────────────────────────────────────────
// HISTORICAL DATA FOR CHARTS
// ─────────────────────────────────────────────────────────────────────────────

export const mockFinancialHistory: FinancialDataPoint[] = [
  { date: '2023-06', income: 2800, expenses: 1720, balance: 1080, savingsRate: 0.386 },
  { date: '2023-07', income: 2800, expenses: 1850, balance: 950, savingsRate: 0.339 },
  { date: '2023-08', income: 2800, expenses: 1650, balance: 1150, savingsRate: 0.411 },
  { date: '2023-09', income: 2800, expenses: 1780, balance: 1020, savingsRate: 0.364 },
  { date: '2023-10', income: 2800, expenses: 1680, balance: 1120, savingsRate: 0.400 },
  { date: '2023-11', income: 2800, expenses: 1850, balance: 950, savingsRate: 0.339 },
  { date: '2023-12', income: 4200, expenses: 2450, balance: 1750, savingsRate: 0.417 },
  { date: '2024-01', income: 3150, expenses: 1876, balance: 1274, savingsRate: 0.404 },
];
