'use client'

import { useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from 'react'
import * as ReactDOM from 'react-dom'
import { LeadForm } from '@/components/ui/LeadForm'
import MurAnnecy, { CSS_MUR, VISE, placerLoupe, poserMur } from '@/components/ui/MurAnnecy'
import { siteConfig } from '@/config/site.config'

/**
 * HeroTableau, le bloc 1 de l'accueil (mise à jour du 10/10/2026, scénario validé par Rémy).
 * Ce que le client paie sans jamais le voir : l'installation cachée dans le mur, derrière un
 * tableau tout propre. Cinq temps, pilotés par le défilement :
 *
 *  1. ÉCRAN 1   un mur gris, le tableau ouvert, la lampe, la baie sur le lac d'Annecy ; le titre
 *               sur le mur, deux boutons de même forme, le formulaire noir (à droite sur
 *               ordinateur, après la séquence sur téléphone).
 *  2. AVANCÉE   texte et formulaire s'effacent, la caméra s'approche du tableau.
 *  3. LE MUR    il devient transparent en cercle à partir du tableau, la caméra recule : les
 *               gaines se tracent une à une (éclairage, boîte de dérivation, interrupteur,
 *               prises, terre), chacune nommée.
 *  4. LA PANNE  la loupe sur le différentiel 30 mA ; une fuite sur la ligne des prises, il coupe,
 *               tout s'éteint sauf la terre ; le testeur remonte la ligne, trouve, on répare ; le
 *               différentiel se réarme, la lampe s'allume.
 *  5. RETOUR    le mur se referme, la caméra revient à l'écran 1, le texte et le formulaire aussi.
 *
 * Moteur repris de sos-debouchage-metz.fr (HeroPlongee) : une piste haute (380 vh) porte une
 * scène collée sous l'en-tête ; un seul requestAnimationFrame par défilement ; transform et
 * opacité posés dans le DOM, jamais un rendu React. La photo de l'écran 1 est le premier rendu du
 * serveur (LCP), cadrée en CSS exactement comme la caméra de départ. Repli (« réduire les
 * animations », économie de données, réseau lent) : l'écran 1 fixe, puis le mur ouvert, fixe.
 */

/* ---------- Photo ---------- */
const BASE = '/accueil/tableau-lac'
const LARGEURS = [900, 1600, 2752]
const SRCSET_AVIF = LARGEURS.map((l) => `${BASE}-${l}.avif ${l}w`).join(', ')
const SRCSET_WEBP = LARGEURS.map((l) => `${BASE}-${l}.webp ${l}w`).join(', ')
const ALT = "Tableau électrique ouvert sur un mur gris, devant une baie vitrée qui donne sur le lac d'Annecy au coucher du soleil"
const L = 1600
const H = 893
/** Bande de plafond en haut de la photo, jamais montrée. */
const PLAFOND = 34
/** Largeur affichée de la photo à l'écran 1 : le tableau au centre de l'écran, la photo calée en
 *  bas et assez haute pour couvrir la scène (ce que fait la caméra de départ, voir `depart`). */
const TAILLES_ECRAN1 = '(max-width: 1023px) 190vh, 145vw'
/** Après le chargement : la caméra s'approche, on demande le tirage le plus fin. */
const TAILLES_ZOOM = '2752px'
const PRIORITE = { fetchpriority: 'high' } as Record<string, string>
const precharger = (ReactDOM as unknown as { preload?: (href: string, options: Record<string, string>) => void }).preload

/* ---------- Séquence ---------- */
type Format = 'ordi' | 'mobile'
type Camera = { s: number; vx: number; vy: number }
type Rect = { x: number; y: number; w: number; h: number }
/** Le mur ouvert, à faire tenir dans l'écran (repère de la photo). */
const CADRE_MUR: Record<Format, Rect> = {
  ordi: { x: 330, y: 200, w: 800, h: 693 },
  mobile: { x: 350, y: 150, w: 430, h: 743 },
}
/** Bornes des temps, en fraction de la piste (mêmes repères que TEMPS dans MurAnnecy). */
const T = { avance: 0.12, recul: 0.24, retour0: 0.78, retour1: 0.9, texte0: 0.91, texte1: 0.97 }
/** Avancée vers le tableau : 1,25 fois, sans dépasser 1,9 (au-delà, le tirage de 2752 px floute). */
const AVANCE = 1.25
const ZOOM_MAX = 1.9
/** Repli sans animation : le mur ouvert, tous les circuits nommés. */
const P_FIXE = 0.41

const effetAvantPeinture = typeof window !== 'undefined' ? useLayoutEffect : useEffect
const borne = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const doux = (t: number) => t * t * (3 - 2 * t)
const elan = (u: number, v0: number, v1: number) => (u ** 3 - 2 * u ** 2 + u) * v0 + (-2 * u ** 3 + 3 * u ** 2) + (u ** 3 - u ** 2) * v1

function connexionLente() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  return !!c && (c.saveData === true || ['slow-2g', '2g', '3g'].includes(c.effectiveType ?? ''))
}
/** La photo couvre toujours toute la scène : jamais de bord, jamais la bande de plafond. */
/** `barre` : au téléphone, la barre d'appel fixe cache le bas de l'écran ; la photo peut s'arrêter
 *  au-dessus d'elle (le dessous ne se voit pas). */
