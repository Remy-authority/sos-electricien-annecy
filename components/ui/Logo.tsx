import { BOLT_PATH } from './Bolt'

/**
 * Logo inline SVG, « SOS ÉLECTRICIEN / ANNECY ».
 *
 * `tone` suffit aux deux emplacements réels du site :
 *   - `light` : posé sur fond blanc (Header), texte encre, éclair navy.
 *   - `dark`  : posé sur fond nuit (Footer), texte blanc, éclair ambre.
 *
 * Corrigé le 26/07/2026 (2 défauts vus par Rémy sur le site servi) :
 *  1. Le mot « ANNECY » sortait en `#8A5A00` (la variante sombre réservée au TEXTE
 *     accent sur fond clair) et non en ambre de la DA. Il lit maintenant le token
 *     `--color-accent-rgb`, donc la couleur suit `siteConfig.colors.accent` : plus
 *     aucune couleur de marque en dur ici. NB : un logotype est exempté du seuil de
 *     contraste WCAG (exception « logotypes » de 1.4.3), l'ambre pur est donc légitime
 *     ici alors qu'il resterait interdit pour du texte courant sur fond clair.
 *  2. L'éclair paraissait coupé : il était dessiné sur 44 des 48 unités de hauteur du
 *     viewBox, donc à fleur des deux bords. Il est maintenant posé sur 34 unités,
 *     centré, avec 7 unités de marge en haut et en bas.
 *
 * Le tracé vient de `BOLT_PATH` (composants/ui/Bolt.tsx) : le logo et le système de
 * marque partagent enfin la MÊME géométrie (ils divergeaient, 3 dessins d'éclair
 * différents coexistaient entre le logo, le système Bolt et le favicon).
 */

/** Tokens de thème, pour ne coder aucune couleur de marque en dur. */
const ACCENT = 'rgb(var(--color-accent-rgb))'
const PRIMARY = 'rgb(var(--color-primary-rgb))'
/** Encre du wordmark sur fond clair : neutre volontaire, ce n'est pas une couleur de marque. */
const INK = '#0F172A'

/**
 * Mise à l'échelle de `BOLT_PATH` (dessiné dans un carré 24 × 24, emprise réelle
 * x 4.5→18, y 2→21.5) vers la bande verticale 7 → 41 du viewBox 260 × 48.
 * facteur = 34 / 19.5 ; la translation replace l'angle haut-gauche de l'emprise en (8, 7).
 */
const BOLT_TRANSFORM = 'translate(0.15 3.51) scale(1.744)'

export default function Logo({
  tone = 'light',
  textColor,
  accentColor,
  iconColor,
  className = 'h-9 w-auto',
}: {
  tone?: 'light' | 'dark'
  /** Surcharges optionnelles, pour un usage hors des deux cas ci-dessus. */
  textColor?: string
  accentColor?: string
  iconColor?: string
  className?: string
}) {
  const dark = tone === 'dark'
  const ink = textColor ?? (dark ? '#FFFFFF' : INK)
  const accent = accentColor ?? ACCENT
  const icon = iconColor ?? (dark ? ACCENT : PRIMARY)

  return (
    <svg
      viewBox="0 0 260 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Éclair de marque, même tracé que BoltIcon / le favicon */}
      <path d={BOLT_PATH} transform={BOLT_TRANSFORM} fill={icon} />

      {/* SOS ÉLECTRICIEN, majuscules, typographie resserrée */}
      <text
        x="48"
        y="22"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontWeight="900"
        fontSize="13"
        fill={ink}
        letterSpacing="-0.2"
      >
        SOS ÉLECTRICIEN
      </text>

      {/* ANNECY, en ambre de la DA, aligné sous « SOS ÉLECTRICIEN » */}
      <text
        x="48"
        y="39"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontWeight="800"
        fontSize="14"
        fill={accent}
        letterSpacing="4"
      >
        ANNECY
      </text>
    </svg>
  )
}
