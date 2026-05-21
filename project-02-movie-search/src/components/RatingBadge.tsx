interface Props {
  rating: number
  variant?: 'badge' | 'text'
}

export default function RatingBadge({ rating, variant = 'badge' }: Props) {
  const color =
    rating >= 7 ? 'bg-green-600' : rating >= 5 ? 'bg-yellow-600' : 'bg-red-600'
  const textColor =
    rating >= 7 ? 'text-green-400' : rating >= 5 ? 'text-yellow-400' : 'text-red-400'

  if (variant === 'text') {
    return (
      <span className={`flex items-center gap-1 text-sm font-semibold ${textColor}`}>
        ★ {rating.toFixed(1)}
      </span>
    )
  }

  return (
    <span className={`${color} text-white text-xs font-bold px-2 py-0.5 rounded-md`}>
      ★ {rating.toFixed(1)}
    </span>
  )
}
