import { ClipboardCheck, ShoppingBasket, Users, type LucideIcon } from 'lucide-react'

interface Step {
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: ClipboardCheck,
    title: 'Marque o que falta',
    description:
      'A lista já tem os produtos que costuma comprar. Na cozinha, basta tocar no que está a acabar e, se quiser, indicar a quantidade.',
  },
  {
    icon: ShoppingBasket,
    title: 'Vá às compras',
    description:
      'No supermercado só aparece o que é preciso, arrumado por secções. Toque em cada produto à medida que o põe no carrinho.',
  },
  {
    icon: Users,
    title: 'Partilhe com quem vive consigo',
    description:
      'Envie um convite pelo WhatsApp. Quem for às compras, seja quem for, vê sempre a lista atualizada.',
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-8 bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Três passos, zero complicações
          </h2>
          <p className="mt-4 text-xl text-slate-600">
            Tal como a lista em papel na porta do frigorífico, mas sempre consigo e partilhada com a família.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, index) => (
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
          ))}
        </ol>
      </div>
    </section>
  )
}
