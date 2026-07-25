import Image from 'next/image'

/**
 * Section « Nos réalisations », grille de 4 cartes d'intervention.
 * Photos générées par IA (DEMO – à remplacer par de vraies photos du loueur).
 */

const REALISATIONS = [
  {
    id: 'tableau',
    category: 'Tableau électrique',
    categoryColor: 'bg-indigo-600',
    title: 'Remplacement de tableau vétuste',
    desc: 'Ancien tableau à fusibles remplacé par un modèle aux normes, appartement Annecy centre.',
    image: '/realisations/tableau.jpg',
  },
  {
    id: 'panne',
    category: 'Recherche de panne',
    categoryColor: 'bg-violet-600',
    title: 'Court-circuit localisé et réparé',
    desc: 'Origine identifiée sur un boîtier de dérivation en moins d\'une heure, maison individuelle Poisy.',
    image: '/realisations/panne.jpg',
  },
  {
    id: 'installation-neuve',
    category: 'Installation neuve',
    categoryColor: 'bg-emerald-600',
    title: 'Installation de borne de recharge',
    desc: 'Ligne dédiée et protection différentielle posées dans un garage, résidence Veyrier-du-Lac.',
    image: '/realisations/borne-recharge.jpg',
  },
  {
    id: 'diagnostic-vente',
    category: 'Diagnostic avant vente',
    categoryColor: 'bg-amber-600',
    title: 'Mise en conformité avant vente',
    desc: 'Diagnostic et travaux de conformité NFC 15-100 réalisés avant la vente, copropriété Seynod.',
    image: '/realisations/mise-aux-normes.jpg',
  },
]

export default function Realisations() {
  return (
    <section className="section bg-light" aria-labelledby="realisations-title">
      <div className="container-site">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Notre travail</p>
          <h2 id="realisations-title" className="text-2xl font-bold text-slate-900 md:text-3xl">
            Nos <span className="accent-serif text-primary">réalisations</span>
          </h2>
          <p className="mt-3 text-slate-500 text-sm max-w-xl mx-auto">
            Quelques interventions récentes sur Annecy et la Haute-Savoie.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REALISATIONS.map((real) => (
            <article key={real.id} className="card card-interactive overflow-hidden p-0">
              {/* Visuel, photo d'intervention */}
              <div className="relative aspect-square w-full bg-slate-800">
                <Image
                  src={real.image}
                  alt={`${real.category}, ${real.title}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="p-4 text-center sm:text-left">
                {/* Badge catégorie */}
                <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${real.categoryColor} mb-2`}>
                  {real.category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm leading-snug">{real.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{real.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
