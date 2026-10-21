import { useI18n } from '@/i18n/i18nContext'
import { LOCALES } from '@/i18n/locales'
import { cn } from '@/lib/cn'
import { site } from '../site'
import { useLandingContent } from '../useLandingContent'
import { CallToAction } from './CallToAction'

const currentYear = new Date().getFullYear()

export function ClosingSection() {
  const { closing } = useLandingContent()
  const { t, locale, setLocale } = useI18n()

  return (
    <>
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-gradient-to-br from-brand-100 via-amber-50 to-brand-50 px-4 py-16 text-center sm:px-12">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">{closing.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-xl text-slate-600">{closing.description}</p>
          <CallToAction className="mt-9" />
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-slate-500 sm:flex-row sm:px-8">
          <p className="text-center sm:text-left">
            © {currentYear} {site.name}. {closing.footer}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            <div role="group" aria-label={closing.language} className="flex gap-1">
              {LOCALES.map((option) => (
                <button
                  key={option}
                  type="button"
                  lang={option}
                  aria-pressed={locale === option}
                  onClick={() => setLocale(option)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-sm transition-colors',
                    locale === option ? 'bg-brand-100 font-semibold text-brand-900' : 'hover:text-slate-800',
                  )}
                >
                  {t.languages[option]}
                </button>
              ))}
            </div>
            <a href={`mailto:${site.contactEmail}`} className="font-medium text-slate-700 hover:text-brand-800">
              {closing.contact}
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
