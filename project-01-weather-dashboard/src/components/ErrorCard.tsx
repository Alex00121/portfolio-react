import { CloudOff } from 'lucide-react'

interface Props {
  message?: string
}

export function ErrorCard({ message = 'City not found — try another search' }: Props) {
  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-4 text-center fade-in">
      <div className="w-16 h-16 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
        <CloudOff size={28} className="text-red-400" />
      </div>
      <div>
        <p className="text-white font-semibold text-lg">{message}</p>
        <p className="text-white/50 text-sm mt-1">Check the spelling or search for a nearby city</p>
      </div>
    </div>
  )
}
