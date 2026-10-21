import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { cn } from '@/lib/cn'
import { site } from '../site'
import { useLandingContent } from '../useLandingContent'

export function CallToAction({ className }: { className?: string }) {
  const { cta } = useLandingContent()

  return (
    <Link
      to={site.startPath}
      className={cn(
        'group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-brand-700 px-7 text-lg whitespace-nowrap font-semibold text-white shadow-lg shadow-brand-900/20 transition-colors hover:bg-brand-800',
        'focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand-600',
        className,
      )}
    >
      {cta}
      <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  )
}
