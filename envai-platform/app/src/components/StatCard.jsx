import { motion } from 'framer-motion'

export default function StatCard({ label, value, delta, positive = true, icon: Icon, accent = '#16A34A' }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="metric-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</p>
        </div>
        {Icon && <div className="rounded-2xl p-3 text-white" style={{ backgroundColor: accent }}><Icon size={20} /></div>}
      </div>
      {delta && <p className={`mt-4 text-sm font-semibold ${positive ? 'text-emerald-600' : 'text-amber-600'}`}>{delta} önceki döneme göre</p>}
    </motion.div>
  )
}
