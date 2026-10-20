import { site } from '../site'
import { CallToAction } from './CallToAction'

const currentYear = new Date().getFullYear()

export function ClosingSection() {
  return (
    <>
      <section className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-gradient-to-br from-brand-100 via-amber-50 to-brand-50 px-4 py-16 text-center sm:px-12">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Experimente já nas próximas compras
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xl text-slate-600">
            Leva menos de um minuto a começar. Depois é só convidar quem vive consigo.
          </p>
          <CallToAction className="mt-9" />
        </div>
      </section>

      <footer className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-slate-500 sm:flex-row sm:px-8">
          <p className="text-center sm:text-left">
            © {currentYear} {site.name}. Feito com carinho, em família.
          </p>
          <a href={`mailto:${site.contactEmail}`} className="font-medium text-slate-700 hover:text-brand-800">
            Contacto
          </a>
        </div>
      </footer>
    </>
  )
}
