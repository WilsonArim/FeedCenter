/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CLAWDBOT DASHBOARD - TYPE DEFINITIONS
 * Schemas preparados para ingestão de dados pelo bot externo
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────────────────────
// COMMON TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** ISO 8601 date string */
export type ISODateString = string;

/** Timestamp in milliseconds */
export type Timestamp = number;

/** Currency code (EUR, USD, BTC, etc.) */
export type CurrencyCode = string;

/** Percentage as decimal (0.15 = 15%) */
export type Percentage = number;

/** Trend direction */
export type Trend = 'up' | 'down' | 'neutral';

/** Loading states for async data */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/** Generic API response wrapper */
export interface ApiResponse<T> {
  data: T | null;
  status: LoadingState;
  error?: string;
  lastUpdated?: ISODateString;
}

/** Pagination metadata */
export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** Time range for filters */
export type TimeRange = '24h' | '7d' | '30d' | '90d' | '1y' | 'all';

// ─────────────────────────────────────────────────────────────────────────────
// NEWS TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** News category */
export type NewsCategory = 'national' | 'international' | 'crypto';

/** News source */
export interface NewsSource {
  id: string;
  name: string;
  url: string;
  logo?: string;
  reliability?: number; // 0-100 score
}

/** News article */
export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  category: NewsCategory;
  source: NewsSource;
  url: string;
  imageUrl?: string;
  publishedAt: ISODateString;
  fetchedAt: ISODateString;
  tags?: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
  relevanceScore?: number; // 0-100
  isRead?: boolean;
  isBookmarked?: boolean;
}

/** Daily news digest */
export interface DailyNewsDigest {
  date: ISODateString;
  articles: {
    national: NewsArticle[];
    international: NewsArticle[];
    crypto: NewsArticle[];
  };
  totalCount: number;
  highlights: NewsArticle[]; // Top 3-5 most relevant
}

/** News filters */
export interface NewsFilters {
  category?: NewsCategory;
  searchQuery?: string;
  dateFrom?: ISODateString;
  dateTo?: ISODateString;
  sources?: string[];
  tags?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// PERSONAL FINANCE TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** Transaction type */
export type TransactionType = 'income' | 'expense';

/** Expense category (despesas) */
export type ExpenseCategory = 
  | 'housing'        // Habitação (renda, prestação)
  | 'utilities'      // Serviços (água, luz, gás, internet)
  | 'transport'      // Transporte
  | 'food'           // Alimentação
  | 'health'         // Saúde
  | 'insurance'      // Seguros
  | 'subscriptions'  // Subscrições
  | 'entertainment'  // Entretenimento
  | 'education'      // Educação
  | 'shopping'       // Compras
  | 'travel'         // Viagens
  | 'other';         // Outros

/** Income category (rendimentos) */
export type IncomeCategory =
  | 'salary'         // Vencimento
  | 'bonus'          // Bónus
  | 'freelance'      // Trabalho freelance
  | 'investments'    // Rendimentos de investimentos
  | 'rental'         // Rendas recebidas
  | 'refund'         // Reembolsos
  | 'gift'           // Ofertas
  | 'other';         // Outros

/** Whether expense is mandatory or optional */
export type ExpenseNature = 'mandatory' | 'optional';

/** Recurrence pattern */
export interface Recurrence {
  isRecurring: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  dayOfMonth?: number; // For monthly
  endDate?: ISODateString;
}

/** Financial transaction */
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  currency: CurrencyCode;
  category: ExpenseCategory | IncomeCategory;
  nature?: ExpenseNature; // Only for expenses
  description: string;
  date: ISODateString;
  recurrence?: Recurrence;
  tags?: string[];
  notes?: string;
  source?: string; // Bank account, card, etc.
}

/** Monthly financial summary */
export interface MonthlyFinancialSummary {
  month: string; // YYYY-MM format
  income: {
    total: number;
    bySalary: number;
    byOther: number;
    breakdown: Record<IncomeCategory, number>;
  };
  expenses: {
    total: number;
    mandatory: number;
    optional: number;
    breakdown: Record<ExpenseCategory, number>;
  };
  balance: number; // income - expenses
  savingsRate: Percentage; // (income - expenses) / income
  burnRate: number; // Average daily expense
  comparisonToPreviousMonth: {
    incomeChange: Percentage;
    expensesChange: Percentage;
    savingsRateChange: Percentage;
  };
}

