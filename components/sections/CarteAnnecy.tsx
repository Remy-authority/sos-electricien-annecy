import type { CSSProperties } from 'react'
import Link from 'next/link'
import { TraceAuDefilement } from '@/components/ui/TraceAuDefilement'
import { siteConfig } from '@/config/site.config'
import { CARTE_H, CARTE_W, COMMUNES_SERVIES, COMMUNES_VOISINES, LAC } from '@/lib/carte-annecy'
import type { Zone } from '@/lib/content'

/**
 * Bloc 7 de l'accueil (mise à jour du 10/10/2026, règles #R60 et #R46) : CARTE DU BASSIN
 * ANNÉCIEN dessinée, jamais une photo ni une grille de pastilles (refus « zones en fouillis
 * au téléphone »). Contours réels figés dans lib/carte-annecy.ts (geo.api.gouv.fr pour les
 * communes, OpenStreetMap pour le lac) : aucune requête au rendu.
 *
 * Au défilement, le réseau s'allume : Annecy d'abord, puis un câble miel part vers chaque
 * commune desservie, qui s'éclaire à son arrivée. Une étincelle court ensuite sur les câbles.
 * Rumilly, hors cadre dans l'Albanais, est un repère au bord gauche. Tout est visible sans
 * JavaScript ; « réduire les animations » fige la carte allumée.
 */

const NUIT = '#0B1A2E'
const MIEL = '#FCD680'
const AMBRE = 'rgb(var(--color-accent-rgb))'

const ANNECY = COMMUNES_SERVIES.find((c) => c.slug === 'annecy')!
const RUMILLY = { x: 10, y: 556 }

type Etiquette = { x?: number; y?: number; lignes?: string[]; ancre?: 'start' | 'middle' | 'end' }

/** Nom posé au-dessus du point de chaque commune, sauf réglage ci-dessous. */
const ETIQUETTES: Record<string, Etiquette> = {
  'epagny-metz-tessy': { lignes: ['Épagny', 'Metz-Tessy'] },
  'annecy-le-vieux': { lignes: ['Annecy-', 'le-Vieux'] },
  'veyrier-du-lac': { lignes: ['Veyrier-', 'du-Lac'] },
}

function point(slug: string) {
  if (slug === 'rumilly') return RUMILLY
  const c = COMMUNES_SERVIES.find((x) => x.slug === slug)!
  return { x: c.cx, y: c.cy }
}

/** Câble courbe d'Annecy vers la commune, bombé d'un côté ou de l'autre. */
function cable(slug: string, i: number) {
  const b = point(slug)
  const ax = ANNECY.cx
  const ay = ANNECY.cy
  const dx = b.x - ax
  const dy = b.y - ay
  const sens = i % 2 ? 1 : -1
  const qx = ax + dx / 2 - dy * 0.16 * sens
  const qy = ay + dy / 2 + dx * 0.16 * sens
  return `M${ax} ${ay} Q${Math.round(qx)} ${Math.round(qy)} ${b.x} ${b.y}`
}

/** Rang d'allumage : d'Annecy vers l'extérieur. */
function delai(slug: string) {
  const b = point(slug)
  return Math.round(Math.hypot(b.x - ANNECY.cx, b.y - ANNECY.cy) * 2.2)
}

const STYLE = `
.carte-annecy [data-cable]{stroke-dasharray:1 2;stroke-dashoffset:0}
.carte-annecy [data-etincelle]{stroke-dasharray:.035 .965;animation:aa-courant 2.8s linear infinite;animation-delay:var(--e,0ms)}
@keyframes aa-courant{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
.carte-annecy [data-commune]{transition:fill-opacity .2s ease}
.carte-annecy[data-etat="cache"] [data-cable]{stroke-dashoffset:1}
.carte-annecy[data-etat="cache"] [data-commune],.carte-annecy[data-etat="cache"] [data-annecy]{fill-opacity:0}
.carte-annecy[data-etat="cache"] [data-nom],.carte-annecy[data-etat="cache"] [data-point],.carte-annecy[data-etat="cache"] [data-etincelle]{opacity:0}
.carte-annecy[data-etat="vu"] [data-annecy]{transition:fill-opacity 500ms ease-out 150ms}
.carte-annecy[data-etat="vu"] [data-cable]{transition:stroke-dashoffset 650ms cubic-bezier(.5,0,.3,1) calc(500ms + var(--d,0ms))}
.carte-annecy[data-etat="vu"] [data-commune]{transition:fill-opacity 450ms ease-out calc(1050ms + var(--d,0ms))}
.carte-annecy[data-etat="vu"] [data-point],.carte-annecy[data-etat="vu"] [data-nom]{transition:opacity 350ms ease-out calc(1050ms + var(--d,0ms))}
.carte-annecy[data-etat="vu"] [data-etincelle]{transition:opacity 400ms ease-out 2600ms}
.carte-annecy a:hover [data-commune],.carte-annecy a:focus-visible [data-commune]{fill:#3F6B9C}
.carte-annecy a:focus-visible{outline:none}
.carte-annecy [data-nom] text{font-size:15px}
.carte-annecy [data-nom] text.aa-ville{font-size:26px}
@media (max-width:639px){
  .carte-annecy [data-nom] text{font-size:21px}
  .carte-annecy [data-nom] text.aa-ville{font-size:32px}
}
@media (prefers-reduced-motion:reduce){
  .carte-annecy *{transition:none!important;animation:none!important}
  .carte-annecy [data-etincelle]{opacity:0!important}
}
`

