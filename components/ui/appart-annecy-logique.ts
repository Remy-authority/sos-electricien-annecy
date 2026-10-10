/**
 * Repères de l'appartement dessiné du bloc 3 (AppartAnnecy), sans le dessin lui-même.
 *
 * Séparé le 11/10/2026 (vitesse mobile #R68) : ChantierAnnecy n'importe que ce fichier ; le
 * dessin (AppartAnnecy.tsx) arrive dans un morceau à part, chargé à l'approche de la section,
 * et ne pèse plus dans le JavaScript de la page mesuré par Google.
 */

export type V2 = [number, number]

/** Zones toujours entières à l'écran : ordinateur, puis téléphone et tablette. */
export const CADRE = { x: 230, y: 219, w: 800, h: 470 }
export const CADRE_MOBILE = { x: 290, y: 296, w: 640, h: 300 }

/* ── Cartouches (mesures en pixels d'écran ; le groupe est mis à l'échelle par `--kc`) ── */
export const CARTOUCHE = { corps: 12.5, padG: 9, padD: 9, haut: 25 }
export const placerCartouche = (cote: string, w: number, h: number): V2 => [
  cote === 'gauche' ? -w : cote === 'droite' ? 0 : -w / 2,
  cote === 'haut' ? -h : cote === 'bas' ? 0 : -h / 2,
]
