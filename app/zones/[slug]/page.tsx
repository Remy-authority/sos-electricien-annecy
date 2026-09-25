import type { Metadata } from 'next'
import { Fragment, type ReactNode } from 'react'
import fs from 'node:fs'
import path from 'node:path'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getZone, getZones, getServices, type Zone } from '@/lib/content'
import { buildMetadata, zoneJsonLd, jsonLdScript } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Faq from '@/components/ui/Faq'
import CtaBanner from '@/components/ui/CtaBanner'
import AccentWord from '@/components/ui/AccentWord'
import { BoltBadge } from '@/components/ui/Bolt'
import { PrixBloc } from '@/components/ui/ServiceBlock'
import ZoneSchema, { zoneSchemaKeys } from '@/components/schemas/ZoneSchema'

export const dynamicParams = false

export function generateStaticParams() {
  return getZones().map((z) => ({ slug: z.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const z = getZone(params.slug)
  if (!z) return {}
  return buildMetadata({ title: z.metaTitle, description: z.metaDescription, path: `/zones/${z.slug}` })
}

// ── Visuels de page commune ───────────────────────────────────────────────────
// Image d'en-tête : `image` du JSON si la commune en déclare une, sinon la photo
// dédiée `public/zones/<slug>.jpg` si elle existe sur le disque, sinon le pool.
// Visuel de corps : `bodyImage` du JSON (contrat du 25/09/2026). Les deux pools
// ci-dessous ne sont plus qu'un FILET DE SÉCURITÉ du template : une commune ajoutée
// sans visuel reçoit tout de même une image au lieu d'une image cassée.
const HERO_POOL = [
  '/zones/zone-pavillon.jpg',
  '/zones/zone-rue.jpg',
  '/zones/zone-interieur.jpg',
]

function zoneHero(zone: Zone, idx: number): string {
  if (zone.image) return zone.image
  const onDisk = path.join(process.cwd(), 'public', 'zones', `${zone.slug}.jpg`)
  return fs.existsSync(onDisk) ? `/zones/${zone.slug}.jpg` : HERO_POOL[idx % HERO_POOL.length]
}
const BODY_POOL = [
  { src: '/zones/zone-tableau.jpg', alt: 'Électricien testant un tableau électrique dans une maison individuelle', caption: 'Chaque circuit du tableau électrique est testé avant d’identifier la cause de la panne.' },
  { src: '/zones/zone-diagnostic.jpg', alt: 'Contrôle d’une prise électrique avec un testeur', caption: 'Un diagnostic précis évite de multiplier les interventions au hasard.' },
  { src: '/zones/zone-cablage.jpg', alt: 'Câblage électrique posé dans une gaine murale', caption: 'Chaque circuit est reposé selon un plan de câblage adapté à l’usage de la pièce.' },
]

/** Services liés par défaut quand le JSON ne déclare pas `relatedServices`. */
const DEFAULT_SERVICES = ['recherche-panne-electrique', 'urgence-depannage-electrique']

export default function ZonePage({ params }: { params: { slug: string } }) {
  const zone = getZone(params.slug)
  if (!zone) notFound()

  const zones = getZones()
  const idx = Math.max(0, zones.findIndex((z) => z.slug === zone.slug))
  const hero = zoneHero(zone, idx)
  const heroAlt = zone.imageAlt || `Vue de ${zone.name}, secteur d'intervention en dépannage électrique`

  const pool = BODY_POOL[idx % BODY_POOL.length]
  const body = zone.bodyImage
    ? { src: zone.bodyImage, alt: zone.bodyImageAlt || `Électricien au travail à ${zone.name}`, caption: zone.bodyImageCaption }
    : pool

  // Prestations liées : slugs du JSON, dans leur ordre ; sinon panne + urgence.
  const allServices = getServices()
  const wanted = zone.relatedServices?.length ? zone.relatedServices : DEFAULT_SERVICES
  const linkedServices = wanted
    .map((slug) => allServices.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  // Communes voisines : slug de content/zones (contrat), ou nom (anciens JSON). Une
  // entrée qui ne correspond à aucune page n'est pas affichée (jamais de lien mort).
  const neighbours = zone.neighbours
    .map((n) => zones.find((z) => z.slug === n || z.name.toLowerCase() === n.toLowerCase()))
    .filter((z): z is Zone => Boolean(z) && z!.slug !== zone.slug)

  // ── Rythme (Rémy 23/09/2026) : jamais plus de 2 H2 d'affilée sans visuel ──────
  // Un visuel après chaque paire de blocs : la photo de corps après le bloc 2, le
  // schéma sourcé après le bloc 4, puis (pages piliers à 6 blocs) un second schéma
  // après le bloc 6, avant le bloc prix et les listes de liens.
  // Photo et premier schéma sont OBLIGATOIRES : si la page a moins de 4 blocs, ceux
  // qui n'ont pas trouvé leur place viennent après le dernier bloc.
  const schemaKeys = zoneSchemaKeys(zone.slug)
  const visuals: { key: string; node: ReactNode; mandatory: boolean }[] = [
    { key: 'photo', node: <BodyFigure {...body} />, mandatory: true },
    ...schemaKeys.map((k, i) => ({
      key: `schema-${k}`,
      node: <ZoneSchema schema={k} zoneSlug={zone.slug} />,
      mandatory: i === 0,
    })),
  ]
  let nextVisual = 0
  const blocks = zone.blocks ?? []
  const afterBlock: ReactNode[][] = blocks.map(() => [])
  blocks.forEach((_, i) => {
    if ((i + 1) % 2 !== 0 || nextVisual >= visuals.length) return
    const v = visuals[nextVisual]
    afterBlock[i].push(<Fragment key={v.key}>{v.node}</Fragment>)
    nextVisual++
  })
  const trailing = visuals.slice(nextVisual).filter((v) => v.mandatory)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(zoneJsonLd(zone)) }}
      />
      {/* ── En-tête immersif nuit : même langage que l'accueil ── */}
      <header className="section-dark pb-12">
        <Breadcrumbs
          tone="dark"
          items={[
            { name: 'Accueil', path: '/' },
            { name: 'Zones', path: '/zones' },
            { name: zone.name, path: `/zones/${zone.slug}` },
          ]}
        />
        <div className="container-site pt-8 text-center lg:text-left">
          <BoltBadge label="Zone d'intervention" />
          <h1 className="accroche mx-auto mt-4 max-w-4xl text-[1.95rem] text-white max-lg:text-balance sm:text-5xl lg:mx-0">
            <AccentWord text={zone.h1} word={zone.name} className="not-italic text-accent" />
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            {zone.name} ({zone.postalCode}) · {siteConfig.region}
          </p>

          {/* Image d'en-tête */}
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-card border border-white/10 md:aspect-[21/9]">
            <Image
              src={hero}
              alt={heroAlt}
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
        <div className="prose-content mx-auto max-w-3xl text-center lg:text-left">
          {blocks.map((b, i) => (
            <Fragment key={b.heading}>
              <section>
                <h2>{b.heading}</h2>
                <p>{b.body}</p>
              </section>
              {afterBlock[i]}
            </Fragment>
          ))}
          {trailing.map((v) => (
            <Fragment key={v.key}>{v.node}</Fragment>
          ))}
        </div>

        <div className="mx-auto max-w-3xl">
          <PrixBloc
            heading={<>Tarifs d&apos;un électricien à <span className="whitespace-nowrap">{zone.name}</span></>}
            phrase={zone.prixPhrase}
          />

          {(linkedServices.length > 0 || neighbours.length > 0) && (
            <div className="mt-10 grid gap-8 text-center sm:grid-cols-2 lg:text-left">
              {linkedServices.length > 0 && (
                <nav aria-label={`Nos prestations à ${zone.name}`}>
                  <h2 className="text-xl">Nos prestations à {zone.name}</h2>
                  <ul className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
                    {linkedServices.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} className="inline-flex rounded-full border border-slate-300 px-3 py-1.5 text-sm hover:border-primary hover:text-primary">
                          {s.navTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              {neighbours.length > 0 && (
                <nav aria-label="Communes voisines">
                  <h2 className="text-xl">Communes voisines</h2>
                  <ul className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
                    {neighbours.map((n) => (
                      <li key={n.slug}>
                        <Link href={`/zones/${n.slug}`} className="inline-flex rounded-full border border-slate-300 px-3 py-1.5 text-sm hover:border-primary hover:text-primary">
                          {n.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          )}

          {zone.sources && zone.sources.length > 0 && (
            <div className="mt-10 border-t border-slate-200 pt-4 text-center text-xs text-slate-500 lg:text-left">
              <p className="font-semibold uppercase tracking-wider">Sources</p>
              <ul className="mt-2 space-y-1">
                {zone.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="nofollow noopener" className="underline underline-offset-2 hover:text-primary">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>

      <Faq items={zone.faq} />
      <CtaBanner title={`Panne électrique à ${zone.name} ?`} accentWord={zone.name} />
    </>
  )
}

/** Photo de corps en pleine colonne, légende dessous. */
function BodyFigure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="mt-8">
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-card border border-slate-200 shadow-sm">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      {caption && <figcaption className="mt-2 text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  )
}
