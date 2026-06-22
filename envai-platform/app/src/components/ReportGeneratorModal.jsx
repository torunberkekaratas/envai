import { useState } from 'react'
import { FiDownload, FiX } from 'react-icons/fi'
import { emissionSummary } from '../data/platformData.jsx'

const reportTypes = ['ESG Raporu', 'CSRD Raporu', 'CBAM Raporu', 'Karbon Ayak İzi Raporu']
const periods = ['Bu Ay', 'Bu Çeyrek', 'Bu Yıl', 'Son 12 Ay']

function buildCsv(reportType, period) {
  const today = new Date().toLocaleDateString('tr-TR')
  const rows = [
    ['Rapor Türü', reportType],
    ['Dönem', period],
    ['Oluşturulma Tarihi', today],
    [],
    ['Metrik', 'Değer', 'Değişim'],
    ['Toplam Emisyon', emissionSummary.totalEmission, emissionSummary.totalDelta],
    ...emissionSummary.scopes.map((scope) => [scope.name, scope.value, scope.delta]),
    ['ESG Skoru', emissionSummary.esgScore, ''],
    ['Uyumluluk Skoru', emissionSummary.complianceScore, ''],
    [],
    ['En Yüksek Emisyon Kaynakları', 'tCO₂e'],
    ...emissionSummary.topSources.map(([name, value]) => [name, value])
  ]
  return rows.map((row) => row.join(';')).join('\n')
}

export default function ReportGeneratorModal({ onClose, onGenerated }) {
  const [reportType, setReportType] = useState(reportTypes[0])
  const [period, setPeriod] = useState(periods[0])
  const [isGenerating, setIsGenerating] = useState(false)

  function handleGenerate() {
    setIsGenerating(true)
    setTimeout(() => {
      const csv = buildCsv(reportType, period)
      const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${reportType.replace(/\s+/g, '-')}-${period.replace(/\s+/g, '-')}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      setIsGenerating(false)
      onGenerated(`${reportType} (${period}) oluşturuldu ve indirildi.`)
      onClose()
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4" onClick={onClose}>
      <div onClick={(event) => event.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl dark:bg-[#0a1f29]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-950 dark:text-white">Rapor Oluştur</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><FiX size={18} /></button>
        </div>
        <label className="mb-1 block text-xs font-bold text-slate-500">Rapor Türü</label>
        <select value={reportType} onChange={(event) => setReportType(event.target.value)} className="mb-4 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-white/10 dark:bg-white/5">
          {reportTypes.map((type) => <option key={type} value={type}>{type}</option>)}
        </select>
        <label className="mb-1 block text-xs font-bold text-slate-500">Dönem</label>
        <select value={period} onChange={(event) => setPeriod(event.target.value)} className="mb-5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-white/10 dark:bg-white/5">
          {periods.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <button onClick={handleGenerate} disabled={isGenerating} className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white disabled:opacity-60">
          <FiDownload size={16} /> {isGenerating ? 'Oluşturuluyor...' : 'Oluştur ve İndir'}
        </button>
      </div>
    </div>
  )
}
