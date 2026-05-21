import { useState, useCallback, useRef } from 'react'
import type { WeatherResponse, CityLocation } from '../types/weather'

interface WeatherState {
  data: WeatherResponse | null
  loading: boolean
  error: string | null
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null,
  })
  const abortRef = useRef<AbortController | null>(null)

  const fetchWeather = useCallback(async (location: CityLocation) => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    setState({ data: null, loading: true, error: null })
    try {
      const url = new URL('https://api.open-meteo.com/v1/forecast')
      url.searchParams.set('latitude', String(location.latitude))
      url.searchParams.set('longitude', String(location.longitude))
      url.searchParams.set('current_weather', 'true')
      url.searchParams.set('daily', 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum')
      url.searchParams.set('hourly', 'temperature_2m,apparent_temperature,relativehumidity_2m,uv_index')
      url.searchParams.set('timezone', 'auto')
      url.searchParams.set('forecast_days', '7')

      const res = await fetch(url.toString(), { signal: abortRef.current.signal })
      if (!res.ok) throw new Error('Failed to fetch weather data')
      const data: WeatherResponse = await res.json()
      setState({ data, loading: false, error: null })
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      setState({ data: null, loading: false, error: 'Unable to load weather data. Please try again.' })
    }
  }, [])

  return { ...state, fetchWeather }
}
