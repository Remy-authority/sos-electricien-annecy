import { siteConfig } from '@/config/site.config'
import { getServices, getZones } from '@/lib/content'

/**
 * Bandeau de chiffres clés.
 * Itération design 25/07/2026 : fond dégradé + grain + motif grille (au lieu d'un
 * aplat primaire) et chiffres en serif signature, pour donner du relief à ce qui
 * était la bande la plus plate de la page.
 *
 * 25/09/2026 : les trois chiffres sont des FAITS du site, calculés au build (rayon de
 * la config, nombre de pages communes et de pages prestations publiées). Les anciens
 * « +400 pannes résolues » et « 8 ans d'expérience » étaient inventés.
 */
export default function Stats() {
  const stats = [
    { value: `${siteConfig.serviceArea.radiusKm} km`, label: "Rayon d'intervention" },
    { value: String(getZones().length), label: 'Communes voisines' },
    { value: String(getServices().length), label: 'Prestations' },
  ]
  return (
    <div
      className="texture-noise relative overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-primary-dark"
      aria-label="Chiffres clés"
    >
      {/* Motif grille discret, masqué en fondu */}
      <div className="pointer-events-none absolute inset-0 pattern-grid" aria-hidden="true" />
      {/* Halo accent qui réchauffe le bandeau sur la droite */}
      <div
        className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <ul className="grid grid-cols-3 divide-x divide-white/10 py-0" role="list">
          {stats.map((stat) => (
            <li key={stat.label} className="flex flex-col items-center px-2 py-9 text-center sm:px-4">
              <span className="font-display text-3xl font-semibold text-white sm:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1.5 text-xs font-medium uppercase tracking-wider text-white/70 sm:text-sm">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
