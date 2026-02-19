import Link from 'next/link';
import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StaticPageShellProps {
  icon: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  contentClassName?: string;
}

export function StaticPageShell({
  icon,
  title,
  description,
  children,
  contentClassName,
}: StaticPageShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4 md:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            돌아가기
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="mb-8 flex items-start gap-4 border-b border-slate-100 pb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white shadow-sm shadow-blue-500/25">
              {icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
              {description && <p className="mt-2 text-sm text-slate-500">{description}</p>}
            </div>
          </div>

          <div className={cn('space-y-6 text-slate-700', contentClassName)}>{children}</div>
        </div>
      </main>
    </div>
  );
}
