import { MapPin, Link, Twitter, Building2, Users, BookOpen, Star, ExternalLink } from 'lucide-react'
import type { GitHubUser, GitHubRepo } from '../types'

interface Props {
  user: GitHubUser
  repos: GitHubRepo[]
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
}

export default function ProfileCard({ user, repos }: Props) {
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0)
  const websiteUrl = user.blog?.startsWith('http') ? user.blog : user.blog ? `https://${user.blog}` : null

  const stats = [
    { label: 'Dépôts', value: user.public_repos, icon: <BookOpen size={16} /> },
    { label: 'Abonnés', value: user.followers, icon: <Users size={16} /> },
    { label: 'Abonnements', value: user.following, icon: <Users size={16} /> },
    { label: 'Étoiles totales', value: totalStars, icon: <Star size={16} /> },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-24 h-24 rounded-full ring-4 ring-indigo-100 dark:ring-indigo-900 shadow-md flex-shrink-0"
        />
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
            {user.name || user.login}
          </h2>
          <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mt-0.5">@{user.login}</p>

          {user.bio && (
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-lg">
              {user.bio}
            </p>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 justify-center sm:justify-start">
            {user.company && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <Building2 size={13} />
                {user.company}
              </span>
            )}
            {user.location && (
              <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <MapPin size={13} />
                {user.location}
              </span>
            )}
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                <Link size={13} />
                {user.blog}
              </a>
            )}
            {user.twitter_username && (
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs text-sky-500 hover:underline"
              >
                <Twitter size={13} />
                @{user.twitter_username}
              </a>
            )}
            <span className="text-xs text-gray-400 dark:text-gray-500">
              Membre depuis {formatDate(user.created_at)}
            </span>
          </div>
        </div>

        <a
          href={user.html_url}
          target="_blank"
          rel="noreferrer"
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200
            dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-300
            hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
        >
          <ExternalLink size={15} />
          Voir sur GitHub
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
        {stats.map(s => (
          <div
            key={s.label}
            className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 text-center
              border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-center gap-1 text-indigo-600 dark:text-indigo-400 mb-1">
              {s.icon}
            </div>
            <p className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {s.value.toLocaleString('fr-FR')}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
