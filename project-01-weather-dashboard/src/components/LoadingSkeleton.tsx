export function LoadingSkeleton() {
  return (
    <div className="space-y-4 fade-in">
      {/* Current weather skeleton */}
      <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-6">
        <div className="flex justify-between mb-4">
          <div className="space-y-2">
            <div className="h-7 w-48 rounded-xl bg-white/10 animate-pulse skeleton-shimmer" />
            <div className="h-4 w-24 rounded-xl bg-white/5 animate-pulse" />
          </div>
          <div className="h-14 w-14 rounded-xl bg-white/10 animate-pulse" />
        </div>
        <div className="h-20 w-36 rounded-xl bg-white/10 animate-pulse skeleton-shimmer mb-6" />
        <div className="grid grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>

      {/* Week forecast skeleton */}
      <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-6">
        <div className="h-4 w-32 rounded-xl bg-white/10 animate-pulse mb-4" />
        <div className="grid grid-cols-7 gap-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse skeleton-shimmer" />
          ))}
        </div>
      </div>

      {/* Chart skeleton */}
      <div className="backdrop-blur-md bg-white/10 border border-white/10 rounded-2xl p-6">
        <div className="h-4 w-40 rounded-xl bg-white/10 animate-pulse mb-4" />
        <div className="h-48 rounded-xl bg-white/5 animate-pulse skeleton-shimmer" />
      </div>
    </div>
  )
}
