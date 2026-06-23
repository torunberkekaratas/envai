import { useState } from 'react'
import { FiBell, FiCalendar, FiCheck, FiGlobe, FiLogOut, FiMenu, FiMoon, FiPlus, FiSettings, FiSun, FiUser, FiX } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useUIStore } from '../store/useUIStore'
import { currentUser, dashboardWidgetPool, getModuleLabel, languages, modules, notifications } from '../data/platformData.jsx'

const today = new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })

function Dropdown({ open, onClose, children, className = '' }) {
  if (!open) return null
  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className={`absolute right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#0a1f29] ${className}`}>{children}</div>
    </>
  )
}

export default function Topbar() {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode)
  const darkMode = useUIStore((state) => state.darkMode)
  const addWidget = useUIStore((state) => state.addWidget)
  const extraWidgetCount = useUIStore((state) => state.extraWidgetCount)
  const language = useUIStore((state) => state.language)
  const setLanguage = useUIStore((state) => state.setLanguage)
  const dismissedNotifications = useUIStore((state) => state.dismissedNotifications)
  const dismissNotification = useUIStore((state) => state.dismissNotification)
  const clearNotifications = useUIStore((state) => state.clearNotifications)
  const addToast = useUIStore((state) => state.addToast)
  const location = useLocation()
  const navigate = useNavigate()

  const [openMenu, setOpenMenu] = useState(null)

  const activeNotifications = notifications.filter((item) => !dismissedNotifications.includes(item.id))
  const activeLanguage = languages.find((item) => item.code === language) || languages[0]

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

  const dotColor = { warning: 'bg-amber-500', info: 'bg-sky-500', success: 'bg-emerald-500' }

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

          <div className="relative hidden sm:block">
            <button onClick={() => setOpenMenu(openMenu === 'bell' ? null : 'bell')} className="relative rounded-xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white">
              <FiBell />
              {activeNotifications.length > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-[16px] place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">{activeNotifications.length}</span>}
            </button>
            <Dropdown open={openMenu === 'bell'} onClose={() => setOpenMenu(null)} className="w-80">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-white/10">
                <p className="text-sm font-bold text-slate-900 dark:text-white">Bildirimler</p>
                {activeNotifications.length > 0 && <button onClick={() => { clearNotifications(activeNotifications.map((item) => item.id)); addToast('Tüm bildirimler okundu olarak işaretlendi.') }} className="text-xs font-bold text-emerald-600 hover:underline">Tümünü temizle</button>}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {activeNotifications.length === 0 && <p className="px-4 py-8 text-center text-sm text-slate-400">Yeni bildirim yok.</p>}
                {activeNotifications.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 border-b border-slate-50 px-4 py-3 last:border-0 dark:border-white/5">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColor[item.type]}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-700 dark:text-slate-200">{item.title}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{item.time}</p>
                    </div>
                    <button onClick={() => dismissNotification(item.id)} className="shrink-0 text-slate-300 hover:text-slate-500"><FiX size={14} /></button>
                  </div>
                ))}
              </div>
              <button onClick={() => { setOpenMenu(null); navigate('/notification-center') }} className="w-full border-t border-slate-100 py-3 text-center text-sm font-bold text-emerald-600 hover:bg-slate-50 dark:border-white/10 dark:hover:bg-white/5">Tüm Bildirimleri Gör</button>
            </Dropdown>
          </div>

          <div className="relative hidden sm:block">
            <button onClick={() => setOpenMenu(openMenu === 'lang' ? null : 'lang')} className="rounded-xl border border-slate-200 bg-white p-3 text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white"><FiGlobe /></button>
            <Dropdown open={openMenu === 'lang'} onClose={() => setOpenMenu(null)} className="w-44">
              {languages.map((lang) => (
                <button key={lang.code} onClick={() => { setLanguage(lang.code); setOpenMenu(null); addToast(`Dil değiştirildi: ${lang.label}`) }} className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-white/10 ${lang.code === language ? 'font-bold text-emerald-600' : 'text-slate-700 dark:text-slate-200'}`}>
                  <span className="flex items-center gap-2"><span>{lang.flag}</span> {lang.label}</span>
                  {lang.code === language && <FiCheck size={14} />}
                </button>
              ))}
            </Dropdown>
          </div>

          <button onClick={toggleDarkMode} className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm sm:p-3 dark:border-white/10 dark:bg-white/5 dark:text-white">{darkMode ? <FiSun /> : <FiMoon />}</button>
          <button onClick={handleAddWidget} disabled={extraWidgetCount >= dashboardWidgetPool.length} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3 sm:text-sm"><FiPlus /> <span className="hidden sm:inline">Widget Ekle</span><span className="sm:hidden">Ekle</span></button>

          <div className="relative hidden md:block">
            <button onClick={() => setOpenMenu(openMenu === 'profile' ? null : 'profile')} className="flex items-center gap-3 border-l border-slate-200 pl-4 dark:border-white/10">
              <div className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 font-bold text-white">{currentUser.initials}<span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" /></div>
              <div className="text-left"><p className="text-sm font-bold text-slate-900 dark:text-white">{currentUser.name}</p><p className="text-xs text-slate-500">{currentUser.role}</p></div>
            </button>
            <Dropdown open={openMenu === 'profile'} onClose={() => setOpenMenu(null)} className="w-52">
              <div className="border-b border-slate-100 px-4 py-3 dark:border-white/10">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                <p className="text-xs text-slate-500">{activeLanguage.flag} {currentUser.role}</p>
              </div>
              <button onClick={() => { setOpenMenu(null); navigate('/user-role-management') }} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/10"><FiUser size={15} /> Profilim</button>
              <button onClick={() => { setOpenMenu(null); navigate('/company-management') }} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/10"><FiSettings size={15} /> Ayarlar</button>
              <button onClick={() => { setOpenMenu(null); addToast('Çıkış yapıldı (demo).') }} className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 dark:border-white/10 dark:hover:bg-white/10"><FiLogOut size={15} /> Çıkış Yap</button>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  )
}
