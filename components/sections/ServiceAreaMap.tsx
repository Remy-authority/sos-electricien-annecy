import { siteConfig } from '@/config/site.config'
import { getZones } from '@/lib/content'
import { CarteAnnecyDessin } from '@/components/sections/CarteAnnecy'

const REASSURANCE_CARDS = [
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    // 26/09/2026 (Rémy) : les anciennes cartes « Intervention rapide » et « Artisan local »
    // répétaient le bandeau du haut et « Pourquoi nous choisir » ; place à deux repères de zone.
    title: 'Annecy et ses communes déléguées',
    desc: 'Annecy-le-Vieux, Cran-Gevrier, Meythet, Pringy et Seynod font partie d\'Annecy depuis 2017, et chacune a sa page.',
  },
  {
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
    title: 'Du tour du lac à l\'Albanais',
    desc: 'De Sevrier, Saint-Jorioz et Veyrier-du-Lac jusqu\'à Rumilly, dans un rayon de 30 km autour d\'Annecy.',
  },
]

export default function ServiceAreaMap() {
  const zones = getZones()

  return (
    <section className="section bg-light" aria-labelledby="area-title">
      <div className="container-site">
        {/* En-tête centré */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-deep">
            Zone d'intervention
          </p>
          <h2 id="area-title" className="text-2xl font-bold md:text-3xl">
            Basés à <span className="accent-serif text-accent-deep">{siteConfig.city}</span>, nous
            couvrons un rayon de {siteConfig.serviceArea.radiusKm} km
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Artisan local en {siteConfig.region}, nous intervenons à {siteConfig.city} et dans
            les communes voisines listées ci-dessous.
          </p>
        </div>

        {/* Grille 2 colonnes */}
        <div className="grid gap-6 lg:grid-cols-[3fr_2fr] lg:items-start">

          {/* Carte dessinée du bassin annécien (Rémy 22/11/2026), la même qu'à l'accueil, avec le point
              de l'atelier et sa légende. Les communes ont leurs cartes au-dessus ; les quartiers
              d'Annecy restent écrits sous la carte. */}
          <div className="rounded-card bg-primary-dark p-4 text-slate-300 shadow-card-hover sm:p-6">
            <CarteAnnecyDessin zones={zones} className="mx-auto w-full max-w-[540px]" />
            <p className="mt-4 text-balance text-center text-sm text-slate-300">
              Et tous les quartiers d'{siteConfig.city} : {siteConfig.serviceArea.districts.join(', ')}.
            </p>
            <p className="mt-2 text-balance text-center text-sm text-slate-400">
              Votre commune manque à la liste ? Donnez-nous l'adresse au téléphone et nous regardons la route ensemble.
            </p>
          </div>

          {/* Colonne droite : cartes réassurance + CTA orange */}
          <div className="flex flex-col gap-4">
            {REASSURANCE_CARDS.map((card) => (
              <div key={card.title} className="card flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[3px] bg-primary/10 text-primary">
                  {card.icon}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900">{card.title}</h4>
                  <p className="mt-1 text-sm text-slate-600">{card.desc}</p>
                </div>
              </div>
            ))}

            {/* CTA orange principal, façon template */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="btn-accent w-full justify-center rounded-[3px] py-4 text-base"
              aria-label={`Vérifier ma zone, appeler le ${siteConfig.phoneDisplay}`}
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              Vérifier ma zone · {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
