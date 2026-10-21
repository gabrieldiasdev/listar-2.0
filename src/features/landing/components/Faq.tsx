import { Plus } from 'lucide-react'
import { useLandingContent } from '../useLandingContent'

export function Faq() {
  const { faq } = useLandingContent()

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display text-center text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          {faq.title}
        </h2>
        <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {faq.items.map(({ question, answer }) => (
            <details key={question} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-xl font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                {question}
                <Plus className="size-6 shrink-0 text-brand-700 transition-transform group-open:rotate-45" aria-hidden />
              </summary>
              <p className="pb-6 text-lg leading-relaxed text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