function couvrir(c: Camera, W: number, Hs: number, barre = 0): Camera {
  const s = Math.max(c.s, W / L, (Hs - barre) / (H - PLAFOND))
  return { s, vx: borne(c.vx, W - (L - VISE.x) * s, VISE.x * s), vy: borne(c.vy, Hs - barre - (H - VISE.y) * s, (VISE.y - PLAFOND) * s) }
}
/** Caméra de l'écran 1 : la même que le cadrage CSS de `.bt-photo`. */
function depart(W: number, Hs: number): Camera {
  const s = Math.max(W / (2 * VISE.x), Hs / (H - PLAFOND), W / L)
  return couvrir({ s, vx: W / 2, vy: Hs - (H - VISE.y) * s }, W, Hs)
}
/** Caméra qui fait tenir le rectangle r (repère photo) dans la zone a (écran), centré. */
function cadrer(r: Rect, a: Rect): Camera {
  const s = Math.min(a.w / r.w, a.h / r.h)
  return { s, vx: a.x + a.w / 2 + (VISE.x - (r.x + r.w / 2)) * s, vy: a.y + a.h / 2 + (VISE.y - (r.y + r.h / 2)) * s }
}
const vers = (a: Camera, b: Camera, e: number): Camera => ({ s: a.s * (b.s / a.s) ** e, vx: a.vx + (b.vx - a.vx) * e, vy: a.vy + (b.vy - a.vy) * e })
/** Retour : le point du dessin au centre de l'écran voyage en ligne droite. */
const versCentre = (a: Camera, b: Camera, e: number, cx: number, cy: number): Camera => {
  const s = a.s * (b.s / a.s) ** e
  const mx = (cx - a.vx) / a.s + ((cx - b.vx) / b.s - (cx - a.vx) / a.s) * e
  const my = (cy - a.vy) / a.s + ((cy - b.vy) / b.s - (cy - a.vy) / a.s) * e
  return { s, vx: cx - mx * s, vy: cy - my * s }
}

/* La scène : hauteur d'un écran sous l'en-tête. `--lw` est la largeur de la photo à l'écran 1
   (le tableau au centre, la photo calée en bas, assez haute pour cacher la bande de plafond). */
