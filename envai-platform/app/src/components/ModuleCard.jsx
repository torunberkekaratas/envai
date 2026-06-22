import { Link } from 'react-router-dom'

export default function ModuleCard({ module }) {
  const Icon = module.icon
  return (
    <Link to={module.path} className="group metric-card block transition hover:-translate-y-1 hover:shadow-glass">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl p-3 text-white" style={{ backgroundColor: module.accent }}><Icon size={20} /></div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 dark:bg-white/10 dark:text-slate-300">{module.group}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-950 group-hover:text-envai-green dark:text-white">{module.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Kurumsal süreç, veri kalitesi ve karar destek görünümü.</p>
    </Link>
  )
}
