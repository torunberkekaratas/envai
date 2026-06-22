import { sites } from '../data/platformData.jsx'

export default function FilterPanel() {
  return (
    <section className="glass-panel rounded-3xl p-4">
      <div className="grid gap-3 md:grid-cols-4">
        <select className="soft-input"><option>2026 Yıl Geneli</option><option>Q1 2026</option><option>Q2 2026</option></select>
        <select className="soft-input">{sites.map((site) => <option key={site}>{site}</option>)}</select>
        <select className="soft-input"><option>Tüm Kapsamlar</option><option>Kapsam 1</option><option>Kapsam 2</option><option>Kapsam 3</option></select>
        <button className="rounded-2xl bg-envai-navy px-4 py-3 text-sm font-bold text-white dark:bg-envai-green">Filtreleri Uygula</button>
      </div>
    </section>
  )
}
