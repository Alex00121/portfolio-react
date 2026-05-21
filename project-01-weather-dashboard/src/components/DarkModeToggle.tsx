import { Sun, Moon } from 'lucide-react'

interface Props {
  darkMode: boolean
  onToggle: () => void
}

export function DarkModeToggle({ darkMode, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className="p-2 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-200 active:scale-95"
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
