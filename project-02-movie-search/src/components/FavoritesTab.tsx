import { Movie } from '../types/movie'
import MovieCard from './MovieCard'

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
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={true}
            onToggleFavorite={onRemove}
            onClick={onMovieClick}
          />
        ))}
      </div>
    </div>
  )
}
