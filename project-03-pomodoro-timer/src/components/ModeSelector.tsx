import React from 'react'

export type Mode = 'pomodoro' | 'shortBreak' | 'longBreak'

interface Props {
  mode: Mode
  onModeChange: (mode: Mode) => void
}

const modes: { key: Mode; label: string }[] = [
  { key: 'pomodoro', label: 'Pomodoro' },
  { key: 'shortBreak', label: 'Pause courte' },
  { key: 'longBreak', label: 'Pause longue' },
]

const modeColors: Record<Mode, string> = {
  pomodoro: 'bg-red-500 text-white',
  shortBreak: 'bg-green-500 text-white',
  longBreak: 'bg-blue-500 text-white',
}

export default function ModeSelector({ mode, onModeChange }: Props) {
  return (
    <div className="flex gap-2 bg-black/10 rounded-2xl p-1">
      {modes.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onModeChange(key)}
          className={`
            flex-1 py-2 px-3 rounded-xl text-sm font-semibold transition-all duration-200
            ${mode === key ? modeColors[key] + ' shadow-md' : 'text-white/70 hover:text-white hover:bg-white/10'}
          `}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
