'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PAGE CONTAINER COMPONENT
 * Wrapper for page content with animations
 * ═══════════════════════════════════════════════════════════════════════════
 */

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export function PageContainer({
  children,
  className,
  animate = true,
}: PageContainerProps) {
  const content = (
    <main className={cn('flex-1 p-6', className)}>
      {children}
    </main>
  );

  if (!animate) return content;

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('flex-1 p-6', className)}
    >
      {children}
    </motion.main>
  );
}

/**
 * Grid layouts for dashboard cards
 */
interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Grid({ children, cols = 3, gap = 'md', className }: GridProps) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4',
    lg: 'gap-6',
  };

  return (
    <div className={cn('grid', colClasses[cols], gapClasses[gap], className)}>
      {children}
    </div>
  );
}

/**
 * Two column layout (sidebar + main content)
 */
interface TwoColumnLayoutProps {
  sidebar: React.ReactNode;
  main: React.ReactNode;
  sidebarWidth?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function TwoColumnLayout({
  sidebar,
  main,
  sidebarWidth = 'md',
  className,
}: TwoColumnLayoutProps) {
  const widthClasses = {
    sm: 'lg:w-64',
    md: 'lg:w-80',
    lg: 'lg:w-96',
  };

  return (
    <div className={cn('flex flex-col lg:flex-row gap-6', className)}>
      <aside className={cn('w-full shrink-0', widthClasses[sidebarWidth])}>
        {sidebar}
      </aside>
      <div className="flex-1 min-w-0">{main}</div>
    </div>
  );
}

/**
 * Stacked sections with animation
 */
interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  delay = 0,
  className,
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
