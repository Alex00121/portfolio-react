import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Settings2, Bell, BellOff, SkipForward } from 'lucide-react'
import ModeSelector, { type Mode } from './components/ModeSelector'
import Timer from './components/Timer'
import SessionLog, { type LogEntry } from './components/SessionLog'
import SettingsModal, { type TimerSettings } from './components/Settings'
import { useInterval } from './hooks/useInterval'

const DEFAULT_SETTINGS: TimerSettings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
}

const MODE_BG: Record<Mode, string> = {
  pomodoro: 'rgba(239, 68, 68, 0.07)',
  shortBreak: 'rgba(34, 197, 94, 0.07)',
  longBreak: 'rgba(59, 130, 246, 0.07)',
}

function playBell() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(880, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1)
    gain.gain.setValueAtTime(0.4, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 1.2)
  } catch {
    // AudioContext not supported
  }
}

export default function App() {
  const [settings, setSettings] = useState<TimerSettings>(DEFAULT_SETTINGS)
  const [mode, setMode] = useState<Mode>('pomodoro')
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.pomodoro * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [log, setLog] = useState<LogEntry[]>([])
  const [showSettings, setShowSettings] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const logIdRef = useRef(0)
  const sessionStartRef = useRef<number>(settings.pomodoro * 60)

  const totalTime = settings[mode === 'pomodoro' ? 'pomodoro' : mode === 'shortBreak' ? 'shortBreak' : 'longBreak'] * 60

  function switchMode(newMode: Mode, newSettings = settings) {
    setMode(newMode)
    setIsRunning(false)
    const duration = newSettings[newMode === 'pomodoro' ? 'pomodoro' : newMode === 'shortBreak' ? 'shortBreak' : 'longBreak'] * 60
    setTimeLeft(duration)
    sessionStartRef.current = duration
  }

  function handleSessionComplete(completedMode: Mode) {
    playBell()

    const duration = sessionStartRef.current - timeLeft
    setLog((prev) => [
      ...prev,
      {
        id: ++logIdRef.current,
        mode: completedMode,
        timestamp: new Date(),
        duration: sessionStartRef.current,
      },
    ])

    if (notificationsEnabled && Notification.permission === 'granted') {
      const label = completedMode === 'pomodoro' ? 'Pomodoro' : completedMode === 'shortBreak' ? 'Pause courte' : 'Pause longue'
      new Notification(`${label} terminé !`, {
        body: completedMode === 'pomodoro' ? 'Temps de se reposer.' : 'Retour au travail !',
        icon: '/vite.svg',
      })
    }

    if (completedMode === 'pomodoro') {
      const newCount = pomodoroCount + 1
      setPomodoroCount(newCount)
      if (newCount % settings.longBreakInterval === 0) {
        switchMode('longBreak')
      } else {
        switchMode('shortBreak')
      }
    } else {
      switchMode('pomodoro')
    }
  }

  useInterval(
    () => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          handleSessionComplete(mode)
          return 0
        }
        return prev - 1
      })
    },
    isRunning ? 1000 : null,
  )

  const handleStartPause = useCallback(() => {
    if (!isRunning && notificationsEnabled && Notification.permission === 'default') {
      Notification.requestPermission().then((perm) => {
        if (perm === 'granted') setNotificationsEnabled(true)
      })
    }
    setIsRunning((r) => !r)
  }, [isRunning, notificationsEnabled])

  const handleReset = useCallback(() => {
    setIsRunning(false)
    const duration = settings[mode === 'pomodoro' ? 'pomodoro' : mode === 'shortBreak' ? 'shortBreak' : 'longBreak'] * 60
    setTimeLeft(duration)
    sessionStartRef.current = duration
  }, [mode, settings])

  const handleModeChange = useCallback((newMode: Mode) => {
    switchMode(newMode)
  }, [settings])

  const handleSettingsSave = useCallback((newSettings: TimerSettings) => {
    setSettings(newSettings)
    switchMode(mode, newSettings)
  }, [mode])

  async function toggleNotifications() {
    if (notificationsEnabled) {
      setNotificationsEnabled(false)
      return
    }
    const perm = await Notification.requestPermission()
    if (perm === 'granted') setNotificationsEnabled(true)
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement) return
      if (e.code === 'Space') { e.preventDefault(); handleStartPause() }
      if (e.key === 'r' || e.key === 'R') handleReset()
      if (e.key === '1') handleModeChange('pomodoro')
      if (e.key === '2') handleModeChange('shortBreak')
      if (e.key === '3') handleModeChange('longBreak')
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleStartPause, handleReset, handleModeChange])

  useEffect(() => {
    const modeLabel = mode === 'pomodoro' ? 'Pomodoro' : mode === 'shortBreak' ? 'Pause courte' : 'Pause longue'
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0')
    const s = (timeLeft % 60).toString().padStart(2, '0')
    document.title = `${m}:${s} — ${modeLabel}`
  }, [timeLeft, mode])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-700"
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${MODE_BG[mode]} 0%, transparent 70%), #0a0a1a`,
      }}
    >
      <div className="w-full max-w-md fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Pomodoro</h1>
            <p className="text-white/40 text-sm mt-0.5">
              {pomodoroCount} pomodoro{pomodoroCount > 1 ? 's' : ''} · cycle {Math.floor(pomodoroCount / settings.longBreakInterval) + 1}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleNotifications}
              title={notificationsEnabled ? 'Désactiver les notifications' : 'Activer les notifications'}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200 active:scale-95"
            >
              {notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-200 active:scale-95"
            >
              <Settings2 size={18} />
            </button>
          </div>
        </div>

        {/* Mode selector */}
        <div className="mb-10">
          <ModeSelector mode={mode} onModeChange={handleModeChange} />
        </div>

        {/* Pomodoro cycle dots */}
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: settings.longBreakInterval }).map((_, i) => {
            const cyclePos = pomodoroCount % settings.longBreakInterval
            const filled = i < cyclePos || (cyclePos === 0 && pomodoroCount > 0 && i === settings.longBreakInterval - 1 && mode !== 'pomodoro')
            return (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  filled ? 'bg-white scale-110' : 'bg-white/20'
                }`}
              />
            )
          })}
        </div>

        {/* Timer */}
        <div className="flex justify-center mb-10">
          <Timer
            timeLeft={timeLeft}
            totalTime={totalTime}
            isRunning={isRunning}
            mode={mode}
            onStartPause={handleStartPause}
            onReset={handleReset}
          />
        </div>

        {/* Skip button */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => handleSessionComplete(mode)}
            className="flex items-center gap-1.5 text-white/30 hover:text-white/60 text-sm transition-all duration-200"
          >
            <SkipForward size={14} />
            Passer la session
          </button>
        </div>

        {/* Session log */}
        <div
          className="rounded-2xl p-4 border border-white/10"
          style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}
        >
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">
            Historique
          </h2>
          <SessionLog log={log} />
        </div>

        {/* Keyboard shortcuts */}
        <div className="mt-6 flex justify-center gap-4 text-white/20 text-xs font-mono">
          <span>Espace — démarrer/pause</span>
          <span>R — reset</span>
          <span>1/2/3 — modes</span>
        </div>
      </div>

      {showSettings && (
        <SettingsModal
          settings={settings}
          onSave={handleSettingsSave}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}
