"use client";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ id, title, content, createdAt, onEdit, onDelete }: NoteCardProps) {
  const createdLabel = new Date(createdAt).toLocaleString();

  return (
    <article className="card-surface group flex flex-col border border-slate-800/70 p-4 transition hover:-translate-y-0.5 hover:border-accent/80 hover:shadow-soft">
      <header className="mb-3 flex items-start justify-between gap-3">
        <h2 className="line-clamp-2 text-sm font-semibold sm:text-base">{title}</h2>
        <span
          suppressHydrationWarning
          className="rounded-full bg-slate-900/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400"
        >
          {createdLabel}
        </span>
      </header>
      <p className="mb-4 flex-1 whitespace-pre-line text-xs text-slate-300 sm:text-sm">
        {content}
      </p>
      <div className="mt-2 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(id)}
          className="button-ghost px-3 py-1 text-xs sm:text-sm"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="button-primary bg-red-500/90 text-xs hover:bg-red-400 sm:text-sm"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
