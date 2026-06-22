import { NavLink } from 'react-router-dom'
import { FiChevronDown, FiGrid, FiX } from 'react-icons/fi'
import { modules } from '../data/platformData.jsx'
import { useUIStore } from '../store/useUIStore'
import logo from '../assets/envai-logo.svg'

const groupedModules = modules.reduce((acc, module) => {
  acc[module.group] = acc[module.group] || []
  acc[module.group].push(module)
  return acc
}, {})

export default function Sidebar() {
  const sidebarOpen = useUIStore((state) => state.sidebarOpen)
  const closeSidebar = useUIStore((state) => state.closeSidebar)
  return (
    <>
      <div onClick={closeSidebar} className={`fixed inset-0 z-40 bg-slate-950/50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`} />
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 transform flex-col border-r border-white/10 bg-[#062432] text-white shadow-2xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-6">
          <img src={logo} alt="ENVAI" className="h-10 w-auto brightness-0 invert" />
          <button className="rounded-xl p-2 hover:bg-white/10 lg:hidden" onClick={closeSidebar}><FiX /></button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto px-3 pb-4">
          <NavLink to="/" onClick={closeSidebar} className={({ isActive }) => `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-950/30' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}>
            <FiGrid size={18} /><span>Dashboard</span>
          </NavLink>
          {Object.entries(groupedModules).map(([group, items]) => (
            <details key={group} open={['Admin', 'Carbon', 'Compliance', 'Operations'].includes(group)} className="group rounded-xl">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white">
                {group}<FiChevronDown className="transition group-open:rotate-180" />
              </summary>
              <nav className="mt-1 space-y-1 pl-2">
                {items.map((module) => {
                  const Icon = module.icon
                  if (module.title === 'Dashboard') return null
                  return (
                    <NavLink key={module.path} to={module.path} onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition ${isActive ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/30' : 'text-white/62 hover:bg-white/10 hover:text-white'}`}>
                      <Icon size={17} /><span>{module.title}</span>
                    </NavLink>
                  )
                })}
              </nav>
            </details>
          ))}
        </div>
        <div className="m-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-xs text-white/50">Aktif Şirket</p>
          <p className="mt-1 text-sm font-semibold">Envai Demo A.Ş.</p>
          <p className="mt-1 text-xs leading-5 text-white/55">Enterprise sürdürülebilirlik çalışma alanı</p>
        </div>
      </aside>
    </>
  )
}
