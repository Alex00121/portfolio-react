import React, { useState } from 'react'
import { X, Save } from 'lucide-react'

export interface TimerSettings {
  pomodoro: number
  shortBreak: number
  longBreak: number
  longBreakInterval: number
}

interface Props {
  settings: TimerSettings
  onSave: (settings: TimerSettings) => void
  onClose: () => void
}

export default function Settings({ settings, onSave, onClose }: Props) {
  const [local, setLocal] = useState(settings)

  function handleChange(field: keyof TimerSettings, value: string) {
    const num = parseInt(value, 10)
    if (!isNaN(num) && num > 0) {
      setLocal((prev) => ({ ...prev, [field]: num }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 fade-in">
      <div
        className="w-full max-w-sm mx-4 rounded-2xl p-6 shadow-2xl border border-white/10"
        style={{ background: 'rgba(15, 15, 30, 0.95)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Paramètres</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Durée Pomodoro (minutes)</label>
            <input
              type="number"
              min={1}
              max={60}
              value={local.pomodoro}
              onChange={(e) => handleChange('pomodoro', e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:border-red-400 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Pause courte (minutes)</label>
            <input
              type="number"
              min={1}
              max={30}
              value={local.shortBreak}
              onChange={(e) => handleChange('shortBreak', e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:border-green-400 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1.5">Pause longue (minutes)</label>
            <input
              type="number"
              min={1}
              max={60}
              value={local.longBreak}
              onChange={(e) => handleChange('longBreak', e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:border-blue-400 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1.5">
              Intervalle pause longue (après N pomodoros)
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={local.longBreakInterval}
              onChange={(e) => handleChange('longBreakInterval', e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono focus:outline-none focus:border-purple-400 transition-all duration-200"
            />
          </div>
        </div>

        <button
          onClick={() => { onSave(local); onClose() }}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-gray-900 font-bold transition-all duration-200 active:scale-95 hover:bg-white/90"
        >
          <Save size={18} />
          Enregistrer
        </button>
      </div>
    </div>
  )
}
