import type { WeatherResponse } from '../types/weather'
import { getWeatherEmoji, getWeatherDescription, formatDay } from '../utils/weather'

interface Props {
  data: WeatherResponse
}

export function WeekForecast({ data }: Props) {
  const { daily } = data

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-6 fade-in">
      <h3 className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-4">7-Day Forecast</h3>
      <div className="grid grid-cols-7 gap-2">
        {daily.time.map((dateStr, i) => (
          <div
            key={dateStr}
            className="flex flex-col items-center gap-2 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-all duration-200 hover:-translate-y-1"
          >
            <span className="text-white/60 text-xs font-medium">{formatDay(dateStr)}</span>
            <span role="img" aria-label={getWeatherDescription(daily.weathercode[i])} className="text-2xl">
              {getWeatherEmoji(daily.weathercode[i])}
            </span>
            <span className="text-white font-bold text-sm">{Math.round(daily.temperature_2m_max[i])}°</span>
            <span className="text-white/40 text-xs">{Math.round(daily.temperature_2m_min[i])}°</span>
          </div>
        ))}
      </div>
    </div>
  )
}
