import { FiBell, FiMenu, FiMoon, FiSun } from 'react-icons/fi'
import SearchBar from './SearchBar'
import { useUIStore } from '../store/useUIStore'

export default function Topbar() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode)
  const darkMode = useUIStore((state) => state.darkMode)
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-envai-cloud/80 px-4 py-3 backdrop-blur-2xl dark:border-white/10 dark:bg-envai-deep/82 lg:px-6">
      <div className="flex items-center gap-3">
        <button onClick={toggleSidebar} className="rounded-2xl border border-black/10 bg-white p-3 text-slate-700 lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-white"><FiMenu /></button>
        <SearchBar />
        <div className="ml-auto flex items-center gap-2">
          <button className="rounded-2xl border border-black/10 bg-white p-3 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white"><FiBell /></button>
          <button onClick={toggleDarkMode} className="rounded-2xl border border-black/10 bg-white p-3 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white">{darkMode ? <FiSun /> : <FiMoon />}</button>
          <div className="hidden items-center gap-3 rounded-2xl border border-black/10 bg-white px-3 py-2 dark:border-white/10 dark:bg-white/5 md:flex">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-envai-green font-bold text-white">E</div>
            <div><p className="text-sm font-bold text-slate-900 dark:text-white">Envai Admin</p><p className="text-xs text-slate-500">demo@envai.com</p></div>
          </div>
        </div>
      </div>
    </header>
  )
}
