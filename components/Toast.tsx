"use client";

import { createContext, useContext, useState, type ReactNode, useCallback } from "react";

interface ToastMessage {
  id: number;
  message: string;
}

interface ToastContextValue {
  pushToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const pushToast = useCallback((message: string) => {
    setToasts((current) => {
      const id = Date.now();
      const next = [...current, { id, message }];
      setTimeout(() => {
        setToasts((value) => value.filter((t) => t.id !== id));
      }, 2800);
      return next;
    });
  }, []);

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
        <div className="flex max-w-md flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="pointer-events-auto card-surface border border-slate-700/80 bg-slate-900/95 px-3 py-2 text-xs text-slate-100 shadow-soft sm:text-sm"
            >
              {toast.message}
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
