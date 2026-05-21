import { useState, useCallback, useMemo } from 'react'
import { Film, Heart, AlertCircle } from 'lucide-react'
import SearchBar from './components/SearchBar'
import MovieGrid from './components/MovieGrid'
import MovieModal from './components/MovieModal'
import FavoritesTab from './components/FavoritesTab'
import Pagination from './components/Pagination'
import { Movie, SearchResult } from './types/movie'

type Tab = 'search' | 'favorites'

const FAVORITES_KEY = 'cinesearch_favorites'
const API_KEY = import.meta.env.VITE_TMDB_KEY

function loadFavorites(): Movie[] {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]')
  } catch {
    return []
  }
}

function saveFavorites(favs: Movie[]) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs))
}

export default function App() {
  const [tab, setTab] = useState<Tab>('search')
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
  const [favorites, setFavorites] = useState<Movie[]>(loadFavorites)

  const favoriteIds = useMemo(() => new Set(favorites.map((f) => f.id)), [favorites])

  const handleCloseModal = useCallback(() => setSelectedMovie(null), [])

  const fetchMovies = useCallback(
    async (q: string, page: number) => {
      if (!API_KEY) {
        setError('Clé API TMDB manquante. Créez un fichier .env avec VITE_TMDB_KEY=votre_clé.')
        return
      }
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(q)}&page=${page}&language=fr-FR`
        )
        if (!res.ok) throw new Error(`Erreur API: ${res.status}`)
        const data: SearchResult = await res.json()
        setMovies(data.results)
        setTotalPages(data.total_pages)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur de connexion à l'API")
        setMovies([])
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const handleSearch = (q: string) => {
    setQuery(q)
    setCurrentPage(1)
    fetchMovies(q, 1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    fetchMovies(query, page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleToggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === movie.id)
      const updated = exists ? prev.filter((f) => f.id !== movie.id) : [...prev, movie]
      saveFavorites(updated)
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <header className="bg-[#16213e]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Film className="text-[#e94560]" size={24} />
            <span className="font-extrabold text-white text-xl tracking-tight">CinéSearch</span>
          </div>

          <div className="flex gap-1">
            <button
              onClick={() => setTab('search')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                tab === 'search'
                  ? 'bg-[#e94560] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Recherche
            </button>
            <button
              onClick={() => setTab('favorites')}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                tab === 'favorites'
                  ? 'bg-[#e94560] text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart size={14} className={tab === 'favorites' ? 'fill-white' : ''} />
              Favoris
              {favorites.length > 0 && (
                <span
                  className={`text-xs font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center ${
                    tab === 'favorites' ? 'bg-white text-[#e94560]' : 'bg-[#e94560] text-white'
                  }`}
                >
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {tab === 'search' && (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                Trouvez votre prochain film
              </h1>
              <p className="text-slate-400 mb-6">
                Recherchez parmi des millions de films grâce à la base de données TMDB
              </p>
              <SearchBar onSearch={handleSearch} loading={loading} />
            </div>

            {error && (
              <div className="flex items-start gap-3 bg-red-900/30 border border-red-500/30 rounded-xl p-4 mb-6 text-red-400">
                <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {!query && !loading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <span className="text-8xl">🎥</span>
                <h2 className="text-2xl font-bold text-white">Votre cinéma commence ici</h2>
                <p className="text-slate-400 max-w-sm">
                  Tapez le titre d'un film dans la barre de recherche pour découvrir des
                  informations, synopsis, notes et bien plus encore.
                </p>
              </div>
            )}

            {query && !loading && movies.length === 0 && !error && (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <span className="text-7xl">🔍</span>
                <h2 className="text-xl font-bold text-white">Aucun résultat trouvé</h2>
                <p className="text-slate-400 text-sm max-w-xs">
                  Essayez avec d'autres mots-clés, vérifiez l'orthographe ou essayez le titre
                  original en anglais.
                </p>
              </div>
            )}

            {(loading || movies.length > 0) && (
              <>
                {!loading && movies.length > 0 && (
                  <p className="text-slate-400 text-sm mb-4">
                    Page {currentPage} sur {Math.min(totalPages, 500)}
                  </p>
                )}
                <MovieGrid
                  movies={movies}
                  favorites={favoriteIds}
                  onToggleFavorite={handleToggleFavorite}
                  onMovieClick={setSelectedMovie}
                  loading={loading}
                />
                {!loading && totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}

        {tab === 'favorites' && (
          <>
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-6">
              Mes Favoris
            </h1>
            <FavoritesTab
              favorites={favorites}
              onRemove={handleToggleFavorite}
              onMovieClick={setSelectedMovie}
            />
          </>
        )}
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isFavorite={favoriteIds.has(selectedMovie.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
