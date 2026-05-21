import { useState, useEffect } from 'react'
import { Github } from 'lucide-react'
import SearchBar from './components/SearchBar'
import ProfileCard from './components/ProfileCard'
import RepoList from './components/RepoList'
import LangChart from './components/LangChart'
import RateLimitBanner from './components/RateLimitBanner'
import DarkModeToggle from './components/DarkModeToggle'
import { useGitHub } from './hooks/useGitHub'

const SUGGESTIONS = ['torvalds', 'gaearon', 'addyosmani', 'tj', 'sindresorhus', 'yyx990803']

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
      <div className="flex gap-6 items-start">
        <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse w-40" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full max-w-sm" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4 max-w-xs" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3 mt-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-gray-100 dark:bg-gray-700 rounded-xl animate-pulse" />
        ))}
      </div>
    </div>
  )
}

function SkeletonRepos() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="px-6 py-4 border-b border-gray-50 dark:border-gray-700/50 space-y-2">
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-3 w-3/4 bg-gray-100 dark:bg-gray-700/60 rounded animate-pulse" />
          <div className="flex gap-3">
            <div className="h-3 w-16 bg-gray-100 dark:bg-gray-700/60 rounded animate-pulse" />
            <div className="h-3 w-12 bg-gray-100 dark:bg-gray-700/60 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('gh-dark')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const { user, repos, rateLimit, loading, error, fetchProfile } = useGitHub()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('gh-dark', String(dark))
  }, [dark])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
        border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-lg">
            <Github size={22} />
            <span className="hidden sm:inline">GitHub Profile Viewer</span>
          </div>
          <div className="flex-1">
            <SearchBar onSearch={fetchProfile} loading={loading} />
          </div>
          <DarkModeToggle dark={dark} onToggle={() => setDark(d => !d)} />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {rateLimit && <RateLimitBanner rateLimit={rateLimit} />}

        {!user && !loading && !error && (
          <div className="text-center py-16 animate-fadeIn">
            <div className="text-7xl mb-6">🐙</div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-3">
              Explorez des profils GitHub
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto leading-relaxed">
              Recherchez n'importe quel utilisateur GitHub pour voir ses dépôts, statistiques et
              distribution de langages.
            </p>
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              <p className="text-xs text-gray-400 dark:text-gray-600 w-full">Suggestions :</p>
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => fetchProfile(s)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200
                    dark:border-gray-700 text-gray-600 dark:text-gray-400
                    hover:border-indigo-300 dark:hover:border-indigo-600
                    hover:text-indigo-600 dark:hover:text-indigo-400
                    hover:bg-indigo-50 dark:hover:bg-indigo-900/20
                    transition-all duration-200 active:scale-95"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && (
          <div className="space-y-6">
            <SkeletonCard />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SkeletonRepos />
              </div>
              <div className="h-64 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 animate-pulse" />
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700
            p-12 text-center animate-fadeIn">
            <div className="text-5xl mb-4">😕</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Oops, quelque chose s'est mal passé
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">{error}</p>
          </div>
        )}

        {user && !loading && (
          <>
            <ProfileCard user={user} repos={repos} />
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <RepoList repos={repos} />
              </div>
              <div>
                <LangChart repos={repos} />
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="text-center text-xs text-gray-400 dark:text-gray-600 py-8">
        Données fournies par l'API GitHub publique • Limite : 60 req/h sans authentification
      </footer>
    </div>
  )
}
