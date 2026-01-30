'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header, PageContainer, AnimatedSection, SectionHeader } from '@/components/layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EmptyNewsState, EmptySearchState } from '@/components/ui/empty-state';
import { LoadingState } from '@/components/ui/loading-state';
import { cn, formatSmartDate, formatRelativeTime, newsCategoryLabels } from '@/lib/utils';
import {
  Globe,
  Landmark,
  Bitcoin,
  ExternalLink,
  Bookmark,
  Filter,
  Calendar,
  Star,
} from 'lucide-react';
import type { NewsArticle, NewsCategory } from '@/types';

// Mock data
import { mockNewsArticles, mockDailyDigest } from '@/data/mock-news';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * NEWS PAGE
 * Notícias por categoria com filtros e pesquisa
 * ═══════════════════════════════════════════════════════════════════════════
 */

type CategoryFilter = NewsCategory | 'all';

export function NewsPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState<CategoryFilter>('all');
  const [bookmarkedIds, setBookmarkedIds] = React.useState<Set<string>>(new Set());

  // Filter articles
  const filteredArticles = React.useMemo(() => {
    let articles = mockNewsArticles;

    if (activeCategory !== 'all') {
      articles = articles.filter((a) => a.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      articles = articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.summary.toLowerCase().includes(query) ||
          a.tags?.some((t) => t.toLowerCase().includes(query))
      );
    }

    return articles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [activeCategory, searchQuery]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const categories: { id: CategoryFilter; label: string; icon: React.ElementType; count: number }[] = [
    { id: 'all', label: 'Todas', icon: Star, count: mockNewsArticles.length },
    { id: 'national', label: 'Nacional', icon: Landmark, count: mockNewsArticles.filter(a => a.category === 'national').length },
    { id: 'international', label: 'Internacional', icon: Globe, count: mockNewsArticles.filter(a => a.category === 'international').length },
    { id: 'crypto', label: 'Cripto', icon: Bitcoin, count: mockNewsArticles.filter(a => a.category === 'crypto').length },
  ];

  return (
    <>
      <Header
        title="Notícias"
        subtitle={`${mockDailyDigest.totalCount} artigos hoje`}
        showSearch
        searchPlaceholder="Pesquisar notícias..."
        onSearch={handleSearch}
      />

      <PageContainer>
        {/* Category Tabs */}
        <AnimatedSection className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hidden">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-body-sm',
                    'transition-all duration-200 whitespace-nowrap',
                    isActive
                      ? 'bg-accent text-white shadow-glow-accent'
                      : 'bg-background-secondary text-foreground-secondary hover:bg-background-tertiary hover:text-foreground border border-border'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {cat.label}
                  <span
                    className={cn(
                      'px-1.5 py-0.5 rounded text-label-sm',
                      isActive ? 'bg-white/20' : 'bg-background-tertiary'
                    )}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Content */}
        {isLoading ? (
          <LoadingState text="A carregar notícias..." />
        ) : filteredArticles.length === 0 ? (
          searchQuery ? (
            <EmptySearchState query={searchQuery} />
          ) : (
            <EmptyNewsState />
          )
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <NewsCard
                    article={article}
                    isBookmarked={bookmarkedIds.has(article.id)}
                    onBookmark={() => toggleBookmark(article.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Today's Timeline */}
        {activeCategory === 'all' && !searchQuery && (
          <AnimatedSection delay={0.2} className="mt-12">
            <SectionHeader
              title="Timeline de Hoje"
              description="Cronologia dos eventos mais recentes"
            />
            <TimelineView articles={filteredArticles.slice(0, 8)} />
          </AnimatedSection>
        )}
      </PageContainer>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NEWS CARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

interface NewsCardProps {
  article: NewsArticle;
  isBookmarked: boolean;
  onBookmark: () => void;
}

function NewsCard({ article, isBookmarked, onBookmark }: NewsCardProps) {
  const categoryIcon = {
    national: Landmark,
    international: Globe,
    crypto: Bitcoin,
  };
  const Icon = categoryIcon[article.category];

  const categoryColors = {
    national: 'bg-info/10 text-info border-info/20',
    international: 'bg-accent/10 text-accent border-accent/20',
    crypto: 'bg-warning/10 text-warning border-warning/20',
  };

  const sentimentBadge = {
    positive: { variant: 'success' as const, label: 'Positivo' },
    negative: { variant: 'error' as const, label: 'Negativo' },
    neutral: { variant: 'default' as const, label: 'Neutro' },
  };

  return (
    <Card variant="interactive" className="group h-full">
      <CardContent className="p-5 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className={cn('p-1.5 rounded-lg border', categoryColors[article.category])}>
              <Icon className="h-3.5 w-3.5" />
            </div>
            <Badge variant="default" size="sm">
              {newsCategoryLabels[article.category]}
            </Badge>
            {article.sentiment && (
              <Badge variant={sentimentBadge[article.sentiment].variant} size="sm">
                {sentimentBadge[article.sentiment].label}
              </Badge>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onBookmark();
            }}
            className={cn(
              'p-1.5 rounded-lg transition-colors',
              isBookmarked
                ? 'text-warning bg-warning/10'
                : 'text-foreground-muted hover:text-foreground hover:bg-background-tertiary'
            )}
            aria-label={isBookmarked ? 'Remover marcador' : 'Adicionar marcador'}
          >
            <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
          </button>
        </div>

        {/* Content */}
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col"
        >
          <h3 className="text-body-md font-medium text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {article.title}
          </h3>
          <p className="text-body-sm text-foreground-secondary line-clamp-3 mb-4 flex-1">
            {article.summary}
          </p>
        </a>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-label-sm text-foreground-tertiary">
            <span className="font-medium">{article.source.name}</span>
            <span>•</span>
            <span>{formatRelativeTime(article.publishedAt)}</span>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-label-sm text-foreground-secondary hover:text-accent transition-colors"
          >
            Ler mais
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded bg-background-tertiary text-foreground-tertiary text-label-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TIMELINE VIEW
// ─────────────────────────────────────────────────────────────────────────────

interface TimelineViewProps {
  articles: NewsArticle[];
}

function TimelineView({ articles }: TimelineViewProps) {
  const categoryIcon = {
    national: Landmark,
    international: Globe,
    crypto: Bitcoin,
  };

  const categoryColors = {
    national: 'bg-info text-white',
    international: 'bg-accent text-white',
    crypto: 'bg-warning text-white',
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-4">
        {articles.map((article, index) => {
          const Icon = categoryIcon[article.category];

          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative flex gap-4 pl-12"
            >
              {/* Timeline dot */}
              <div
                className={cn(
                  'absolute left-3 w-5 h-5 rounded-full flex items-center justify-center',
                  categoryColors[article.category]
                )}
              >
                <Icon className="h-3 w-3" />
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-label-sm font-medium text-foreground-secondary">
                    {formatSmartDate(article.publishedAt)}
                  </span>
                  <span className="text-foreground-muted">•</span>
                  <span className="text-label-sm text-foreground-tertiary">
                    {article.source.name}
                  </span>
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm font-medium text-foreground hover:text-accent transition-colors"
                >
                  {article.title}
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
