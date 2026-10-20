import { useLandingContent } from '../useLandingContent'
import { CallToAction } from './CallToAction'
import { PhoneMockup } from './PhoneMockup'

export function Hero() {
  const { hero } = useLandingContent()

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-6 pb-20 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:pt-14 lg:pb-28">
      <div className="text-center lg:text-left">
        <p className="mb-5 inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-900">
          {hero.badge}
        </p>
        <h1 className="font-display text-[2.6rem] leading-[1.08] font-semibold tracking-tight text-slate-900 sm:text-6xl">
          {hero.titleStart}
          <span className="text-brand-700 italic">{hero.titleHighlight}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-slate-600 lg:mx-0">{hero.description}</p>
        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
          <CallToAction />
          <a href="#como-funciona" className="px-4 py-3 text-lg font-semibold text-slate-700 underline-offset-4 hover:underline">
            {hero.secondaryCta}
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-slate-600 lg:justify-start">
          {hero.highlights.map((highlight) => (
            <li key={highlight} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-600" aria-hidden />
              {highlight}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative flex justify-center">
        <div className="absolute inset-x-6 top-10 bottom-0 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-100 via-amber-50 to-brand-50" />
        <div className="relative">
          <PhoneMockup variant="home" className="relative z-10 -rotate-3 xl:-translate-x-24" />
          <PhoneMockup
            variant="shopping"
            className="absolute top-12 left-1/2 hidden origin-top-left scale-90 rotate-6 xl:block"
          />
        </div>
      </div>
    </section>
  )
}