export function CarteAnnecy({ zones }: { zones: Zone[] }) {
  const { city, serviceArea } = siteConfig
  const noms = new Map(zones.map((z) => [z.slug, z.name]))
  const communes = COMMUNES_SERVIES.filter((c) => noms.has(c.slug))
  const dansLeCadre = communes.filter((c) => c.d)

  return (
    <section id="zone" className="section relative bg-primary-dark text-slate-300" aria-labelledby="titre-zone">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Zone d'intervention</p>
          <h2 id="titre-zone" className="text-2xl font-bold text-white md:text-4xl">
            {city}, son lac <span className="accent-serif text-accent">et l'Albanais</span>
          </h2>
          <p className="mt-3 text-slate-300">
            Nous intervenons dans un rayon d'environ {serviceArea.radiusKm} km. Touchez votre commune sur la carte.
          </p>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
          <TraceAuDefilement className="carte-annecy mx-auto w-full max-w-[540px] lg:max-w-[470px]">
            <svg
              viewBox={`0 0 ${CARTE_W} ${CARTE_H}`}
              className="h-auto w-full"
              role="img"
              aria-label={`Carte d'${city} et des communes desservies autour du lac`}
            >
              <defs>
                <clipPath id="cadre-annecy">
                  <rect width={CARTE_W} height={CARTE_H} rx="3" />
                </clipPath>
                <radialGradient id="halo-annecy">
                  <stop offset="0" stopColor={MIEL} stopOpacity="0.9" />
                  <stop offset="1" stopColor={MIEL} stopOpacity="0" />
                </radialGradient>
              </defs>
              <g clipPath="url(#cadre-annecy)">
                <rect width={CARTE_W} height={CARTE_H} fill={NUIT} />
                {COMMUNES_VOISINES.map((d, i) => (
                  <path key={i} d={d} fill="#11223A" stroke="#1E3654" strokeWidth="1" />
                ))}

                <path d={ANNECY.d} data-annecy="" fill={AMBRE} fillOpacity="0.88" stroke={NUIT} strokeWidth="1.6" />
                {dansLeCadre.map((c) => (
                  <a key={c.slug} href={`/zones/${c.slug}`} aria-label={`Électricien à ${noms.get(c.slug)}`}>
                    <title>{noms.get(c.slug)}</title>
                    <path
                      d={c.d}
                      data-commune=""
                      fill="#2C5079"
                      fillOpacity="0.92"
                      stroke="#6E8FB3"
                      strokeOpacity="0.7"
                      strokeWidth="1.2"
                      style={{ '--d': `${delai(c.slug)}ms`, cursor: 'pointer' } as CSSProperties}
                    />
                  </a>
                ))}

                <path d={LAC} fill="#2F7DB5" stroke="#7FB9E0" strokeWidth="1.2" fillRule="evenodd" pointerEvents="none" />
                <text
                  x="505"
                  y="640"
                  transform="rotate(-64 505 640)"
                  fontSize="17"
                  fontStyle="italic"
                  letterSpacing="2"
                  fill="#D6ECFA"
                  data-nom=""
                  pointerEvents="none"
                >
                  lac d'Annecy
                </text>

                <g pointerEvents="none" fill="none" strokeLinecap="round">
                  {communes.map((c, i) => (
                    <g key={c.slug} style={{ '--d': `${delai(c.slug)}ms`, '--e': `${(i * 370) % 2800}ms` } as CSSProperties}>
                      <path d={cable(c.slug, i)} pathLength={1} data-cable="" stroke={MIEL} strokeOpacity="0.75" strokeWidth="2" />
                      <path d={cable(c.slug, i)} pathLength={1} data-etincelle="" stroke="#FFFFFF" strokeWidth="3.4" />
                    </g>
                  ))}
                </g>

                <circle cx={ANNECY.cx} cy={ANNECY.cy} r="30" fill="url(#halo-annecy)" pointerEvents="none" />
                <circle cx={ANNECY.cx} cy={ANNECY.cy} r="7" fill="#FFFFFF" stroke={NUIT} strokeWidth="2.5" pointerEvents="none" />

                {communes.map((c) => {
                  const p = point(c.slug)
                  return (
                    <circle
                      key={c.slug}
                      cx={p.x}
                      cy={p.y}
                      r="5"
                      data-point=""
                      fill={MIEL}
                      stroke={NUIT}
                      strokeWidth="2"
                      pointerEvents="none"
                      style={{ '--d': `${delai(c.slug)}ms` } as CSSProperties}
                    />
                  )
                })}

                <g pointerEvents="none" fontWeight="600" fill="#FFFFFF" stroke={NUIT} strokeWidth="4.5" strokeLinejoin="round" paintOrder="stroke">
                  {dansLeCadre.map((c) => {
                    const e = ETIQUETTES[c.slug] ?? {}
                    const lignes = e.lignes ?? [noms.get(c.slug)!]
                    const x = e.x ?? c.cx
                    const yBas = e.y ?? c.cy - 14
                    return (
                      <g key={c.slug} data-nom="" style={{ '--d': `${delai(c.slug)}ms` } as CSSProperties}>
                        <text x={x} y={yBas} textAnchor={e.ancre ?? 'middle'}>
                          {lignes.map((l, k) => (
                            <tspan key={l} x={x} dy={k === 0 ? `${-(lignes.length - 1) * 1.1}em` : '1.1em'}>
                              {l}
                            </tspan>
                          ))}
                        </text>
                      </g>
                    )
                  })}
                  <g data-nom="">
                    <text className="aa-ville" x={ANNECY.cx + 4} y={ANNECY.cy + 40} textAnchor="middle" fontWeight="700" fill={MIEL}>
                      {city}
                    </text>
                  </g>
                </g>
              </g>

              {noms.has('rumilly') && (
                <a href="/zones/rumilly" aria-label={`Électricien à ${noms.get('rumilly')}`}>
                  <title>{noms.get('rumilly')}</title>
                  <g data-nom="" style={{ '--d': `${delai('rumilly')}ms` } as CSSProperties}>
                    <rect x="0" y={RUMILLY.y - 50} width="128" height="40" fill={NUIT} fillOpacity="0.01" />
                    <path d={`M${RUMILLY.x + 13} ${RUMILLY.y - 37} l-8 7 l8 7`} stroke={MIEL} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <text x={RUMILLY.x + 22} y={RUMILLY.y - 24} fontWeight="600" fill="#FFFFFF" stroke={NUIT} strokeWidth="4.5" strokeLinejoin="round" paintOrder="stroke">
                      {noms.get('rumilly')}
                    </text>
                  </g>
                </a>
              )}
            </svg>
          </TraceAuDefilement>

          <div className="text-center lg:text-left">
            <h3 className="text-xl font-bold text-white lg:text-2xl">Les communes desservies</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 border-t border-white/10" role="list">
              {zones.map((z) => (
                <li key={z.slug} className="border-b border-white/10">
                  <Link
                    href={`/zones/${z.slug}`}
                    className="group flex min-h-[44px] items-center justify-center gap-2 py-2 text-[15px] text-slate-200 transition-colors hover:text-accent lg:justify-between"
                  >
                    {z.name}
                    <svg className="hidden h-3.5 w-3.5 shrink-0 text-accent/60 transition-transform group-hover:translate-x-1 lg:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] text-slate-400">
              Et tous les quartiers d'{city}, de la Vieille Ville aux Teppes.
            </p>
            <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a href="#devis" className="btn-accent">
                Vérifier ma commune
              </a>
              <Link href="/zones" className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-semibold text-accent underline underline-offset-4 hover:text-accent/80">
                Toutes les zones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
