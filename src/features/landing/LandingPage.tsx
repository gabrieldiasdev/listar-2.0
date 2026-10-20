import '@fontsource-variable/fraunces'
import { ClosingSection } from './components/ClosingSection'
import { Faq } from './components/Faq'
import { Features } from './components/Features'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { SiteHeader } from './components/SiteHeader'
import { Story } from './components/Story'

export function LandingPage() {
  return (
    <div className="min-h-dvh overflow-x-clip bg-cream text-slate-900">
      <SiteHeader />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Story />
        <Faq />
        <ClosingSection />
      </main>
    </div>
  )
}
