import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import PhoneButton from '@/components/ui/PhoneButton'
import { siteConfig } from '@/config/site.config'
import { getServices } from '@/lib/content'
import HeaderNavMobile from './HeaderNavMobile'
import NavDropdown, { type NavLien } from './NavDropdown'

/* Menus déroulants (règles 14 à 17 de la checklist, 25/09/2026) : 3 liens + « voir tout ».
   Prestations : les trois demandes les plus fréquentes du site. Zones : les trois
   communes choisies par Rémy le 25/09 (Seynod, Cran-Gevrier, Rumilly). */
const SERVICES_MENU = [
  'urgence-depannage-electrique',
  'remise-aux-normes-tableau-electrique',
  'mise-en-conformite-diagnostic-electrique',
]
const ZONES_MENU: NavLien[] = [
  { href: '/zones/seynod', label: 'Seynod' },
  { href: '/zones/cran-gevrier', label: 'Cran-Gevrier' },
  { href: '/zones/rumilly', label: 'Rumilly' },
]
const TOUTES_PRESTATIONS = { href: '/#services', label: 'Toutes nos prestations' }
const TOUTES_ZONES = { href: '/zones', label: 'Toutes les zones' }

export default function Header() {
  const services = getServices()
  const servicesMenu: NavLien[] = SERVICES_MENU.map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({ href: `/services/${s.slug}`, label: s.navTitle }))

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="container-site relative flex items-center justify-between gap-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          aria-label={`${siteConfig.businessName}, accueil`}
        >
          {/* Logo inline SVG, variante fond clair (couleurs pilotées par les tokens) */}
          <Logo tone="light" />
        </Link>

        {/* Nav desktop */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-0.5 text-sm font-medium text-slate-700 lg:flex">
          <Link href="/" className="rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 hover:text-primary">Accueil</Link>
          <NavDropdown
            label="Prestations"
            liens={servicesMenu}
            toutHref={TOUTES_PRESTATIONS.href}
            toutLabel={TOUTES_PRESTATIONS.label}
          />
          <NavDropdown
            label="Zones"
            liens={ZONES_MENU}
            toutHref={TOUTES_ZONES.href}
            toutLabel={TOUTES_ZONES.label}
          />
          {siteConfig.features.blog && (
            <Link href="/conseils" className="rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 hover:text-primary">Conseils</Link>
          )}
          <Link href="/contact" className="rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 hover:text-primary">Contact</Link>
        </nav>

        {/* CTA droite + menu mobile */}
        <div className="flex items-center gap-2">
          <div className="hidden text-right lg:block">
            <p className="text-xs font-semibold text-slate-900">{siteConfig.availability}</p>
            <p className="text-xs text-slate-500">{siteConfig.responseTime}</p>
          </div>
          <PhoneButton className="btn-accent hidden !px-4 !py-2 text-sm sm:inline-flex" />
          <HeaderNavMobile
            groupes={[
              { label: 'Prestations', liens: servicesMenu, tout: TOUTES_PRESTATIONS },
              { label: 'Zones', liens: ZONES_MENU, tout: TOUTES_ZONES },
            ]}
            blogEnabled={siteConfig.features.blog}
          />
        </div>
      </div>
    </header>
  )
}
