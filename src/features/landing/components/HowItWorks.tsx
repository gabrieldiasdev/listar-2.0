import { ClipboardCheck, ShoppingBasket, Users } from 'lucide-react'
import { useLandingContent } from '../useLandingContent'

const stepIcons = [ClipboardCheck, ShoppingBasket, Users]

export function HowItWorks() {
  const { howItWorks } = useLandingContent()

  return (
    <section id="como-funciona" className="scroll-mt-8 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {howItWorks.title}
          </h2>
          <p className="mt-4 text-xl text-slate-600">{howItWorks.description}</p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {howItWorks.steps.map(({ title, description }, index) => {
            const Icon = stepIcons[index] ?? ClipboardCheck
            return (
              <li key={title} className="relative rounded-3xl bg-cream p-8 ring-1 ring-slate-900/5">
                <span className="font-display absolute top-6 right-7 text-5xl font-semibold text-brand-900/10" aria-hidden>
                  {index + 1}
                </span>
                <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-700 text-white">
                  <Icon className="size-7" aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{description}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
