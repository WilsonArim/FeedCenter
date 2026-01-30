'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Newspaper,
  Wallet,
  PiggyBank,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bot,
} from 'lucide-react';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SIDEBAR COMPONENT
 * Premium collapsible sidebar navigation
 * ═══════════════════════════════════════════════════════════════════════════
 */

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/news', label: 'Notícias', icon: Newspaper },
  { href: '/finance', label: 'Finanças', icon: PiggyBank },
  { href: '/crypto', label: 'Cripto', icon: Wallet },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen',
        'bg-background-secondary border-r border-border',
        'transition-all duration-300 ease-out-expo',
        collapsed ? 'w-[72px]' : 'w-[240px]'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-border">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-secondary">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-semibold text-foreground whitespace-nowrap overflow-hidden"
                >
                  ClawdBot
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative flex items-center gap-3 px-3 py-2.5 rounded-lg',
                  'transition-all duration-200',
                  'group',
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-foreground-secondary hover:bg-background-tertiary hover:text-foreground'
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-accent"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                
                <Icon className={cn('h-5 w-5 shrink-0', isActive && 'text-accent')} />
                
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-body-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Badge */}
                {item.badge && !collapsed && (
                  <span className="ml-auto text-label-sm px-1.5 py-0.5 rounded bg-accent/15 text-accent">
                    {item.badge}
                  </span>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 rounded-md bg-background-elevated border border-border shadow-elevation-4 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                    <span className="text-body-sm text-foreground">{item.label}</span>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          {/* Settings */}
          <Link
            href="/settings"
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg',
              'text-foreground-secondary hover:bg-background-tertiary hover:text-foreground',
              'transition-colors'
            )}
          >
            <Settings className="h-5 w-5 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-body-sm font-medium"
                >
                  Definições
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Collapse toggle */}
          <button
            onClick={onToggle}
            className={cn(
              'flex items-center justify-center w-full mt-2 py-2 rounded-lg',
              'text-foreground-tertiary hover:bg-background-tertiary hover:text-foreground',
              'transition-colors'
            )}
            aria-label={collapsed ? 'Expandir menu' : 'Colapsar menu'}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5" />
                <span className="ml-2 text-body-sm">Colapsar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
