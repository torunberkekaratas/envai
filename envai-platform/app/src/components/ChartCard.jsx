import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { kpiTrend, mixData } from '../data/platformData.jsx'

export default function ChartCard({ title, type = 'area', data = kpiTrend, className = '' }) {
  return (
    <section className={`glass-panel rounded-3xl p-5 ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Son 6 aylık operasyonel görünüm</p>
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'pie' ? (
            <PieChart>
              <Pie data={mixData} innerRadius={64} outerRadius={96} dataKey="value" paddingAngle={4}>
                {mixData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : type === 'bar' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.25)" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="energy" fill="#16A34A" radius={[8, 8, 0, 0]} />
              <Bar dataKey="carbon" fill="#0EA5E9" radius={[8, 8, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="envaiArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16A34A" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.25)" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="carbon" stroke="#16A34A" fill="url(#envaiArea)" strokeWidth={3} />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </section>
  )
}
