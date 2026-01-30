/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MOCK DATA - NEWS
 * Dados de exemplo para desenvolvimento
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { NewsArticle, NewsSource, DailyNewsDigest } from '@/types';

// ─────────────────────────────────────────────────────────────────────────────
// SOURCES
// ─────────────────────────────────────────────────────────────────────────────

export const mockNewsSources: NewsSource[] = [
  { id: 'publico', name: 'Público', url: 'https://publico.pt', reliability: 90 },
  { id: 'observador', name: 'Observador', url: 'https://observador.pt', reliability: 85 },
  { id: 'expresso', name: 'Expresso', url: 'https://expresso.pt', reliability: 88 },
  { id: 'rtp', name: 'RTP', url: 'https://rtp.pt', reliability: 92 },
  { id: 'reuters', name: 'Reuters', url: 'https://reuters.com', reliability: 95 },
  { id: 'bloomberg', name: 'Bloomberg', url: 'https://bloomberg.com', reliability: 93 },
  { id: 'ft', name: 'Financial Times', url: 'https://ft.com', reliability: 94 },
  { id: 'coindesk', name: 'CoinDesk', url: 'https://coindesk.com', reliability: 80 },
  { id: 'theblock', name: 'The Block', url: 'https://theblock.co', reliability: 82 },
  { id: 'decrypt', name: 'Decrypt', url: 'https://decrypt.co', reliability: 78 },
];

const getSource = (id: string) => mockNewsSources.find(s => s.id === id)!;

// ─────────────────────────────────────────────────────────────────────────────
// NEWS ARTICLES
// ─────────────────────────────────────────────────────────────────────────────

