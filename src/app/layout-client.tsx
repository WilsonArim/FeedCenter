'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/layout';
import { useAppStore } from '@/store';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CLIENT LAYOUT
 * Client-side layout with sidebar state
 * ═══════════════════════════════════════════════════════════════════════════
 */

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render sidebar until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="flex min-h-screen">
        <div className="w-[240px]" /> {/* Placeholder for sidebar */}
        <div className="flex-1">{children}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <div
        className={cn(
          'flex-1 transition-all duration-300 ease-out-expo',
          sidebarCollapsed ? 'ml-[72px]' : 'ml-[240px]'
        )}
      >
        {children}
      </div>
    </div>
  );
}
