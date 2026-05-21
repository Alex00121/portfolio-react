import { Heart } from 'lucide-react'
import { Movie } from '../types/movie'
import { posterUrl, releaseYear } from '../utils/tmdb'
import RatingBadge from './RatingBadge'

interface Props {
  movie: Movie
  isFavorite: boolean
  onToggleFavorite: (movie: Movie) => void
  onClick: (movie: Movie) => void
}

export default function MovieCard({ movie, isFavorite, onToggleFavorite, onClick }: Props) {
  const year = releaseYear(movie.release_date)
  const src = posterUrl(movie.poster_path)

  return (
    <div
      className="relative bg-[#16213e] rounded-xl overflow-hidden cursor-pointer group transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(233,69,96,0.25)] animate-fadeIn"
      onClick={() => onClick(movie)}
    >
      <div className="aspect-[2/3] w-full overflow-hidden">
        {src ? (
          <img
            src={src}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#0f3460] to-[#16213e] flex items-center justify-center">
            <span className="text-6xl">🎬</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#16213e] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggleFavorite(movie)
        }}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 backdrop-blur-sm transition-all duration-200 hover:bg-black/70"
        aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        <Heart
          size={16}
          className={isFavorite ? 'fill-[#e94560] text-[#e94560]' : 'text-white'}
        />
      </button>

      <div className="p-3">
        <h3 className="font-bold text-white text-sm leading-tight line-clamp-2 mb-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-xs">{year}</span>
          {movie.vote_average > 0 && <RatingBadge rating={movie.vote_average} />}
        </div>
      </div>
    </div>
  )
}
