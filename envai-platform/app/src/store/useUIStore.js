import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { dashboardWidgetPool } from '../data/platformData.jsx'

export const useUIStore = create(
  persist(
    (set) => ({
      sidebarOpen: false,
      darkMode: false,
      searchQuery: '',
      extraWidgetCount: 0,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      closeSidebar: () => set({ sidebarOpen: false }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      addWidget: () => set((state) => ({ extraWidgetCount: Math.min(state.extraWidgetCount + 1, dashboardWidgetPool.length) }))
    }),
    { name: 'envai-ui-preferences', partialize: (state) => ({ darkMode: state.darkMode, extraWidgetCount: state.extraWidgetCount }) }
  )
)
