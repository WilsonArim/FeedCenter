import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppState } from '@/types';

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * APP STORE
 * Global application state with persistence
 * ═══════════════════════════════════════════════════════════════════════════
 */

interface AppStore extends AppState {
  // Actions
  setTheme: (theme: AppState['theme']) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setPreferredCurrency: (currency: string) => void;
  updateLastSyncTime: (key: 'news' | 'finance' | 'crypto') => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // Initial state
      theme: 'dark',
      sidebarCollapsed: false,
      preferredCurrency: 'EUR',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      lastSyncTimes: {
        news: null,
        finance: null,
        crypto: null,
      },

      // Actions
      setTheme: (theme) => set({ theme }),
      
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      
      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }),
      
      setPreferredCurrency: (currency) =>
        set({ preferredCurrency: currency }),
      
      updateLastSyncTime: (key) =>
        set((state) => ({
          lastSyncTimes: {
            ...state.lastSyncTimes,
            [key]: new Date().toISOString(),
          },
        })),
    }),
    {
      name: 'clawdbot-app-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        preferredCurrency: state.preferredCurrency,
      }),
    }
  )
);
