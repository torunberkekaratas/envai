import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Area, AreaChart, Bar, CartesianGrid, Cell, ComposedChart, Line, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'
import {
  FiArrowUpRight, FiCheckCircle, FiClock, FiFilter, FiMapPin, FiMoreHorizontal,
  FiPlus, FiSearch, FiShield, FiX
} from 'react-icons/fi'
import { TbRobot } from 'react-icons/tb'
import DataTable from '../components/DataTable'
import { NewRecordModal, RecordDetailModal } from '../components/RecordModal'
import { getModuleConfig, kpiTrend, mixData } from '../data/platformData.jsx'
import { useUIStore } from '../store/useUIStore'

const statusFilters = ['Tümü', 'Aktif', 'İncelemede', 'Riskli', 'Tamamlandı']

function ShellCard({ children, className = '' }) {
  return <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`rounded-2xl border border-slate-200 bg-white shadow-[0_10px_34px_rgba(15,23,42,.05)] dark:border-white/10 dark:bg-white/[0.05] ${className}`}>{children}</motion.section>
}

function ModuleHeader({ config, statusFilter, onStatusFilter, onNewRecord }) {
  const Icon = config.icon
  const [filterOpen, setFilterOpen] = useState(false)
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-[0_10px_34px_rgba(15,23,42,.05)] dark:border-white/10 dark:bg-white/[0.05] xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-lg" style={{ backgroundColor: config.accent }}><Icon size={24} /></div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">{config.group}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 dark:bg-white/10 dark:text-slate-300">Canlı çalışma alanı</span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.05em] text-slate-950 sm:text-3xl dark:text-white">{config.title}</h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">{config.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <div className="relative">
          <button onClick={() => setFilterOpen((prev) => !prev)} className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-bold ${statusFilter !== 'Tümü' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10' : 'border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white'}`}>
            <FiFilter /> {statusFilter === 'Tümü' ? 'Filtrele' : statusFilter}
          </button>
          {filterOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setFilterOpen(false)} />
              <div className="absolute right-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl dark:border-white/10 dark:bg-[#0a1f29]">
                {statusFilters.map((status) => (
                  <button key={status} onClick={() => { onStatusFilter(status); setFilterOpen(false) }} className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-white/10 ${status === statusFilter ? 'font-bold text-emerald-600' : 'text-slate-700 dark:text-slate-200'}`}>
                    {status}
                    {status === statusFilter && <FiCheckCircle size={14} />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        <button onClick={onNewRecord} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white" style={{ backgroundColor: config.accent }}><FiPlus /> Yeni Kayıt</button>
      </div>
    </div>
  )
}

function CompactKpi({ item, icon: Icon, accent, index }) {
  return (
    <ShellCard className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{item.label}</p>
          <p className="mt-2 text-xl sm:text-2xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">{item.value}</p>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-full" style={{ backgroundColor: `${accent}18`, color: accent }}><Icon size={18} /></div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className={`text-xs font-bold ${item.positive ? 'text-emerald-600' : 'text-amber-600'}`}>{item.delta}</span>
        <ResponsiveContainer width={78} height={28}><AreaChart data={kpiTrend.slice(index, index + 4)}><Area dataKey="carbon" stroke={accent} fill={accent} fillOpacity={0.16} strokeWidth={2} /></AreaChart></ResponsiveContainer>
      </div>
    </ShellCard>
  )
}

function WorkstreamPanel({ config }) {
  return (
    <ShellCard className="p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between"><h3 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white">İş Akışı</h3><FiMoreHorizontal className="text-slate-400" /></div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {config.workflows.slice(0, 4).map((step, index) => (
          <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="mb-4 flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-xl text-sm font-bold text-white" style={{ backgroundColor: config.accent }}>{index + 1}</span>
              <span className="text-xs font-bold text-slate-400">SLA {index + 1}g</span>
            </div>
            <p className="font-bold text-slate-900 dark:text-white">{step}</p>
            <p className="mt-2 text-xs leading-5 text-slate-500">Sorumlu ekip, kanıt dosyası ve kontrol sonucu birlikte izlenir.</p>
          </div>
        ))}
      </div>
    </ShellCard>
  )
}

const aiResponses = {
  'Rapor üret': 'Bu modül için özet rapor hazırlandı: 6 aktif kayıt, 2 riskli kalem tespit edildi. Detaylı PDF çıktısı Raporlama Merkezi üzerinden alınabilir.',
  'Anomali bul': 'Son 24 saatte 1 anomali tespit edildi: beklenenden %12 sapma gösteren bir veri noktası. İlgili ekibe bildirim gönderilmesi öneriliyor.',
  'ESG önerisi': 'Bu modülde ESG skorunu artırmak için en yüksek etkili adım: eksik tedarikçi verilerinin tamamlanması. Tahmini etki: +3 puan.',
  'Veri kalitesi': 'Veri kalite skoru %91. En düşük kapsama oranı "manuel girişler" alanında; otomatik entegrasyon ile %98’e çıkarılabilir.'
}

function AssistantPanel({ config }) {
  const [reply, setReply] = useState(null)
  return (
    <ShellCard className="p-4 sm:p-5">
      <h3 className="mb-4 text-sm sm:text-base font-bold">Yapay Zeka Çalışma Alanı</h3>
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.04]">
          <div className="flex gap-3"><div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700"><TbRobot /></div><p className="rounded-2xl bg-white p-3 text-sm shadow-sm dark:bg-white/10">{reply || 'Bu modül için riskli veri noktalarını ve aksiyon önerilerini analiz edebilirim.'}</p></div>
          <div className="mt-4 flex flex-wrap gap-2">{Object.keys(aiResponses).map((item) => <button key={item} onClick={() => setReply(aiResponses[item])} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold hover:bg-emerald-50 dark:border-white/10 dark:bg-white/5">{item}</button>)}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10"><p className="text-sm font-bold">Yapay Zeka Sonuç Kalitesi</p><p className="mt-3 text-3xl font-bold" style={{ color: config.accent }}>%91</p><p className="text-xs text-slate-500">Doğrulanmış veri seti kapsama oranı</p></div>
      </div>
    </ShellCard>
  )
}

function MapPanel({ config }) {
  const [active, setActive] = useState(null)
  const points = [18, 33, 49, 64, 78]
  return (
    <ShellCard className="p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between"><h3 className="text-sm sm:text-base font-bold">Tesis Haritası ve Canlı Sinyaller</h3><FiMapPin style={{ color: config.accent }} /></div>
      <div className="relative h-72 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 via-emerald-50 to-sky-50 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/20">
        {points.map((left, index) => (
          <button key={left} onClick={() => setActive(active === index ? null : index)} className={`absolute h-4 w-4 rounded-full ring-8 transition ${active === index ? 'ring-emerald-300 scale-150' : 'ring-white/60'}`} style={{ left: `${left}%`, top: `${25 + (index % 3) * 18}%`, backgroundColor: config.accent }} title={`Tesis ${index + 1}`} />
        ))}
        {active !== null && (
          <div className="absolute right-4 top-4 rounded-xl bg-white/95 p-3 text-xs shadow-lg dark:bg-slate-950/90">
            <p className="font-bold text-slate-900 dark:text-white">Tesis {active + 1}</p>
            <p className="mt-1 text-slate-500">Durum: Aktif · {18 + active * 7} cihaz</p>
          </div>
        )}
        <div className="absolute bottom-4 left-4 grid gap-3 sm:grid-cols-3"><MetricMini label="Aktif Cihaz" value="256" /><MetricMini label="Alarm" value="12" danger /><MetricMini label="Veri Kalitesi" value="96%" /></div>
      </div>
    </ShellCard>
  )
}

function MetricMini({ label, value, danger = false }) {
  return <div className="rounded-xl bg-white/90 p-3 shadow-sm dark:bg-slate-950/80"><p className="text-xs text-slate-500">{label}</p><p className={`text-lg font-bold ${danger ? 'text-red-500' : 'text-slate-950 dark:text-white'}`}>{value}</p></div>
}

function WorkflowBoard({ config }) {
  const lanes = ['Taslak', 'İnceleme', 'Onay', 'Tamamlandı']
  return <ShellCard className="p-4 sm:p-5"><h3 className="mb-4 text-sm sm:text-base font-bold">Süreç Panosu</h3><div className="grid gap-3 lg:grid-cols-4">{lanes.map((lane, laneIndex) => <div key={lane} className="rounded-2xl bg-slate-50 p-3 dark:bg-white/[0.04]"><p className="mb-3 text-sm font-bold text-slate-600 dark:text-slate-300">{lane}</p>{config.workflows.slice(0, 3).map((item, index) => <div key={`${lane}-${item}`} className="mb-2 rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm dark:border-white/10 dark:bg-white/[0.05]"><p className="font-semibold">{item}</p><p className="mt-1 text-xs text-slate-500">Öncelik: {laneIndex === 2 ? 'Yüksek' : index === 1 ? 'Orta' : 'Normal'}</p></div>)}</div>)}</div></ShellCard>
}

function PortfolioPanel({ config }) {
  return <ShellCard className="p-4 sm:p-5"><h3 className="mb-4 text-sm sm:text-base font-bold">Portföy Görünümü</h3><div className="grid gap-4 lg:grid-cols-3">{config.workflows.slice(0, 6).map((item, index) => <div key={item} className="rounded-2xl border border-slate-200 p-4 dark:border-white/10"><div className="mb-4 flex items-center justify-between"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-white/10">{index % 2 ? 'Aktif' : 'Planlandı'}</span><FiArrowUpRight style={{ color: config.accent }} /></div><p className="font-bold">{item}</p><div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full" style={{ width: `${45 + index * 8}%`, backgroundColor: config.accent }} /></div></div>)}</div></ShellCard>
}

function VariantPanel({ config, variant }) {
  if (variant === 'assistant') return <AssistantPanel config={config} />
  if (variant === 'map') return <MapPanel config={config} />
  if (variant === 'workflow') return <WorkflowBoard config={config} />
  if (variant === 'portfolio') return <PortfolioPanel config={config} />
  return <WorkstreamPanel config={config} />
}

function AnalyticsGrid({ config }) {
  return (
    <div className="grid gap-4 xl:grid-cols-12">
      <ShellCard className="min-w-0 p-4 sm:p-5 xl:col-span-5"><h3 className="mb-4 text-sm sm:text-base font-bold">Performans Trendi</h3><div className="h-64"><ResponsiveContainer><ComposedChart data={kpiTrend}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="energy" fill={`${config.accent}55`} radius={[8, 8, 0, 0]} /><Line dataKey="carbon" stroke={config.accent} strokeWidth={3} /></ComposedChart></ResponsiveContainer></div></ShellCard>
      <ShellCard className="min-w-0 p-4 sm:p-5 xl:col-span-3"><h3 className="mb-4 text-sm sm:text-base font-bold">Dağılım</h3><div className="h-64"><ResponsiveContainer><PieChart><Pie data={mixData} innerRadius={58} outerRadius={88} dataKey="value" paddingAngle={4}>{mixData.map((entry, index) => <Cell key={entry.name} fill={index === 0 ? config.accent : entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></ShellCard>
      <ShellCard className="min-w-0 p-4 sm:p-5 xl:col-span-4"><h3 className="mb-4 text-sm sm:text-base font-bold">Kontrol Matrisi</h3><div className="grid grid-cols-3 gap-2">{['Veri', 'Risk', 'SLA', 'Kanıt', 'Onay', 'Rapor', 'Audit', 'API', 'Kalite'].map((item, index) => <div key={item} className="rounded-xl p-4 text-center" style={{ backgroundColor: index % 4 === 1 ? '#fef3c7' : index % 5 === 2 ? '#fee2e2' : '#dcfce7' }}><p className="text-xs font-bold text-slate-600">{item}</p><p className="mt-1 text-xl font-bold text-slate-900">{index % 3 === 0 ? 92 : index % 3 === 1 ? 74 : 58}%</p></div>)}</div></ShellCard>
    </div>
  )
}

export default function ModulePage({ title, variant = 'standard' }) {
  const config = getModuleConfig(title)
  const Icon = config.icon
  const addToast = useUIStore((state) => state.addToast)

  const [rows, setRows] = useState(config.table)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('Tümü')
  const [period, setPeriod] = useState('2026 - Tüm Lokasyonlar')
  const [detailRecord, setDetailRecord] = useState(null)
  const [isNewOpen, setIsNewOpen] = useState(false)

  const kpis = [
    ...config.kpis,
    { label: 'Açık Görev', value: '18', delta: '-3.4%', positive: true },
    { label: 'Risk Seviyesi', value: 'Orta', delta: '+1.1%', positive: false }
  ].slice(0, 6)

  const filteredRows = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr')
    return rows.filter((row) => {
      const matchesSearch = !query || [row.id, row.name, row.owner].some((field) => String(field).toLocaleLowerCase('tr').includes(query))
      const matchesStatus = statusFilter === 'Tümü' || row.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [rows, search, statusFilter])

  function handleSaveRecord(record) {
    const nextId = `ENV-${String(rows.length + 1).padStart(3, '0')}`
    setRows((prev) => [{ id: nextId, ...record }, ...prev])
    addToast(`Yeni kayıt eklendi: ${record.name}`)
  }

  function handleDelete(row) {
    setRows((prev) => prev.filter((item) => item.id !== row.id))
    addToast(`Kayıt silindi: ${row.id}`)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 sm:space-y-4">
      <ModuleHeader config={config} statusFilter={statusFilter} onStatusFilter={setStatusFilter} onNewRecord={() => setIsNewOpen(true)} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {kpis.map((kpi, index) => <CompactKpi key={`${kpi.label}-${index}`} item={kpi} icon={kpi.label.includes('Görev') ? FiClock : kpi.label.includes('Risk') ? FiShield : Icon} accent={config.accent} index={index} />)}
      </div>
      <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
        <label className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5" placeholder={`${config.title} içinde ara`} />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><FiX size={16} /></button>}
        </label>
        <select value={period} onChange={(event) => { setPeriod(event.target.value); addToast(`Dönem güncellendi: ${event.target.value}`) }} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold dark:border-white/10 dark:bg-white/5"><option>2026 - Tüm Lokasyonlar</option><option>Q2 2026</option><option>Yüksek Risk</option></select>
      </div>
      <VariantPanel config={config} variant={variant} />
      <AnalyticsGrid config={config} />
      <div className="grid gap-4 xl:grid-cols-12">
        <div className="min-w-0 xl:col-span-8">
          <DataTable
            title={`Operasyon Kayıtları (${filteredRows.length})`}
            rows={filteredRows}
            onRowClick={setDetailRecord}
            onDelete={handleDelete}
            onExport={() => addToast('Kayıtlar CSV olarak dışa aktarıldı.')}
          />
        </div>
        <ShellCard className="min-w-0 p-4 sm:p-5 xl:col-span-4"><h3 className="mb-4 text-sm sm:text-base font-bold">Öncelikli Aksiyonlar</h3><div className="space-y-3">{config.workflows.slice(0, 5).map((item, index) => <button key={item} onClick={() => addToast(`Aksiyon açıldı: ${item}`)} className="flex w-full items-start gap-3 rounded-xl bg-slate-50 p-3 text-left transition hover:bg-emerald-50 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]"><FiCheckCircle className="mt-1 shrink-0" style={{ color: config.accent }} /><div><p className="text-sm font-bold">{item}</p><p className="text-xs text-slate-500">Sahip: {['Operasyon', 'ESG', 'Finans', 'Veri Ekibi', 'Tedarik'][index]}</p></div></button>)}</div></ShellCard>
      </div>

      {detailRecord && <RecordDetailModal record={detailRecord} onClose={() => setDetailRecord(null)} />}
      {isNewOpen && <NewRecordModal accent={config.accent} onClose={() => setIsNewOpen(false)} onSave={handleSaveRecord} />}
    </motion.div>
  )
}
