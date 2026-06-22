import { create } from 'zustand'

export const useUIStore = create((set) => ({
  sidebarOpen: false,
  darkMode: false,
  searchQuery: '',
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  closeSidebar: () => set({ sidebarOpen: false }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setSearchQuery: (searchQuery) => set({ searchQuery })
}))
