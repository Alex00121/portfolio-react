import { useState, type FormEvent } from 'react'
import { Search, X } from 'lucide-react'

interface Props {
  onSearch: (username: string) => void
  loading: boolean
}

export default function SearchBar({ onSearch, loading }: Props) {
  const [value, setValue] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (value.trim()) onSearch(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none"
          />
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Rechercher un profil GitHub…"
            className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
              placeholder-gray-400 dark:placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
              transition-all duration-200 text-sm font-medium shadow-sm"
          />
          {value && (
            <button
              type="button"
              onClick={() => setValue('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600
                dark:hover:text-gray-300 transition-colors duration-200"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={!value.trim() || loading}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95
            text-white font-semibold text-sm shadow-sm transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
            whitespace-nowrap"
        >
          {loading ? 'Chargement…' : 'Rechercher'}
        </button>
      </div>
    </form>
  )
}
