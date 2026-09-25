import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BlockIcon } from './ServiceIcon'
import { extractNumberedSteps } from '@/lib/text'
import type { ContentBlock } from '@/lib/content'

/**
 * ServiceBlock, un bloc H2 de page service (content/services/*.json).
 *
 * Aère le mur de texte sans jamais changer le texte lui-même (SEO/GEO déjà bon,
 * on ne touche qu'au visuel) :
 *  - icône badge à côté du H2, déduite du titre (voir `matchBlockIcon`)
 *  - si le corps contient une liste "1. … 2. … 3. …" déjà rédigée, elle est
 *    détectée et rendue en checklist numérotée au lieu d'un paragraphe brut.
 *  - si le bloc a un visuel explicatif (`block.image`), il est intégré en pied
 *    de bloc. `eager` : ne concerne que la 1ère image de la page (les suivantes
 *    restent en lazy loading par défaut de next/image).
 */
export default function ServiceBlock({ block, eager = false }: { block: ContentBlock; eager?: boolean }) {
  const parsed = extractNumberedSteps(block.body)

  return (
    <section className="text-center lg:text-left">
      <h2 className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary" aria-hidden="true">
          <BlockIcon heading={block.heading} className="h-5 w-5" />
        </span>
        {block.heading}
      </h2>

      {parsed ? (
        <>
          {parsed.lead && <p>{parsed.lead}</p>}
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {parsed.steps.map((step, i) => {
              // Nombre d'étapes impair : la dernière carte prend toute la largeur
              // sur la dernière ligne (évite une carte orpheline seule à gauche).
              const isLoneLast = i === parsed.steps.length - 1 && parsed.steps.length % 2 === 1
              return (
              <li key={i} className={`flex gap-3 rounded-xl text-left border border-slate-200 bg-white p-4 shadow-sm${isLoneLast ? ' sm:col-span-2' : ''}`}>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-dark" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-slate-700">{step}</span>
              </li>
              )
            })}
          </ol>
        </>
      ) : (
        <p>{block.body}</p>
      )}

      {block.image && (
        <figure className="mt-5">
          {/* Largeur pleine colonne, alignée sur `.article-prose img` (w-full + cadre léger). */}
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-card border border-slate-200 shadow-sm">
            <Image
              src={block.image}
              alt={block.imageAlt || block.heading}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
              loading={eager ? 'eager' : 'lazy'}
            />
          </div>
          {block.imageCaption && (
            <figcaption className="mt-2 text-sm text-slate-500">{block.imageCaption}</figcaption>
          )}
        </figure>
      )}
    </section>
  )
}

/**
 * PrixBloc, bloc prix des pages prestation ET commune (mise à jour du 25/09/2026).
 *
 * Carte distincte des blocs de texte (pastille €, fond clair) : une phrase de contenu
 * (`prixPhrase`, écrite par le SEO dans le JSON, jamais de prix codé ici) et le lien
 * vers la page /tarifs. Règle Rémy du 18/09 : la page Tarifs est reliée depuis le corps
 * de page et les prestations, jamais par un bouton « prix » en haut de page.
 */
export function PrixBloc({ heading, phrase }: { heading: ReactNode; phrase?: string }) {
  if (!phrase) return null
  return (
    <section
      aria-labelledby="bloc-prix"
      className="mt-10 rounded-card border border-accent/40 bg-accent/10 p-5 text-center sm:p-7 lg:text-left"
    >
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:items-start">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-bold text-dark"
          aria-hidden="true"
        >
          €
        </span>
        <div>
          <h2 id="bloc-prix" className="text-xl">{heading}</h2>
          <p className="mt-2 leading-relaxed text-slate-700">{phrase}</p>
          <Link
            href="/tarifs"
            className="mt-4 inline-flex items-center gap-2 font-semibold text-primary underline underline-offset-4 hover:text-primary-dark"
          >
            Voir nos tarifs détaillés
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
