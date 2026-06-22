import { motion } from 'framer-motion'
import { FiArrowUpRight, FiCheckCircle, FiMapPin } from 'react-icons/fi'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import DataTable from '../components/DataTable'
import PageHeader from '../components/PageHeader'
import FilterPanel from '../components/FilterPanel'
import KPIWidget from '../components/KPIWidget'
import NotificationWidget from '../components/NotificationWidget'
import { getModuleConfig } from '../data/platformData.jsx'

function ProcessBoard({ config }) {
  return (
    <section className="glass-panel rounded-3xl p-5">
      <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">İş Süreci Akışı</h3>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        {config.workflows.slice(0, 4).map((step, index) => (
          <div key={step} className="rounded-2xl border border-black/5 bg-white/70 p-4 dark:border-white/10 dark:bg-white/[0.04]">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl text-sm font-bold text-white" style={{ backgroundColor: config.accent }}>{index + 1}</div>
            <p className="font-semibold text-slate-900 dark:text-white">{step}</p>
            <p className="mt-2 text-sm leading-5 text-slate-500 dark:text-slate-400">Sahip, veri kalitesi ve tamamlanma durumu izlenir.</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function MapPanel({ config }) {
  return (
    <section className="glass-panel rounded-3xl p-5">
      <div className="flex items-center justify-between"><h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Tesis & Lokasyon Görünümü</h3><FiMapPin style={{ color: config.accent }} /></div>
      <div className="relative mt-5 h-72 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-emerald-50 dark:from-slate-900 dark:to-emerald-950/30">
        {[18, 36, 58, 74].map((left, index) => <span key={left} className="absolute h-4 w-4 rounded-full ring-8 ring-emerald-500/10" style={{ left: `${left}%`, top: `${24 + index * 14}%`, backgroundColor: config.accent }} />)}
        <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 p-4 shadow-soft dark:bg-slate-950/80"><p className="text-sm font-bold">5 aktif lokasyon</p><p className="text-xs text-slate-500">Veri kalitesi ortalaması %94</p></div>
      </div>
    </section>
  )
}

function AssistantPanel() {
  return (
    <section className="glass-panel rounded-3xl p-5">
      <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">AI Sustainability Assistant</h3>
      <div className="mt-5 space-y-4">
        <div className="max-w-[82%] rounded-3xl rounded-tl-sm bg-slate-100 p-4 text-sm dark:bg-white/10">Scope 3 tedarikçi verisinde hangi satırlar riskli?</div>
        <div className="ml-auto max-w-[82%] rounded-3xl rounded-tr-sm bg-envai-green p-4 text-sm text-white">Eksik emisyon faktörü bulunan 12 tedarikçi ve 3 yüksek riskli kategori tespit edildi.</div>
        <div className="rounded-2xl border border-dashed border-black/10 p-4 text-sm text-slate-500 dark:border-white/10">Rapor önerisi, veri analizi ve ESG aksiyon planı üretimi için hazır.</div>
      </div>
    </section>
  )
}

function WorkflowCanvas({ config }) {
  return (
    <section className="glass-panel rounded-3xl p-5">
      <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">Workflow Builder</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-4">
        {['Veri Girişi', 'Doğrulama', 'Onay', 'Raporlama'].map((item, index) => (
          <div key={item} className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <FiCheckCircle className="mb-4" style={{ color: config.accent }} />
            <p className="font-semibold">{item}</p><p className="mt-2 text-xs text-slate-500">SLA: {index + 1} gün</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function ModulePage({ title, variant = 'standard' }) {
  const config = getModuleConfig(title)
  const Icon = config.icon
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title={config.title} description={config.description} eyebrow={config.group} action={<button className="inline-flex items-center gap-2 rounded-2xl bg-envai-navy px-5 py-3 text-sm font-bold text-white dark:bg-envai-green">Aksiyon Oluştur <FiArrowUpRight /></button>} />
      <FilterPanel />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {config.kpis.map((kpi) => <StatCard key={kpi.label} {...kpi} icon={Icon} accent={config.accent} />)}
      </div>
      {variant === 'assistant' ? <AssistantPanel /> : variant === 'workflow' ? <WorkflowCanvas config={config} /> : variant === 'map' ? <MapPanel config={config} /> : <ProcessBoard config={config} />}
      <div className="grid gap-6 xl:grid-cols-3">
        <ChartCard title={`${config.title} Trend Analizi`} className="xl:col-span-2" type={variant === 'portfolio' ? 'bar' : 'area'} />
        <ChartCard title="Dağılım" type="pie" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2"><DataTable title={`${config.title} Operasyon Kayıtları`} rows={config.table} /></div>
        <div className="space-y-6"><KPIWidget title="Uyum & Kalite" items={[{ label: 'Veri Tamlığı', value: '92%' }, { label: 'Kontrol Başarısı', value: '78%' }, { label: 'Onay SLA', value: '64%' }]} /><NotificationWidget /></div>
      </div>
    </motion.div>
  )
}
