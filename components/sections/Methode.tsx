import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'
import { siteConfig } from '@/config/site.config'
import AccentWord from '@/components/ui/AccentWord'
import { F, T, Trace } from '@/components/ui/Trace'

/**
 * « Notre façon de travailler » (mise à jour du 10/10/2026) : remplace les blocs « À propos »
 * et « Pourquoi nous choisir » de l'accueil, qui se répétaient et portaient trop de texte.
 * Une photo du métier, une phrase, quatre engagements de chantier avec chacun une icône
 * DESSINÉE qui s'anime à l'apparition (le levier qui descend, la loupe qui balaie le mur,
 * les repères qui s'écrivent au tableau, la prise de terre cochée).
 */

const ENCRE = '#14202B'
const CREPI = '#EFE6D4'
const ORANGE = '#F08A24'

const STYLE = `
.methode .aa-balaie{transform-box:fill-box;transform-origin:center}
.methode[data-etat="vu"] .aa-balaie{animation:aa-balaie 1.8s ease-in-out calc(var(--t,0ms) + 700ms) 1 both}
@keyframes aa-balaie{0%{transform:translateX(-14px)}45%{transform:translateX(12px)}100%{transform:translateX(0)}}
.methode .aa-levier{transform-box:fill-box;transform-origin:center}
.methode[data-etat="vu"] .aa-levier{animation:aa-levier .5s cubic-bezier(.5,0,.3,1) calc(var(--t,0ms) + 800ms) 1 both}
@keyframes aa-levier{from{transform:translateY(-12px)}to{transform:translateY(0)}}
@media (prefers-reduced-motion:reduce){.methode .aa-balaie,.methode .aa-levier{animation:none!important}}
`

function Icone({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 shrink-0 lg:h-16 lg:w-16" aria-hidden="true" focusable="false">
      <g fill="none" stroke={ENCRE} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  )
}

/* Le disjoncteur coupé, levier en bas, et le cadenas de consignation. */
function Coupure() {
  return (
    <Icone>
      <F d="M8 8 h28 v48 h-28 Z" couleur="#FFFFFF" r={0} />
      <T d="M8 8 h28 v48 h-28 Z" r={0} />
      <T d="M17 18 h10 v28 h-10 Z" r={1} fin />
      <g className="aa-levier">
        <F d="M17 34 h10 v12 h-10 Z" couleur={ENCRE} opacite={0.85} r={1} />
      </g>
      <T d="M14 12 h16" r={1} fin />
      <F d="M40 36 h18 v16 h-18 Z" couleur={ORANGE} r={2} />
      <T d="M40 36 h18 v16 h-18 Z M44 36 v-5 a5 5 0 0 1 10 0 v5" r={2} />
      <T d="M49 42 v4" r={3} />
    </Icone>
  )
}

/* Le mur, le câble caché dedans et la loupe du détecteur qui le suit. */
function Detecteur() {
  return (
    <Icone>
      <F d="M4 8 h56 v48 h-56 Z" couleur={CREPI} r={0} />
      <T d="M4 8 h56 v48 h-56 Z" r={0} />
      <T d="M4 44 C20 44 26 22 60 22" r={1} couleur={ORANGE} epais={2.2} />
      <g className="aa-balaie">
        <F d="M23 32 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0" couleur="#FFFFFF" opacite={0.75} r={2} />
        <T d="M23 32 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0" r={2} />
        <T d="M40 39 l9 9" r={2} epais={3} />
      </g>
    </Icone>
  )
}

/* Le tableau, ses rangées, et les repères écrits sous chaque circuit. */
function Reperes() {
  return (
    <Icone>
      <F d="M10 4 h44 v56 h-44 Z" couleur="#FFFFFF" r={0} />
      <T d="M10 4 h44 v56 h-44 Z" r={0} />
      <T d="M16 12 h32 v12 h-32 Z M16 34 h32 v12 h-32 Z" r={1} fin />
      <T d="M22 12 v12 M28 12 v12 M34 12 v12 M40 12 v12 M22 34 v12 M28 34 v12 M34 34 v12 M40 34 v12" r={1} fin />
      <F d="M16 26 h32 v5 h-32 Z M16 48 h32 v5 h-32 Z" r={2} />
      <T d="M18 28.5 h5 M25 28.5 h4 M31 28.5 h6 M39 28.5 h5 M18 50.5 h6 M26 50.5 h4 M32 50.5 h5 M39 50.5 h6" r={3} />
    </Icone>
  )
}

/* La prise avec sa terre, cochée : la norme des logements. */
function Norme() {
  return (
    <Icone>
      <F d="M8 8 h40 v40 h-40 Z" couleur="#FFFFFF" r={0} />
      <T d="M8 8 h40 v40 h-40 Z" r={0} />
      <T d="M14 28 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0" r={1} />
      <F d="M20 28 a2.4 2.4 0 1 0 4.8 0 a2.4 2.4 0 1 0 -4.8 0 M31.2 28 a2.4 2.4 0 1 0 4.8 0 a2.4 2.4 0 1 0 -4.8 0" couleur={ENCRE} r={1} />
      <T d="M28 16 v6" r={2} epais={2.6} />
      <F d="M38 46 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0" r={3} />
      <T d="M38 46 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0" r={3} />
      <T d="M44 46 l4 4 l8 -9" r={4} epais={2.4} />
    </Icone>
  )
}

const POINTS = [
  { titre: 'Coupé et vérifié avant tout', ligne: 'Aucun fil touché sous tension.', icone: <Coupure /> },
  { titre: 'Murs ouverts au minimum', ligne: 'Les câbles suivis au détecteur.', icone: <Detecteur /> },
  { titre: 'Chantier laissé propre', ligne: 'Sols protégés, circuits repérés.', icone: <Reperes /> },
  { titre: 'Selon la norme NF C 15-100', ligne: 'La norme des logements, suivie.', icone: <Norme /> },
]

export default function Methode() {
  return (
    <section className="section bg-white" aria-labelledby="titre-methode">
      <style dangerouslySetInnerHTML={{ __html: STYLE }} />
      <div className="container-site grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
        <div className="text-center lg:order-2 lg:text-left">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-deep">Notre façon de travailler</p>
          <h2 id="titre-methode" className="text-2xl font-bold md:text-4xl">
            <AccentWord text={siteConfig.about.title} word={siteConfig.city} />
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-slate-600 lg:mx-0">
            Avant de réparer, nous cherchons l'origine du défaut. Puis nous vous expliquons ce que nous avons trouvé, devis écrit à
            l'appui.
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 lg:gap-x-8" role="list">
            {POINTS.map((p, i) => (
              <li key={p.titre}>
                <Trace
                  className="methode flex flex-col items-center gap-3 text-center lg:flex-row lg:items-start lg:text-left"
                  style={{ '--t': `${i * 180}ms` } as CSSProperties}
                >
                  {p.icone}
                  <div>
                    <h3 className="text-balance font-sans text-[15px] font-bold leading-snug text-slate-900 lg:text-base">{p.titre}</h3>
                    <p className="mt-1 text-balance text-[13px] leading-snug text-slate-600 lg:text-sm">{p.ligne}</p>
                  </div>
                </Trace>
              </li>
            ))}
          </ul>
        </div>

        <Trace className="apparait relative aspect-[4/3] overflow-hidden rounded-[3px] bg-slate-100 lg:order-1">
          <Image
            src="/a-propos-tableau.jpg"
            alt="Tableau électrique neuf, porte ouverte, dans une buanderie claire et rangée"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover"
          />
        </Trace>
      </div>
    </section>
  )
}
