import { useState, useCallback, useRef, useEffect } from 'react'
import type { GeocodingResult } from '../types/weather'

export function useGeocoding() {
  const [suggestions, setSuggestions] = useState<GeocodingResult[]>([])
  const [loading, setLoading] = useState(false)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      abortRef.current?.abort()
    }
  }, [])

  const search = useCallback((query: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    if (!query.trim() || query.length < 2) {
      setSuggestions([])
      setLoading(false)
      return
    }
    debounceTimer.current = setTimeout(async () => {
      abortRef.current?.abort()
      abortRef.current = new AbortController()
      setLoading(true)
      try {
        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
        const res = await fetch(url, { signal: abortRef.current.signal })
        const data = await res.json()
        setSuggestions(data.results ?? [])
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 300)
  }, [])

  const clear = useCallback(() => {
    setSuggestions([])
    setLoading(false)
  }, [])

  return { suggestions, loading, search, clear }
}
