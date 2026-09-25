import type { Metadata } from 'next'
import Link from 'next/link'
import { getZones } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import ServiceAreaMap from '@/components/sections/ServiceAreaMap'
import Faq from '@/components/ui/Faq'
import CtaBanner from '@/components/ui/CtaBanner'

export const metadata: Metadata = buildMetadata({
  title: "Électricien autour d'Annecy : les 12 communes couvertes",
  description:
    "Seynod, Cran-Gevrier, Meythet, Rumilly ou les rives du lac : trouvez votre commune et ce que nous faisons pour un dépannage électrique près de chez vous.",
  path: '/zones',
})

export default function ZonesHub() {
  const zones = getZones()
  const names = zones.map((z) => z.name)
  // Réponse courte factuelle « citable » (activité + zone + liste des communes).
  const citable = `${siteConfig.businessName} couvre ${siteConfig.city} et ${zones.length} communes autour d'Annecy, dans un rayon de ${siteConfig.serviceArea.radiusKm} km : ${names.join(', ')}. Dépannage électrique et diagnostic précis, 7j/7.`

  const hubFaq = [
    {
      q: `Quelles communes couvrez-vous autour d'${siteConfig.city} ?`,
      a: `Nous intervenons à ${siteConfig.city} (tous quartiers) et dans les communes de l'agglomération dans un rayon d'environ ${siteConfig.serviceArea.radiusKm} km : ${names.join(', ')}.`,
    },
    {
      q: 'Pas de page pour ma commune : est-elle pour autant hors de votre secteur ?',
      a: `La liste ci-dessus regroupe les communes disposant d'une page dédiée, mais notre zone est plus large. Nous couvrons ${siteConfig.city} et ses environs dans un rayon d'environ ${siteConfig.serviceArea.radiusKm} km. Si votre adresse se trouve un peu au-delà, citez-la lors de l'appel : nous vous dirons si le trajet reste raisonnable.`,
    },
    {
      q: 'Rumilly ou Saint-Jorioz : quand pouvez-vous être là ?',
      a: "Cela tient à la distance depuis Annecy et aux chantiers déjà prévus ce jour-là. Au téléphone, nous vous annonçons une heure d'arrivée réaliste, sans l'embellir, et les urgences sont prises en compte tous les jours, dimanches et fériés compris.",
    },
    {
      q: 'Faut-il payer le trajet jusqu’à une commune voisine ?',
      a: `Les frais de déplacement figurent sur [notre page tarifs](/tarifs) et vous sont annoncés au téléphone, avant que nous prenions la route. Pour la réparation elle-même, le devis écrit vient après le diagnostic sur place, et rien ne commence sans votre accord.`,
    },
  ]

  return (
    <>
      <section className="container-site section">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent-deep">Zone d'intervention</p>
          <h1 className="mt-2 text-3xl md:text-4xl">
            Nos zones d'intervention autour d'
            <span className="accent-serif text-accent-deep">{siteConfig.city}</span>
          </h1>
        </div>

        {/* Réponse courte factuelle « citable » (GEO) */}
        <p className="mt-5 max-w-3xl rounded-card bg-light p-5 text-center text-slate-700 sm:text-left">{citable}</p>

        {/* Cartes enrichies : contexte par commune */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {zones.map((z) => (
            <li key={z.slug}>
              <Link
                href={`/zones/${z.slug}`}
                className="card card-interactive group flex h-full flex-col items-center text-center sm:items-stretch sm:text-left"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-lg font-bold text-slate-900 group-hover:text-primary">{z.name}</span>
                  <span className="shrink-0 text-sm text-slate-500">{z.postalCode}</span>
                </div>
                {z.context && <p className="mt-2 text-sm leading-relaxed text-slate-600">{z.context}</p>}
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Électricien à {z.name}
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Carte de couverture (composant partagé) */}
      <ServiceAreaMap />

      {/* FAQ + FAQPage JSON-LD (émis par le composant Faq) */}
      <Faq items={hubFaq} title="Questions sur notre zone d'intervention" />

      <CtaBanner />
    </>
  )
}
