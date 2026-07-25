import type { Metadata } from 'next'
import { Fragment } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getService, getServices, getRelatedArticles } from '@/lib/content'
import { buildMetadata, serviceJsonLd, jsonLdScript } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Faq from '@/components/ui/Faq'
import CtaBanner from '@/components/ui/CtaBanner'
import ServiceQuickFacts from '@/components/ui/ServiceQuickFacts'
import ServiceBlock from '@/components/ui/ServiceBlock'
import AccentWord from '@/components/ui/AccentWord'
import { BoltBadge, BoltDivider } from '@/components/ui/Bolt'

// 100% SSG : une page statique par service.
export const dynamicParams = false

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug)
  if (!s) return {}
  return buildMetadata({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/services/${s.slug}`,
  })
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug)
  if (!service) notFound()

  const related = getServices().filter((s) => service.relatedServices.includes(s.slug))
  const articles = getRelatedArticles(service.slug)
  const firstBlockImageIndex = service.blocks.findIndex((b) => b.image)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(serviceJsonLd(service)) }}
      />
      {/* ── En-tête immersif nuit : même langage que l'accueil ── */}
      <header className="section-dark pb-12">
        <Breadcrumbs
          tone="dark"
          items={[
            { name: 'Accueil', path: '/' },
            { name: 'Services', path: '/' },
            { name: service.navTitle, path: `/services/${service.slug}` },
          ]}
        />
        <div className="container-site pt-8">
          <BoltBadge label="Prestation" />
          {/* Accroche entière en serif italique, la ville en ambre */}
          <h1 className="accroche mt-4 max-w-4xl text-[2.1rem] text-white sm:text-5xl">
            <AccentWord text={service.h1} word={siteConfig.city} className="not-italic text-accent" />
          </h1>

          {/* Image hero du service */}
          {service.image && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-card border border-white/10 md:aspect-[21/9]">
              <Image
                src={service.image}
                alt={service.h1}
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
          )}

          {/* En bref (réponse courte GEO), en carte de verre */}
          <p className="card-glass mt-6 leading-relaxed text-slate-200">{service.intro}</p>
        </div>
      </header>

      <article className="container-site section">
        <ServiceQuickFacts bullets={service.bullets} />

        <div className="mx-auto max-w-3xl">
          {/* Séparateur de marque entre deux blocs H2 : donne un rythme éditorial
              propre à ce site (le pilote d'Angers empile les blocs sans respiration)
              et met en service l'éclair `BoltDivider`. Purement décoratif
              (`aria-hidden` dans le composant), aucune incidence sur le contenu. */}
          <div className="prose-content mt-10 space-y-8">
            {service.blocks.map((b, i) => (
              <Fragment key={b.heading}>
                {i > 0 && <BoltDivider />}
                <ServiceBlock block={b} eager={i === firstBlockImageIndex} />
              </Fragment>
            ))}
          </div>

          {/* Maillage interne : services liés */}
          {related.length > 0 && (
            <nav aria-label="Services liés" className="mt-10">
              <h2 className="text-xl">Prestations liées</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/services/${r.slug}`} className="rounded-full border border-slate-300 px-3 py-1.5 text-sm hover:border-primary">
                      {r.navTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* Maillage interne automatique : articles du cluster */}
          {articles.length > 0 && (
            <nav aria-label="Conseils liés" className="mt-8">
              <h2 className="text-xl">À lire aussi</h2>
              <ul className="mt-3 space-y-1 text-sm">
                {articles.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/conseils/${a.slug}`} className="text-primary underline">{a.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </article>

      <Faq items={service.faq} />
      <CtaBanner
        title={`${service.navTitle} à ${siteConfig.city} : on vous rappelle vite`}
        subtitle="Devis gratuit, sans engagement. Appelez ou laissez vos coordonnées."
      />
    </>
  )
}
