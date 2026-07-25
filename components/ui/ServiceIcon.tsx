/**
 * ServiceIcon, set d'icônes SVG partagé (cartes services accueil + pages services).
 *
 * `SERVICE_ICON_PATHS` est indexé sur `service.icon` (content/services/*.json) et
 * utilisé sur les cartes de la home. `BLOCK_ICON_PATHS` sert aux badges des blocs
 * H2 des pages services. `matchBlockIcon` associe un intitulé de bloc à une icône
 * par mots-clés, générique, réutilisable sur les prochains sites du template (N+1).
 *
 * Les deux jeux d'icônes partagent le même rendu (contour, `stroke="currentColor"`,
 * viewBox 24x24) : les tracés peuvent être réutilisés d'un jeu à l'autre.
 */

/* ── Icônes (cartes service + badges de bloc) ───────────────────────────── */
export const SERVICE_ICON_PATHS: Record<string, string> = {
  alert: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
  search: 'M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z',
  tools: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  panel: 'M4 3h16v18H4zM8 7v4M12 7v4M16 7v4M8 15h8',
  plug: 'M9 2v4M15 2v4M6 6h12v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V6zM12 17v5',
  certificate: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
}

export function ServiceIcon({ icon, className = 'h-5 w-5' }: { icon: string; className?: string }) {
  const d = SERVICE_ICON_PATHS[icon] ?? SERVICE_ICON_PATHS.search
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

/* ── Icônes de bloc (badges H2, pages services) ─────────────────────────── */
const BLOCK_ICON_PATHS = {
  checklist: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  warning: 'M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
  map: 'M9 20l-6-3V4l6 3 6-3 6 3v13l-6-3-6 3zM9 7v13M15 4v13',
  panel: 'M4 3h16v18H4zM8 7v4M12 7v4M16 7v4M8 15h8',
  plug: 'M9 2v4M15 2v4M6 6h12v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V6zM12 17v5',
  certificate: 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  wrench: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  spark: 'M13 2 3 14h7v8l10-12h-7z',
} as const

type BlockIconKey = keyof typeof BLOCK_ICON_PATHS

const BLOCK_ICON_RULES: [RegExp, BlockIconKey][] = [
  [/panne|origine|cause/i, 'warning'],
  [/attendant|que faire|réflexe/i, 'checklist'],
  [/protocole|déroulé|intervention|étape|méthode|localis|diagnostic/i, 'checklist'],
  [/tableau|disjoncteur/i, 'panel'],
  [/norme|nfc|conformité/i, 'certificate'],
  [/borne|recharge/i, 'plug'],
  [/rénovation|câblage|chantier/i, 'wrench'],
  [/zone|couvert/i, 'map'],
]

/** Associe un intitulé de bloc (H2) à une icône par mots-clés. Repli : éclair. */
export function matchBlockIcon(heading: string): BlockIconKey {
  for (const [re, key] of BLOCK_ICON_RULES) {
    if (re.test(heading)) return key in BLOCK_ICON_PATHS ? key : 'spark'
  }
  return 'spark'
}

export function BlockIcon({ heading, className = 'h-5 w-5' }: { heading: string; className?: string }) {
  const key = matchBlockIcon(heading)
  const d = BLOCK_ICON_PATHS[key] ?? BLOCK_ICON_PATHS.spark
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}
