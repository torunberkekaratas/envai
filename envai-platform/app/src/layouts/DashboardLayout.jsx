import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { useTheme } from '../hooks/useTheme'

export default function DashboardLayout() {
  useTheme()
  return (
    <div className="min-h-screen bg-envai-cloud text-slate-950 dark:bg-envai-deep dark:text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(22,163,74,.18),transparent_32rem),radial-gradient(circle_at_bottom_right,rgba(14,165,233,.12),transparent_28rem)]" />
      <div className="relative flex min-h-screen">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Topbar />
          <main className="p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
