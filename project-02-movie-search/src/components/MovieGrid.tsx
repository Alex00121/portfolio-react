import { Movie } from '../types/movie'
import MovieCard from './MovieCard'

interface Props {
  movies: Movie[]
  favorites: Set<number>
  onToggleFavorite: (movie: Movie) => void
  onMovieClick: (movie: Movie) => void
  loading?: boolean
}

function SkeletonCard() {
  return (
    <div className="bg-[#16213e] rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-[#0f3460]" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-[#0f3460] rounded w-3/4" />
        <div className="h-3 bg-[#0f3460] rounded w-1/2" />
      </div>
    </div>
  )
}

export default function MovieGrid({ movies, favorites, onToggleFavorite, onMovieClick, loading = false }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favorites.has(movie.id)}
          onToggleFavorite={onToggleFavorite}
          onClick={onMovieClick}
        />
      ))}
    </div>
  )
}
