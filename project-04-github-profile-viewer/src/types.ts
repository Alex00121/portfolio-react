export interface GitHubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  location: string | null
  blog: string | null
  company: string | null
  public_repos: number
  followers: number
  following: number
  html_url: string
  created_at: string
  twitter_username: string | null
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  html_url: string
  fork: boolean
  topics: string[]
}

export interface RateLimit {
  limit: number
  remaining: number
  reset: number
}

export type SortKey = 'stars' | 'forks' | 'updated'
export type SortOrder = 'asc' | 'desc'
