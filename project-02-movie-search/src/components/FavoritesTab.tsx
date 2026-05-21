import { Heart } from 'lucide-react'
import { Movie } from '../types/movie'

interface Props {
  favorites: Movie[]
  onRemove: (movie: Movie) => void
  onMovieClick: (movie: Movie) => void
}

export default function FavoritesTab({ favorites, onRemove, onMovieClick }: Props) {
  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <span className="text-6xl">💔</span>
        <h3 className="text-xl font-bold text-white">Aucun favori pour l'instant</h3>
        <p className="text-slate-400 text-sm max-w-xs">
          Cliquez sur l'icône ♥ d'un film pour l'ajouter à vos favoris.
        </p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-slate-400 text-sm mb-6">
        {favorites.length} film{favorites.length > 1 ? 's' : ''} sauvegardé{favorites.length > 1 ? 's' : ''}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map((movie) => {
          const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : null

          return (
            <div
              key={movie.id}
              className="relative bg-[#16213e] rounded-xl overflow-hidden group cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-lg animate-fadeIn"
              onClick={() => onMovieClick(movie)}
            >
              <div className="aspect-[2/3] overflow-hidden">
                {posterUrl ? (
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0f3460] to-[#16213e] flex items-center justify-center">
                    <span className="text-5xl">🎬</span>
                  </div>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRemove(movie)
                }}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-[#e94560] text-white hover:bg-[#c73652] transition-all duration-200"
                aria-label="Retirer des favoris"
              >
                <Heart size={14} className="fill-white" />
              </button>

              <div className="p-3">
                <h3 className="font-bold text-white text-sm leading-tight line-clamp-2 mb-1">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">{year}</span>
                  {movie.vote_average > 0 && (
                    <span className="text-yellow-400 text-xs font-semibold">
                      ★ {movie.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
