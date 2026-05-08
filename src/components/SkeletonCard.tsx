export default function SkeletonCard() {
  return (
    <div className="bezel-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 animate-pulse">
      <div className="h-5 w-24 bg-white/5 rounded-full shrink-0" />
      <div className="flex-1 h-4 bg-white/5 rounded-lg" />
      <div className="flex items-center gap-3 shrink-0">
        <div className="h-3 w-12 bg-white/5 rounded" />
        <div className="h-3 w-12 bg-white/5 rounded" />
        <div className="h-3 w-16 bg-white/5 rounded hidden sm:block" />
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <div className="h-7 w-20 bg-white/5 rounded-lg" />
        <div className="h-7 w-14 bg-white/5 rounded-lg" />
      </div>
    </div>
  );
}
