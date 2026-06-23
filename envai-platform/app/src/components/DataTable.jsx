import { useState } from 'react'
import { FiChevronDown, FiDownload, FiEye, FiTrash2 } from 'react-icons/fi'

const statusClass = {
  Aktif: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  İncelemede: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  Riskli: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  Tamamlandı: 'bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200'
}

function exportRowsToCsv(rows, title) {
  const header = ['ID', 'Kayıt', 'Sahip', 'Durum', 'Tarih']
  const lines = rows.map((row) => [row.id, row.name, row.owner, row.status, row.date].join(';'))
  const csv = [header.join(';'), ...lines].join('\n')
  const blob = new Blob([`﻿${csv}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${title.replace(/\s+/g, '-')}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export default function DataTable({ rows = [], title = 'Operasyon Kayıtları', onRowClick, onDelete, onExport }) {
  const [sortKey, setSortKey] = useState(null)
  const [sortAsc, setSortAsc] = useState(true)

  function toggleSort(key) {
    if (sortKey === key) {
      setSortAsc((prev) => !prev)
    } else {
      setSortKey(key)
      setSortAsc(true)
    }
  }

  const sortedRows = sortKey
    ? [...rows].sort((a, b) => {
        const av = String(a[sortKey] ?? '')
        const bv = String(b[sortKey] ?? '')
        return sortAsc ? av.localeCompare(bv, 'tr') : bv.localeCompare(av, 'tr')
      })
    : rows

  function handleExport() {
    exportRowsToCsv(sortedRows, title)
    onExport?.()
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Kayıt' },
    { key: 'owner', label: 'Sahip', hideOnMobile: true },
    { key: 'status', label: 'Durum' },
    { key: 'date', label: 'Tarih', hideOnMobile: true }
  ]

  return (
    <section className="glass-panel overflow-hidden rounded-3xl">
      <div className="flex items-center justify-between gap-3 border-b border-black/5 p-5 dark:border-white/10">
        <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h3>
        <button onClick={handleExport} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white">
          <FiDownload size={14} /> <span className="hidden sm:inline">Dışa Aktar</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-white/[0.03] dark:text-slate-400">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className={`${col.hideOnMobile ? 'hidden sm:table-cell' : ''} px-3 py-3 sm:px-5 sm:py-4`}>
                  <button onClick={() => toggleSort(col.key)} className="inline-flex items-center gap-1 font-bold uppercase tracking-wide hover:text-slate-700 dark:hover:text-slate-200">
                    {col.label}
                    {sortKey === col.key && <FiChevronDown size={12} className={sortAsc ? '' : 'rotate-180'} />}
                  </button>
                </th>
              ))}
              <th className="px-3 py-3 text-right sm:px-5 sm:py-4">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/10">
            {sortedRows.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-400">Kayıt bulunamadı.</td></tr>
            )}
            {sortedRows.map((row) => (
              <tr key={row.id} className="text-slate-700 transition hover:bg-slate-50/70 dark:text-slate-200 dark:hover:bg-white/[0.03]">
                <td className="cursor-pointer px-3 py-3 font-semibold sm:px-5 sm:py-4" onClick={() => onRowClick?.(row)}>{row.id}</td>
                <td className="cursor-pointer px-3 py-3 sm:px-5 sm:py-4" onClick={() => onRowClick?.(row)}>{row.name}</td>
                <td className="hidden px-3 py-3 sm:table-cell sm:px-5 sm:py-4">{row.owner}</td>
                <td className="px-3 py-3 sm:px-5 sm:py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[row.status] || 'bg-slate-100 text-slate-700'}`}>{row.status}</span></td>
                <td className="hidden px-3 py-3 text-slate-500 sm:table-cell sm:px-5 sm:py-4">{row.date}</td>
                <td className="px-3 py-3 sm:px-5 sm:py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => onRowClick?.(row)} title="Görüntüle" className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-emerald-600 dark:hover:bg-white/10"><FiEye size={15} /></button>
                    {onDelete && (
                      <button onClick={() => onDelete(row)} title="Sil" className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-white/10"><FiTrash2 size={15} /></button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
