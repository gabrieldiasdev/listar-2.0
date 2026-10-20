import { Quote } from 'lucide-react'
import { useLandingContent } from '../useLandingContent'

export function Story() {
  const { story } = useLandingContent()

  return (
    <section className="bg-brand-900 py-20 text-white lg:py-24">
      <figure className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Quote className="mx-auto size-10 text-brand-200" aria-hidden />
        <blockquote className="font-display mt-6 text-3xl leading-snug font-medium sm:text-4xl">{story.quote}</blockquote>
        <figcaption className="mt-8 text-lg text-brand-100">{story.author}</figcaption>
      </figure>
    </section>
  )
}
