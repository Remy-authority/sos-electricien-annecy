import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site.config'
import { getServices } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import CtaBanner from '@/components/ui/CtaBanner'
import Faq from '@/components/ui/Faq'
import LeadForm from '@/components/ui/LeadForm'
import Hero from '@/components/sections/Hero'
import TrustBadges from '@/components/sections/TrustBadges'
import About from '@/components/sections/About'
import Process from '@/components/sections/Process'
import Stats from '@/components/sections/Stats'
import WhyUs from '@/components/sections/WhyUs'
import ServiceAreaMap from '@/components/sections/ServiceAreaMap'
import Realisations from '@/components/sections/Realisations'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { BoltBadge } from '@/components/ui/Bolt'

const TITLE = "Électricien d'urgence à Annecy, dépannage rapide"
const DESC =
  "Électricien à Annecy et environs : dépannage, tableau électrique, mise aux normes. Intervention rapide. Devis et prise de contact en ligne."

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESC, path: '/' })

export default function HomePage() {
  const services = getServices()
  // DEMO – contenu imaginé persona Thomas Mercier, à affiner par ST-5
  const homeFaq = siteConfig.homeFaq as unknown as { q: string; a: string }[]

  return (
    <>
      <Hero />
      <TrustBadges />

      {/* Services : section immersive nuit, cartes en verre (pièce maîtresse) */}
      <section className="section-dark section" aria-labelledby="services-title">
        <div className="container-site">
          <div className="mb-10 text-center sm:text-left">
            <BoltBadge label="Ce que nous faisons" />
            <h2
              id="services-title"
              className="mt-4 text-3xl text-white md:text-4xl"
            >
              Nos <span className="accent-serif text-accent">prestations</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group card-glass card-glass-interactive block text-center sm:text-left"
              >
                <div className="chip-accent mx-auto mb-4 h-11 w-11 sm:mx-0">
                  <ServiceIcon icon={s.icon} className="h-5 w-5" />
                </div>
                <h3 className="text-lg text-white transition-colors group-hover:text-accent">
                  {s.navTitle}
                </h3>
                <ul className="mt-3 mx-auto w-fit space-y-1.5 text-sm text-slate-300 sm:mx-0">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  En savoir plus
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <About />
      <Process />
      {siteConfig.features.gallery && <Realisations />}

      {/* Formulaire devis, section dédiée (recommandation CEO, form hors hero) */}
      <section id="devis" className="section bg-slate-100" aria-labelledby="devis-title">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 text-center">
              <BoltBadge label="Devis gratuit" tone="light" />
              <h2 id="devis-title" className="mt-4 text-2xl md:text-3xl">
                Décrivez votre problème en{' '}
                <span className="accent-serif text-accent-deep">3 étapes</span>
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Nous vous rappelons sous 30 minutes, sans engagement.
              </p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      <WhyUs />

      <CtaBanner />

      <ServiceAreaMap />

      <Faq items={homeFaq} />
    </>
  )
}
