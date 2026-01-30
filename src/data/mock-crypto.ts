/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MOCK DATA - CRYPTO PORTFOLIO
 * Dados de exemplo para desenvolvimento (estilo jup.ag)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type {
  Wallet,
  Token,
  TokenPrice,
  CryptoPosition,
  DeFiProtocol,
  CryptoPortfolioSummary,
  PortfolioHistoricalDataPoint,
} from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// WALLETS
// ─────────────────────────────────────────────────────────────────────────────

export const mockWallets: Wallet[] = [
  {
    id: 'w1',
    address: '0x1234...abcd',
    name: 'Main Wallet',
    network: 'ethereum',
    isHardware: true,
    lastSynced: '2024-01-15T10:00:00Z',
  },
  {
    id: 'w2',
    address: '7nYbs...9xkF',
    name: 'Solana Hot',
    network: 'solana',
    isHardware: false,
    lastSynced: '2024-01-15T10:00:00Z',
  },
  {
    id: 'w3',
    address: '0x5678...efgh',
    name: 'Arbitrum DeFi',
    network: 'arbitrum',
    isHardware: false,
    lastSynced: '2024-01-15T10:00:00Z',
  },
  {
    id: 'w4',
    address: 'bc1q...xyz',
    name: 'Bitcoin Cold',
    network: 'bitcoin',
    isHardware: true,
    lastSynced: '2024-01-15T10:00:00Z',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TOKENS
// ─────────────────────────────────────────────────────────────────────────────

export const mockTokens: Token[] = [
  { id: 'btc', symbol: 'BTC', name: 'Bitcoin', network: 'bitcoin', decimals: 8, coingeckoId: 'bitcoin' },
  { id: 'eth', symbol: 'ETH', name: 'Ethereum', network: 'ethereum', decimals: 18, coingeckoId: 'ethereum' },
  { id: 'sol', symbol: 'SOL', name: 'Solana', network: 'solana', decimals: 9, coingeckoId: 'solana' },
  { id: 'arb', symbol: 'ARB', name: 'Arbitrum', network: 'arbitrum', decimals: 18, coingeckoId: 'arbitrum' },
  { id: 'usdc', symbol: 'USDC', name: 'USD Coin', network: 'ethereum', decimals: 6, coingeckoId: 'usd-coin' },
  { id: 'usdc-sol', symbol: 'USDC', name: 'USD Coin', network: 'solana', decimals: 6, coingeckoId: 'usd-coin' },
  { id: 'jup', symbol: 'JUP', name: 'Jupiter', network: 'solana', decimals: 6, coingeckoId: 'jupiter' },
  { id: 'jto', symbol: 'JTO', name: 'Jito', network: 'solana', decimals: 9, coingeckoId: 'jito-governance-token' },
  { id: 'wsteth', symbol: 'wstETH', name: 'Wrapped stETH', network: 'ethereum', decimals: 18, coingeckoId: 'wrapped-steth' },
  { id: 'aave', symbol: 'AAVE', name: 'Aave', network: 'ethereum', decimals: 18, coingeckoId: 'aave' },
  { id: 'gmx', symbol: 'GMX', name: 'GMX', network: 'arbitrum', decimals: 18, coingeckoId: 'gmx' },
  { id: 'pendle', symbol: 'PENDLE', name: 'Pendle', network: 'ethereum', decimals: 18, coingeckoId: 'pendle' },
];

const getToken = (id: string) => mockTokens.find(t => t.id === id)!;

// ─────────────────────────────────────────────────────────────────────────────
// PRICES
// ─────────────────────────────────────────────────────────────────────────────

export const mockPrices: Record<string, TokenPrice> = {
  btc: { tokenId: 'btc', priceUsd: 42500, priceEur: 39100, priceBtc: 1, change24h: 0.025, change7d: 0.08, change30d: 0.15, marketCap: 830000000000, volume24h: 18000000000, lastUpdated: '2024-01-15T10:00:00Z' },
  eth: { tokenId: 'eth', priceUsd: 2480, priceEur: 2280, priceBtc: 0.058, change24h: 0.032, change7d: 0.12, change30d: 0.22, marketCap: 298000000000, volume24h: 12000000000, lastUpdated: '2024-01-15T10:00:00Z' },
  sol: { tokenId: 'sol', priceUsd: 98, priceEur: 90, priceBtc: 0.0023, change24h: 0.045, change7d: 0.18, change30d: 0.35, marketCap: 42000000000, volume24h: 2500000000, lastUpdated: '2024-01-15T10:00:00Z' },
  arb: { tokenId: 'arb', priceUsd: 1.85, priceEur: 1.70, priceBtc: 0.000044, change24h: -0.02, change7d: 0.05, change30d: 0.10, marketCap: 2400000000, volume24h: 320000000, lastUpdated: '2024-01-15T10:00:00Z' },
  usdc: { tokenId: 'usdc', priceUsd: 1, priceEur: 0.92, change24h: 0, change7d: 0, change30d: 0, lastUpdated: '2024-01-15T10:00:00Z' },
  'usdc-sol': { tokenId: 'usdc-sol', priceUsd: 1, priceEur: 0.92, change24h: 0, change7d: 0, change30d: 0, lastUpdated: '2024-01-15T10:00:00Z' },
  jup: { tokenId: 'jup', priceUsd: 0.72, priceEur: 0.66, priceBtc: 0.000017, change24h: 0.08, change7d: 0.25, change30d: 0, marketCap: 970000000, volume24h: 450000000, lastUpdated: '2024-01-15T10:00:00Z' },
  jto: { tokenId: 'jto', priceUsd: 2.85, priceEur: 2.62, priceBtc: 0.000067, change24h: 0.035, change7d: 0.12, change30d: 0.45, marketCap: 340000000, volume24h: 85000000, lastUpdated: '2024-01-15T10:00:00Z' },
  wsteth: { tokenId: 'wsteth', priceUsd: 2890, priceEur: 2658, priceBtc: 0.068, change24h: 0.03, change7d: 0.11, change30d: 0.20, marketCap: 25000000000, volume24h: 150000000, lastUpdated: '2024-01-15T10:00:00Z' },
  aave: { tokenId: 'aave', priceUsd: 95, priceEur: 87, priceBtc: 0.0022, change24h: 0.018, change7d: 0.08, change30d: 0.12, marketCap: 1400000000, volume24h: 120000000, lastUpdated: '2024-01-15T10:00:00Z' },
  gmx: { tokenId: 'gmx', priceUsd: 48, priceEur: 44, priceBtc: 0.0011, change24h: -0.015, change7d: 0.03, change30d: 0.08, marketCap: 450000000, volume24h: 35000000, lastUpdated: '2024-01-15T10:00:00Z' },
  pendle: { tokenId: 'pendle', priceUsd: 1.95, priceEur: 1.79, priceBtc: 0.000046, change24h: 0.055, change7d: 0.22, change30d: 0.40, marketCap: 310000000, volume24h: 65000000, lastUpdated: '2024-01-15T10:00:00Z' },
};

// ─────────────────────────────────────────────────────────────────────────────
// PROTOCOLS
// ─────────────────────────────────────────────────────────────────────────────

export const mockProtocols: DeFiProtocol[] = [
  { id: 'lido', name: 'Lido', network: 'ethereum', category: 'staking', tvl: 22000000000, url: 'https://lido.fi' },
  { id: 'aave-v3', name: 'Aave V3', network: 'ethereum', category: 'lending', tvl: 12000000000, url: 'https://aave.com' },
  { id: 'aave-arb', name: 'Aave V3', network: 'arbitrum', category: 'lending', tvl: 1500000000, url: 'https://aave.com' },
  { id: 'gmx-arb', name: 'GMX', network: 'arbitrum', category: 'dex', tvl: 520000000, url: 'https://gmx.io' },
  { id: 'jupiter', name: 'Jupiter', network: 'solana', category: 'dex', tvl: 280000000, url: 'https://jup.ag' },
  { id: 'marinade', name: 'Marinade', network: 'solana', category: 'staking', tvl: 1200000000, url: 'https://marinade.finance' },
  { id: 'jito', name: 'Jito', network: 'solana', category: 'staking', tvl: 950000000, url: 'https://jito.network' },
  { id: 'pendle-eth', name: 'Pendle', network: 'ethereum', category: 'yield', tvl: 480000000, url: 'https://pendle.finance' },
];

const getProtocol = (id: string) => mockProtocols.find(p => p.id === id)!;

// ─────────────────────────────────────────────────────────────────────────────
// POSITIONS
// ─────────────────────────────────────────────────────────────────────────────

export const mockPositions: CryptoPosition[] = [
  // Wallet holdings
  {
    id: 'p1',
    type: 'wallet',
    token: getToken('btc'),
    amount: 0.45,
    valueUsd: 19125,
    valueEur: 17595,
    costBasisUsd: 15000,
    unrealizedPnlUsd: 4125,
    unrealizedPnlPercentage: 0.275,
    wallet: mockWallets[3],
    lastUpdated: '2024-01-15T10:00:00Z',
  },
  {
    id: 'p2',
    type: 'wallet',
    token: getToken('eth'),
    amount: 3.5,
    valueUsd: 8680,
    valueEur: 7980,
    costBasisUsd: 7000,
    unrealizedPnlUsd: 1680,
    unrealizedPnlPercentage: 0.24,
    wallet: mockWallets[0],
    lastUpdated: '2024-01-15T10:00:00Z',
  },
  {
    id: 'p3',
    type: 'wallet',
    token: getToken('sol'),
    amount: 85,
    valueUsd: 8330,
    valueEur: 7665,
    costBasisUsd: 5100,
    unrealizedPnlUsd: 3230,
    unrealizedPnlPercentage: 0.633,
    wallet: mockWallets[1],
    lastUpdated: '2024-01-15T10:00:00Z',
  },
  {
    id: 'p4',
    type: 'wallet',
    token: getToken('jup'),
    amount: 12500,
    valueUsd: 9000,
    valueEur: 8280,
    costBasisUsd: 0, // Airdrop
    unrealizedPnlUsd: 9000,
    unrealizedPnlPercentage: undefined,
    wallet: mockWallets[1],
    lastUpdated: '2024-01-15T10:00:00Z',
    notes: 'Airdrop JUP',
  },
  {
    id: 'p5',
    type: 'wallet',
    token: getToken('usdc-sol'),
    amount: 2500,
    valueUsd: 2500,
    valueEur: 2300,
    wallet: mockWallets[1],
    lastUpdated: '2024-01-15T10:00:00Z',
  },
  
  // Staking
  {
    id: 'p6',
    type: 'staking',
    token: getToken('wsteth'),
    amount: 2.8,
    valueUsd: 8092,
    valueEur: 7444,
    costBasisUsd: 7500,
    unrealizedPnlUsd: 592,
    unrealizedPnlPercentage: 0.079,
    wallet: mockWallets[0],
    protocol: getProtocol('lido'),
    apy: 0.038,
    rewards: [],
    lastUpdated: '2024-01-15T10:00:00Z',
  },
  {
    id: 'p7',
    type: 'staking',
    token: getToken('sol'),
    amount: 120,
    valueUsd: 11760,
    valueEur: 10819,
    costBasisUsd: 8400,
    unrealizedPnlUsd: 3360,
    unrealizedPnlPercentage: 0.40,
    wallet: mockWallets[1],
    protocol: getProtocol('jito'),
    apy: 0.072,
    rewards: [
      { token: getToken('jto'), amount: 45, valueUsd: 128.25 },
    ],
    lastUpdated: '2024-01-15T10:00:00Z',
  },
  
  // Lending
  {
    id: 'p8',
    type: 'lending',
    token: getToken('usdc'),
    amount: 5000,
    valueUsd: 5000,
    valueEur: 4600,
    wallet: mockWallets[0],
    protocol: getProtocol('aave-v3'),
    apy: 0.045,
    healthFactor: undefined,
    lastUpdated: '2024-01-15T10:00:00Z',
  },
  {
    id: 'p9',
    type: 'lending',
    token: getToken('eth'),
    amount: 1.5,
    valueUsd: 3720,
    valueEur: 3422,
    costBasisUsd: 3000,
    unrealizedPnlUsd: 720,
    unrealizedPnlPercentage: 0.24,
    wallet: mockWallets[2],
    protocol: getProtocol('aave-arb'),
    apy: 0.028,
    healthFactor: 2.85,
    lastUpdated: '2024-01-15T10:00:00Z',
  },
  
  // LP
  {
    id: 'p10',
    type: 'lp',
    token: getToken('sol'),
    secondaryToken: getToken('usdc-sol'),
    amount: 45,
    secondaryAmount: 2200,
    valueUsd: 6610,
    valueEur: 6081,
    costBasisUsd: 6000,
    unrealizedPnlUsd: 610,
    unrealizedPnlPercentage: 0.102,
    wallet: mockWallets[1],
    protocol: getProtocol('jupiter'),
    apy: 0.25,
    rewards: [
      { token: getToken('jup'), amount: 180, valueUsd: 129.60 },
    ],
    lastUpdated: '2024-01-15T10:00:00Z',
    notes: 'SOL-USDC LP on Jupiter',
  },
  
  // Vault / Yield
  {
    id: 'p11',
    type: 'vault',
    token: getToken('pendle'),
    amount: 2500,
    valueUsd: 4875,
    valueEur: 4485,
    costBasisUsd: 3750,
    unrealizedPnlUsd: 1125,
    unrealizedPnlPercentage: 0.30,
    wallet: mockWallets[0],
    protocol: getProtocol('pendle-eth'),
    apy: 0.18,
    lastUpdated: '2024-01-15T10:00:00Z',
  },
  
  // GMX staking
  {
    id: 'p12',
    type: 'staking',
    token: getToken('gmx'),
    amount: 50,
    valueUsd: 2400,
    valueEur: 2208,
    costBasisUsd: 2000,
    unrealizedPnlUsd: 400,
    unrealizedPnlPercentage: 0.20,
    wallet: mockWallets[2],
    protocol: getProtocol('gmx-arb'),
    apy: 0.15,
    rewards: [
      { token: getToken('eth'), amount: 0.012, valueUsd: 29.76 },
    ],
    lastUpdated: '2024-01-15T10:00:00Z',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO SUMMARY
// ─────────────────────────────────────────────────────────────────────────────

export const mockPortfolioSummary: CryptoPortfolioSummary = {
  totalValueUsd: 90092,
  totalValueEur: 82884.68,
  totalCostBasis: 57750,
  totalUnrealizedPnl: 24842,
  totalUnrealizedPnlPercentage: 0.43,
  change24h: {
    valueUsd: 2702.76,
    percentage: 0.031,
  },
  change7d: {
    valueUsd: 9910.12,
    percentage: 0.124,
  },
  change30d: {
    valueUsd: 18018.40,
    percentage: 0.25,
  },
  allocationByType: {
    wallet: { value: 47635, percentage: 0.529 },
    staking: { value: 22252, percentage: 0.247 },
    lending: { value: 8720, percentage: 0.097 },
    lp: { value: 6610, percentage: 0.073 },
    vault: { value: 4875, percentage: 0.054 },
    farming: { value: 0, percentage: 0 },
    borrowing: { value: 0, percentage: 0 },
    nft: { value: 0, percentage: 0 },
  },
  allocationByNetwork: {
    solana: { value: 40700, percentage: 0.452 },
    ethereum: { value: 26647, percentage: 0.296 },
    bitcoin: { value: 19125, percentage: 0.212 },
    arbitrum: { value: 6120, percentage: 0.068 },
    polygon: { value: 0, percentage: 0 },
    optimism: { value: 0, percentage: 0 },
    avalanche: { value: 0, percentage: 0 },
    bsc: { value: 0, percentage: 0 },
    base: { value: 0, percentage: 0 },
    other: { value: 0, percentage: 0 },
  },
  allocationByToken: [
    { token: getToken('btc'), value: 19125, percentage: 0.212 },
    { token: getToken('sol'), value: 20090, percentage: 0.223 },
    { token: getToken('eth'), value: 12400, percentage: 0.138 },
    { token: getToken('jup'), value: 9129.60, percentage: 0.101 },
    { token: getToken('wsteth'), value: 8092, percentage: 0.090 },
    { token: getToken('usdc'), value: 7500, percentage: 0.083 },
    { token: getToken('pendle'), value: 4875, percentage: 0.054 },
    { token: getToken('gmx'), value: 2400, percentage: 0.027 },
  ],
  allocationByProtocol: [
    { protocol: getProtocol('jito'), value: 11760, percentage: 0.131 },
    { protocol: getProtocol('lido'), value: 8092, percentage: 0.090 },
    { protocol: getProtocol('jupiter'), value: 6610, percentage: 0.073 },
    { protocol: getProtocol('aave-v3'), value: 5000, percentage: 0.055 },
    { protocol: getProtocol('pendle-eth'), value: 4875, percentage: 0.054 },
    { protocol: getProtocol('aave-arb'), value: 3720, percentage: 0.041 },
    { protocol: getProtocol('gmx-arb'), value: 2400, percentage: 0.027 },
  ],
  riskMetrics: {
    healthFactorMin: 2.85,
    liquidationRisk: 'low',
    diversificationScore: 78,
    defiExposure: 0.471,
  },
  totalPendingRewards: 287.61,
  averageApy: 0.098,
  projectedMonthlyYield: 347.24,
  lastUpdated: '2024-01-15T10:00:00Z',
  walletCount: 4,
  positionCount: 12,
};

// ─────────────────────────────────────────────────────────────────────────────
// HISTORICAL DATA FOR CHARTS
// ─────────────────────────────────────────────────────────────────────────────

export const mockPortfolioHistory: PortfolioHistoricalDataPoint[] = [
  { timestamp: 1699488000000, date: '2023-11-09', totalValueUsd: 52000, totalValueEur: 47840, btcValue: 1.42, ethValue: 26.5 },
  { timestamp: 1700092800000, date: '2023-11-16', totalValueUsd: 58500, totalValueEur: 53820, btcValue: 1.55, ethValue: 28.2 },
  { timestamp: 1700697600000, date: '2023-11-23', totalValueUsd: 62000, totalValueEur: 57040, btcValue: 1.62, ethValue: 29.8 },
  { timestamp: 1701302400000, date: '2023-11-30', totalValueUsd: 65500, totalValueEur: 60260, btcValue: 1.68, ethValue: 30.5 },
  { timestamp: 1701907200000, date: '2023-12-07', totalValueUsd: 68000, totalValueEur: 62560, btcValue: 1.58, ethValue: 28.9 },
  { timestamp: 1702512000000, date: '2023-12-14', totalValueUsd: 72500, totalValueEur: 66700, btcValue: 1.65, ethValue: 30.2 },
  { timestamp: 1703116800000, date: '2023-12-21', totalValueUsd: 71000, totalValueEur: 65320, btcValue: 1.62, ethValue: 29.5 },
  { timestamp: 1703721600000, date: '2023-12-28', totalValueUsd: 74500, totalValueEur: 68540, btcValue: 1.70, ethValue: 31.0 },
  { timestamp: 1704326400000, date: '2024-01-04', totalValueUsd: 80500, totalValueEur: 74060, btcValue: 1.82, ethValue: 33.5 },
  { timestamp: 1704931200000, date: '2024-01-11', totalValueUsd: 87500, totalValueEur: 80500, btcValue: 1.95, ethValue: 36.2 },
  { timestamp: 1705363200000, date: '2024-01-15', totalValueUsd: 90092, totalValueEur: 82884, btcValue: 2.12, ethValue: 36.3 },
];
