export function posterUrl(posterPath: string | null | undefined, size = 'w500'): string | null {
  if (!posterPath) return null
  return `https://image.tmdb.org/t/p/${size}${posterPath}`
}

export function releaseYear(releaseDate: string | null | undefined): string {
  return releaseDate?.slice(0, 4) ?? '—'
}
