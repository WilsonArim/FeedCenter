# ClawdBot Dashboard

Dashboard pessoal premium para visualização de notícias, finanças pessoais e portfólio cripto.

## ✨ Características

- **Design Premium**: UI futurista, minimalista e elegante inspirada em Linear, Stripe, Vercel e jup.ag
- **Dark Mode First**: Tema escuro otimizado com cores cuidadosamente selecionadas
- **Animações Suaves**: Microinterações com Framer Motion
- **Totalmente Tipado**: TypeScript end-to-end com schemas bem definidos
- **Pronto para Dados**: Estrutura preparada para ingestão de dados via bot externo

## 📄 Páginas

### 1. Dashboard
Visão global do sistema com:
- KPIs principais (notícias, finanças, cripto)
- Feed de notícias em destaque
- Snapshot financeiro mensal
- Gráfico de evolução do portfólio

### 2. Notícias
Agregador de notícias com:
- Categorias: Nacional, Internacional, Cripto
- Filtros e pesquisa
- Timeline cronológica
- Sistema de bookmarks

### 3. Finanças Pessoais
Gestão financeira completa com:
- Rendimentos vs Despesas
- Taxa de poupança
- Breakdown por categoria
- Insights automáticos
- Tabela de transações

### 4. Portfólio Cripto
Dashboard DeFi inspirado em jup.ag com:
- Valor total e PnL
- Posições (Wallet, Staking, LP, Lending)
- Alocação por rede e protocolo
- Métricas de risco

## 🛠 Stack Tecnológica

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilo**: TailwindCSS
- **Gráficos**: Recharts
- **Estado**: Zustand
- **Animações**: Framer Motion
- **Ícones**: Lucide React

## 🚀 Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Dashboard (home)
│   ├── news/              # Página de notícias
│   ├── finance/           # Página de finanças
│   ├── crypto/            # Página de cripto
│   └── settings/          # Definições
├── components/
│   ├── layout/            # Sidebar, Header, PageContainer
│   ├── pages/             # Componentes de página
│   └── ui/                # Componentes UI reutilizáveis
├── data/                  # Mock data para desenvolvimento
├── lib/                   # Utilitários e cálculos
├── store/                 # Zustand stores
├── styles/                # CSS global e design tokens
└── types/                 # TypeScript interfaces
```

## 🎨 Design System

### Cores (Dark Mode)
- Background: `#090b10` → `#161b22`
- Foreground: `#f8fafc` → `#5c6370`
- Accent: `#3b82f6` (Blue) + `#8b5cf6` (Purple)
- Success: `#22c55e`
- Warning: `#f59e0b`
- Error: `#ef4444`

### Tipografia
- Font: Geist Sans / Inter
- Display: 4.5rem → 1.875rem
- Body: 1.25rem → 0.75rem

### Spacing
- Base: 8px
- Scale: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

## 📊 Schemas de Dados

Os tipos TypeScript estão definidos em `src/types/index.ts`:

- `NewsArticle` - Artigos de notícias
- `Transaction` - Transações financeiras
- `MonthlyFinancialSummary` - Resumo mensal
- `CryptoPosition` - Posições cripto
- `CryptoPortfolioSummary` - Resumo do portfólio

## 🤖 Integração com ClawdBot

O dashboard está preparado para receber dados de um bot externo:

1. **Notícias**: O bot pesquisa e insere artigos diariamente
2. **Finanças**: O bot atualiza transações e calcula KPIs
3. **Cripto**: O bot sincroniza posições on-chain

Os dados são ingeridos através dos schemas definidos, permitindo validação e tipagem completa.

## 📝 Licença

Projeto privado - Todos os direitos reservados.
