'use client';

import * as React from 'react';
import { Header, PageContainer, AnimatedSection } from '@/components/layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store';
import { cn } from '@/lib/utils';
import {
  Settings,
  Palette,
  Bell,
  Wallet,
  RefreshCw,
  Globe,
  Moon,
  Sun,
  Monitor,
} from 'lucide-react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SETTINGS PAGE
 * Configurações da aplicação
 * ═══════════════════════════════════════════════════════════════════════════
 */

export default function SettingsPage() {
  const { theme, setTheme, preferredCurrency, setPreferredCurrency } = useAppStore();

  const themes = [
    { id: 'dark' as const, label: 'Escuro', icon: Moon },
    { id: 'light' as const, label: 'Claro', icon: Sun },
    { id: 'system' as const, label: 'Sistema', icon: Monitor },
  ];

  const currencies = ['EUR', 'USD', 'BTC'];

  return (
    <>
      <Header title="Definições" subtitle="Configurações da aplicação" />

      <PageContainer>
        <div className="max-w-2xl space-y-6">
          {/* Appearance */}
          <AnimatedSection>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-accent" />
                  Aparência
                </CardTitle>
                <CardDescription>Personaliza o visual da aplicação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-body-sm font-medium text-foreground mb-3 block">
                      Tema
                    </label>
                    <div className="flex gap-2">
                      {themes.map((t) => {
                        const Icon = t.icon;
                        return (
                          <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={cn(
                              'flex items-center gap-2 px-4 py-2 rounded-lg border transition-all',
                              theme === t.id
                                ? 'bg-accent/10 border-accent text-accent'
                                : 'bg-background-secondary border-border text-foreground-secondary hover:bg-background-tertiary'
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            {t.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Currency */}
          <AnimatedSection delay={0.1}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-success" />
                  Moeda Preferida
                </CardTitle>
                <CardDescription>
                  Define a moeda principal para exibição de valores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {currencies.map((currency) => (
                    <button
                      key={currency}
                      onClick={() => setPreferredCurrency(currency)}
                      className={cn(
                        'px-4 py-2 rounded-lg border transition-all',
                        preferredCurrency === currency
                          ? 'bg-accent/10 border-accent text-accent'
                          : 'bg-background-secondary border-border text-foreground-secondary hover:bg-background-tertiary'
                      )}
                    >
                      {currency}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Sync Status */}
          <AnimatedSection delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-info" />
                  Estado de Sincronização
                </CardTitle>
                <CardDescription>
                  Estado atual das sincronizações do ClawdBot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <SyncItem label="Notícias" status="synced" lastSync="Há 15 minutos" />
                  <SyncItem label="Finanças" status="synced" lastSync="Há 2 horas" />
                  <SyncItem label="Cripto" status="pending" lastSync="A aguardar..." />
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* About */}
          <AnimatedSection delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-foreground-secondary" />
                  Sobre
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-body-sm text-foreground-secondary">
                  <p>
                    <span className="font-medium text-foreground">ClawdBot Dashboard</span> v1.0.0
                  </p>
                  <p>Dashboard pessoal para gestão de notícias, finanças e portfólio cripto.</p>
                  <p className="text-foreground-tertiary">
                    Alimentado por dados do ClawdBot externo.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </PageContainer>
    </>
  );
}

interface SyncItemProps {
  label: string;
  status: 'synced' | 'syncing' | 'pending' | 'error';
  lastSync: string;
}

function SyncItem({ label, status, lastSync }: SyncItemProps) {
  const statusConfig = {
    synced: { variant: 'success' as const, text: 'Sincronizado' },
    syncing: { variant: 'info' as const, text: 'A sincronizar...' },
    pending: { variant: 'warning' as const, text: 'Pendente' },
    error: { variant: 'error' as const, text: 'Erro' },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-body-sm text-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-label-sm text-foreground-tertiary">{lastSync}</span>
        <Badge variant={config.variant} size="sm">
          {config.text}
        </Badge>
      </div>
    </div>
  );
}
