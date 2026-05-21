import { useState, useRef, useEffect } from 'react'
import { Search, MapPin, Loader2 } from 'lucide-react'
import { useGeocoding } from '../hooks/useGeocoding'
import type { GeocodingResult, CityLocation } from '../types/weather'

interface Props {
  onSelect: (location: CityLocation) => void
}

export function SearchBar({ onSelect }: Props) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const { suggestions, loading, search, clear } = useGeocoding()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    search(query)
    setOpen(query.length > 1)
  }, [query, search])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(result: GeocodingResult) {
    setQuery(`${result.name}, ${result.country}`)
    setOpen(false)
    clear()
    onSelect({
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country: result.country,
      admin1: result.admin1,
    })
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-4 py-3">
        {loading ? (
          <Loader2 size={18} className="text-sky-400 animate-spin shrink-0" />
        ) : (
          <Search size={18} className="text-sky-400 shrink-0" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search city..."
          className="bg-transparent text-white placeholder-white/50 outline-none w-full text-sm"
        />
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 top-full mt-2 w-full backdrop-blur-md bg-slate-900/90 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => handleSelect(s)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-white hover:bg-white/10 transition-all duration-200"
              >
                <MapPin size={14} className="text-sky-400 shrink-0" />
                <span>
                  <span className="font-medium">{s.name}</span>
                  {s.admin1 && <span className="text-white/50">, {s.admin1}</span>}
                  <span className="text-white/50"> — {s.country}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
