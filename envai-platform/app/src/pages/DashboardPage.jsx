import { motion } from 'framer-motion'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'
import {
  FiArrowUp, FiBarChart2, FiBell, FiCheckCircle, FiCloud, FiCpu, FiDatabase, FiFileText,
  FiFolder, FiShield, FiSliders, FiTruck, FiUpload, FiZap
} from 'react-icons/fi'
import { TbLeaf, TbRecycle, TbRobot } from 'react-icons/tb'

const spark = [
  { m: 'Haz', a: 15, b: 8, c: 30 }, { m: 'Tem', a: 22, b: 12, c: 38 }, { m: 'Ağu', a: 19, b: 12, c: 35 },
  { m: 'Eyl', a: 34, b: 18, c: 52 }, { m: 'Eki', a: 36, b: 28, c: 67 }, { m: 'Kas', a: 45, b: 31, c: 69 },
  { m: 'Ara', a: 34, b: 25, c: 64 }, { m: 'Oca', a: 42, b: 29, c: 74 }, { m: 'Şub', a: 32, b: 24, c: 62 },
  { m: 'Mar', a: 41, b: 30, c: 68 }, { m: 'Nis', a: 31, b: 24, c: 56 }, { m: 'May', a: 32, b: 24, c: 56 }
]
const scopeMix = [
  { name: 'Kapsam 1', value: 18.8, amount: '2.345,60 tCO₂e', color: '#14b8a6' },
  { name: 'Kapsam 2', value: 25.8, amount: '3.210,30 tCO₂e', color: '#f59e0b' },
  { name: 'Kapsam 3', value: 55.4, amount: '6.894,85 tCO₂e', color: '#7c3aed' }
]
const radar = [
  { subject: 'Çevresel', score: 82 }, { subject: 'Sosyal', score: 75 }, { subject: 'Yönetişim', score: 77 }
]
const sources = [
  ['Satın Alınan Mal & Hizmetler', 4250.3], ['Elektrik Tüketimi', 2310.5], ['Ulaşım & Dağıtım', 1540.2],
  ['Sabit Yatırım', 1250.1], ['İş Seyahatleri', 890.45], ['Atık', 620.15], ['Diğer', 1589.05]
]
const tasks = [
  ['CSRD Raporlama 2024', 85, 'Devam Ediyor'], ['CBAM Beyan (Q2)', 60, 'Devam Ediyor'], ['ESG Raporu 2024', 90, 'Devam Ediyor'], ['SBTi Doğrulama', 40, 'Beklemede'], ['ISO 14064 Doğrulama', 70, 'Devam Ediyor']
]
const iotCards = [
  ['Elektrik (kWh)', '47.650', '-3,2%', FiZap, '#16a34a'], ['Doğalgaz (m³)', '12.850', '+1,5%', FiCloud, '#f97316'], ['Su (m³)', '8.420', '-2,1%', FiDatabase, '#2563eb'],
  ['Sıcaklık (°C)', '22,4', 'Normal', FiShield, '#22c55e'], ['Nem (%)', '45,2', 'Normal', FiCloud, '#0ea5e9'], ['Hava Kalitesi (AQI)', '28', 'İyi', TbLeaf, '#16a34a']
]
const quick = [
  ['Veri Yükle', FiUpload], ['Rapor Oluştur', FiFileText], ['Gösterge Panelleri', FiBarChart2], ['İş Akışları', FiSliders], ['Dokümanlar', FiFolder], ['Ayarlar', FiCpu]
]

function Card({ children, className = '' }) {
  return <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`rounded-2xl border border-slate-200 bg-white shadow-[0_10px_34px_rgba(15,23,42,.05)] dark:border-white/10 dark:bg-white/[0.05] ${className}`}>{children}</motion.section>
}

function MiniLine({ color = '#16a34a', dataKey = 'a' }) {
  return <ResponsiveContainer width="100%" height={42}><LineChart data={spark.slice(-7)}><Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={false} /></LineChart></ResponsiveContainer>
}

function Kpi({ title, value, delta, icon: Icon, color, dataKey }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div><p className="text-xs font-bold text-slate-600 dark:text-slate-400">{title}</p><p className="mt-2 text-2xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white">{value}</p></div>
        <div className="grid h-14 w-14 place-items-center rounded-full" style={{ backgroundColor: `${color}18`, color }}><Icon size={24} /></div>
      </div>
      <p className={`mt-2 text-xs font-bold ${delta.startsWith('+') ? 'text-emerald-600' : 'text-emerald-600'}`}>▼ {delta}</p>
      <p className="text-xs text-slate-500">Geçen aya göre</p>
      <div className="mt-1"><MiniLine color={color} dataKey={dataKey} /></div>
    </Card>
  )
}

