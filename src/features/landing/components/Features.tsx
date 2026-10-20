import { ClipboardPaste, Eye, ShieldCheck, Smartphone, WifiOff, Zap, type LucideIcon } from 'lucide-react'
import { PhoneMockup } from './PhoneMockup'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Eye,
    title: 'Letra grande, botões grandes',
    description: 'Fácil de ler e de usar, sem menus escondidos. Feito para toda a família, dos filhos aos avós.',
  },
  {
    icon: WifiOff,
    title: 'Funciona sem rede',
    description: 'Rede fraca no supermercado? A lista abre na mesma e sincroniza quando a ligação voltar.',
  },
  {
    icon: Zap,
    title: 'Tudo em tempo real',
    description: 'Se alguém acrescentar leite em casa, aparece logo no telemóvel de quem está no supermercado.',
  },
  {
    icon: ClipboardPaste,
    title: 'Traga a lista que já tem',
    description: 'Tem uma lista nas notas do telemóvel? Cole-a no Listar e cada produto vai para a secção certa.',
  },
  {
    icon: Smartphone,
    title: 'Sem passar pela loja de aplicações',
    description: 'Abre no navegador e fica no ecrã principal como uma aplicação, sem ocupar espaço.',
  },
  {
    icon: ShieldCheck,
    title: 'A sua lista é sua',
    description: 'Só quem convidar vê a lista. Sem anúncios e sem venda de dados.',
  },
]

export function Features() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="order-2 flex justify-center lg:order-1">
          <PhoneMockup variant="shopping" className="rotate-2" />
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Pensado para o dia a dia
          </h2>
          <p className="mt-4 max-w-xl text-xl text-slate-600">
            Sem funcionalidades a mais. Só o que faz falta para nunca mais voltar do supermercado sem o café.
          </p>

          <ul className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-800">
                  <Icon className="size-6" aria-hidden />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                  <p className="mt-1 leading-relaxed text-slate-600">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
