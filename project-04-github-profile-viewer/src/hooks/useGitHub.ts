import { useState, useCallback } from 'react'
import type { GitHubUser, GitHubRepo, RateLimit } from '../types'

interface GitHubState {
  user: GitHubUser | null
  repos: GitHubRepo[]
  rateLimit: RateLimit | null
  loading: boolean
  error: string | null
}

const BASE = 'https://api.github.com'

function parseRateLimit(headers: Headers): RateLimit | null {
  const limit = headers.get('x-ratelimit-limit')
  const remaining = headers.get('x-ratelimit-remaining')
  const reset = headers.get('x-ratelimit-reset')
  if (!limit || !remaining || !reset) return null
  return {
    limit: parseInt(limit),
    remaining: parseInt(remaining),
    reset: parseInt(reset),
  }
}

export function useGitHub() {
  const [state, setState] = useState<GitHubState>({
    user: null,
    repos: [],
    rateLimit: null,
    loading: false,
    error: null,
  })

  const fetchProfile = useCallback(async (username: string) => {
    if (!username.trim()) return
    setState(s => ({ ...s, loading: true, error: null, user: null, repos: [] }))

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`${BASE}/users/${username}`),
        fetch(`${BASE}/users/${username}/repos?per_page=100&sort=stars`),
      ])

      const rateLimit = parseRateLimit(userRes.headers)

      if (userRes.status === 404) {
        setState(s => ({
          ...s,
          loading: false,
          error: 'Utilisateur introuvable — essayez un autre nom',
          rateLimit,
        }))
        return
      }

      if (userRes.status === 403 || userRes.status === 429) {
        setState(s => ({
          ...s,
          loading: false,
          error: 'Limite de requêtes GitHub atteinte. Réessayez dans quelques minutes.',
          rateLimit,
        }))
        return
      }

      if (!userRes.ok) {
        setState(s => ({
          ...s,
          loading: false,
          error: `Erreur ${userRes.status} — veuillez réessayer`,
          rateLimit,
        }))
        return
      }

      const [user, repos] = await Promise.all([
        userRes.json() as Promise<GitHubUser>,
        reposRes.ok ? (reposRes.json() as Promise<GitHubRepo[]>) : Promise.resolve([]),
      ])

      setState({
        user,
        repos,
        rateLimit,
        loading: false,
        error: null,
      })
    } catch {
      setState(s => ({
        ...s,
        loading: false,
        error: 'Impossible de se connecter à l\'API GitHub. Vérifiez votre connexion.',
      }))
    }
  }, [])

  return { ...state, fetchProfile }
}
