import Link from 'next/link'
import { siteConfig } from '@/config/site.config'
import { getServices, getZones } from '@/lib/content'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  const services = getServices()
  const zones = getZones()
  const year = 2026

  return (
    <footer
      className="texture-noise relative isolate mb-14 overflow-hidden bg-dark text-slate-300 md:mb-0"
      role="contentinfo"
    >
      {/* Halo primaire très diffus : évite l'aplat sombre uniforme sur toute la hauteur.
          `isolate` sur le footer + `-z-10` ici = le halo passe au-dessus du fond sombre
          mais reste sous le contenu, sans avoir à positionner chaque bloc. */}
      <div
        className="pointer-events-none absolute -left-32 top-0 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />
      {/* Bande téléphone retirée le 10/10/2026 : numéro répété au-dessus du pied de page
          (refus de Rémy). Il reste au header, au bouton flottant et à la barre du téléphone. */}

      {/* Grille nav.
          Ordinateur (lg:) : quatre colonnes, rendu inchangé.
          Mobile et tablette (Rémy 23/09/2026, « trop haut ») : identité centrée courte,
          puis Services, Zones et Informations en volets dépliants <details>. Les liens
          restent dans le HTML (volet fermé = liens présents, seulement repliés). En lg,
          `.foot-groupe` force l'affichage du contenu (app/globals.css). */}
      <div className="container-site grid py-8 lg:grid-cols-4 lg:gap-8 lg:py-12">
        {/* Identité */}
        <div className="pb-6 text-center lg:pb-0 lg:text-left">
          <Link href="/" className="inline-flex items-center" aria-label={`${siteConfig.businessName}, accueil`}>
            <Logo tone="dark" className="h-8 w-auto" />
          </Link>
          <p className="mt-3 text-sm">{siteConfig.city} · {siteConfig.region}</p>
          <p className="mt-1 text-sm">
            <a href={`mailto:${siteConfig.email}`} className="text-slate-300 transition-colors hover:text-white">
              {siteConfig.email}
            </a>
          </p>
          <ul className="mt-4 hidden flex-wrap gap-1 lg:flex" role="list" aria-label="Engagements">
            {siteConfig.usps.map((u) => (
              <li key={u} className="rounded-[3px] bg-white/5 px-2 py-0.5 text-xs">{u}</li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <nav aria-label="Services">
          <details className="foot-groupe border-t border-white/10 lg:border-0">
            <FootSummary>Nos services</FootSummary>
            <ul className="space-y-2 pb-4 text-sm lg:pb-0">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="text-slate-300 transition-colors hover:text-white">{s.navTitle}</Link>
                </li>
              ))}
            </ul>
          </details>
        </nav>

        {/* Zones */}
        <nav aria-label="Zones d'intervention">
          <details className="foot-groupe border-t border-white/10 lg:border-0">
            <FootSummary>Zones</FootSummary>
            <ul className="space-y-2 pb-4 text-sm lg:pb-0">
              {zones.map((z) => (
                <li key={z.slug}>
                  <Link href={`/zones/${z.slug}`} className="text-slate-300 transition-colors hover:text-white">{z.name}</Link>
                </li>
              ))}
              <li>
                <Link href="/zones" className="font-medium text-accent hover:text-white transition-colors">Toutes les zones →</Link>
              </li>
            </ul>
          </details>
        </nav>

        {/* Info */}
        <nav aria-label="Informations légales">
          <details className="foot-groupe border-y border-white/10 lg:border-0">
            <FootSummary>Informations</FootSummary>
            <ul className="space-y-2 pb-4 text-sm lg:pb-0">
              <li><Link href="/contact" className="text-slate-300 transition-colors hover:text-white">Contact & devis</Link></li>
              <li><Link href="/tarifs" className="text-slate-300 transition-colors hover:text-white">Tarifs</Link></li>
              {siteConfig.features.blog && (
                <li><Link href="/conseils" className="text-slate-300 transition-colors hover:text-white">Conseils</Link></li>
              )}
              <li><Link href="/mentions-legales" className="text-slate-300 transition-colors hover:text-white">Mentions légales</Link></li>
              <li><Link href="/politique-confidentialite" className="text-slate-300 transition-colors hover:text-white">Confidentialité</Link></li>
              <li><Link href="/cgu" className="text-slate-300 transition-colors hover:text-white">CGU</Link></li>
            </ul>
          </details>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site py-4 text-center text-xs text-slate-400 lg:text-left">
          © {year} {siteConfig.businessName}. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}

/** Titre de volet : bouton dépliant en mobile, simple intitulé de colonne en lg. */
function FootSummary({ children }: { children: React.ReactNode }) {
  return (
    <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-300 lg:mb-3 lg:py-0 [&::-webkit-details-marker]:hidden">
      {children}
      <svg
        className="foot-chevron h-4 w-4 shrink-0 text-accent transition-transform lg:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </summary>
  )
}
