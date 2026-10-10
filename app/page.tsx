import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'
import { getServices, getZones } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import Faq from '@/components/ui/Faq'
import LeadForm from '@/components/ui/LeadForm'
import { Trace } from '@/components/ui/Trace'
import Hero from '@/components/sections/Hero'
import Engagements from '@/components/sections/Engagements'
import Prestations from '@/components/sections/Prestations'
import { ChantierAnnecy } from '@/components/sections/ChantierAnnecy'
import Methode from '@/components/sections/Methode'
import { CarteAnnecy } from '@/components/sections/CarteAnnecy'

// 25/09/2026 : requête d'argent « électricien annecy » (590 recherches/mois, DataForSEO)
// en tête du title ; le H1 reste « Électricien d'urgence à Annecy ».
const TITLE = "Électricien à Annecy, dépannage d'urgence 24h/24"
const DESC =
  "Panne de courant, disjoncteur qui saute, tableau à refaire à Annecy : diagnostic sur place, devis écrit avant travaux. Décrivez votre panne en 30 secondes."

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESC, path: '/' })

/*
 * Accueil, mise à jour du 10/10/2026 : 8 blocs, chacun animé à l'apparition.
 * 1 bloc 1 · 2 engagements dessinés · 3 prestations en photos · 4 déroulé au défilement
 * · 5 notre façon de travailler · 6 formulaire · 7 carte des communes · 8 FAQ claire.
 * Retirés (trop de texte, redites) : bandeau de badges, chiffres, « à propos »,
 * « pourquoi nous », réalisations et bande d'appel au-dessus du pied de page.
 */
export default function HomePage() {
  const homeFaq = siteConfig.homeFaq as unknown as { q: string; a: string }[]

  return (
    <>
      <Hero />
      <Engagements />
      <Prestations services={getServices()} />
      <ChantierAnnecy />
      <Methode />

      <section id="devis" className="section scroll-mt-20 bg-slate-100" aria-labelledby="devis-title">
        <div className="container-site">
          <Trace className="apparait mx-auto max-w-2xl">
            <div className="mb-6 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-deep">Devis gratuit</p>
              <h2 id="devis-title" className="text-2xl md:text-3xl">
                Décrivez votre panne en <span className="accent-serif text-accent-deep">3 étapes</span>
              </h2>
              <p className="mt-2 text-sm text-slate-600">Nous revenons vers vous pour fixer le diagnostic, sans engagement.</p>
            </div>
            <LeadForm />
          </Trace>
        </div>
      </section>

      <CarteAnnecy zones={getZones()} />

      <Faq items={homeFaq} tone="light" />
    </>
  )
}
