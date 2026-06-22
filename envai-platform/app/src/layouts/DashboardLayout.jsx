import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import DashboardAssistant from '../components/DashboardAssistant'
import { useTheme } from '../hooks/useTheme'

export default function DashboardLayout() {
  useTheme()
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-950 dark:bg-[#06161d] dark:text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,rgba(22,163,74,.08),transparent_30rem)]" />
      <div className="relative flex min-h-screen">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Topbar />
          <main className="p-3 sm:p-4 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
      <DashboardAssistant />
    </div>
  )
}
