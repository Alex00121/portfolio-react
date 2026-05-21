export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  runtime?: number
  genres?: Genre[]
}

export interface Genre {
  id: number
  name: string
}

export interface SearchResult {
  results: Movie[]
  total_pages: number
  total_results: number
  page: number
}

export interface MovieDetail extends Movie {
  runtime: number
  genres: Genre[]
}
