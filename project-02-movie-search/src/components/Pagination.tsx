import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  const capped = Math.min(totalPages, 500)

  const getPages = (): (number | 'ellipsis')[] => {
    if (capped <= 10) return Array.from({ length: capped }, (_, i) => i + 1)

    const pages: (number | 'ellipsis')[] = []
    const delta = 2

    const range = (from: number, to: number) => {
      for (let i = from; i <= to; i++) pages.push(i)
    }

    pages.push(1)
    if (currentPage - delta > 2) pages.push('ellipsis')
    range(Math.max(2, currentPage - delta), Math.min(capped - 1, currentPage + delta))
    if (currentPage + delta < capped - 1) pages.push('ellipsis')
    pages.push(capped)

    return pages
  }

  const pages = getPages()

  return (
    <div className="flex items-center justify-center gap-1 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-[#16213e] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronLeft size={16} />
        Préc.
      </button>

      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="px-2 py-2 text-slate-500 text-sm">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`min-w-[36px] py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 ${
              p === currentPage
                ? 'bg-[#e94560] text-white'
                : 'text-slate-400 hover:text-white hover:bg-[#16213e]'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === capped}
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-[#16213e] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        Suiv.
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
