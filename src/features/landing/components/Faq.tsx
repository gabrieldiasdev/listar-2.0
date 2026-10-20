import { Plus } from 'lucide-react'

const questions = [
  {
    question: 'É mesmo gratuito?',
    answer: 'Sim. O Listar é gratuito e não tem anúncios.',
  },
  {
    question: 'Preciso de instalar alguma coisa?',
    answer:
      'Não. Basta abrir o Listar no navegador do telemóvel e entrar com a sua conta Google. Se quiser, pode adicioná-lo ao ecrã principal para o abrir como uma aplicação.',
  },
  {
    question: 'Funciona no iPhone?',
    answer: 'Sim. Funciona no Android, no iPhone e também no computador.',
  },
  {
    question: 'Quem consegue ver a minha lista?',
    answer: 'Apenas as pessoas que convidar. Cada casa tem a sua própria lista, separada de todas as outras.',
  },
  {
    question: 'E se não tiver rede no supermercado?',
    answer:
      'A lista continua a funcionar. As alterações ficam guardadas no telemóvel e são enviadas assim que houver ligação.',
  },
  {
    question: 'Porque é preciso uma conta Google?',
    answer:
      'É a forma mais simples e segura de entrar: não precisa de criar nem de decorar mais uma palavra-passe.',
  },
]

export function Faq() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="font-display text-center text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          Perguntas frequentes
        </h2>
        <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {questions.map(({ question, answer }) => (
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
