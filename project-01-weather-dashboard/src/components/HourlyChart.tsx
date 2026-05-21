import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { WeatherResponse } from '../types/weather'
import { formatHour } from '../utils/weather'

interface Props {
  data: WeatherResponse
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ value: number; name: string }>
  label?: string
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="backdrop-blur-md bg-slate-900/80 border border-white/20 rounded-xl px-3 py-2 text-xs">
      <p className="text-white/60 mb-1">{label}</p>
      <p className="text-sky-400 font-bold">{payload[0].value}°C</p>
    </div>
  )
}

export function HourlyChart({ data }: Props) {
  const now = new Date()
  const hourlyData = data.hourly.time
    .map((t, i) => ({
      time: formatHour(t),
      temp: Math.round(data.hourly.temperature_2m[i]),
      feelsLike: Math.round(data.hourly.apparent_temperature[i]),
      rawTime: new Date(t),
    }))
    .filter((d) => d.rawTime >= now)
    .slice(0, 24)

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-6 fade-in">
      <h3 className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-4">
        24-Hour Temperature
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={hourlyData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="time"
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval={3}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}°`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#38BDF8"
            strokeWidth={2}
            fill="url(#tempGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#38BDF8', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
