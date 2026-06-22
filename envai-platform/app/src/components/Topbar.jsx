import { FiBell, FiCalendar, FiGlobe, FiMenu, FiMoon, FiPlus, FiSun } from 'react-icons/fi'
import SearchBar from './SearchBar'
import { useUIStore } from '../store/useUIStore'

export default function Topbar() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode)
  const darkMode = useUIStore((state) => state.darkMode)
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-2xl dark:border-white/10 dark:bg-[#071922]/90 lg:px-6">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <button onClick={toggleSidebar} className="rounded-xl p-2 text-slate-900 hover:bg-slate-100 lg:hidden dark:text-white dark:hover:bg-white/10"><FiMenu size={22} /></button>
          <div>
            <h1 className="text-2xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">Gösterge Paneli</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Genel bakış ve önemli metrikler</p>
          </div>
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-2 xl:justify-end">
          <SearchBar />
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
            <FiCalendar className="text-emerald-600" /> 01 Mayıs 2024
          </button>
          <button className="hidden rounded-xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white sm:inline-flex"><FiBell /></button>
          <button className="hidden rounded-xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white sm:inline-flex"><FiGlobe /></button>
          <button onClick={toggleDarkMode} className="rounded-xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">{darkMode ? <FiSun /> : <FiMoon />}</button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20"><FiPlus /> Widget Ekle</button>
          <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 dark:border-white/10 md:flex">
            <div className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 font-bold text-white">A<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" /></div>
            <div><p className="text-sm font-bold text-slate-900 dark:text-white">Ahmet Yılmaz</p><p className="text-xs text-slate-500">Sistem Yöneticisi</p></div>
          </div>
        </div>
      </div>
    </header>
  )
}
