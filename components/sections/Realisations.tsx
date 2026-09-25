import Image from 'next/image'
import { BoltBadge } from '@/components/ui/Bolt'

/**
 * Section « Nos interventions les plus courantes » : grille de 4 cartes.
 * 25/09/2026 : ce ne sont PAS des chantiers passés (images générées). Les cartes
 * décrivent le type de travail, sans lieu, sans date, sans durée.
 * `panne-v2.jpg` et `mise-aux-normes-v2.jpg` remplacent les anciennes images (la
 * photo de mise aux normes montrait une prise allemande de type F).
 */

const INTERVENTIONS = [
  {
    id: 'tableau',
    category: 'Tableau électrique',
    title: "Remplacement d'un tableau vétuste",
    desc: 'Tableau à fusibles déposé, remplacé par des disjoncteurs modulaires sur rail DIN avec protection différentielle en tête de rangée.',
    image: '/realisations/tableau.jpg',
  },
  {
    id: 'panne',
    category: 'Recherche de panne',
    title: "Localisation d'un court-circuit",
    desc: "Circuits isolés un à un jusqu'au point en défaut, souvent une boîte de dérivation ou une prise abîmée, puis réparation.",
    image: '/realisations/panne-v2.jpg',
  },
  {
    id: 'installation-neuve',
    category: 'Installation neuve',
    title: 'Borne de recharge au garage',
    desc: 'Ligne dédiée tirée depuis le tableau, avec une protection différentielle propre au circuit de recharge.',
    image: '/realisations/borne-recharge.jpg',
  },
  {
    id: 'diagnostic-vente',
    category: 'Conformité après diagnostic',
    title: 'Reprise des anomalies du diagnostic',
    desc: 'Terre, liaisons équipotentielles de la salle de bain, protections adaptées à la section des câbles : nous corrigeons les points relevés.',
    image: '/zones/meythet-corps.jpg',
  },
]

export default function Realisations() {
  return (
    <section className="section-dark section" aria-labelledby="realisations-title">
      <div className="container-site">
        <div className="mb-10 text-center">
          <BoltBadge label="Au quotidien" />
          <h2 id="realisations-title" className="mt-4 text-3xl text-white md:text-4xl">
            Nos interventions <span className="accent-serif text-accent">les plus courantes</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">
            Quatre demandes qui reviennent souvent, et ce que nous faisons pour y répondre.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {INTERVENTIONS.map((real) => (
            <article key={real.id} className="card-glass card-glass-interactive overflow-hidden p-0">
              {/* Visuel, photo d'intervention */}
              <div className="relative aspect-square w-full bg-dark">
                <Image
                  src={real.image}
                  alt={`${real.category}, ${real.title}`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                {/* Fondu bas : ancre la photo dans la carte sombre */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark/80 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="p-3 text-center sm:p-4 sm:text-left">
                {/* Badge catégorie */}
                <span className="mb-2 inline-block rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 text-[9px] sm:px-2.5 sm:text-[10px] font-bold uppercase tracking-wider text-accent">
                  {real.category}
                </span>
                <h3 className="text-sm leading-snug text-white">{real.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{real.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