function CompliancePanel() {
  return <Card className="p-5"><h3 className="mb-4 text-base font-bold">Uyumluluk & Raporlama</h3><div className="space-y-4">{tasks.map(([name, progress, status]) => <div key={name} className="grid grid-cols-[1fr_110px_105px] items-center gap-3 text-sm"><div className="flex items-center gap-2 font-semibold"><FiCheckCircle className="text-emerald-600" />{name}</div><div><div className="h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-emerald-500" style={{ width: `${progress}%` }} /></div><p className="mt-1 text-xs text-slate-500">İlerleme {progress}%</p></div><span className={`rounded-full px-3 py-1 text-center text-xs font-bold ${status === 'Beklemede' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>{status}</span></div>)}</div><button className="mt-5 w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700">Tüm Görevleri Gör</button></Card>
}

function SourceBars() {
  return <Card className="p-5"><div className="mb-4 flex items-center justify-between"><h3 className="text-base font-bold">En Yüksek Emisyon Kaynakları (tCO₂e)</h3><button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold">Bu Yıl</button></div><div className="space-y-3">{sources.map(([name, value]) => <div key={name} className="grid grid-cols-[150px_1fr_80px] items-center gap-3 text-xs sm:text-sm"><span className="truncate text-slate-700 dark:text-slate-300">{name}</span><div className="h-3 rounded-full bg-slate-100"><div className="h-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-300" style={{ width: `${Math.min(100, value / 45)}%` }} /></div><span className="text-right font-semibold">{value.toLocaleString('tr-TR')}</span></div>)}</div><div className="mt-4 flex justify-between border-t border-slate-100 pt-4 text-lg font-bold"><span>Toplam</span><span>12.450,75 <small>tCO₂e</small></span></div></Card>
}

function IotPanel() {
  return <Card className="p-5"><div className="mb-4 flex items-center justify-between"><h3 className="text-base font-bold">Gerçek Zamanlı IoT Verileri</h3><button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold">Tüm Cihazlar</button></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{iotCards.map(([name, value, status, Icon, color]) => <div key={name} className="rounded-xl border border-slate-200 p-4"><div className="flex items-center justify-between text-xs text-slate-500"><span>{name}</span><Icon style={{ color }} /></div><p className="mt-3 text-xl font-bold">{value}</p><div className="mt-2 flex items-center justify-between"><span className={`text-xs font-bold ${status.startsWith('+') ? 'text-red-500' : 'text-emerald-600'}`}>{status}</span><div className="h-8 w-20"><MiniLine color={color} dataKey="a" /></div></div></div>)}</div></Card>
}

function AiPanel() {
  return <Card className="p-5"><h3 className="mb-4 text-base font-bold">Yapay Zeka Asistanı</h3><div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/5"><div className="flex gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-100 text-emerald-700"><TbRobot /></div><p className="text-sm text-slate-700 dark:text-slate-200">Merhaba! Size nasıl yardımcı olabilirim?</p></div><div className="mt-4 flex flex-wrap gap-2">{['Emisyon Analizi Yap', 'Rapor Önerisi Ver', 'Veri Anomali Kontrolü', 'Soru Sor'].map((item) => <button key={item} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold">{item}</button>)}</div><div className="mt-3 flex gap-2"><input className="soft-input" placeholder="Mesajınızı yazın..." /><button className="rounded-xl bg-emerald-600 p-3 text-white"><FiArrowUp /></button></div></div></Card>
}

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <Kpi title="Toplam Emisyon (tCO₂e)" value="12.450,75" delta="-8,2%" icon={FiCloud} color="#16a34a" dataKey="a" />
        <Kpi title="Kapsam 1 (tCO₂e)" value="2.345,60" delta="-5,1%" icon={FiBarChart2} color="#14b8a6" dataKey="b" />
        <Kpi title="Kapsam 2 (tCO₂e)" value="3.210,30" delta="-6,3%" icon={FiZap} color="#f59e0b" dataKey="c" />
        <Kpi title="Kapsam 3 (tCO₂e)" value="6.894,85" delta="-10,4%" icon={FiTruck} color="#7c3aed" dataKey="c" />
        <Kpi title="ESG Skoru" value="78 / 100" delta="+4,5%" icon={TbLeaf} color="#22c55e" dataKey="a" />
        <Kpi title="Uyumluluk Skoru" value="92%" delta="+6%" icon={FiShield} color="#2563eb" dataKey="b" />
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <Card className="p-5 xl:col-span-3"><h3 className="mb-4 text-base font-bold">Emisyon Dağılımı (Kapsam)</h3><div className="grid items-center gap-4 sm:grid-cols-[1fr_180px] xl:grid-cols-1"><div className="relative h-56"><ResponsiveContainer><PieChart><Pie data={scopeMix} innerRadius={58} outerRadius={92} dataKey="value" paddingAngle={2}>{scopeMix.map((s) => <Cell key={s.name} fill={s.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><div className="absolute inset-0 grid place-items-center text-center"><p className="text-2xl font-bold">12.450,75</p><p className="text-xs font-semibold">tCO₂e<br/>Toplam</p></div></div><div className="space-y-4">{scopeMix.map((item) => <div key={item.name} className="flex items-center justify-between gap-3 text-sm"><span className="flex items-center gap-2"><i className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />{item.name}<br/><small className="ml-5 text-slate-500">{item.amount}</small></span><b>{item.value}%</b></div>)}</div></div></Card>
        <Card className="p-5 xl:col-span-5"><div className="mb-4 flex items-center justify-between"><h3 className="text-base font-bold">Aylık Emisyon Trendi (tCO₂e)</h3><button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold">Son 12 Ay</button></div><div className="h-64"><ResponsiveContainer><LineChart data={spark}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" /><XAxis dataKey="m" /><YAxis /><Tooltip /><Line dataKey="a" name="Kapsam 1" stroke="#14b8a6" strokeWidth={2} /><Line dataKey="b" name="Kapsam 2" stroke="#f59e0b" strokeWidth={2} /><Line dataKey="c" name="Kapsam 3" stroke="#7c3aed" strokeWidth={2} /></LineChart></ResponsiveContainer></div></Card>
        <Card className="p-5 xl:col-span-4"><div className="mb-4 flex items-center justify-between"><h3 className="text-base font-bold">ESG Performansı</h3><button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold">2024</button></div><div className="h-64"><ResponsiveContainer><RadarChart data={radar}><PolarGrid /><PolarAngleAxis dataKey="subject" /><Radar dataKey="score" stroke="#0f766e" fill="#14b8a6" fillOpacity={0.18} /></RadarChart></ResponsiveContainer></div><p className="-mt-10 text-center text-3xl font-bold">78</p><p className="text-center text-xs text-slate-500">ESG Skoru</p></Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-3"><CompliancePanel /></div>
        <div className="xl:col-span-4"><SourceBars /></div>
        <div className="xl:col-span-5"><IotPanel /></div>
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <Card className="p-5 xl:col-span-3"><h3 className="mb-4 text-base font-bold">Yaklaşan Görevler</h3><div className="space-y-3">{['CSRD Veri Toplama', 'CBAM Beyan Teslimi', 'ESG Rapor Onayı', 'SBTi Hedef Güncelleme'].map((item, i) => <div key={item} className="flex justify-between text-sm"><span className="flex items-center gap-2"><FiFileText className="text-emerald-600" />{item}</span><b className="text-slate-500">{[15, 31, 10, 30][i]} May 2024</b></div>)}</div></Card>
        <Card className="p-5 xl:col-span-3"><h3 className="mb-4 text-base font-bold">Bildirimler</h3><div className="space-y-3">{['Elektrik tüketiminiz geçen aya göre %8 arttı.', 'Yeni IoT cihazı bağlandı: İstanbul Fabrika 2', 'CSRD raporunuz %85 tamamlandı.'].map((item, i) => <div key={item} className="flex gap-3 text-sm"><FiBell className={i === 1 ? 'text-red-500' : 'text-amber-500'} /><span>{item}<br/><small className="text-slate-500">{i + 1} saat önce</small></span></div>)}</div></Card>
        <div className="xl:col-span-4"><AiPanel /></div>
        <Card className="p-5 xl:col-span-2"><h3 className="mb-4 text-base font-bold">Hızlı Erişim</h3><div className="grid grid-cols-2 gap-3">{quick.map(([name, Icon]) => <button key={name} className="rounded-xl border border-slate-200 p-4 text-center text-xs font-semibold hover:bg-emerald-50"><Icon className="mx-auto mb-2 text-2xl text-emerald-600" />{name}</button>)}</div></Card>
      </div>
    </div>
  )
}
