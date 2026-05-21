import { Sun, Moon } from 'lucide-react'

interface Props {
  dark: boolean
  onToggle: () => void
}

export default function DarkModeToggle({ dark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label="Basculer le mode sombre"
      className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300
        hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-400
        transition-all duration-200 shadow-sm"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
