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
      toasts: [],
      language: 'tr',
      dismissedNotifications: [],
      setLanguage: (language) => set({ language }),
      dismissNotification: (id) => set((state) => ({ dismissedNotifications: [...state.dismissedNotifications, id] })),
      clearNotifications: (ids) => set((state) => ({ dismissedNotifications: [...new Set([...state.dismissedNotifications, ...ids])] })),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      closeSidebar: () => set({ sidebarOpen: false }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      addWidget: () => set((state) => ({ extraWidgetCount: Math.min(state.extraWidgetCount + 1, dashboardWidgetPool.length) })),
      addToast: (message) => {
        const id = Date.now() + Math.random()
        set((state) => ({ toasts: [...state.toasts, { id, message }] }))
        setTimeout(() => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })), 3500)
      },
      removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }))
    }),
    { name: 'envai-ui-preferences', partialize: (state) => ({ darkMode: state.darkMode, extraWidgetCount: state.extraWidgetCount, language: state.language }) }
  )
)
