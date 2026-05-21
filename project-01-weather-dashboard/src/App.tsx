import { useState, useEffect, useCallback } from 'react'
import { CloudSun } from 'lucide-react'
import { SearchBar } from './components/SearchBar'
import { CurrentWeather } from './components/CurrentWeather'
import { WeekForecast } from './components/WeekForecast'
import { HourlyChart } from './components/HourlyChart'
import { LoadingSkeleton } from './components/LoadingSkeleton'
import { ErrorCard } from './components/ErrorCard'
import { DarkModeToggle } from './components/DarkModeToggle'
import { useWeather } from './hooks/useWeather'
import type { CityLocation } from './types/weather'

const STORAGE_KEY = 'weather-last-location'

const DEFAULT_LOCATION: CityLocation = {
  name: 'Paris',
  latitude: 48.8566,
  longitude: 2.3522,
  country: 'France',
}

export default function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [location, setLocation] = useState<CityLocation | null>(null)
  const { data, loading, error, fetchWeather } = useWeather()

  const handleLocationSelect = useCallback(
    (loc: CityLocation) => {
      setLocation(loc)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(loc))
      fetchWeather(loc)
    },
    [fetchWeather],
  )

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const loc: CityLocation = JSON.parse(saved)
        setLocation(loc)
        fetchWeather(loc)
        return
      } catch {
        // malformed cache entry — proceed to geolocation
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc: CityLocation = {
            name: 'Your Location',
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
            country: '',
          }
          setLocation(loc)
          fetchWeather(loc)
        },
        () => {
          handleLocationSelect(DEFAULT_LOCATION)
        },
      )
    } else {
      handleLocationSelect(DEFAULT_LOCATION)
    }
  }, [fetchWeather, handleLocationSelect])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const bgClass = darkMode
    ? 'min-h-screen bg-[#0F172A] text-white'
    : 'min-h-screen bg-[#F0F9FF] text-slate-900'

  const overlayClass = darkMode
    ? 'fixed inset-0 bg-gradient-to-br from-sky-900/20 via-transparent to-indigo-900/20 pointer-events-none'
    : 'fixed inset-0 bg-gradient-to-br from-sky-200/30 via-transparent to-blue-100/20 pointer-events-none'

  return (
    <div className={bgClass}>
      <div className={overlayClass} />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <CloudSun size={28} className="text-sky-400" />
            <h1 className="text-xl font-extrabold tracking-tight text-white">
              Weather<span className="text-sky-400">Dashboard</span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <SearchBar onSelect={handleLocationSelect} />
            <DarkModeToggle darkMode={darkMode} onToggle={() => setDarkMode((d) => !d)} />
          </div>
        </header>

        {/* Content */}
        <main className="space-y-4">
          {loading && <LoadingSkeleton />}
          {error && !loading && <ErrorCard message={error} />}
          {data && location && !loading && !error && (
            <>
              <CurrentWeather data={data} location={location} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <HourlyChart data={data} />
                <WeekForecast data={data} />
              </div>
            </>
          )}
          {!data && !loading && !error && (
            <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-12 flex flex-col items-center gap-4 text-center">
              <CloudSun size={48} className="text-sky-400/50" />
              <p className="text-white/60 text-lg">Search for a city to see the weather</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
