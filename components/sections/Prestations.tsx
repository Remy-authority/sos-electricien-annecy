import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import type { Service } from '@/lib/content'
import { Trace } from '@/components/ui/Trace'

/**
 * Prestations de l'accueil (mise à jour du 10/10/2026) : une PHOTO de la prestation par carte,
 * son nom et une phrase courte (règle Rémy du 10/10 : « on veut des photos sur les
 * prestations »), à la place des icônes dans des pastilles. 3 colonnes sur ordinateur (deux
 * rangées pleines), 2 sur téléphone avec photo et nom seuls. Chaque carte mène à sa page.
 *
 * Photos choisies pour l'accueil : la prestation se comprend en trois secondes, aucun visage,
 * une main au plus. Les pages de prestation gardent leur propre photo.
 */
const CARTES: Record<string, { photo: string; alt: string; phrase: string; court?: string }> = {
  'urgence-depannage-electrique': {
    court: 'Dépannage d’urgence',
    photo: '/services/urgence-depannage-electrique-disjoncteur-v2.jpg',
    alt: 'Rangée de disjoncteurs dont un a sauté, levier en bas',
    phrase: "Coupure d'électricité ou disjoncteur qui saute, nous mettons en sécurité puis réparons.",
  },
  'recherche-panne-electrique': {
    photo: '/services/recherche-panne-electrique-diagnostic-v2.jpg',
    alt: 'Multimètre posé devant un tableau électrique ouvert',
    phrase: "Nous isolons les circuits un à un jusqu'au défaut, avant de réparer.",
  },
  'remise-aux-normes-tableau-electrique': {
    photo: '/services/remise-aux-normes-tableau-electrique-v2.jpg',
    alt: 'Tableau électrique neuf, porte ouverte, rangées de disjoncteurs câblées',
    phrase: 'Le vieux tableau à fusibles remplacé par un tableau aux normes.',
  },
  'renovation-electrique-complete': {
    photo: '/services/renovation-electrique-complete-cablage-v2.jpg',
    alt: 'Gaines électriques neuves posées sur un mur blanc avant les finitions',
    phrase: 'Câbles, prises et tableau repris pièce par pièce, murs ouverts au minimum.',
  },
  'mise-en-conformite-diagnostic-electrique': {
    photo: '/services/mise-en-conformite-diagnostic-electrique-v2.jpg',
    alt: 'Tableau électrique fermé au mur d\'un séjour clair, une lampe allumée à côté',
    phrase: 'Les anomalies du diagnostic avant vente ou location, reprises une à une.',
  },
  'installation-electrique-neuve': {
    photo: '/services/installation-electrique-neuve-pose.jpg',
    alt: 'Borne de recharge murale branchée à une voiture dans un garage',
    phrase: 'Maison neuve, extension ou borne de recharge, du tableau à la mise en service.',
  },
}

export default function Prestations({ services }: { services: Service[] }) {
  return (
    <section id="services" className="section-dark section scroll-mt-20" aria-labelledby="titre-prestations">
      <div className="container-site">
        <div className="text-center lg:text-left">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Nos prestations</p>
          <h2 id="titre-prestations" className="text-3xl text-white md:text-4xl">
            Du disjoncteur qui saute <span className="accent-serif text-accent">au tableau neuf</span>
          </h2>
        </div>

        <ul className="mt-9 grid grid-cols-2 gap-3 sm:gap-5 lg:mt-12 lg:grid-cols-3 lg:gap-6" role="list">
          {services.map((s, i) => {
            const c = CARTES[s.slug]
            return (
              <li key={s.slug} className="h-full">
                <Trace className="apparait h-full" style={{ '--t': `${(i % 3) * 120}ms` } as CSSProperties}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-white/10 bg-white/[0.04] transition-colors duration-300 hover:border-accent/50"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-primary-dark">
                    <Image
                      src={c?.photo ?? s.image ?? '/og.png'}
                      alt={c?.alt ?? s.navTitle}
                      fill
                      sizes="(min-width: 1024px) 380px, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col items-center px-3 pb-4 pt-3 text-center sm:px-5 sm:pb-5 sm:pt-4 lg:items-start lg:text-left">
                    <h3 className="text-balance font-sans text-[15px] font-bold leading-snug text-white sm:text-lg">
                      {c?.court ? (
                        <>
                          <span className="sm:hidden">{c.court}</span>
                          <span className="hidden sm:inline">{s.navTitle}</span>
                        </>
                      ) : (
                        s.navTitle
                      )}
                    </h3>
                    {c && <p className="mt-2 hidden text-sm leading-relaxed text-slate-300 sm:block">{c.phrase}</p>}
                    <span className="mt-auto hidden items-center gap-1.5 pt-4 text-sm font-semibold text-accent sm:inline-flex">
                      Voir la prestation
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </span>
                  </div>
                </Link>
                </Trace>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
