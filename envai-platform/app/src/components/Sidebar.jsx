import { NavLink } from 'react-router-dom'
import { FiChevronDown, FiX } from 'react-icons/fi'
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
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-80 transform flex-col border-r border-white/10 bg-envai-deep text-white transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <img src={logo} alt="ENVAI" className="h-9 w-auto brightness-0 invert" />
          <button className="rounded-xl p-2 hover:bg-white/10 lg:hidden" onClick={closeSidebar}><FiX /></button>
        </div>
        <div className="flex-1 space-y-5 overflow-y-auto p-4">
          {Object.entries(groupedModules).map(([group, items]) => (
            <details key={group} open className="group rounded-2xl bg-white/[0.03] p-2">
              <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                {group}<FiChevronDown className="transition group-open:rotate-180" />
              </summary>
              <nav className="mt-1 space-y-1">
                {items.map((module) => {
                  const Icon = module.icon
                  return (
                    <NavLink key={module.path} to={module.path} onClick={closeSidebar} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? 'bg-envai-green text-white shadow-lg shadow-envai-green/20' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                      <Icon size={17} /><span>{module.title}</span>
                    </NavLink>
                  )
                })}
              </nav>
            </details>
          ))}
        </div>
        <div className="m-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
          <p className="text-sm font-semibold">ENVAI Enterprise</p>
          <p className="mt-1 text-xs leading-5 text-white/55">Mock data ile çalışan profesyonel SaaS ERP deneyimi.</p>
        </div>
      </aside>
    </>
  )
}
