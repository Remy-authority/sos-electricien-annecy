/**
 * Bolt, l'éclair de marque décliné en composants réutilisables.
 *
 * C'est le pendant du badge « cible » doré de la référence Sniper : un signe unique,
 * repris partout (logo, pastilles de section, séparateurs, filigranes), qui fait qu'on
 * reconnaît le site sans lire son nom. Le tracé est le MÊME que celui du logo
 * (`components/ui/Logo.tsx`), pour que la marque reste cohérente.
 *
 * Générique : aucune couleur codée en dur, tout passe par `currentColor` et les
 * tokens de thème, donc réutilisable tel quel sur les prochains sites du template.
 */

/** Tracé unique de l'éclair, partagé par toutes les déclinaisons. */
export const BOLT_PATH = 'M13 2 4.5 13.5H11l-1.5 8L18 10.5h-6.5l1.5-8Z'

/** Éclair simple, prend la couleur du texte parent. */
export function BoltIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d={BOLT_PATH} />
    </svg>
  )
}

/**
 * Badge de section : éclair ambre dans une pastille, posé au-dessus d'un titre.
 * Remplace les sur-titres en simple texte majuscule et ancre visuellement la marque.
 */
export function BoltBadge({
  label,
  tone = 'dark',
  className = '',
}: {
  label: string
  /** `dark` = posé sur fond sombre, `light` = posé sur fond clair. */
  tone?: 'dark' | 'light'
  className?: string
}) {
  const toneClass =
    tone === 'dark'
      ? 'border-accent/25 bg-accent/10 text-accent'
      : 'border-accent-deep/25 bg-accent/10 text-accent-deep'
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] ${toneClass} ${className}`}
    >
      <BoltIcon className="h-3.5 w-3.5" />
      {label}
    </span>
  )
}

/**
 * Filigrane : très grand éclair en très faible opacité, posé en fond de section
 * sombre. Purement décoratif, jamais lu par les lecteurs d'écran.
 */
export function BoltWatermark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none absolute select-none text-accent/[0.05] ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={BOLT_PATH} />
    </svg>
  )
}

/**
 * Séparateur de marque : un filet dégradé traversé d'un éclair au centre.
 * Sert de respiration entre deux blocs d'une même section.
 */
export function BoltDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/30" />
      <BoltIcon className="h-4 w-4 text-accent/70" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/30" />
    </div>
  )
}
