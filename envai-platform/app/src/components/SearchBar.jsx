import { FiSearch } from 'react-icons/fi'
import { useUIStore } from '../store/useUIStore'

export default function SearchBar() {
  const searchQuery = useUIStore((state) => state.searchQuery)
  const setSearchQuery = useUIStore((state) => state.setSearchQuery)
  return (
    <label className="relative block w-full max-w-md">
      <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="soft-input pl-11" placeholder="Modül, rapor, tesis veya tedarikçi ara" />
    </label>
  )
}
