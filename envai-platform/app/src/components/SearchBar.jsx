import { FiSearch } from 'react-icons/fi'
import { useUIStore } from '../store/useUIStore'

export default function SearchBar() {
  const searchQuery = useUIStore((state) => state.searchQuery)
  const setSearchQuery = useUIStore((state) => state.setSearchQuery)
  return (
    <label className="relative block w-full max-w-xs">
      <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pl-11 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5" placeholder="Ara (Ctrl + K)" />
    </label>
  )
}
