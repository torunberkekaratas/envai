export default function KPIWidget({ title, items = [] }) {
  return (
    <section className="glass-panel rounded-3xl p-5">
      <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h3>
      <div className="mt-5 space-y-4">
        {items.map((item, index) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-sm"><span className="font-semibold text-slate-700 dark:text-slate-200">{item.label}</span><span className="text-slate-500">{item.value}</span></div>
            <div className="h-2 rounded-full bg-slate-100 dark:bg-white/10"><div className="h-2 rounded-full" style={{ width: item.value, backgroundColor: index % 2 ? '#0EA5E9' : '#16A34A' }} /></div>
          </div>
        ))}
      </div>
    </section>
  )
}
