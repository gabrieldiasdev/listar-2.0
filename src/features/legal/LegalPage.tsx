import '@fontsource-variable/fraunces'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { site } from '@/config/site'
import { useI18n } from '@/i18n/i18nContext'
import type { Locale } from '@/i18n/locales'
import type { LegalDocument } from './model'
import { privacyPolicy } from './privacy'
import { termsOfUse } from './terms'

const documents: Record<'privacy' | 'terms', Record<Locale, LegalDocument>> = {
  privacy: privacyPolicy,
  terms: termsOfUse,
}

export function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
  const navigate = useNavigate()
  const { t, locale } = useI18n()
  const content = documents[kind][locale]

  return (
    <div className="min-h-dvh bg-cream text-slate-900">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="" className="size-9 rounded-xl" />
          <span className="font-display text-xl font-semibold">{site.name}</span>
        </Link>
        <button
          type="button"
          onClick={() => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/'))}
          className="flex min-h-12 items-center gap-2 rounded-full px-4 font-semibold text-brand-800 hover:bg-brand-50"
        >
          <ArrowLeft className="size-5" aria-hidden />
          {t.legal.back}
        </button>
      </header>

      <main className="mx-auto max-w-3xl px-5 pt-4 pb-20 sm:px-8">
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{content.title}</h1>
        <p className="mt-3 text-slate-500">{t.legal.updated(content.updated)}</p>
        <p className="mt-8 text-xl leading-relaxed text-slate-700">{content.intro}</p>

        {content.sections.map((section, index) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-2xl font-semibold">
              {index + 1}. {section.heading}
            </h2>
            {section.bullets && (
              <ul className="mt-4 list-disc space-y-2 pl-6 text-lg leading-relaxed text-slate-700 marker:text-brand-600">
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-lg leading-relaxed text-slate-700">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </main>
    </div>
  )
}
