"use client";

import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ open, title, description, children, onClose }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4 py-6">
      <div className="card-surface relative w-full max-w-lg border border-slate-700/80 bg-slate-900/95 p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold sm:text-lg">{title}</h2>
            {description ? (
              <p className="mt-1 text-xs text-slate-400 sm:text-sm">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="button-ghost px-2 py-1 text-xs sm:text-sm"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
