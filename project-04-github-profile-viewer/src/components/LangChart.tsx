import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { GitHubRepo } from '../types'
import { getLangColor } from '../data/languageColors'

interface Props {
  repos: GitHubRepo[]
}

interface ChartEntry {
  name: string
  value: number
  color: string
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: ChartEntry }> }) {
  if (!active || !payload?.length) return null
  const entry = payload[0].payload
  const total = payload[0].payload.value
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
      rounded-xl px-3 py-2 shadow-lg text-xs">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
        <span className="font-semibold text-gray-900 dark:text-white">{entry.name}</span>
      </div>
      <p className="mt-0.5 text-gray-500 dark:text-gray-400">{total} dépôts</p>
    </div>
  )
}

export default function LangChart({ repos }: Props) {
  const counts: Record<string, number> = {}
  for (const r of repos) {
    if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1
  }

  const data: ChartEntry[] = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value, color: getLangColor(name) }))

  if (data.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 animate-fadeIn">
      <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">
        Langages utilisés
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value: string) => (
              <span className="text-xs text-gray-600 dark:text-gray-400">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
