import Image from 'next/image'
import { siteConfig } from '@/config/site.config'
import AccentWord from '@/components/ui/AccentWord'
import HomeDiagnosticSchema from '@/components/schemas/HomeDiagnosticSchema'

/**
 * Bloc « À propos » de l'accueil.
 * 25/09/2026 : plus aucune personne nommée ni photo de portrait (persona fictive
 * retirée), plus de chiffre inventé. La photo montre le métier (tableau électrique).
 * Le schéma d'aide au choix (diagnostic obligatoire ou non) occupe une seconde rangée
 * pleine largeur dans ce même bloc : aucun bloc ajouté à l'accueil.
 */
export default function About() {
  return (
    <section className="section" aria-labelledby="about-title">
      <div className="container-site grid gap-10 md:grid-cols-2 md:items-center lg:gap-16">
        {/* Visuel métier */}
        <div className="relative order-2 md:order-1">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src="/a-propos-tableau.jpg"
              alt="Tableau électrique neuf, porte ouverte, dans une buanderie claire et rangée"
              width={560}
              height={420}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Texte */}
        <div className="order-1 text-center md:order-2 md:text-left">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent-deep">
            Notre équipe
          </p>
          <h2 id="about-title" className="text-2xl font-bold md:text-3xl">
            <AccentWord text={siteConfig.about.title} word={siteConfig.city} />
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">{siteConfig.about.body}</p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5">
            <svg className="h-5 w-5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="text-sm font-semibold text-primary">{siteConfig.about.highlight}</span>
          </div>

          <ul className="mx-auto mt-6 w-fit space-y-3 text-left md:mx-0" role="list">
            {siteConfig.methods.map((m) => (
              <li key={m} className="flex items-center gap-3 text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-dark">
                  <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {m}
              </li>
            ))}
          </ul>
        </div>

        {/* Schéma d'aide au choix, rangée pleine largeur */}
        <HomeDiagnosticSchema />
      </div>
    </section>
  )
}
