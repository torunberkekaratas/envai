import { motion } from 'framer-motion'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Line, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'
import {
  FiArrowUpRight, FiCheckCircle, FiClock, FiDatabase, FiFilter, FiMapPin, FiMoreHorizontal,
  FiPlus, FiSearch, FiShield, FiTrendingUp, FiUsers
} from 'react-icons/fi'
import { TbRobot } from 'react-icons/tb'
import DataTable from '../components/DataTable'
import { getModuleConfig, kpiTrend, mixData } from '../data/platformData.jsx'

const timeline = [
  { name: 'Planlama', value: 72, risk: 18 },
  { name: 'Veri', value: 86, risk: 12 },
  { name: 'Kontrol', value: 64, risk: 28 },
  { name: 'Onay', value: 58, risk: 22 },
  { name: 'Rapor', value: 78, risk: 14 }
]

function ShellCard({ children, className = '' }) {
  return <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`rounded-2xl border border-slate-200 bg-white shadow-[0_10px_34px_rgba(15,23,42,.05)] dark:border-white/10 dark:bg-white/[0.05] ${className}`}>{children}</motion.section>
}

function ModuleHeader({ config }) {
  const Icon = config.icon
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_34px_rgba(15,23,42,.05)] dark:border-white/10 dark:bg-white/[0.05] xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-lg" style={{ backgroundColor: config.accent }}><Icon size={24} /></div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">{config.group}</span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 dark:bg-white/10 dark:text-slate-300">Canlı çalışma alanı</span>
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-950 dark:text-white">{config.title}</h2>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">{config.description}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white"><FiFilter /> Filtrele</button>
        <button className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white" style={{ backgroundColor: config.accent }}><FiPlus /> Yeni Kayıt</button>
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
          <p className="mt-2 text-2xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">{item.value}</p>
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
    <ShellCard className="p-5">
      <div className="mb-4 flex items-center justify-between"><h3 className="text-base font-bold text-slate-950 dark:text-white">İş Akışı</h3><FiMoreHorizontal className="text-slate-400" /></div>
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

