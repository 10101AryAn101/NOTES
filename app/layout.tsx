import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Notes Studio',
  description: 'Minimal notes app built with Next.js, MongoDB, and Tailwind.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="main-shell">
        <header className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Notes Studio</h1>
            <p className="mt-1 text-sm text-slate-400">
              Capture, refine, and revisit your ideas in a focused space.
            </p>
          </div>
        </header>
        <main className="flex-1 pb-8">{children}</main>
        <footer className="mt-6 border-t border-slate-800/80 pt-4 text-xs text-slate-500">
          Built with Next.js App Router, MongoDB, and Tailwind CSS.
        </footer>
      </body>
    </html>
  );
}
