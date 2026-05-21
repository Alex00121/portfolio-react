import React from 'react'
import { Play, Pause, RotateCcw } from 'lucide-react'
import type { Mode } from './ModeSelector'

interface Props {
  timeLeft: number
  totalTime: number
  isRunning: boolean
  mode: Mode
  onStartPause: () => void
  onReset: () => void
}

const modeAccent: Record<Mode, string> = {
  pomodoro: '#ef4444',
  shortBreak: '#22c55e',
  longBreak: '#3b82f6',
}

export default function Timer({ timeLeft, totalTime, isRunning, mode, onStartPause, onReset }: Props) {
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const progress = timeLeft / totalTime
  const strokeDashoffset = circumference * (1 - progress)
  const accent = modeAccent[mode]

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0')
  const seconds = (timeLeft % 60).toString().padStart(2, '0')

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative">
        <svg width="220" height="220" viewBox="0 0 220 220" className="rotate-[-90deg]">
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="10"
          />
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke={accent}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.4s ease' }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-6xl font-extrabold tracking-tighter font-mono"
            style={{ color: 'white', textShadow: `0 0 20px ${accent}66` }}
          >
            {minutes}:{seconds}
          </span>
          {isRunning && (
            <span className="text-xs uppercase tracking-widest mt-1 opacity-60 text-white">
              en cours
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onReset}
          title="Réinitialiser (R)"
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 active:scale-95"
        >
          <RotateCcw size={20} />
        </button>

        <button
          onClick={onStartPause}
          title={isRunning ? 'Pause (Espace)' : 'Démarrer (Espace)'}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 active:scale-95 shadow-lg"
          style={{
            background: accent,
            color: 'white',
            boxShadow: `0 0 30px ${accent}66`,
          }}
        >
          {isRunning ? <Pause size={22} /> : <Play size={22} />}
          {isRunning ? 'Pause' : 'Démarrer'}
        </button>

        <div className="p-3 rounded-full bg-white/5 text-white/30 text-xs font-mono w-11 h-11 flex items-center justify-center">
          <kbd>Spc</kbd>
        </div>
      </div>
    </div>
  )
}
