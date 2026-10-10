/**
 * Repères et pilotage du mur dessiné du bloc 1 (MurAnnecy), sans le dessin lui-même.
 *
 * Séparé le 11/10/2026 (vitesse mobile #R68) : HeroTableau n'importe que ce fichier, léger ;
 * le dessin (MurAnnecy.tsx) arrive dans un morceau à part, chargé au premier geste du visiteur,
 * et ne pèse plus dans le JavaScript de la page mesuré par Google.
 */

export const PHOTO = { l: 1600, h: 893 }
/** Le tableau et sa porte ouverte, dans le repère de la photo. */
export const TABLEAU = { x: 468, y: 551, w: 232, h: 200 }
/** Centre visé par la caméra : le tableau avec sa porte. */
export const VISE = { x: 563, y: 651 }

export type V2 = [number, number]

/** Loupe sur le différentiel : centre selon le format (fenêtre sur ordinateur, au-dessus du
 *  tableau sur téléphone), et point du tableau qu'elle grossit. */
export const LOUPE = { r: 128, ordi: [960, 560] as V2, mobile: [590, 210] as V2, vise: [512, 618] as V2 }

/* ── Temps (fraction de la piste) ── */
export const TEMPS = {
  ouvre: [0.12, 0.24],
  ferme: [0.8, 0.88],
  loupe: [0.42, 0.46],
  fuite: 0.5,
  coupe: 0.54,
  testeur: [0.58, 0.64],
  trouve: 0.66,
  rearme: 0.73,
  fin: 0.8,
}

/* ── Pilotage ── */
type Cle = [number, number]
const doux = (t: number) => t * t * (3 - 2 * t)
const lire = (v: string | undefined): Cle[] =>
  (v ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((c) => c.split(':').map(Number) as Cle)
function valeur(cles: Cle[], p: number) {
  if (p <= cles[0][0]) return cles[0][1]
  for (let i = 1; i < cles.length; i++) {
    const [p1, v1] = cles[i]
    if (p <= p1) {
      const [p0, v0] = cles[i - 1]
      return v0 + (v1 - v0) * doux(Math.min(1, Math.max(0, (p - p0) / Math.max(1e-6, p1 - p0))))
    }
  }
  return cles[cles.length - 1][1]
}

type Piste = { el: SVGElement; o?: Cle[]; t?: Cle[]; x?: Cle[]; y?: Cle[]; s?: Cle[]; r?: Cle[]; long?: number; base?: string }
const pistes = new WeakMap<SVGSVGElement, Piste[]>()

function preparer(svg: SVGSVGElement): Piste[] {
  const deja = pistes.get(svg)
  if (deja) return deja
  const liste: Piste[] = []
  svg.querySelectorAll<SVGElement>('[data-k-o],[data-k-t],[data-k-x],[data-k-y],[data-k-s],[data-k-r]').forEach((el) => {
    const d = el.dataset
    const piste: Piste = { el, base: el.getAttribute('transform') ?? '' }
    if (d.kO) piste.o = lire(d.kO)
    if (d.kX) piste.x = lire(d.kX)
    if (d.kY) piste.y = lire(d.kY)
    if (d.kS) piste.s = lire(d.kS)
    if (d.kR) piste.r = lire(d.kR)
    if (d.kT && el instanceof SVGGeometryElement) {
      piste.t = lire(d.kT)
      piste.long = el.getTotalLength()
      el.style.strokeDasharray = `${piste.long} ${piste.long}`
    }
    liste.push(piste)
  })
  pistes.set(svg, liste)
  return liste
}

/** Pose le dessin à la progression p (0 à 1). */
export function poserMur(svg: SVGSVGElement, p: number) {
  for (const k of preparer(svg)) {
    const { el } = k
    if (k.o) {
      const v = valeur(k.o, p)
      el.style.opacity = v.toFixed(3)
      el.style.visibility = v < 0.01 ? 'hidden' : ''
    }
    if (k.t && k.long) el.style.strokeDashoffset = (k.long * (1 - valeur(k.t, p))).toFixed(1)
    if (k.r) el.setAttribute('r', valeur(k.r, p).toFixed(1))
    if (k.x || k.y || k.s) {
      const x = k.x ? valeur(k.x, p) : 0
      const y = k.y ? valeur(k.y, p) : 0
      el.setAttribute('transform', `${k.base} translate(${x.toFixed(1)} ${y.toFixed(1)})`.trim())
    }
  }
}

/** Place la loupe selon le format (fenêtre sur ordinateur, au-dessus du tableau ailleurs). */
export function placerLoupe(svg: SVGSVGElement, format: 'ordi' | 'mobile') {
  const [x, y] = LOUPE[format]
  svg.querySelector('[data-loupe-corps]')?.setAttribute('transform', `translate(${x} ${y})`)
  const fil = svg.querySelector('[data-loupe-fil]')
  if (fil) {
    // Le fil part du module visé et s'arrête au bord de la loupe.
    const [vx, vy] = LOUPE.vise
    const dx = x - vx
    const dy = y - vy
    const n = Math.hypot(dx, dy) || 1
    fil.setAttribute('d', `M${vx} ${vy}L${(x - (dx / n) * LOUPE.r).toFixed(1)} ${(y - (dy / n) * LOUPE.r).toFixed(1)}`)
  }
}

export const CSS_MUR = `
@keyframes mur-etincelle{0%,100%{transform:scale(1)}50%{transform:scale(1.18)}}
.mur-etincelle{animation:mur-etincelle .5s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.mur-etincelle{animation:none}}
`
