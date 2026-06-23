import { useState } from 'react'
import { FiX } from 'react-icons/fi'

const statusOptions = ['Aktif', 'İncelemede', 'Riskli', 'Tamamlandı']
const ownerOptions = ['Sürdürülebilirlik', 'Finans', 'Operasyon', 'Tedarik', 'Veri Ekibi']

const statusClass = {
  Aktif: 'bg-emerald-100 text-emerald-700',
  İncelemede: 'bg-blue-100 text-blue-700',
  Riskli: 'bg-amber-100 text-amber-700',
  Tamamlandı: 'bg-slate-100 text-slate-700'
}

export function RecordDetailModal({ record, onClose }) {
  const fields = [
    ['Kayıt No', record.id],
    ['Başlık', record.name],
    ['Sorumlu', record.owner],
    ['Tarih', record.date]
  ]
  return (
    <ModalShell title="Kayıt Detayı" onClose={onClose}>
      <div className="space-y-3">
        {fields.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between border-b border-slate-100 pb-2 text-sm dark:border-white/10">
            <span className="text-slate-500">{label}</span>
            <span className="font-semibold text-slate-900 dark:text-white">{value}</span>
          </div>
        ))}
        <div className="flex items-center justify-between pt-1 text-sm">
          <span className="text-slate-500">Durum</span>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[record.status] || 'bg-slate-100 text-slate-700'}`}>{record.status}</span>
        </div>
      </div>
      <button onClick={onClose} className="mt-5 w-full rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-white">Kapat</button>
    </ModalShell>
  )
}

export function NewRecordModal({ accent = '#16a34a', onClose, onSave }) {
  const [name, setName] = useState('')
  const [owner, setOwner] = useState(ownerOptions[0])
  const [status, setStatus] = useState(statusOptions[0])

  function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim()) return
    onSave({ name: name.trim(), owner, status, date: new Date().toISOString().slice(0, 10) })
    onClose()
  }

  return (
    <ModalShell title="Yeni Kayıt" onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-bold text-slate-500">Kayıt Başlığı</label>
          <input autoFocus value={name} onChange={(event) => setName(event.target.value)} placeholder="Örn. Tedarikçi veri doğrulama" className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-white/5" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold text-slate-500">Sorumlu Ekip</label>
          <select value={owner} onChange={(event) => setOwner(event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-white/10 dark:bg-white/5">
            {ownerOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-bold text-slate-500">Durum</label>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm dark:border-white/10 dark:bg-white/5">
            {statusOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
        <button type="submit" disabled={!name.trim()} className="w-full rounded-xl py-3 text-sm font-bold text-white disabled:opacity-50" style={{ backgroundColor: accent }}>Kaydet</button>
      </form>
    </ModalShell>
  )
}

function ModalShell({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4" onClick={onClose}>
      <div onClick={(event) => event.stopPropagation()} className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl dark:bg-[#0a1f29]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-950 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><FiX size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}