const CSS = `
.bt{--haut:64px;--hs:max(calc(100svh - var(--haut)),560px)}
@media (min-width:1024px){.bt{--hs:max(calc(100vh - var(--haut)),640px)}}
.bt-piste{position:relative}
.bt-scene{position:relative;overflow:hidden;height:var(--hs);--lw:max(${((L / (2 * VISE.x)) * 100).toFixed(3)}%,calc(var(--hs) * ${(L / (H - PLAFOND)).toFixed(5)}),100%)}
.bt[data-seq] .bt-piste{height:380svh}
@media (min-width:1024px){.bt[data-seq] .bt-piste{height:380vh}}
.bt[data-seq] .bt-scene{position:sticky;top:var(--haut)}
.bt-photo{position:absolute;bottom:0;left:min(0px,calc(50% - var(--lw) * ${(VISE.x / L).toFixed(5)}));width:var(--lw);max-width:none;height:auto;aspect-ratio:${L}/${H}}
.bt-grille{display:grid;grid-template-columns:minmax(0,1fr);height:100%}
@media (min-width:1024px){.bt-grille{width:min(100%,calc(56rem + 3rem + 4rem + ${((277 / (2 * VISE.x)) * 100).toFixed(2)}vw + 1rem));margin:0 auto;padding:0 2rem;column-gap:1.5rem;grid-template-columns:minmax(0,28rem) calc(${((277 / (2 * VISE.x)) * 100).toFixed(2)}vw + 1rem) minmax(0,28rem)}}
@keyframes bt-appel{0%,100%{transform:rotate(0)}8%{transform:rotate(-14deg)}16%{transform:rotate(12deg)}24%{transform:rotate(-8deg)}32%{transform:rotate(0)}}
.bt-appel{animation:bt-appel 3.2s ease-in-out infinite;transform-origin:50% 60%}
@keyframes bt-veille{0%,100%{opacity:1}50%{opacity:.35}}
.bt-veille{animation:bt-veille 1.6s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.bt-appel,.bt-veille{animation:none}}
${CSS_MUR}`