/** Financial KPIs */
export interface FinancialKPIs {
  currentMonth: MonthlyFinancialSummary;
  yearToDate: {
    totalIncome: number;
    totalExpenses: number;
    averageMonthlySavings: number;
    averageSavingsRate: Percentage;
    averageMonthlyExpenses: number;
  };
  trends: {
    savingsRateTrend: Trend;
    expensesTrend: Trend;
    incomeTrend: Trend;
  };
  insights: FinancialInsight[];
}

/** Automated financial insight */
export interface FinancialInsight {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  description: string;
  metric?: string;
  value?: number;
  comparison?: string;
  generatedAt: ISODateString;
}

/** Historical data point for charts */
export interface FinancialDataPoint {
  date: ISODateString;
  income: number;
  expenses: number;
  balance: number;
  savingsRate: Percentage;
}

// ─────────────────────────────────────────────────────────────────────────────
// CRYPTO PORTFOLIO TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** Blockchain network */
export type BlockchainNetwork = 
  | 'ethereum'
  | 'solana'
  | 'bitcoin'
  | 'polygon'
  | 'arbitrum'
  | 'optimism'
  | 'avalanche'
  | 'bsc'
  | 'base'
  | 'other';

/** Asset type in portfolio */
export type CryptoAssetType = 
  | 'wallet'     // Token em wallet
  | 'staking'    // Staking nativo ou delegado
  | 'lp'         // Liquidity Pool
  | 'lending'    // Emprestado (Aave, Compound, etc.)
  | 'borrowing'  // Emprestado (colateral)
  | 'farming'    // Yield farming
  | 'vault'      // Auto-compound vaults
  | 'nft';       // NFTs com valor

/** DeFi protocol */
export interface DeFiProtocol {
  id: string;
  name: string;
  logo?: string;
  network: BlockchainNetwork;
  tvl?: number;
  url?: string;
  category: 'dex' | 'lending' | 'staking' | 'yield' | 'bridge' | 'other';
}

/** Wallet address */
export interface Wallet {
  id: string;
  address: string;
  name: string; // User-friendly name
  network: BlockchainNetwork;
  isHardware?: boolean;
  lastSynced?: ISODateString;
}

/** Token information */
export interface Token {
  id: string;
  symbol: string;
  name: string;
  logo?: string;
  network: BlockchainNetwork;
  contractAddress?: string;
  decimals: number;
  coingeckoId?: string;
}

/** Token price data */
export interface TokenPrice {
  tokenId: string;
  priceUsd: number;
  priceEur: number;
  priceBtc?: number;
  change24h: Percentage;
  change7d: Percentage;
  change30d: Percentage;
  marketCap?: number;
  volume24h?: number;
  lastUpdated: ISODateString;
}

/** Portfolio position (any asset type) */
export interface CryptoPosition {
  id: string;
  type: CryptoAssetType;
  token: Token;
  secondaryToken?: Token; // For LP pairs
  amount: number;
  secondaryAmount?: number; // For LP pairs
  valueUsd: number;
  valueEur: number;
  costBasisUsd?: number; // Original purchase value
  unrealizedPnlUsd?: number;
  unrealizedPnlPercentage?: Percentage;
  wallet: Wallet;
  protocol?: DeFiProtocol;
  // DeFi specific
  apy?: Percentage;
  rewards?: {
    token: Token;
    amount: number;
    valueUsd: number;
  }[];
  healthFactor?: number; // For lending/borrowing
  liquidationPrice?: number;
  // Metadata
  lastUpdated: ISODateString;
  notes?: string;
}

/** LP position details */
export interface LiquidityPosition extends CryptoPosition {
  type: 'lp';
  poolAddress: string;
  token0: Token;
  token1: Token;
  amount0: number;
  amount1: number;
  poolShare: Percentage;
  impermanentLoss?: Percentage;
  feesEarned?: number;
  feesEarnedUsd?: number;
}

/** Staking position details */
export interface StakingPosition extends CryptoPosition {
  type: 'staking';
  validator?: string;
  lockPeriod?: number; // Days
  unlockDate?: ISODateString;
  slashingRisk?: 'low' | 'medium' | 'high';
}

/** Lending position details */
export interface LendingPosition extends CryptoPosition {
  type: 'lending' | 'borrowing';
  supplyApy?: Percentage;
  borrowApy?: Percentage;
  collateralFactor?: Percentage;
  utilizationRate?: Percentage;
}

