import { FiCheckCircle, FiX } from 'react-icons/fi'
import { useUIStore } from '../store/useUIStore'

export default function ToastContainer() {
  const toasts = useUIStore((state) => state.toasts)
  const removeToast = useUIStore((state) => state.removeToast)

  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div key={toast.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-xl dark:border-white/10 dark:bg-[#0a1f29] dark:text-slate-100">
          <FiCheckCircle className="text-emerald-600" />
          <span>{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="ml-2 text-slate-400 hover:text-slate-600"><FiX size={14} /></button>
        </div>
      ))}
    </div>
  )
}
