import { AlertTriangle } from 'lucide-react'
import type { RateLimit } from '../types'

interface Props {
  rateLimit: RateLimit
}

function formatReset(ts: number) {
  return new Date(ts * 1000).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export default function RateLimitBanner({ rateLimit }: Props) {
  if (rateLimit.remaining > 15) return null

  const pct = Math.round((rateLimit.remaining / rateLimit.limit) * 100)

  return (
    <div
      className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm
        ${rateLimit.remaining <= 5
          ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300'
          : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300'
        }`}
    >
      <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">
          Limite GitHub API : {rateLimit.remaining}/{rateLimit.limit} requêtes restantes ({pct}%)
        </p>
        <p className="text-xs mt-0.5 opacity-80">
          Réinitialisation à {formatReset(rateLimit.reset)}. Connectez-vous à GitHub pour augmenter la limite.
        </p>
      </div>
    </div>
  )
}
