import { Quote } from 'lucide-react'

export function Story() {
  return (
    <section className="bg-brand-900 py-20 text-white lg:py-24">
      <figure className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Quote className="mx-auto size-10 text-brand-200" aria-hidden />
        <blockquote className="font-display mt-6 text-3xl leading-snug font-medium sm:text-4xl">
          O Listar nasceu para ajudar o meu pai, que fazia as compras do mês com uma lista no bloco de notas. Hoje a
          família inteira usa a mesma lista, e já ninguém se esquece do café.
        </blockquote>
        <figcaption className="mt-8 text-lg text-brand-100">Gabriel, criador do Listar</figcaption>
      </figure>
    </section>
  )
}
