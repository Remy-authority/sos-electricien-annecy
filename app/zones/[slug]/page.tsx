import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getZone, getZones, getServices } from '@/lib/content'
import { buildMetadata, zoneJsonLd, jsonLdScript } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Faq from '@/components/ui/Faq'
import CtaBanner from '@/components/ui/CtaBanner'
import AccentWord from '@/components/ui/AccentWord'
import { BoltBadge, BoltWatermark } from '@/components/ui/Bolt'

export const dynamicParams = false

export function generateStaticParams() {
  return getZones().map((z) => ({ slug: z.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const z = getZone(params.slug)
  if (!z) return {}
  return buildMetadata({ title: z.metaTitle, description: z.metaDescription, path: `/zones/${z.slug}` })
}

// Pool d'images partagé (template N+1) : chaque commune reçoit un hero + une image
// de corps, assignés de façon déterministe par position dans la liste triée. Un
// nouveau JSON de commune récupère donc automatiquement des visuels, sans génération.
const HERO_POOL = [
  '/zones/zone-pavillon.jpg',
  '/zones/zone-rue.jpg',
  '/zones/zone-interieur.jpg',
]
const BODY_POOL = [
  { src: '/zones/zone-tableau.jpg', alt: 'Électricien testant un tableau électrique dans une maison individuelle', caption: 'Chaque circuit du tableau électrique est testé avant d’identifier la cause de la panne.' },
  { src: '/zones/zone-diagnostic.jpg', alt: 'Contrôle d’une prise électrique avec un testeur', caption: 'Un diagnostic précis évite de multiplier les interventions au hasard.' },
  { src: '/zones/zone-cablage.jpg', alt: 'Câblage électrique posé dans une gaine murale', caption: 'Chaque circuit est reposé selon un plan de câblage adapté à l’usage de la pièce.' },
]

export default function ZonePage({ params }: { params: { slug: string } }) {
  const zone = getZone(params.slug)
  if (!zone) notFound()

  const zones = getZones()
  const idx = Math.max(0, zones.findIndex((z) => z.slug === zone.slug))
  const hero = HERO_POOL[idx % HERO_POOL.length]
  const body = BODY_POOL[(idx + 1) % BODY_POOL.length]

  // Maillage : service principal = recherche de panne + urgence.
  const mainServices = getServices().filter((s) =>
    ['recherche-panne-electrique', 'urgence-depannage-electrique'].includes(s.slug),
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(zoneJsonLd(zone)) }}
      />
      {/* ── En-tête immersif nuit : même langage que l'accueil ── */}
      <header className="section-dark pb-12">
        <BoltWatermark className="-left-24 -top-24 h-[26rem] w-[26rem] -rotate-12" />
        <Breadcrumbs
          tone="dark"
          items={[
            { name: 'Accueil', path: '/' },
            { name: 'Zones', path: '/zones' },
            { name: zone.name, path: `/zones/${zone.slug}` },
          ]}
        />
        <div className="container-site pt-8">
          <BoltBadge label="Zone d'intervention" />
          <h1 className="accroche mt-4 max-w-4xl text-[2.1rem] text-white sm:text-5xl">
            <AccentWord text={zone.h1} word={zone.name} className="not-italic text-accent" />
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            {zone.name} ({zone.postalCode}) · {siteConfig.region}
          </p>

          {/* Image d'en-tête */}
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-card border border-white/10 md:aspect-[21/9]">
            <Image
              src={hero}
              alt={`Électricien à ${zone.name}`}
              fill
              sizes="(min-width: 1200px) 1152px, 100vw"
              className="object-cover"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Réponse courte factuelle « citable » (GEO) */}
          <p className="card-glass mt-6 leading-relaxed text-slate-200">{zone.intro}</p>
        </div>
      </header>

      <article className="container-site section">
        <div className="prose-content mx-auto max-w-3xl">
          {zone.blocks.map((b, i) => (
            <section key={b.heading}>
              <h2>{b.heading}</h2>
              <p>{b.body}</p>

              {/* Image de corps insérée après le 1er bloc */}
              {i === 0 && (
                <figure className="mt-6">
                  {/* Largeur pleine colonne, alignée sur `.article-prose img` (w-full + cadre léger). */}
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-card border border-slate-200 shadow-sm">
                    <Image
                      src={body.src}
                      alt={body.alt}
                      fill
                      sizes="(min-width: 768px) 768px, 100vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-2 text-sm text-slate-500">{body.caption}</figcaption>
                </figure>
              )}
            </section>
          ))}
        </div>

        <nav aria-label="Nos services" className="mt-10 mx-auto max-w-3xl">
          <h2 className="text-xl">Nos services d'électricien</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {mainServices.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="rounded-full border border-slate-300 px-3 py-1.5 text-sm hover:border-primary hover:text-primary">
                  {s.navTitle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>

      <Faq items={zone.faq} />
      <CtaBanner title={`Panne électrique à ${zone.name} ?`} accentWord={zone.name} />
    </>
  )
}
