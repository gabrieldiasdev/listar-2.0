import { Link } from 'react-router'
import { site } from '../site'
import { useLandingContent } from '../useLandingContent'

export function SiteHeader() {
  const { header } = useLandingContent()

  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
      <Link to="/" className="flex items-center gap-2.5" aria-label={header.homeLabel}>
        <img src="/logo.svg" alt="" className="size-10 rounded-xl" />
        <span className="font-display text-2xl font-semibold text-slate-900">{site.name}</span>
      </Link>
      <Link
        to={site.startPath}
        className="rounded-full px-5 py-2.5 font-semibold text-brand-800 ring-1 ring-brand-800/20 transition-colors hover:bg-brand-50"
      >
        {header.signIn}
      </Link>
    </header>
  )
}
