import React from 'react'
import { CheckCircle, Coffee, Zap } from 'lucide-react'
import type { Mode } from './ModeSelector'

export interface LogEntry {
  id: number
  mode: Mode
  timestamp: Date
  duration: number
}

interface Props {
  log: LogEntry[]
}

const modeLabel: Record<Mode, string> = {
  pomodoro: 'Pomodoro',
  shortBreak: 'Pause courte',
  longBreak: 'Pause longue',
}

const modeIcon: Record<Mode, React.ReactNode> = {
  pomodoro: <Zap size={14} className="text-red-400" />,
  shortBreak: <Coffee size={14} className="text-green-400" />,
  longBreak: <Coffee size={14} className="text-blue-400" />,
}

const modeBadge: Record<Mode, string> = {
  pomodoro: 'bg-red-500/20 text-red-300',
  shortBreak: 'bg-green-500/20 text-green-300',
  longBreak: 'bg-blue-500/20 text-blue-300',
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m${s > 0 ? ` ${s}s` : ''}`
}

export default function SessionLog({ log }: Props) {
  if (log.length === 0) {
    return (
      <div className="text-center py-6 text-white/30">
        <CheckCircle size={32} className="mx-auto mb-2 opacity-30" />
        <p className="text-sm">Aucune session terminée pour l'instant</p>
      </div>
    )
  }

  return (
    <div className="max-h-48 overflow-y-auto pr-1 space-y-2 scrollbar-thin">
      {[...log].reverse().map((entry) => (
        <div
          key={entry.id}
          className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-2.5 text-sm"
        >
          <div className="flex items-center gap-2">
            {modeIcon[entry.mode]}
            <span className={`px-2 py-0.5 rounded-lg text-xs font-medium ${modeBadge[entry.mode]}`}>
              {modeLabel[entry.mode]}
            </span>
          </div>
          <div className="flex items-center gap-3 text-white/50 text-xs font-mono">
            <span>{formatDuration(entry.duration)}</span>
            <span>{formatTime(entry.timestamp)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
