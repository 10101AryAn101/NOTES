export function NoteSkeleton() {
  return (
    <div className="card-surface animate-pulse border border-slate-800/70 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="h-4 w-32 rounded bg-slate-700/60" />
        <div className="h-3 w-24 rounded-full bg-slate-800" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-slate-800" />
        <div className="h-3 w-5/6 rounded bg-slate-800" />
        <div className="h-3 w-4/6 rounded bg-slate-800" />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <div className="h-8 w-16 rounded-xl bg-slate-800" />
        <div className="h-8 w-16 rounded-xl bg-slate-800" />
      </div>
    </div>
  );
}
