import { FiDollarSign, FiLayers, FiTrendingDown, FiUsers } from 'react-icons/fi'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import ModuleCard from '../components/ModuleCard'
import NotificationWidget from '../components/NotificationWidget'
import KPIWidget from '../components/KPIWidget'
import { modules } from '../data/platformData.jsx'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="ENVAI Command Center" description="Karbon, ESG, CSRD, CBAM, operasyonel kaynaklar, abonelikler ve kullanıcı aktivitesi için gerçek zamanlı kurumsal görünüm." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Toplam Emisyon" value="12.450 tCO₂e" delta="-8.2%" icon={FiTrendingDown} />
        <StatCard label="ESG Skoru" value="78/100" delta="+4.3%" icon={FiLayers} />
        <StatCard label="Aktif Kullanıcı" value="246" delta="+12.1%" icon={FiUsers} />
        <StatCard label="MRR Özeti" value="$124K" delta="+6.7%" icon={FiDollarSign} />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <ChartCard title="Karbon ve Enerji Özeti" className="xl:col-span-2" />
        <ChartCard title="Scope Dağılımı" type="pie" />
      </div>
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">Aktif Modüller</h2><span className="text-sm text-slate-500">31 modül</span></div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{modules.slice(6, 15).map((module) => <ModuleCard key={module.path} module={module} />)}</div>
        </div>
        <div className="space-y-6"><NotificationWidget /><KPIWidget title="Abonelik Özeti" items={[{ label: 'Enterprise Kullanım', value: '84%' }, { label: 'Lisans Doluluk', value: '67%' }, { label: 'Rapor Kotası', value: '52%' }]} /></div>
      </div>
    </div>
  )
}
