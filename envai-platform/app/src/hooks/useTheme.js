import { useEffect } from 'react'
import { useUIStore } from '../store/useUIStore'

export function useTheme() {
  const darkMode = useUIStore((state) => state.darkMode)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])
  return darkMode
}
