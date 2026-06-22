import { activities } from '../data/platformData.jsx'

export default function NotificationWidget() {
  return (
    <section className="glass-panel rounded-3xl p-5">
      <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Bildirimler</h3>
      <div className="mt-5 space-y-3">
        {activities.map((activity, index) => (
          <div key={activity} className="flex gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-white/[0.04]">
            <span className={`mt-2 status-dot ${index % 2 ? 'bg-blue-500' : 'bg-emerald-500'}`} />
            <div><p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{activity}</p><p className="text-xs text-slate-500">{index + 1} saat önce</p></div>
          </div>
        ))}
      </div>
    </section>
  )
}