export const mockNewsArticles: NewsArticle[] = [
  // National
  {
    id: 'n1',
    title: 'Governo anuncia novo pacote de medidas para habitação',
    summary: 'O executivo apresentou hoje um conjunto de 15 medidas para facilitar o acesso à habitação, incluindo incentivos fiscais para arrendamento de longa duração.',
    category: 'national',
    source: getSource('publico'),
    url: 'https://publico.pt/exemplo',
    publishedAt: '2024-01-15T09:30:00Z',
    fetchedAt: '2024-01-15T10:00:00Z',
    tags: ['habitação', 'política', 'economia'],
    sentiment: 'neutral',
    relevanceScore: 85,
  },
  {
    id: 'n2',
    title: 'Taxa de desemprego atinge mínimo histórico de 6.1%',
    summary: 'Portugal registou a taxa de desemprego mais baixa desde que há registo, com o mercado de trabalho a mostrar sinais de robustez.',
    category: 'national',
    source: getSource('rtp'),
    url: 'https://rtp.pt/exemplo',
    publishedAt: '2024-01-15T08:15:00Z',
    fetchedAt: '2024-01-15T09:00:00Z',
    tags: ['emprego', 'economia', 'estatísticas'],
    sentiment: 'positive',
    relevanceScore: 90,
  },
  {
    id: 'n3',
    title: 'Novo hub tecnológico em Lisboa atrai investimento de €500M',
    summary: 'O projeto de campus tecnológico em Marvila foi oficialmente anunciado, com previsão de criar 5.000 postos de trabalho até 2027.',
    category: 'national',
    source: getSource('expresso'),
    url: 'https://expresso.pt/exemplo',
    publishedAt: '2024-01-14T14:20:00Z',
    fetchedAt: '2024-01-14T15:00:00Z',
    tags: ['tecnologia', 'investimento', 'Lisboa'],
    sentiment: 'positive',
    relevanceScore: 78,
  },
  {
    id: 'n4',
    title: 'Banco de Portugal revê previsões de crescimento para 2024',
    summary: 'A instituição aumentou a estimativa de crescimento do PIB para 2.3%, citando resiliência do consumo privado.',
    category: 'national',
    source: getSource('observador'),
    url: 'https://observador.pt/exemplo',
    publishedAt: '2024-01-14T11:45:00Z',
    fetchedAt: '2024-01-14T12:00:00Z',
    tags: ['economia', 'PIB', 'previsões'],
    sentiment: 'positive',
    relevanceScore: 82,
  },
  
  // International
  {
    id: 'i1',
    title: 'Fed sinaliza possíveis cortes de juros no segundo semestre',
    summary: 'Membros do Federal Reserve indicaram que as taxas de juro podem começar a descer a partir de junho, caso a inflação continue em queda.',
    category: 'international',
    source: getSource('reuters'),
    url: 'https://reuters.com/exemplo',
    publishedAt: '2024-01-15T16:00:00Z',
    fetchedAt: '2024-01-15T16:30:00Z',
    tags: ['Fed', 'juros', 'política monetária', 'EUA'],
    sentiment: 'positive',
    relevanceScore: 95,
  },
  {
    id: 'i2',
    title: 'UE aprova nova diretiva para inteligência artificial',
    summary: 'O Parlamento Europeu votou favoravelmente a regulação mais abrangente do mundo para IA, com impacto direto em empresas tech.',
    category: 'international',
    source: getSource('ft'),
    url: 'https://ft.com/exemplo',
    publishedAt: '2024-01-15T12:00:00Z',
    fetchedAt: '2024-01-15T12:30:00Z',
    tags: ['UE', 'IA', 'regulação', 'tecnologia'],
    sentiment: 'neutral',
    relevanceScore: 88,
  },
  {
    id: 'i3',
    title: 'China regista crescimento de 5.2% em 2023',
    summary: 'A economia chinesa superou ligeiramente a meta oficial, apesar de desafios no setor imobiliário e exportações.',
    category: 'international',
    source: getSource('bloomberg'),
    url: 'https://bloomberg.com/exemplo',
    publishedAt: '2024-01-15T07:00:00Z',
    fetchedAt: '2024-01-15T08:00:00Z',
    tags: ['China', 'PIB', 'economia global'],
    sentiment: 'neutral',
    relevanceScore: 75,
  },
  {
    id: 'i4',
    title: 'Preço do petróleo sobe 3% após tensões no Mar Vermelho',
    summary: 'Os ataques a navios comerciais continuam a pressionar os preços do crude, com Brent acima dos $80 por barril.',
    category: 'international',
    source: getSource('reuters'),
    url: 'https://reuters.com/exemplo2',
    publishedAt: '2024-01-14T18:30:00Z',
    fetchedAt: '2024-01-14T19:00:00Z',
    tags: ['petróleo', 'geopolítica', 'commodities'],
    sentiment: 'negative',
    relevanceScore: 80,
  },
  
  // Crypto
  {
    id: 'c1',
    title: 'SEC aprova primeiros ETFs de Bitcoin spot nos EUA',
    summary: 'A decisão histórica abre as portas a investidores institucionais, com expectativa de fluxos de $10B no primeiro ano.',
    category: 'crypto',
    source: getSource('coindesk'),
    url: 'https://coindesk.com/exemplo',
    publishedAt: '2024-01-11T00:30:00Z',
    fetchedAt: '2024-01-11T01:00:00Z',
    tags: ['Bitcoin', 'ETF', 'SEC', 'institucional'],
    sentiment: 'positive',
    relevanceScore: 98,
  },
  {
    id: 'c2',
    title: 'Solana processa mais de 50M de transações diárias',
    summary: 'A rede atinge novo recorde de atividade, impulsionada por airdrops e crescimento do ecossistema DeFi.',
    category: 'crypto',
    source: getSource('theblock'),
    url: 'https://theblock.co/exemplo',
    publishedAt: '2024-01-15T10:00:00Z',
    fetchedAt: '2024-01-15T10:30:00Z',
    tags: ['Solana', 'DeFi', 'blockchain'],
    sentiment: 'positive',
    relevanceScore: 85,
  },
  {
    id: 'c3',
    title: 'Ethereum completa upgrade Dencun na testnet',
    summary: 'O proto-danksharding promete reduzir custos de Layer 2 em até 90%, com mainnet previsto para março.',
    category: 'crypto',
    source: getSource('decrypt'),
    url: 'https://decrypt.co/exemplo',
    publishedAt: '2024-01-14T15:00:00Z',
    fetchedAt: '2024-01-14T15:30:00Z',
    tags: ['Ethereum', 'L2', 'upgrade', 'scaling'],
    sentiment: 'positive',
    relevanceScore: 82,
  },
  {
    id: 'c4',
    title: 'TVL em DeFi ultrapassa $100B pela primeira vez desde 2022',
    summary: 'O valor total bloqueado em protocolos descentralizados regressa a níveis pré-crash, sinalizando recuperação do setor.',
    category: 'crypto',
    source: getSource('theblock'),
    url: 'https://theblock.co/exemplo2',
    publishedAt: '2024-01-13T20:00:00Z',
    fetchedAt: '2024-01-13T21:00:00Z',
    tags: ['DeFi', 'TVL', 'mercado'],
    sentiment: 'positive',
    relevanceScore: 78,
  },
  {
    id: 'c5',
    title: 'Jupiter DEX lança airdrop de $700M para utilizadores',
    summary: 'O maior agregador de Solana distribuiu tokens JUP a mais de 1 milhão de carteiras elegíveis.',
    category: 'crypto',
    source: getSource('coindesk'),
    url: 'https://coindesk.com/exemplo2',
    publishedAt: '2024-01-31T15:00:00Z',
    fetchedAt: '2024-01-31T15:30:00Z',
    tags: ['Solana', 'Jupiter', 'airdrop', 'DeFi'],
    sentiment: 'positive',
    relevanceScore: 90,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DAILY DIGEST
// ─────────────────────────────────────────────────────────────────────────────

export const mockDailyDigest: DailyNewsDigest = {
  date: '2024-01-15',
  articles: {
    national: mockNewsArticles.filter(a => a.category === 'national'),
    international: mockNewsArticles.filter(a => a.category === 'international'),
    crypto: mockNewsArticles.filter(a => a.category === 'crypto'),
  },
  totalCount: mockNewsArticles.length,
  highlights: mockNewsArticles
    .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
    .slice(0, 5),
};
