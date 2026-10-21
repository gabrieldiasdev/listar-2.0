import { ClipboardPaste, Eye, ShieldCheck, Smartphone, WifiOff, Zap } from 'lucide-react'
import { useLandingContent } from '../useLandingContent'
import { PhoneMockup } from './PhoneMockup'

const featureIcons = [Eye, WifiOff, Zap, ClipboardPaste, Smartphone, ShieldCheck]

export function Features() {
  const { features } = useLandingContent()

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="order-2 flex justify-center lg:order-1">
          <PhoneMockup variant="shopping" className="rotate-2" />
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {features.title}
          </h2>
          <p className="mt-4 max-w-xl text-xl text-slate-600">{features.description}</p>

          <ul className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {features.items.map(({ title, description }, index) => {
              const Icon = featureIcons[index] ?? Eye
              return (
                <li key={title} className="flex gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-800">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 leading-relaxed text-slate-600">{description}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
