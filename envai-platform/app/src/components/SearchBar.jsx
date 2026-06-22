import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { useUIStore } from '../store/useUIStore'
import { getModuleLabel, modules } from '../data/platformData.jsx'

export default function SearchBar() {
  const searchQuery = useUIStore((state) => state.searchQuery)
  const setSearchQuery = useUIStore((state) => state.setSearchQuery)
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const matches = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return []
    return modules.filter((module) => getModuleLabel(module.title).toLowerCase().includes(query)).slice(0, 6)
  }, [searchQuery])

  function goToModule(module) {
    navigate(module.path)
    setSearchQuery('')
    setIsOpen(false)
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && matches.length > 0) goToModule(matches[0])
    if (event.key === 'Escape') setIsOpen(false)
  }

  return (
    <label className="relative block w-full max-w-xs">
      <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
      <input
        value={searchQuery}
        onChange={(event) => { setSearchQuery(event.target.value); setIsOpen(true) }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 120)}
        onKeyDown={handleKeyDown}
        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 pl-11 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5"
        placeholder="Ara (Ctrl + K)"
      />
      {isOpen && matches.length > 0 && (
        <div className="absolute left-0 top-full z-40 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0a1f29]">
          {matches.map((module) => (
            <button
              key={module.path}
              type="button"
              onMouseDown={() => goToModule(module)}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-emerald-50 dark:text-slate-200 dark:hover:bg-white/10"
            >
              <module.icon size={16} style={{ color: module.accent }} />
              {getModuleLabel(module.title)}
            </button>
          ))}
        </div>
      )}
    </label>
  )
}
