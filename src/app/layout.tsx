import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { RootLayoutClient } from './layout-client';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ROOT LAYOUT
 * Application shell with fonts and metadata
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const metadata: Metadata = {
  title: {
    default: 'ClawdBot Dashboard',
    template: '%s | ClawdBot',
  },
  description: 'Dashboard pessoal para notícias, finanças e portfólio cripto',
  keywords: ['dashboard', 'finanças', 'cripto', 'notícias', 'portfólio'],
  authors: [{ name: 'ClawdBot' }],
  creator: 'ClawdBot',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#090b10' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background antialiased">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