export function HeroTableau() {
  const [mode, setMode] = useState<'fixe' | 'sequence' | 'repli'>('fixe')
  // Un seul formulaire dans la page : à droite sur ordinateur (rendu du serveur), après la
  // séquence sur téléphone et tablette.
  const [formEnBas, setFormEnBas] = useState(false)
  precharger?.(`${BASE}-1600.avif`, { as: 'image', imageSrcSet: SRCSET_AVIF, imageSizes: TAILLES_ECRAN1, fetchPriority: 'high', type: 'image/avif' })

  const sectionRef = useRef<HTMLElement>(null)
  const pisteRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const calqueRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLImageElement>(null)
  const sourceRef = useRef<HTMLSourceElement>(null)
  const planRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const placerForm = () => setFormEnBas(!mq.matches)
    placerForm()
    mq.addEventListener('change', placerForm)
    return () => mq.removeEventListener('change', placerForm)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const choisir = () => setMode(mq.matches || connexionLente() ? 'repli' : 'sequence')
    choisir()
    mq.addEventListener('change', choisir)
    return () => mq.removeEventListener('change', choisir)
  }, [])

  // L'en-tête est collant : la scène se colle juste sous lui, à la hauteur mesurée.
  effetAvantPeinture(() => {
    const section = sectionRef.current
    const entete = document.querySelector('header')
    if (!section || !entete) return
    const poser = () => section.style.setProperty('--haut', `${entete.offsetHeight}px`)
    poser()
    const ro = new ResizeObserver(poser)
    ro.observe(entete)
    return () => ro.disconnect()
  }, [])

  effetAvantPeinture(() => {
    if (mode !== 'sequence') return
    const section = sectionRef.current!
    const piste = pisteRef.current!
    const scene = sceneRef.current!
    const grand = window.matchMedia('(min-width: 1024px)')
    let format: Format = grand.matches ? 'ordi' : 'mobile'

    let haut = 64
    let W = 0
    let Hs = 0
    let c0: Camera = { s: 1, vx: 0, vy: 0 }
    let c1 = c0
    let cMur = c0

    const mesurer = () => {
      format = grand.matches ? 'ordi' : 'mobile'
      haut = parseFloat(getComputedStyle(section).getPropertyValue('--haut')) || haut
      W = scene.offsetWidth
      Hs = scene.offsetHeight
      c0 = depart(W, Hs)
      // Avancée : le tableau au centre, plus près.
      c1 = couvrir({ s: Math.max(c0.s, Math.min(c0.s * AVANCE, ZOOM_MAX)), vx: W / 2, vy: Hs * 0.55 }, W, Hs)
      // Le mur ouvert ; au téléphone, au-dessus de la barre d'appel du bas.
      const plein: Rect = format === 'ordi' ? { x: 32, y: 24, w: W - 64, h: Hs - 48 } : { x: 10, y: 14, w: W - 20, h: Hs - (W < 768 ? 92 : 40) }
      // Téléphone : le bas du mur (la fuite, le testeur) remonte au-dessus de la barre d'appel.
      const barre = format === 'mobile' && W < 768 ? 52 : 0
      // (calé en bas, juste au-dessus d'elle).
      const k = cadrer(CADRE_MUR[format], plein)
      cMur = couvrir(barre ? { ...k, vy: -Infinity } : k, W, Hs, barre)
      if (svgRef.current) placerLoupe(svgRef.current, format)
    }

    const placer = (el: HTMLElement | null, c: Camera) => {
      if (!el) return
      const x = c.vx - VISE.x * c.s
      const y = c.vy - VISE.y * c.s
      el.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) scale(${c.s.toFixed(5)})`
    }

    let raf = 0
    let derniere = -1
    let pPose = -1
    let planVisible = false
    const peindre = () => {
      raf = 0
      const rp = piste.getBoundingClientRect()
      const p = borne((haut - rp.top) / Math.max(1, rp.height - Hs))
      if (p === derniere) return
      derniere = p

      // Texte et formulaire : effacés sur les 7 premiers pour cent, revenus à la fin.
      const f = doux(borne(p / 0.07))
      const g = doux(borne((p - T.texte0) / (T.texte1 - T.texte0)))
      const visible = p < 0.5 ? 1 - f : g
      const decale = p < 0.5 ? -22 * f : 14 * (1 - g)
      const calque = calqueRef.current
      if (calque) {
        calque.style.opacity = visible.toFixed(3)
        calque.style.transform = decale ? `translateY(${decale.toFixed(1)}px)` : ''
        calque.style.visibility = visible < 0.02 ? 'hidden' : ''
        calque.style.pointerEvents = visible < 0.6 ? 'none' : ''
      }

      // Caméra.
      let c: Camera
      if (p <= T.avance) c = vers(c0, c1, elan(p / T.avance, 0.4, 0.3))
      else if (p <= T.recul) c = vers(c1, cMur, elan((p - T.avance) / (T.recul - T.avance), 0.3, 0))
      else if (p <= T.retour0) c = cMur
      else if (p <= T.retour1) c = versCentre(cMur, c0, elan((p - T.retour0) / (T.retour1 - T.retour0), 0, 0), W / 2, Hs / 2)
      else c = c0
      placer(photoRef.current, c)
      placer(planRef.current, c)
      const montrer = p > T.avance * 0.9 && p < T.texte0
      if (montrer !== planVisible && planRef.current) {
        planVisible = montrer
        planRef.current.style.visibility = montrer ? 'visible' : 'hidden'
      }
      const pp = Math.round(p * 1000) / 1000
      if (svgRef.current && pp !== pPose) {
        pPose = pp
        poserMur(svgRef.current, pp)
      }
    }
    const planifier = () => {
      if (!raf) raf = requestAnimationFrame(peindre)
    }
    const retailler = () => {
      mesurer()
      derniere = -1
      planifier()
    }

    // La photo quitte son cadrage CSS : elle devient une planche de 1600 px que la caméra déplace.
    const photo = photoRef.current
    if (photo) Object.assign(photo.style, { inset: 'auto', left: '0px', top: '0px', bottom: 'auto', width: `${L}px`, height: `${H}px`, aspectRatio: 'auto', transformOrigin: '0 0', willChange: 'transform' })
    mesurer()
    if (svgRef.current) poserMur(svgRef.current, 0)
    const GESTES = ['scroll', 'wheel', 'touchstart', 'pointerdown', 'keydown'] as const
    const grandTirage = () => {
      if (photoRef.current && photoRef.current.sizes !== TAILLES_ZOOM) photoRef.current.sizes = TAILLES_ZOOM
      if (sourceRef.current && sourceRef.current.sizes !== TAILLES_ZOOM) sourceRef.current.sizes = TAILLES_ZOOM
    }
    const auGeste = () => {
      grandTirage()
      for (const g of GESTES) window.removeEventListener(g, auGeste)
    }
    for (const g of GESTES) window.addEventListener(g, auGeste, { passive: true })
    let tirage = 0
    const apresChargement = () => {
      tirage = window.setTimeout(grandTirage, 2500)
    }
    if (document.readyState === 'complete') apresChargement()
    else window.addEventListener('load', apresChargement, { once: true })
    const ro = new ResizeObserver(retailler)
    ro.observe(scene)
    window.addEventListener('scroll', planifier, { passive: true })
    grand.addEventListener('change', retailler)
    document.fonts?.ready.then(retailler)
    peindre()
    return () => {
      window.clearTimeout(tirage)
      window.removeEventListener('load', apresChargement)
      for (const g of GESTES) window.removeEventListener(g, auGeste)
      ro.disconnect()
      window.removeEventListener('scroll', planifier)
      grand.removeEventListener('change', retailler)
      if (raf) cancelAnimationFrame(raf)
      for (const el of [photoRef.current, calqueRef.current]) el?.removeAttribute('style')
    }
  }, [mode])

  // « Être rappelé » : sur ordinateur, le formulaire est déjà là, on y met le focus.
  const versFormulaire = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    const cible = formRef.current?.querySelector<HTMLInputElement>('input[type="radio"]')
    if (!cible) return
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    cible.focus({ preventScroll: true })
  }

  const sequence = mode === 'sequence'
  return (
    <>
      <section ref={sectionRef} id="top" aria-labelledby="titre-hero" data-seq={sequence ? '' : undefined} className="bt relative isolate bg-[#3B3E43] [overflow-x:clip]">
        <style>{CSS}</style>
        <div ref={pisteRef} className="bt-piste">
          <div ref={sceneRef} className="bt-scene bg-[#3B3E43]">
            <picture>
              <source ref={sourceRef} type="image/avif" srcSet={SRCSET_AVIF} sizes={TAILLES_ECRAN1} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={photoRef}
                src={`${BASE}-1600.webp`}
                srcSet={SRCSET_WEBP}
                sizes={TAILLES_ECRAN1}
                alt={ALT}
                width={L}
                height={H}
                {...PRIORITE}
                className="bt-photo pointer-events-none select-none"
              />
            </picture>

            {/* Le mur et ce qu'il cache, dans le repère de la photo (montés avec la séquence). */}
            <div ref={planRef} className="pointer-events-none absolute left-0 top-0 origin-top-left" style={{ width: L, height: H, visibility: 'hidden' }}>
              {sequence && <MurAnnecy svgRef={svgRef} className="absolute inset-0 h-full w-full overflow-visible" />}
            </div>

            {/* Écran 1 : le titre sur le mur, le formulaire à droite (ordinateur). */}
            <div ref={calqueRef} className="absolute inset-0 z-10">
              <div className="bt-grille">
                <div className="flex flex-col items-center px-5 pt-[calc(1.25rem+4svh)] text-center sm:px-8 lg:col-start-1 lg:items-start lg:justify-center lg:px-0 lg:pt-0 lg:text-left">
                  <p className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-accent [text-shadow:0_1px_8px_rgb(0_0_0/0.5)] lg:text-[13px]">
                    <span className="bt-veille h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
                    Dépannage {siteConfig.availability}
                  </p>
                  <h1
                    id="titre-hero"
                    className="mt-3 font-display text-[clamp(1.85rem,8.4vw,3rem)] font-medium leading-[1.06] tracking-tight text-white [text-shadow:0_2px_18px_rgb(0_0_0/0.45)] lg:mt-4 lg:text-[clamp(2.3rem,3.05vw,3.6rem)]"
                  >
                    <span className="block whitespace-nowrap">Électricien d'urgence</span>
                    <span className="block whitespace-nowrap">
                      à <span className="text-accent">{siteConfig.city}</span>
                    </span>
                  </h1>
                  <p className="mt-3 max-w-[19.5rem] text-[15px] leading-relaxed text-white/90 [text-shadow:0_1px_10px_rgb(0_0_0/0.55)] sm:max-w-md sm:text-base lg:mt-5 lg:max-w-[26rem] lg:text-[17.5px]">
                    Panne de courant, disjoncteur qui saute ou tableau à refaire. Nous trouvons l'origine de la panne avant de réparer.
                  </p>
                  <div className="mt-5 grid w-full max-w-[22rem] grid-cols-2 gap-2 sm:max-w-md lg:mt-8 lg:flex lg:w-auto lg:max-w-none lg:gap-2.5">
                    <a
                      href={`tel:${siteConfig.phone}`}
                      data-cta="phone-hero"
                      className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[3px] bg-accent px-3 text-[14px] font-bold text-dark transition hover:bg-accent/90 sm:px-6 sm:text-[15px]"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bt-appel h-[18px] w-[18px] shrink-0" aria-hidden="true">
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
                      </svg>
                      <span className="lg:hidden">Appeler</span>
                      <span className="hidden lg:inline">{siteConfig.phoneDisplay}</span>
                    </a>
                    <a
                      href="#formulaire"
                      onClick={versFormulaire}
                      className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-[3px] bg-white px-3 text-[14px] font-bold text-dark transition hover:bg-slate-100 sm:px-6 sm:text-[15px]"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] shrink-0" aria-hidden="true">
                        <path d="M4 5h16v11H8l-4 4z" />
                        <path d="M8 9.5h8M8 12.5h5" />
                      </svg>
                      Être rappelé
                    </a>
                  </div>
                </div>
                {/* Ordinateur : le formulaire, centré dans la hauteur, à droite du tableau. */}
                <div ref={formRef} className="hidden lg:col-start-3 lg:flex lg:flex-col lg:justify-center">
                  {!formEnBas && <LeadForm variante="hero" />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Téléphone et tablette : le formulaire après la séquence. */}
        <div id="formulaire" className="scroll-mt-20 bg-dark px-5 pb-12 pt-8 sm:px-8 lg:hidden">
          <div className="mx-auto w-full max-w-md">{formEnBas && <LeadForm variante="hero" />}</div>
        </div>
      </section>
      {mode === 'repli' && <MurFixe />}
    </>
  )
}

/** Repli : le mur ouvert et fixe sous l'écran 1, tous les circuits nommés. */
function MurFixe() {
  const r: Rect = { x: 340, y: 190, w: 470, h: 703 }
  const boite = useRef<HTMLDivElement>(null)
  const pc = (v: number, t: number) => `${((v / t) * 100).toFixed(4)}%`
  useEffect(() => {
    const svg = boite.current?.querySelector('svg')
    if (svg) poserMur(svg, P_FIXE)
  }, [])
  return (
    <section aria-label="Ce qui passe dans le mur, derrière le tableau" className="bg-dark py-8 lg:py-12">
      <style>{CSS_MUR}</style>
      <div ref={boite} className="relative mx-auto w-full max-w-[520px] overflow-hidden" style={{ aspectRatio: `${r.w} / ${r.h}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}-1600.webp`} alt="" loading="lazy" decoding="async" className="absolute max-w-none" style={{ left: pc(-r.x, r.w), top: pc(-r.y, r.h), width: pc(L, r.w), height: pc(H, r.h) }} />
        <div className="absolute" style={{ left: pc(-r.x, r.w), top: pc(-r.y, r.h), width: pc(L, r.w), height: pc(H, r.h) }}>
          <MurAnnecy className="absolute inset-0 h-full w-full" />
        </div>
      </div>
    </section>
  )
}

export default HeroTableau
