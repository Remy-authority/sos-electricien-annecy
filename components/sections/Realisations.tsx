import Image from 'next/image'
import { BoltBadge } from '@/components/ui/Bolt'

/**
 * Section « Nos réalisations », grille de 4 cartes d'intervention.
 * Photos générées par IA (DEMO – à remplacer par de vraies photos du loueur).
 */

const REALISATIONS = [
  {
    id: 'tableau',
    category: 'Tableau électrique',
    title: 'Remplacement de tableau vétuste',
    desc: 'Ancien tableau à fusibles remplacé par un modèle aux normes, appartement Annecy centre.',
    image: '/realisations/tableau.jpg',
  },
  {
    id: 'panne',
    category: 'Recherche de panne',
    title: 'Court-circuit localisé et réparé',
    desc: 'Origine identifiée sur un boîtier de dérivation en moins d\'une heure, maison individuelle Poisy.',
    image: '/realisations/panne.jpg',
  },
  {
    id: 'installation-neuve',
    category: 'Installation neuve',
    title: 'Installation de borne de recharge',
    desc: 'Ligne dédiée et protection différentielle posées dans un garage, résidence Veyrier-du-Lac.',
    image: '/realisations/borne-recharge.jpg',
  },
  {
    id: 'diagnostic-vente',
    category: 'Diagnostic avant vente',
    title: 'Mise en conformité avant vente',
    desc: 'Diagnostic et travaux de conformité NFC 15-100 réalisés avant la vente, copropriété Seynod.',
    image: '/realisations/mise-aux-normes.jpg',
  },
]

export default function Realisations() {
  return (
    <section className="section-dark section" aria-labelledby="realisations-title">
      <div className="container-site">
        <div className="mb-10 text-center">
          <BoltBadge label="Notre travail" />
          <h2 id="realisations-title" className="mt-4 text-3xl text-white md:text-4xl">
            Nos <span className="accent-serif text-accent">réalisations</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">
            Quelques interventions récentes sur Annecy et la Haute-Savoie.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REALISATIONS.map((real) => (
            <article key={real.id} className="card-glass card-glass-interactive overflow-hidden p-0">
              {/* Visuel, photo d'intervention */}
              <div className="relative aspect-square w-full bg-dark">
                <Image
                  src={real.image}
                  alt={`${real.category}, ${real.title}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                {/* Fondu bas : ancre la photo dans la carte sombre */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark/80 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="p-4 text-center sm:text-left">
                {/* Badge catégorie */}
                <span className="mb-2 inline-block rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
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