function VariantPanel({ config, variant }) {
  if (variant === 'assistant') {
    return (
      <ShellCard className="p-5">
        <h3 className="mb-4 text-base font-bold">AI Çalışma Alanı</h3>
        <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/[0.04]">
            <div className="flex gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 text-emerald-700"><TbRobot /></div><p className="rounded-2xl bg-white p-3 text-sm shadow-sm dark:bg-white/10">Bu modül için riskli veri noktalarını ve aksiyon önerilerini analiz edebilirim.</p></div>
            <div className="mt-4 flex flex-wrap gap-2">{['Rapor üret', 'Anomali bul', 'ESG önerisi', 'Veri kalitesi'].map((item) => <button key={item} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold">{item}</button>)}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 p-4 dark:border-white/10"><p className="text-sm font-bold">AI Sonuç Kalitesi</p><p className="mt-3 text-3xl font-bold" style={{ color: config.accent }}>%91</p><p className="text-xs text-slate-500">Doğrulanmış veri seti kapsama oranı</p></div>
        </div>
      </ShellCard>
    )
  }
  if (variant === 'map') {
    return (
      <ShellCard className="p-5">
        <div className="mb-4 flex items-center justify-between"><h3 className="text-base font-bold">Tesis Haritası ve Canlı Sinyaller</h3><FiMapPin style={{ color: config.accent }} /></div>
        <div className="relative h-72 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 via-emerald-50 to-sky-50 dark:from-slate-900 dark:via-emerald-950/30 dark:to-sky-950/20">
          {[18, 33, 49, 64, 78].map((left, index) => <span key={left} className="absolute h-4 w-4 rounded-full ring-8 ring-white/60" style={{ left: `${left}%`, top: `${25 + (index % 3) * 18}%`, backgroundColor: config.accent }} />)}
          <div className="absolute bottom-4 left-4 grid gap-3 sm:grid-cols-3"><MetricMini label="Aktif Cihaz" value="256" /><MetricMini label="Alarm" value="12" danger /><MetricMini label="Veri Kalitesi" value="96%" /></div>
        </div>
      </ShellCard>
    )
  }
  if (variant === 'workflow') return <WorkflowBoard config={config} />
  if (variant === 'portfolio') return <PortfolioPanel config={config} />
  return <WorkstreamPanel config={config} />
}

function MetricMini({ label, value, danger = false }) {
  return <div className="rounded-xl bg-white/90 p-3 shadow-sm dark:bg-slate-950/80"><p className="text-xs text-slate-500">{label}</p><p className={`text-lg font-bold ${danger ? 'text-red-500' : 'text-slate-950 dark:text-white'}`}>{value}</p></div>
}

function WorkflowBoard({ config }) {
  const lanes = ['Taslak', 'İnceleme', 'Onay', 'Tamamlandı']
  return <ShellCard className="p-5"><h3 className="mb-4 text-base font-bold">Süreç Panosu</h3><div className="grid gap-3 lg:grid-cols-4">{lanes.map((lane, laneIndex) => <div key={lane} className="rounded-2xl bg-slate-50 p-3 dark:bg-white/[0.04]"><p className="mb-3 text-sm font-bold text-slate-600 dark:text-slate-300">{lane}</p>{config.workflows.slice(0, 3).map((item, index) => <div key={`${lane}-${item}`} className="mb-2 rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm dark:border-white/10 dark:bg-white/[0.05]"><p className="font-semibold">{item}</p><p className="mt-1 text-xs text-slate-500">Öncelik: {laneIndex === 2 ? 'Yüksek' : index === 1 ? 'Orta' : 'Normal'}</p></div>)}</div>)}</div></ShellCard>
}

function PortfolioPanel({ config }) {
  return <ShellCard className="p-5"><h3 className="mb-4 text-base font-bold">Portföy Görünümü</h3><div className="grid gap-4 lg:grid-cols-3">{config.workflows.slice(0, 6).map((item, index) => <div key={item} className="rounded-2xl border border-slate-200 p-4 dark:border-white/10"><div className="mb-4 flex items-center justify-between"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold dark:bg-white/10">{index % 2 ? 'Aktif' : 'Planlandı'}</span><FiArrowUpRight style={{ color: config.accent }} /></div><p className="font-bold">{item}</p><div className="mt-4 h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full" style={{ width: `${45 + index * 8}%`, backgroundColor: config.accent }} /></div></div>)}</div></ShellCard>
}

function AnalyticsGrid({ config, variant }) {
  return (
    <div className="grid gap-4 xl:grid-cols-12">
      <ShellCard className="p-5 xl:col-span-5"><h3 className="mb-4 text-base font-bold">Performans Trendi</h3><div className="h-64"><ResponsiveContainer><ComposedChart data={kpiTrend}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Bar dataKey="energy" fill={`${config.accent}55`} radius={[8, 8, 0, 0]} /><Line dataKey="carbon" stroke={config.accent} strokeWidth={3} /></ComposedChart></ResponsiveContainer></div></ShellCard>
      <ShellCard className="p-5 xl:col-span-3"><h3 className="mb-4 text-base font-bold">Dağılım</h3><div className="h-64"><ResponsiveContainer><PieChart><Pie data={mixData} innerRadius={58} outerRadius={88} dataKey="value" paddingAngle={4}>{mixData.map((entry, index) => <Cell key={entry.name} fill={index === 0 ? config.accent : entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div></ShellCard>
      <ShellCard className="p-5 xl:col-span-4"><h3 className="mb-4 text-base font-bold">Kontrol Matrisi</h3><div className="grid grid-cols-3 gap-2">{['Veri', 'Risk', 'SLA', 'Kanıt', 'Onay', 'Rapor', 'Audit', 'API', 'Kalite'].map((item, index) => <div key={item} className="rounded-xl p-4 text-center" style={{ backgroundColor: index % 4 === 1 ? '#fef3c7' : index % 5 === 2 ? '#fee2e2' : '#dcfce7' }}><p className="text-xs font-bold text-slate-600">{item}</p><p className="mt-1 text-xl font-bold text-slate-900">{index % 3 === 0 ? 92 : index % 3 === 1 ? 74 : 58}%</p></div>)}</div></ShellCard>
    </div>
  )
}

export default function ModulePage({ title, variant = 'standard' }) {
  const config = getModuleConfig(title)
  const Icon = config.icon
  const kpis = [
    ...config.kpis,
    { label: 'Açık Görev', value: '18', delta: '-3.4%', positive: true },
    { label: 'Risk Seviyesi', value: 'Orta', delta: '+1.1%', positive: false }
  ].slice(0, 6)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
      <ModuleHeader config={config} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        {kpis.map((kpi, index) => <CompactKpi key={`${kpi.label}-${index}`} item={kpi} icon={index > 3 ? (index === 4 ? FiClock : FiShield) : Icon} accent={config.accent} index={index} />)}
      </div>
      <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
        <label className="relative"><FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-white/5" placeholder={`${config.title} içinde ara`} /></label>
        <select className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold dark:border-white/10 dark:bg-white/5"><option>2026 - Tüm Lokasyonlar</option><option>Q2 2026</option><option>Yüksek Risk</option></select>
      </div>
      <VariantPanel config={config} variant={variant} />
      <AnalyticsGrid config={config} variant={variant} />
      <div className="grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8"><DataTable title="Operasyon Kayıtları" rows={config.table} /></div>
        <ShellCard className="p-5 xl:col-span-4"><h3 className="mb-4 text-base font-bold">Öncelikli Aksiyonlar</h3><div className="space-y-3">{config.workflows.slice(0, 5).map((item, index) => <div key={item} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3 dark:bg-white/[0.04]"><FiCheckCircle className="mt-1" style={{ color: config.accent }} /><div><p className="text-sm font-bold">{item}</p><p className="text-xs text-slate-500">Sahip: {['Operasyon', 'ESG', 'Finans', 'Veri Ekibi', 'Tedarik'][index]}</p></div></div>)}</div></ShellCard>
      </div>
    </motion.div>
  )
}
