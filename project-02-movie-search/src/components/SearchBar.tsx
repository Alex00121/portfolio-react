import { Search, X } from 'lucide-react'
import { useState, KeyboardEvent } from 'react'

interface Props {
  onSearch: (query: string) => void
  loading: boolean
}

export default function SearchBar({ onSearch, loading }: Props) {
  const [value, setValue] = useState('')

  const handleSearch = () => {
    const q = value.trim()
    if (q) onSearch(q)
  }

  const handleClear = () => {
    setValue('')
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="flex gap-3 w-full max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Rechercher un film…"
          className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#16213e] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#e94560] focus:ring-1 focus:ring-[#e94560] transition-all duration-200"
        />
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <button
        onClick={handleSearch}
        disabled={loading || !value.trim()}
        className="px-6 py-3 rounded-xl bg-[#e94560] text-white font-semibold hover:bg-[#c73652] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 whitespace-nowrap"
      >
        {loading ? 'Recherche…' : 'Rechercher'}
      </button>
    </div>
  )
}
