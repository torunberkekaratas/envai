const statusClass = {
  Aktif: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  İncelemede: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  Riskli: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  Tamamlandı: 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200'
}

export default function DataTable({ rows = [], title = 'Operasyon Kayıtları' }) {
  return (
    <section className="glass-panel overflow-hidden rounded-3xl">
      <div className="border-b border-black/5 p-5 dark:border-white/10">
        <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-white/[0.03] dark:text-slate-400">
            <tr><th className="px-3 py-3 sm:px-5 sm:py-4">ID</th><th className="px-3 py-3 sm:px-5 sm:py-4">Kayıt</th><th className="hidden px-3 py-3 sm:table-cell sm:px-5 sm:py-4">Sahip</th><th className="px-3 py-3 sm:px-5 sm:py-4">Durum</th><th className="hidden px-3 py-3 sm:table-cell sm:px-5 sm:py-4">Tarih</th></tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/10">
            {rows.map((row) => (
              <tr key={row.id} className="text-slate-700 dark:text-slate-200">
                <td className="px-3 py-3 font-semibold sm:px-5 sm:py-4">{row.id}</td>
                <td className="px-3 py-3 sm:px-5 sm:py-4">{row.name}</td>
                <td className="hidden px-3 py-3 sm:table-cell sm:px-5 sm:py-4">{row.owner}</td>
                <td className="px-3 py-3 sm:px-5 sm:py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[row.status]}`}>{row.status}</span></td>
                <td className="hidden px-3 py-3 text-slate-500 sm:table-cell sm:px-5 sm:py-4">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
