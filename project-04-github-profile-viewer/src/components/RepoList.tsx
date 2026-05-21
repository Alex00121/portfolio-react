import { useState } from 'react'
import { Star, GitFork, Clock, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react'
import type { GitHubRepo, SortKey, SortOrder } from '../types'
import { getLangColor } from '../data/languageColors'

interface Props {
  repos: GitHubRepo[]
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return 'aujourd\'hui'
  if (days === 1) return 'hier'
  if (days < 30) return `il y a ${days} j`
  const months = Math.floor(days / 30)
  if (months < 12) return `il y a ${months} mois`
  const years = Math.floor(months / 12)
  return `il y a ${years} an${years > 1 ? 's' : ''}`
}

const SORT_LABELS: Record<SortKey, string> = {
  stars: 'Étoiles',
  forks: 'Forks',
  updated: 'Mis à jour',
}

function SortIcon({ col, sortKey, sortOrder }: { col: SortKey; sortKey: SortKey; sortOrder: SortOrder }) {
  if (col !== sortKey) return <ChevronUp size={14} className="opacity-30" />
  return sortOrder === 'desc' ? (
    <ChevronDown size={14} className="text-indigo-600 dark:text-indigo-400" />
  ) : (
    <ChevronUp size={14} className="text-indigo-600 dark:text-indigo-400" />
  )
}

export default function RepoList({ repos: allRepos }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('stars')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [showForks, setShowForks] = useState(false)

  const repos = allRepos
    .filter(r => showForks || !r.fork)
    .slice()
    .sort((a, b) => {
      let valA: number
      let valB: number
      if (sortKey === 'stars') {
        valA = a.stargazers_count
        valB = b.stargazers_count
      } else if (sortKey === 'forks') {
        valA = a.forks_count
        valB = b.forks_count
      } else {
        valA = new Date(a.updated_at).getTime()
        valB = new Date(b.updated_at).getTime()
      }
      return sortOrder === 'desc' ? valB - valA : valA - valB
    })

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortOrder(o => (o === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortOrder('desc')
    }
  }

  if (repos.length === 0 && !showForks) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">Aucun dépôt public trouvé.</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-fadeIn">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
          Dépôts
          <span className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500">
            ({repos.length})
          </span>
        </h3>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showForks}
              onChange={e => setShowForks(e.target.checked)}
              className="rounded accent-indigo-600"
            />
            Inclure les forks
          </label>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            Trier par:
          </div>
          {(['stars', 'forks', 'updated'] as SortKey[]).map(key => (
            <button
              key={key}
              onClick={() => toggleSort(key)}
              className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg
                transition-all duration-200
                ${sortKey === key
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              {SORT_LABELS[key]}
              <SortIcon col={key} sortKey={sortKey} sortOrder={sortOrder} />
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
        {repos.map(repo => (
          <div
            key={repo.id}
            className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150
              group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline
                      truncate text-sm"
                  >
                    {repo.name}
                  </a>
                  {repo.fork && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700
                      text-gray-500 dark:text-gray-400 font-medium">
                      fork
                    </span>
                  )}
                  {repo.topics.slice(0, 3).map(t => (
                    <span
                      key={t}
                      className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30
                        text-indigo-700 dark:text-indigo-300 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {repo.description && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {repo.description}
                  </p>
                )}
                <div className="flex items-center gap-4 mt-2 flex-wrap">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                      <span
                        className="w-3 h-3 rounded-full inline-block flex-shrink-0"
                        style={{ backgroundColor: getLangColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Star size={12} />
                    {repo.stargazers_count.toLocaleString('fr-FR')}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <GitFork size={12} />
                    {repo.forks_count.toLocaleString('fr-FR')}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock size={12} />
                    {timeAgo(repo.updated_at)}
                  </span>
                </div>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex-shrink-0 mt-0.5"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
