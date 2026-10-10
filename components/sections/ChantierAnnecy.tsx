'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import AppartAnnecy, { CADRE, CADRE_MOBILE, CARTOUCHE, placerCartouche } from '@/components/ui/AppartAnnecy'

/**
 * ChantierAnnecy, « l'intervention chez vous » DESSINÉE AU DÉFILEMENT (bloc 3 de l'accueil,
 * scénario validé par Rémy le 10/10/2026) : un appartement d'une résidence annécienne des années
 * 1970 en coupe, du coup de fil à la lumière qui revient. Moteur repris de sos-debouchage-metz.fr
 * (ChantierMetz), dessin propre au métier (AppartAnnecy).
 *
 * CADRE FIXE sur tous les formats : l'immeuble reste cadré et immobile, seuls les éléments de
 * l'étape en cours se tracent, se posent ou arrivent. Aucune caméra.
 * - En-tête centré dans le flux, puis une PISTE haute qui porte une scène COLLANTE.
 * - ORDINATEUR (1024 px et plus) : à gauche le compteur et la liste des cinq étapes (l'étape en
 *   cours déplie sa phrase), à droite le dessin. TÉLÉPHONE ET TABLETTE : le dessin en haut, sous
 *   lui cinq segments de progression, le compteur et l'étape en cours, centrés.
 * - Moteur : un seul requestAnimationFrame par défilement (écouteur passif), écoute coupée hors
 *   écran ; seuls opacity, transform et stroke-dashoffset bougent ; React ne se rend qu'au
 *   changement d'étape.
 * - REPLI (rendu serveur, « réduire les animations ») : dessin final fixe et les cinq étapes en
 *   liste ; titres et textes des étapes sont dans le HTML serveur. Le dessin n'entre dans la page
 *   qu'à deux écrans de la vue, dans un cadre de même proportion réservé d'avance.
 */

const ETAPES = [
  {
    cle: 'appel',
    titre: 'Votre appel, le prix annoncé',
    texte: 'Au téléphone, vous dites ce qui a coupé. Le déplacement est chiffré avant notre départ.',
  },
  {
    cle: 'securite',
    titre: 'La mise en sécurité au tableau',
    texte: 'Nous coupons le courant au tableau et vérifions l’absence de tension avant d’intervenir.',
  },
  {
    cle: 'recherche',
    titre: 'La recherche de panne, circuit par circuit',
    texte: 'Au testeur, nous suivons chaque circuit jusqu’au défaut, ici une prise de cuisine humide.',
  },
  {
    cle: 'reparation',
    titre: 'La réparation',
    texte: 'Nous remplaçons la pièce en cause, prise, disjoncteur ou différentiel, puis contrôlons le circuit.',
  },
  {
    cle: 'essais',
    titre: 'Les essais, le courant revient',
    texte: 'Nous remettons le courant circuit par circuit et vérifions que rien ne disjoncte.',
  },
] as const

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
const borne = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const freine = (t: number) => 1 - Math.pow(1 - t, 3)
const douce = (t: number) => t * t * (3 - 2 * t)
const deux = (n: number) => String(n).padStart(2, '0')
const FORMES = 'path, circle, rect, ellipse, line, polyline, polygon, text'
/** Course de défilement par étape, en hauteur d'écran. */
const COURSE = { ordi: 0.28, mobile: 0.3 }
/** Barre fixe du bas sur téléphone (Appeler, Être rappelé) : elle masque le bas de l'écran. */
const BARRE_MOBILE = 78
/** Ciel du dessin : fond du cadre avant que le dessin n'arrive. */
const FOND = '#D3E5EC'

type Zone = { x: number; y: number; w: number; h: number }
type V2 = [number, number]

