import { FiBell, FiCalendar, FiGlobe, FiMenu, FiMoon, FiPlus, FiSun } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useUIStore } from '../store/useUIStore'
import { currentUser, dashboardWidgetPool, getModuleLabel, modules } from '../data/platformData.jsx'

const today = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })

export default function Topbar() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode)
  const darkMode = useUIStore((state) => state.darkMode)
  const addWidget = useUIStore((state) => state.addWidget)
  const extraWidgetCount = useUIStore((state) => state.extraWidgetCount)
  const location = useLocation()
  const navigate = useNavigate()

  function handleAddWidget() {
    if (extraWidgetCount >= dashboardWidgetPool.length) return
    addWidget()
    if (location.pathname !== '/') navigate('/')
  }
  const currentModule = modules.find((module) => module.path === location.pathname)
  const pageTitle = getModuleLabel(currentModule?.title || 'Dashboard')
  const pageSubtitle = currentModule?.title === 'Dashboard' || !currentModule
    ? 'Genel bakış ve önemli metrikler'
    : `${pageTitle} için detaylı görünüm ve işlemler`
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 px-3 py-2.5 backdrop-blur-2xl dark:border-white/10 dark:bg-[#071922]/90 sm:px-4 sm:py-3 lg:px-6">
      <div className="flex flex-col gap-2 sm:gap-3 xl:flex-row xl:items-center">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <button onClick={toggleSidebar} className="rounded-xl p-2 text-slate-900 hover:bg-slate-100 lg:hidden dark:text-white dark:hover:bg-white/10"><FiMenu size={20} /></button>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold tracking-[-0.04em] text-slate-950 sm:text-2xl dark:text-white">{pageTitle}</h1>
            <p className="truncate text-xs text-slate-500 sm:text-sm dark:text-slate-400">{pageSubtitle}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-2 xl:justify-end">
          <SearchBar />
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5 text-sm font-semibold text-slate-700 shadow-sm sm:px-3 sm:py-2.5 dark:border-white/10 dark:bg-white/5 dark:text-white">
            <FiCalendar className="text-emerald-600" /> <span className="hidden sm:inline">{today}</span>
          </button>
          <button className="hidden rounded-xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white sm:inline-flex"><FiBell /></button>
          <button className="hidden rounded-xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white sm:inline-flex"><FiGlobe /></button>
          <button onClick={toggleDarkMode} className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm sm:p-3 dark:border-white/10 dark:bg-white/5 dark:text-white">{darkMode ? <FiSun /> : <FiMoon />}</button>
          <button onClick={handleAddWidget} disabled={extraWidgetCount >= dashboardWidgetPool.length} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3 sm:text-sm"><FiPlus /> <span className="hidden sm:inline">Widget Ekle</span><span className="sm:hidden">Ekle</span></button>
          <div className="hidden items-center gap-3 border-l border-slate-200 pl-4 dark:border-white/10 md:flex">
            <div className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 font-bold text-white">{currentUser.initials}<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" /></div>
            <div><p className="text-sm font-bold text-slate-900 dark:text-white">{currentUser.name}</p><p className="text-xs text-slate-500">{currentUser.role}</p></div>
          </div>
        </div>
      </div>
    </header>
  )
}
