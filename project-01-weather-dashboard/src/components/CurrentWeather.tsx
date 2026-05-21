import { useMemo } from 'react'
import { Wind, Droplets, Eye, Zap } from 'lucide-react'
import type { WeatherResponse, CityLocation } from '../types/weather'
import { getWeatherEmoji, getWeatherDescription, getWindDirection, getCurrentHourIndex } from '../utils/weather'

interface Props {
  data: WeatherResponse
  location: CityLocation
}

export function CurrentWeather({ data, location }: Props) {
  const { current_weather, hourly } = data

  const currentIdx = useMemo(() => {
    const hourIndex = getCurrentHourIndex(hourly.time)
    return Math.max(0, hourIndex - 1)
  }, [hourly.time])

  const humidity = hourly.relativehumidity_2m?.[currentIdx] ?? 0
  const uvIndex = hourly.uv_index?.[currentIdx] ?? 0
  const feelsLike = hourly.apparent_temperature?.[currentIdx] ?? current_weather.temperature

  const emoji = getWeatherEmoji(current_weather.weathercode, current_weather.is_day)
  const description = getWeatherDescription(current_weather.weathercode)
  const windDir = getWindDirection(current_weather.winddirection)

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-6 fade-in">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {location.name}
            {location.admin1 && <span className="text-white/60 font-normal text-lg">, {location.admin1}</span>}
          </h2>
          <p className="text-white/60 text-sm mt-0.5">{location.country}</p>
        </div>
        <span className="text-5xl" role="img" aria-label={description}>
          {emoji}
        </span>
      </div>

      <div className="flex items-end gap-3 mb-2">
        <span className="text-7xl font-extrabold text-white tracking-tight leading-none">
          {Math.round(current_weather.temperature)}°
        </span>
        <div className="mb-2">
          <p className="text-sky-400 font-semibold">{description}</p>
          <p className="text-white/50 text-sm">Feels like {Math.round(feelsLike)}°C</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        <StatCard icon={<Droplets size={16} className="text-sky-400" />} label="Humidity" value={`${humidity}%`} />
        <StatCard
          icon={<Wind size={16} className="text-sky-400" />}
          label="Wind"
          value={`${Math.round(current_weather.windspeed)} km/h ${windDir}`}
        />
        <StatCard icon={<Eye size={16} className="text-sky-400" />} label="UV Index" value={String(Math.round(uvIndex))} />
        <StatCard
          icon={<Zap size={16} className="text-sky-400" />}
          label="Code"
          value={`WMO ${current_weather.weathercode}`}
        />
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-white/50 text-xs">
        {icon}
        {label}
      </div>
      <p className="text-white font-semibold text-sm font-mono">{value}</p>
    </div>
  )
}