/* ── Clés « q:v q:v » : valeur interpolée en douceur entre deux clés, en progression globale ── */
type Cle = [number, number]
const lireCles = (v: string | null): Cle[] =>
  (v ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((c) => c.split(':').map(Number) as Cle)
    .sort((a, b) => a[0] - b[0])
function valeur(cles: Cle[], q: number) {
  if (!cles.length) return 1
  if (q <= cles[0][0]) return cles[0][1]
  for (let i = 1; i < cles.length; i++) {
    const [q1, v1] = cles[i]
    if (q <= q1) {
      const [q0, v0] = cles[i - 1]
      return v0 + (v1 - v0) * douce(borne((q - q0) / Math.max(1e-6, q1 - q0)))
    }
  }
  return cles[cles.length - 1][1]
}

/** Mesure chaque cartouche, le place au bout de son filet et le garde dans le cadre. */
function ajusterCartouches(svg: SVGSVGElement, k: number) {
  const vb = svg.viewBox.baseVal
  const marge = 8 * k
  const sort = (a0: number, a1: number, min: number, max: number) => (a0 < min ? min - a0 : a1 > max ? max - a1 : 0)
  svg.querySelectorAll<SVGGElement>('[data-cartouche]').forEach((g) => {
    const boite = g.querySelector<SVGGElement>('[data-boite]')
    const texte = boite?.querySelector('text')
    if (!boite || !texte) return
    let largeur = 0
    try {
      largeur = texte.getBBox().width
    } catch {
      return
    }
    if (!largeur) return
    const w = Math.ceil(largeur + CARTOUCHE.padG + CARTOUCHE.padD)
    const h = CARTOUCHE.haut
    boite.querySelectorAll('rect').forEach((r) => r.setAttribute('width', String(w)))
    const cote = g.dataset.cote ?? 'haut'
    const x = Number(g.dataset.x)
    const y = Number(g.dataset.y)
    const [bx, by] = placerCartouche(cote, w, h)
    let ox = bx
    let oy = by
    // Le cartouche glisse le long de son bout sans s'en détacher, puis passe de l'autre côté.
    if (cote === 'haut' || cote === 'bas') ox += borne(sort(x + bx * k, x + (bx + w) * k, vb.x + marge, vb.x + vb.width - marge) / k, -(w / 2 - 10), w / 2 - 10)
    else oy += borne(sort(y + by * k, y + (by + h) * k, vb.y + marge, vb.y + vb.height - marge) / k, -(h / 2 - 4), h / 2 - 4)
    if (cote === 'droite' && x + (ox + w) * k > vb.x + vb.width - marge) ox = -w - 6
    if (cote === 'gauche' && x + ox * k < vb.x + marge) ox = 6
    if (cote === 'haut' && y + oy * k < vb.y + marge) oy = 6
    if (cote === 'bas' && y + (oy + h) * k > vb.y + vb.height - marge) oy = -h - 6
    // Dernier recours : le cartouche tient TOUJOURS entier dans le cadre.
    ox += sort(x + ox * k, x + (ox + w) * k, vb.x + marge, vb.x + vb.width - marge) / k
    oy += sort(y + oy * k, y + (oy + h) * k, vb.y + marge, vb.y + vb.height - marge) / k
    boite.setAttribute('transform', `translate(${ox.toFixed(1)} ${oy.toFixed(1)})`)
  })
}

/** Cadre le dessin : `zone` entière et centrée dans une boîte de proportion `ratio`. */
function cadrer(svg: SVGSVGElement, ratio: number | null, z: Zone = CADRE) {
  let { x, y, w, h } = z
  if (ratio) {
    if (ratio < w / h) {
      h = w / ratio
      y = z.y - (h - z.h) / 2
    } else {
      w = h * ratio
      x = z.x - (w - z.w) / 2
    }
    svg.setAttribute('viewBox', `${x.toFixed(1)} ${y.toFixed(1)} ${w.toFixed(1)} ${h.toFixed(1)}`)
  }
  const largeur = svg.clientWidth
  if (largeur > 0) {
    const k = w / largeur
    // Cartouches : 11,5 px au téléphone, 12,5 px à 600 px de cadre, jusqu'à 14,5 px au-delà.
    const kc = k * borne(largeur / 600, 0.92, 1.16)
    svg.style.setProperty('--k', k.toFixed(4))
    svg.style.setProperty('--kc', kc.toFixed(4))
    ajusterCartouches(svg, kc)
  }
}

/* ── Le dessin préparé pour le moteur ── */
type Feuille = { el: SVGGraphicsElement; long: number; base: number; fond: number | null; vu: number }
type Groupe = {
  el: SVGGraphicsElement
  k: number | null
  q0: number
  duree: number
  pose: boolean
  trace: boolean
  legende: boolean
  sort: number | null
  feuilles: Feuille[]
  vu: string
}
type Engin = { el: SVGGraphicsElement; chemin: V2[]; cumul: number[]; cles: Cle[]; opac: Cle[] | null; vu: string }
type Dessin = { groupes: Groupe[]; engins: Engin[] }

function preparer(svg: SVGSVGElement): Dessin {
  const groupes: Groupe[] = []
  svg.querySelectorAll<SVGGraphicsElement>('[data-pas], [data-sort]').forEach((el) => {
    if (el.closest('[data-engin]')) return
    const kAttr = el.getAttribute('data-pas')
    const k = kAttr === null ? null : Number(kAttr)
    const debut = Number(el.getAttribute('data-debut') ?? 0)
    const pose = el.hasAttribute('data-pose')
    const legende = el.hasAttribute('data-legende')
    const sortAttr = el.getAttribute('data-sort')
    const g: Groupe = {
      el,
      k,
      q0: k === null ? -1 : k - 1 + debut,
      duree: Number(el.getAttribute('data-duree') ?? (pose ? 0.3 : 0.35)),
      pose,
      trace: el.hasAttribute('data-trace'),
      legende,
      sort: sortAttr === null || sortAttr === '' ? null : Number(sortAttr),
      feuilles: [],
      vu: '',
    }
    if (legende) el.style.transition = 'opacity 260ms ease'
    if (!pose && !legende && k !== null) {
      for (const f of Array.from(el.querySelectorAll<SVGGraphicsElement>(FORMES))) {
        const cs = getComputedStyle(f)
        let long = 0
        if (f instanceof SVGPathElement && cs.stroke !== 'none' && (cs.strokeDasharray === 'none' || cs.strokeDasharray === '')) {
          try {
            long = f.getTotalLength()
          } catch {
            long = 0
          }
        }
        const o = Number.parseFloat(cs.opacity)
        const base = Number.isFinite(o) ? o : 1
        if (long > 0) {
          f.style.strokeDasharray = `${long + 2} ${long + 2}`
          const fo = Number.parseFloat(cs.fillOpacity)
          g.feuilles.push({ el: f, long, base, fond: cs.fill !== 'none' ? (Number.isFinite(fo) ? fo : 1) : null, vu: -1 })
        } else {
          g.feuilles.push({ el: f, long: 0, base, fond: null, vu: -1 })
        }
      }
    }
    groupes.push(g)
  })

  const engins: Engin[] = []
  svg.querySelectorAll<SVGGraphicsElement>('[data-engin]').forEach((el) => {
    const chemin = (el.getAttribute('data-chemin') ?? '0 0')
      .split(',')
      .map((p) => p.trim().split(/\s+/).map(Number) as V2)
    const cumul = [0]
    for (let i = 1; i < chemin.length; i++) cumul.push(cumul[i - 1] + Math.hypot(chemin[i][0] - chemin[i - 1][0], chemin[i][1] - chemin[i - 1][1]))
    const opac = el.getAttribute('data-opac')
    engins.push({ el, chemin, cumul, cles: lireCles(el.getAttribute('data-cles')), opac: opac ? lireCles(opac) : null, vu: '' })
  })
  return { groupes, engins }
}

/** Retire tout style posé par le moteur. */
function nettoyer(d: Dessin) {
  for (const g of d.groupes) {
    for (const prop of ['opacity', 'transform', 'transition']) g.el.style.removeProperty(prop)
    for (const f of g.feuilles) for (const prop of ['opacity', 'stroke-dasharray', 'stroke-dashoffset', 'fill-opacity']) f.el.style.removeProperty(prop)
  }
  for (const e of d.engins) {
    e.el.style.removeProperty('transform')
    e.el.style.removeProperty('opacity')
  }
}

/** Applique la progression q (0 à N, en étapes) au dessin. Retourne l'étape active (1 à N). */
function appliquer(d: Dessin, q: number, n: number): number {
  const cur = Math.min(n, Math.floor(q) + 1)
  for (const g of d.groupes) {
    const loc = g.k === null ? 1 : borne((q - g.q0) / g.duree)
    const reste = g.sort === null ? 1 : 1 - borne((q - g.sort) / 0.04)
    let op: number
    let tr = ''
    if (g.legende) op = g.k === cur && q >= g.q0 && reste > 0.5 ? 1 : 0
    else if (g.pose) {
      op = borne(loc / 0.6) * reste
      tr = `translate(0px, ${(-10 * (1 - freine(loc))).toFixed(2)}px)`
    } else op = reste * (g.trace && g.k !== null && q >= g.k ? 0.42 : 1)
    const cle = `${op.toFixed(3)}|${tr}`
    if (cle !== g.vu) {
      g.vu = cle
      g.el.style.opacity = op.toFixed(3)
      if (g.pose) g.el.style.transform = tr
    }
    for (const f of g.feuilles) {
      if (Math.abs(loc - f.vu) < 0.002) continue
      f.vu = loc
      const s = f.el.style
      if (f.long > 0) {
        s.strokeDashoffset = ((f.long + 2) * (1 - loc)).toFixed(2)
        s.opacity = loc > 0.001 ? String(f.base) : '0'
        if (f.fond !== null) s.fillOpacity = (f.fond * borne((loc - 0.3) / 0.7)).toFixed(3)
      } else s.opacity = (f.base * loc).toFixed(3)
    }
  }
  for (const e of d.engins) {
    // Position le long du chemin (du départ, s = 0, à la fin du chemin, s = 1).
    const s = borne(valeur(e.cles, q))
    const total = e.cumul[e.cumul.length - 1]
    let pos: V2 = e.chemin[e.chemin.length - 1]
    if (total > 0 && s < 1) {
      const cible = s * total
      let i = 1
      while (i < e.cumul.length - 1 && e.cumul[i] < cible) i++
      const t = borne((cible - e.cumul[i - 1]) / Math.max(1e-6, e.cumul[i] - e.cumul[i - 1]))
      pos = [e.chemin[i - 1][0] + (e.chemin[i][0] - e.chemin[i - 1][0]) * t, e.chemin[i - 1][1] + (e.chemin[i][1] - e.chemin[i - 1][1]) * t]
    }
    const op = e.opac ? borne(valeur(e.opac, q)) : 1
    const cle = `${pos[0].toFixed(2)} ${pos[1].toFixed(2)} ${op.toFixed(3)}`
    if (cle !== e.vu) {
      e.vu = cle
      e.el.style.opacity = op.toFixed(3)
      e.el.style.transform = `translate(${pos[0].toFixed(2)}px, ${pos[1].toFixed(2)}px)`
    }
  }
  return cur
}

export function ChantierAnnecy() {
  const n = ETAPES.length
  const [mode, setMode] = useState<'fixe' | 'anime'>('fixe')
  const [format, setFormat] = useState<'ordi' | 'mobile'>('ordi')
  const [actif, setActif] = useState(1)
  /** Le dessin n'entre dans la page qu'à l'approche de la section. */
  const [pret, setPret] = useState(false)
  const pisteRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const carteRef = useRef<HTMLDivElement>(null)
  const texteRef = useRef<HTMLDivElement>(null)
  const fixeRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const jaugesRef = useRef<(HTMLSpanElement | null)[]>([])

  /* Choix du rendu (largeur, « réduire les animations ») quand la section arrive à deux écrans. */
  useIsoLayoutEffect(() => {
    const large = window.matchMedia('(min-width: 1024px)')
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)')
    let parti = false
    const maj = () => {
      if (!parti) return
      setFormat(large.matches ? 'ordi' : 'mobile')
      setMode(reduit.matches ? 'fixe' : 'anime')
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || parti) return
        parti = true
        obs.disconnect()
        setPret(true)
        maj()
      },
      { rootMargin: '200% 0px 200% 0px' },
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    large.addEventListener('change', maj)
    reduit.addEventListener('change', maj)
    return () => {
      obs.disconnect()
      large.removeEventListener('change', maj)
      reduit.removeEventListener('change', maj)
    }
  }, [])

  /* Repli : seul le corps des cartouches suit la largeur du dessin. */
  useEffect(() => {
    if (mode !== 'fixe') return
    const svg = fixeRef.current?.querySelector<SVGSVGElement>('svg')
    if (!svg) return
    const ro = new ResizeObserver(() => cadrer(svg, null))
    ro.observe(svg)
    document.fonts?.ready.then(() => cadrer(svg, null))
    return () => ro.disconnect()
  }, [mode, pret])

  /* Moteur : mesures et dessin dans un seul requestAnimationFrame par défilement. */
  useIsoLayoutEffect(() => {
    if (mode !== 'anime') return
    const piste = pisteRef.current
    const scene = sceneRef.current
    const carte = carteRef.current
    const svg = carte?.querySelector<SVGSVGElement>('svg')
    if (!piste || !scene || !carte || !svg) return

    const dessin = preparer(svg)
    const ordi = format === 'ordi'
    const zone = ordi ? CADRE : CADRE_MOBILE
    const rapport = zone.w / zone.h
    let raf = 0
    let proche = true
    let dernier = 0
    let haut = 72
    let largeurVue = 0

    /* Taille du cadre, cadrage et position collante : une fois par taille d'écran. */
    const mesurer = () => {
      const vh = window.innerHeight
      const entete = (document.querySelector('header')?.getBoundingClientRect().height ?? 64) + 1
      const libre = vh - entete - (ordi ? 0 : BARRE_MOBILE)
      largeurVue = window.innerWidth
      const largeur = carte.clientWidth
      if (ordi) {
        // Panneau des étapes : hauteur fixe, celle de la liste avec la PLUS LONGUE phrase dépliée.
        const panneau = texteRef.current
        if (panneau) {
          panneau.style.height = 'auto'
          const lis = Array.from(panneau.querySelectorAll<HTMLElement>('ol > li'))
          const etats = lis.map((li) => {
            const volet = li.querySelector<HTMLElement>('[data-volet]')
            const phrase = (volet?.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0
            const vu = li.offsetHeight
            const ouvert = volet && volet.offsetHeight > 2
            return { vu, replie: ouvert ? vu - volet!.offsetHeight : vu, ouvert: (ouvert ? vu - volet!.offsetHeight : vu) + phrase }
          })
          const fixe = panneau.offsetHeight - etats.reduce((t, e) => t + e.vu, 0)
          const replies = etats.reduce((t, e) => t + e.replie, 0)
          const pire = Math.max(...etats.map((e) => replies - e.replie + e.ouvert))
          panneau.style.height = `${Math.ceil(fixe + pire)}px`
        }
        const h = Math.round(borne(Math.min(libre - 56, (largeur / rapport) * 1.04), 300, 2000))
        carte.style.height = `${h}px`
        haut = entete + Math.max(0, (libre - scene.offsetHeight) / 2)
      } else {
        // Le dessin garde la proportion du cadre serré ; le paysage dessiné autour comble l'écran.
        const hTexte = texteRef.current?.offsetHeight ?? 190
        const ecart = 14
        const plein = largeur / rapport
        const h = Math.round(borne(libre - 24 - hTexte - ecart, plein * 0.78, plein * 2.3))
        carte.style.height = `${h}px`
        haut = entete + Math.max(8, (libre - (h + ecart + hTexte)) / 2)
      }
      cadrer(svg, carte.clientWidth / carte.clientHeight, zone)
      scene.style.top = `${Math.round(haut)}px`
    }

    const calculer = () => {
      raf = 0
      const r = piste.getBoundingClientRect()
      const course = Math.max(1, r.height - scene.offsetHeight)
      const brut = (haut - r.top) / course
      // Le dessin démarre juste avant l'épinglage et s'achève un peu avant la sortie.
      const q = borne((brut + 0.05) / 0.9) * n
      const cur = appliquer(dessin, q, n)
      jaugesRef.current.forEach((j, i) => {
        if (j) j.style.transform = `scaleX(${borne(q - i).toFixed(4)})`
      })
      if (cur !== dernier) {
        dernier = cur
        // Les cartouches de l'étape sont remesurés au moment où ils s'affichent (police chargée).
        ajusterCartouches(svg, Number(svg.style.getPropertyValue('--kc')) || 1)
        setActif(cur)
      }
    }
    const planifier = () => {
      if (!raf && proche) raf = requestAnimationFrame(calculer)
    }
    const refaire = () => {
      // Téléphone : la barre d'adresse qui se replie change la hauteur, jamais la largeur.
      if (!ordi && window.innerWidth === largeurVue) return planifier()
      mesurer()
      planifier()
    }

    const obs = new IntersectionObserver(
      ([e]) => {
        proche = e.isIntersecting
        if (proche) planifier()
      },
      { rootMargin: '25% 0px 25% 0px' },
    )
    obs.observe(piste)
    window.addEventListener('scroll', planifier, { passive: true })
    window.addEventListener('resize', refaire)
    mesurer()
    calculer()
    let vivant = true
    const polices = () => {
      if (vivant) mesurer()
    }
    document.fonts?.ready.then(polices)
    document.fonts?.addEventListener?.('loadingdone', polices)
    return () => {
      vivant = false
      document.fonts?.removeEventListener?.('loadingdone', polices)
      if (raf) cancelAnimationFrame(raf)
      obs.disconnect()
      window.removeEventListener('scroll', planifier)
      window.removeEventListener('resize', refaire)
      nettoyer(dessin)
      carte.style.removeProperty('height')
      texteRef.current?.style.removeProperty('height')
      scene.style.removeProperty('top')
      svg.setAttribute('viewBox', `${CADRE.x} ${CADRE.y} ${CADRE.w} ${CADRE.h}`)
    }
  }, [mode, format, n])

  const entete = (
    <div className="mx-auto max-w-2xl text-center">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-deep">L’intervention chez vous</p>
      <h2 id="titre-chantier-annecy" className="text-2xl font-bold [text-wrap:balance] md:text-4xl">
        Du coup de fil <span className="accent-serif text-accent-deep">à la lumière qui revient</span>
      </h2>
      <p className="mt-3 text-slate-600 [text-wrap:balance]">Un appartement d’Annecy, une prise en défaut. Voici ce que nous faisons, étape par étape.</p>
    </div>
  )

  const pastille = (i: number, etat: 'fait' | 'en-cours' | 'a-venir') => (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] text-[13px] font-bold tabular-nums transition-colors duration-300 ${
        etat === 'en-cours' ? 'bg-accent text-dark' : etat === 'fait' ? 'bg-primary text-white' : 'border border-slate-300 bg-white text-slate-400'
      }`}
      aria-hidden="true"
    >
      {i + 1}
    </span>
  )

  /* ── REPLI : dessin final fixe et les cinq étapes en liste ── */
  if (mode === 'fixe') {
    return (
      <section ref={sectionRef} id="deroulement" className="section bg-light" aria-labelledby="titre-chantier-annecy">
        <div className="container-site">
          {entete}
          <div className="mt-12 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-12">
            <ol className="order-2 space-y-6 lg:order-1" role="list">
              {ETAPES.map((e, i) => (
                <li key={e.cle} className="flex flex-col items-center gap-2 text-center lg:flex-row lg:items-start lg:gap-4 lg:text-left">
                  {pastille(i, 'en-cours')}
                  <div>
                    <h3 className="font-sans text-base font-semibold text-slate-900 [text-wrap:balance]">{e.titre}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600 [text-wrap:balance]">{e.texte}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div ref={fixeRef} className="order-1 overflow-hidden rounded-[3px] border border-slate-300 lg:sticky lg:top-24 lg:order-2" style={{ background: FOND }}>
              {pret ? (
                <AppartAnnecy fixe className="block h-auto w-full" />
              ) : (
                <div className="w-full" style={{ aspectRatio: `${CADRE.w} / ${CADRE.h}` }} aria-hidden="true" />
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const compteur = (classe: string) => (
    <p className={`tabular-nums leading-none ${classe}`} aria-hidden="true">
      <span className="font-bold text-accent-deep">{deux(actif)}</span>
      <span className="mx-1.5 text-slate-400">/</span>
      <span className="text-slate-400">{deux(n)}</span>
    </p>
  )

  const jauges = (epaisseur: string) => (
    <div className="flex gap-1.5" aria-hidden="true">
      {ETAPES.map((e, i) => (
        <span key={e.cle} className={`relative ${epaisseur} flex-1 overflow-hidden rounded-[1px] bg-slate-300`}>
          <span
            ref={(el) => {
              jaugesRef.current[i] = el
            }}
            className="absolute inset-0 origin-left bg-accent"
            style={{ transform: 'scaleX(0)' }}
          />
        </span>
      ))}
    </div>
  )

  const carte = (
    <div
      ref={carteRef}
      className={`relative overflow-hidden border-slate-300 ${
        format === 'ordi' ? 'w-full rounded-[3px] border shadow-card' : '-mx-4 w-[calc(100%+2rem)] border-y sm:mx-0 sm:w-full sm:rounded-[3px] sm:border'
      }`}
      style={{ background: FOND }}
    >
      <AppartAnnecy className="absolute inset-0 block h-full w-full" />
    </div>
  )

  /* Une cale d'une course par étape, dans le flux. */
  const cale = <div aria-hidden="true" style={{ height: `${Math.round(n * COURSE[format] * 100)}vh` }} />

  /* ── ORDINATEUR : compteur et étapes à gauche, dessin à droite ── */
  if (format === 'ordi') {
    return (
      <section id="deroulement" className="bg-light pb-16 pt-24 lg:pt-32" aria-labelledby="titre-chantier-annecy">
        <div className="container-site">{entete}</div>
        <div ref={pisteRef} className="relative mt-12">
          <div ref={sceneRef} className="sticky" style={{ top: 72 }}>
            <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,0.78fr)_minmax(0,1.7fr)] items-start gap-10 px-6 lg:px-10">
              <div ref={texteRef} className="flex h-[26rem] flex-col justify-center">
                {compteur('text-3xl')}
                <div className="mt-5">{jauges('h-[3px]')}</div>
                <ol className="mt-6 space-y-1" role="list">
                  {ETAPES.map((e, i) => {
                    const k = i + 1
                    const on = k === actif
                    return (
                      <li
                        key={e.cle}
                        aria-current={on ? 'step' : undefined}
                        className={`rounded-[3px] border-l-[3px] py-2.5 pl-4 pr-2 transition-colors duration-300 ${on ? 'border-accent bg-white shadow-card' : 'border-transparent'}`}
                      >
                        <div className="flex items-center gap-3">
                          {pastille(i, on ? 'en-cours' : k < actif ? 'fait' : 'a-venir')}
                          <h3 className={`font-sans text-base leading-snug transition-colors duration-300 [text-wrap:balance] ${on ? 'font-bold text-slate-900' : 'font-semibold text-slate-500'}`}>
                            {e.titre}
                          </h3>
                        </div>
                        <div className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                          <div data-volet="" className="overflow-hidden">
                            <p className="pl-10 pt-1.5 text-[15px] leading-relaxed text-slate-600 [text-wrap:balance]">{e.texte}</p>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
              {carte}
            </div>
          </div>
          {cale}
        </div>
      </section>
    )
  }

  /* ── TÉLÉPHONE ET TABLETTE : dessin en haut, étape en cours centrée dessous ── */
  return (
    <section id="deroulement" className="bg-light pb-5 pt-14 md:pb-16 md:pt-24" aria-labelledby="titre-chantier-annecy">
      <div className="container-site">{entete}</div>
      <div ref={pisteRef} className="relative mt-8">
        <div ref={sceneRef} className="sticky" style={{ top: 72 }}>
          <div className="mx-auto flex max-w-xl flex-col px-4 sm:px-6 md:max-w-3xl">
            {carte}
            <div ref={texteRef} className="mx-auto mt-3.5 w-full max-w-md text-center md:max-w-xl">
              {jauges('h-[4px]')}
              <div className="mt-3 flex justify-center">{compteur('text-base')}</div>
              <ol className="mt-2 grid" role="list">
                {ETAPES.map((e, i) => {
                  const on = i + 1 === actif
                  return (
                    <li
                      key={e.cle}
                      aria-current={on ? 'step' : undefined}
                      className={`[grid-area:1/1] transition-[opacity,transform] duration-300 ease-out ${on ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-1.5 opacity-0'}`}
                    >
                      <h3 className="font-sans text-lg font-bold leading-tight text-slate-900 [text-wrap:balance]">{e.titre}</h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600 [text-wrap:balance]">{e.texte}</p>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </div>
        {cale}
      </div>
    </section>
  )
}