/** Portfolio summary */
export interface CryptoPortfolioSummary {
  totalValueUsd: number;
  totalValueEur: number;
  totalCostBasis?: number;
  totalUnrealizedPnl?: number;
  totalUnrealizedPnlPercentage?: Percentage;
  change24h: {
    valueUsd: number;
    percentage: Percentage;
  };
  change7d: {
    valueUsd: number;
    percentage: Percentage;
  };
  change30d: {
    valueUsd: number;
    percentage: Percentage;
  };
  // Allocation breakdown
  allocationByType: Record<CryptoAssetType, { value: number; percentage: Percentage }>;
  allocationByNetwork: Record<BlockchainNetwork, { value: number; percentage: Percentage }>;
  allocationByToken: { token: Token; value: number; percentage: Percentage }[];
  allocationByProtocol: { protocol: DeFiProtocol; value: number; percentage: Percentage }[];
  // Risk metrics
  riskMetrics: {
    healthFactorMin?: number; // Lowest health factor across positions
    liquidationRisk: 'none' | 'low' | 'medium' | 'high';
    diversificationScore: number; // 0-100
    defiExposure: Percentage;
  };
  // Yield
  totalPendingRewards: number;
  averageApy: Percentage;
  projectedMonthlyYield: number;
  // Metadata
  lastUpdated: ISODateString;
  walletCount: number;
  positionCount: number;
}

/** Historical portfolio value */
export interface PortfolioHistoricalDataPoint {
  timestamp: Timestamp;
  date: ISODateString;
  totalValueUsd: number;
  totalValueEur: number;
  btcValue?: number;
  ethValue?: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** Unified feed item type */
export type FeedItemType = 'news' | 'financial' | 'crypto';

/** Unified feed item */
export interface FeedItem {
  id: string;
  type: FeedItemType;
  timestamp: ISODateString;
  title: string;
  description: string;
  metadata: {
    // News specific
    category?: NewsCategory;
    source?: string;
    url?: string;
    // Financial specific
    transactionType?: TransactionType;
    amount?: number;
    currency?: CurrencyCode;
    // Crypto specific
    network?: BlockchainNetwork;
    valueChange?: number;
    valueChangePercentage?: Percentage;
  };
  importance: 'low' | 'medium' | 'high';
}

/** Dashboard overview data */
export interface DashboardOverview {
  // Quick stats
  newsCount: number;
  unreadNewsCount: number;
  // Financial snapshot
  financialSnapshot: {
    monthlyBalance: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    savingsRate: Percentage;
    trend: Trend;
  };
  // Crypto snapshot
  cryptoSnapshot: {
    totalValue: number;
    change24h: Percentage;
    topGainer?: { symbol: string; change: Percentage };
    topLoser?: { symbol: string; change: Percentage };
    trend: Trend;
  };
  // Activity feed
  recentActivity: FeedItem[];
  // Highlights
  newsHighlights: NewsArticle[];
  // Metadata
  lastUpdated: ISODateString;
}

// ─────────────────────────────────────────────────────────────────────────────
// STORE / STATE TYPES
// ─────────────────────────────────────────────────────────────────────────────

/** Global app state */
export interface AppState {
  // Theme
  theme: 'dark' | 'light' | 'system';
  // Sidebar
  sidebarCollapsed: boolean;
  // Currency preferences
  preferredCurrency: CurrencyCode;
  // Time zone
  timezone: string;
  // Last sync times
  lastSyncTimes: {
    news: ISODateString | null;
    finance: ISODateString | null;
    crypto: ISODateString | null;
  };
}

/** News store state */
export interface NewsState {
  articles: NewsArticle[];
  filters: NewsFilters;
  status: LoadingState;
  error: string | null;
  pagination: PaginationMeta | null;
}

/** Finance store state */
export interface FinanceState {
  transactions: Transaction[];
  monthlySummaries: MonthlyFinancialSummary[];
  kpis: FinancialKPIs | null;
  filters: {
    dateRange: TimeRange;
    categories: (ExpenseCategory | IncomeCategory)[];
    type: TransactionType | 'all';
  };
  status: LoadingState;
  error: string | null;
}

/** Crypto store state */
export interface CryptoState {
  positions: CryptoPosition[];
  wallets: Wallet[];
  portfolioSummary: CryptoPortfolioSummary | null;
  historicalData: PortfolioHistoricalDataPoint[];
  prices: Record<string, TokenPrice>;
  filters: {
    networks: BlockchainNetwork[];
    types: CryptoAssetType[];
    searchQuery: string;
  };
  status: LoadingState;
  error: string | null;
}
