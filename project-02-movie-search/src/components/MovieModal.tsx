import { useEffect, useState } from 'react'
import { X, Heart, Clock, Users } from 'lucide-react'
import { Movie, MovieDetail } from '../types/movie'
import { posterUrl, releaseYear } from '../utils/tmdb'
import RatingBadge from './RatingBadge'

interface Props {
  movie: Movie
  isFavorite: boolean
  onToggleFavorite: (movie: Movie) => void
  onClose: () => void
}

export default function MovieModal({ movie, isFavorite, onToggleFavorite, onClose }: Props) {
  const [detail, setDetail] = useState<MovieDetail | null>(null)
  const [loading, setLoading] = useState(true)

  const apiKey = import.meta.env.VITE_TMDB_KEY

  useEffect(() => {
    const fetchDetail = async () => {
      if (!apiKey) {
        setLoading(false)
        return
      }
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
        )
        const data: MovieDetail = await res.json()
        setDetail(data)
      } catch {
        // TMDB detail may fail for regional/unlisted titles; base movie data has enough for the modal
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [movie.id, apiKey])

  const displayed = detail ?? movie
  const year = releaseYear(displayed.release_date)
  const src = posterUrl(displayed.poster_path)

  const favoriteClass = isFavorite
    ? 'bg-[#e94560] text-white hover:bg-[#c73652]'
    : 'border border-[#e94560] text-[#e94560] hover:bg-[#e94560] hover:text-white'

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#16213e] rounded-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-56 flex-shrink-0">
            {src ? (
              <img
                src={src}
                alt={displayed.title}
                className="w-full h-64 sm:h-full object-cover"
              />
            ) : (
              <div className="w-full h-64 sm:h-full bg-gradient-to-br from-[#0f3460] to-[#1a1a2e] flex items-center justify-center">
                <span className="text-7xl">🎬</span>
              </div>
            )}
          </div>

          <div className="flex-1 p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <h2 className="font-bold text-white text-xl leading-tight">{displayed.title}</h2>
              <button
                onClick={onClose}
                className="flex-shrink-0 p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-200"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mb-4">
              <span className="text-slate-400 text-sm">{year}</span>
              {displayed.vote_average > 0 && (
                <RatingBadge rating={displayed.vote_average} variant="text" />
              )}
              {displayed.vote_count > 0 && (
                <span className="flex items-center gap-1 text-slate-400 text-sm">
                  <Users size={14} />
                  {displayed.vote_count.toLocaleString()}
                </span>
              )}
              {detail?.runtime && detail.runtime > 0 && (
                <span className="flex items-center gap-1 text-slate-400 text-sm">
                  <Clock size={14} />
                  {Math.floor(detail.runtime / 60)}h {detail.runtime % 60}m
                </span>
              )}
            </div>

            {loading && (
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-[#0f3460] rounded animate-pulse w-full" />
                <div className="h-3 bg-[#0f3460] rounded animate-pulse w-5/6" />
                <div className="h-3 bg-[#0f3460] rounded animate-pulse w-4/6" />
              </div>
            )}

            {detail?.genres && detail.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {detail.genres.map((g) => (
                  <span
                    key={g.id}
                    className="text-xs px-2 py-1 rounded-full bg-[#0f3460] text-slate-300 border border-white/10"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            {displayed.overview && (
              <p className="text-slate-300 text-sm leading-relaxed mb-6">{displayed.overview}</p>
            )}

            {!displayed.overview && !loading && (
              <p className="text-slate-500 text-sm italic mb-6">Aucun synopsis disponible.</p>
            )}

            <button
              onClick={() => onToggleFavorite(displayed)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 ${favoriteClass}`}
            >
              <Heart size={16} className={isFavorite ? 'fill-white' : ''} />
              {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
