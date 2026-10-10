import type { CSSProperties, ReactNode } from 'react'
import { siteConfig } from '@/config/site.config'
import { F, T, Trace } from '@/components/ui/Trace'

/**
 * Bande des quatre engagements, juste sous le bloc 1 (mise à jour du 10/10/2026 : les
 * icônes de bibliothèque dans des pastilles rondes ne disaient pas le métier, refus de Rémy).
 *
 * Quatre tuiles, chacune avec un petit DESSIN AU TRAIT de l'électricien, dans l'encre et le
 * jaune miel du schéma du déroulé : l'horloge et la semaine, le devis qui s'écrit, le testeur
 * branché sur la prise, le palais de l'Isle sur le Thiou. Chaque dessin se trace une fois à
 * l'apparition. Aucune promesse nouvelle : ce sont les engagements déjà écrits au site.
 */

const ENCRE = '#14202B'
const EAU = '#5BA7CF'
const ROUGE = '#E0483A'
const FOND = '#EAF1F6'

function Dessin({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 160 96" className="mx-auto block h-[70px] w-auto lg:mx-0 lg:h-[84px]" aria-hidden="true" focusable="false">
      <g fill="none" stroke={ENCRE} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  )
}

/* 1. Jour et nuit : l'horloge dont l'éclair fait les aiguilles, et la semaine entière cochée. */
function Horloge() {
  return (
    <Dessin>
      <F d="M28 48 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0" couleur="#FFFFFF" r={0} />
      <T d="M28 48 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0" r={0} />
      <T d="M62 18 v6 M62 72 v6 M32 48 h6 M86 48 h6" r={1} fin />
      <T d="M41 27 l3 3 M83 27 l-3 3 M41 69 l3 -3 M83 69 l-3 -3" r={1} fin />
      <F d="M67 25 L52 52 H62 L57 72 L74 41 H64 Z" r={2} />
      <T d="M67 25 L52 52 H62 L57 72 L74 41 H64 Z" r={2} />
      {/* La semaine : sept jours, tous ouverts */}
      <F d="M110 22 h40 v52 h-40 Z" couleur="#FFFFFF" r={3} />
      <T d="M110 22 h40 v52 h-40 Z" r={3} />
      <F d="M110 22 h40 v10 h-40 Z" couleur={ENCRE} opacite={0.85} r={4} />
      <T d="M118 17 v9 M142 17 v9" r={4} />
      <F d="M115 38 h7 v7 h-7 Z M126 38 h7 v7 h-7 Z M137 38 h7 v7 h-7 Z M115 50 h7 v7 h-7 Z M126 50 h7 v7 h-7 Z M137 50 h7 v7 h-7 Z M115 62 h7 v7 h-7 Z" r={5} />
      <T d="M115 38 h7 v7 h-7 Z M126 38 h7 v7 h-7 Z M137 38 h7 v7 h-7 Z M115 50 h7 v7 h-7 Z M126 50 h7 v7 h-7 Z M137 50 h7 v7 h-7 Z M115 62 h7 v7 h-7 Z" r={5} fin />
    </Dessin>
  )
}

/* 2. Le devis écrit : la feuille se remplit ligne à ligne, le total, la signature, le stylo. */
function Devis() {
  return (
    <Dessin>
      <F d="M44 8 H96 L110 22 V90 H44 Z" couleur="#FFFFFF" r={0} />
      <T d="M44 8 H96 L110 22 V90 H44 Z" r={0} />
      <T d="M96 8 V22 H110" r={0} fin />
      <F d="M52 18 h30 v8 h-30 Z" r={1} />
      <T d="M52 36 h48" r={2} fin />
      <T d="M52 44 h40" r={3} fin />
      <T d="M52 52 h44" r={4} fin />
      <T d="M52 60 h30" r={5} fin />
      <T d="M70 70 h30" r={6} epais={2.4} />
      <T d="M64 66 a4 4 0 1 0 0 6 M58 68 h5 M58 70.5 h5" r={6} fin />
      <T d="M54 84 c3 -6 7 -6 9 -1 s5 4 8 -2 s4 -3 7 1" r={7} />
      {/* Stylo */}
      <F d="M122 52 L144 22 L152 28 L130 58 Z" r={7} />
      <T d="M122 52 L144 22 L152 28 L130 58 Z M122 52 L119 63 L130 58" r={7} />
      <T d="M140 27 l8 6" r={8} fin />
    </Dessin>
  )
}

/* 3. La recherche de panne : le testeur jaune, ses deux cordons plantés dans la prise. */
function Testeur() {
  return (
    <Dessin>
      <F d="M28 10 h44 a4 4 0 0 1 4 4 v68 a4 4 0 0 1 -4 4 h-44 a4 4 0 0 1 -4 -4 v-68 a4 4 0 0 1 4 -4 Z" r={1} />
      <T d="M28 10 h44 a4 4 0 0 1 4 4 v68 a4 4 0 0 1 -4 4 h-44 a4 4 0 0 1 -4 -4 v-68 a4 4 0 0 1 4 -4 Z" r={0} />
      <F d="M32 18 h36 v18 h-36 Z" couleur="#DCE8D2" r={2} />
      <T d="M32 18 h36 v18 h-36 Z" r={1} />
      <T d="M38 31 v-8 h5 v8 h-5 M47 31 v-8 h5 v8 h-5 M56 31 v-8 h5 v8 h-5" r={3} fin />
      <T d="M40 54 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0" r={2} />
      <T d="M50 54 l6 -7" r={3} />
      <T d="M38 76 a2.5 2.5 0 1 0 5 0 a2.5 2.5 0 1 0 -5 0 M57 76 a2.5 2.5 0 1 0 5 0 a2.5 2.5 0 1 0 -5 0" r={3} />
      {/* Cordons rouge et noir vers la prise */}
      <T d="M59.5 78 C70 96 100 92 116 58" r={4} couleur={ROUGE} epais={2} />
      <T d="M40.5 78 C44 100 122 98 134 58" r={4} epais={2} />
      <T d="M116 58 l4 -12 M134 58 l-1 -12" r={5} epais={3} />
      {/* La prise murale, deux broches et sa terre */}
      <F d="M106 14 h40 v36 h-40 Z" couleur="#FFFFFF" r={5} />
      <T d="M106 14 h40 v36 h-40 Z" r={5} />
      <T d="M113 32 a13 13 0 1 0 26 0 a13 13 0 1 0 -26 0" r={6} />
      <F d="M119 30 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0 M130 30 a1.8 1.8 0 1 0 3.6 0 a1.8 1.8 0 1 0 -3.6 0" couleur={ENCRE} r={6} />
      <T d="M126 20 v5" r={6} fin />
    </Dessin>
  )
}

/* 4. Annecy : le palais de l'Isle sur le Thiou, le Semnoz derrière, ses fenêtres allumées. */
function Annecy() {
  return (
    <Dessin>
      <F d="M4 60 L32 34 L48 46 L76 20 L102 44 L118 34 L156 60 Z" couleur={ENCRE} opacite={0.06} r={0} />
      <T d="M4 60 L32 34 L48 46 L76 20 L102 44 L118 34 L156 60" r={0} fin />
      {/* Proue de pierre et corps du palais */}
      <F d="M40 72 L56 58 H120 L128 72 Z" couleur="#FFFFFF" r={1} />
      <T d="M40 72 L56 58 H120 L128 72 Z" r={1} />
      <F d="M58 58 V42 H98 V58 Z" couleur="#FFFFFF" r={2} />
      <T d="M58 58 V42 H98 V58" r={2} />
      <T d="M55 42 L68 32 H94 L101 42" r={3} />
      {/* Tour */}
      <F d="M98 58 V30 H112 V58 Z" couleur="#FFFFFF" r={3} />
      <T d="M98 58 V30 H112 V58" r={3} />
      <T d="M96 30 L105 18 L114 30" r={4} />
      {/* Fenêtres allumées */}
      <F d="M65 47 h5 v6 h-5 Z M75 47 h5 v6 h-5 Z M85 47 h5 v6 h-5 Z M102.5 37 h5 v6 h-5 Z" r={5} />
      <T d="M65 47 h5 v6 h-5 Z M75 47 h5 v6 h-5 Z M85 47 h5 v6 h-5 Z M102.5 37 h5 v6 h-5 Z" r={5} fin />
      {/* Le Thiou */}
      <T d="M6 80 q8 -4 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0" r={5} couleur={EAU} />
      <T d="M30 89 q8 -4 16 0 t16 0 t16 0 t16 0 t16 0 t16 0" r={6} couleur={EAU} fin />
    </Dessin>
  )
}

const TUILES = [
  { cle: 'heures', titre: `Ouvert ${siteConfig.availability.replace(' · ', ', ')}`, ligne: 'Week-ends et jours fériés compris.', dessin: <Horloge /> },
  { cle: 'devis', titre: 'Devis écrit avant travaux', ligne: 'Le prix est posé avant de commencer.', dessin: <Devis /> },
  { cle: 'testeur', titre: 'La\u00a0panne cherchée\u00a0sur\u00a0place', ligne: 'Circuit par circuit, au testeur.', dessin: <Testeur /> },
  {
    cle: 'annecy',
    titre: `${siteConfig.city} et ${siteConfig.serviceArea.radiusKm}\u00a0km autour`,
    ligne: "Du tour du lac jusqu'à Rumilly.",
    dessin: <Annecy />,
  },
]

export default function Engagements() {
  return (
    <section className="border-b border-slate-200 bg-light py-4 lg:py-8" aria-label="Nos engagements">
      <div className="container-site">
        <ul className="grid auto-rows-fr grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-5" role="list">
          {TUILES.map((t, i) => (
            <li key={t.cle} className="h-full">
              <Trace
                className="flex h-full flex-col overflow-hidden rounded-[3px] border border-slate-200 bg-white"
                style={{ '--t': `${i * 150}ms` } as CSSProperties}
              >
                <div className="border-b border-slate-200/70 px-3 pb-2 pt-3 lg:px-5 lg:pt-4" style={{ backgroundColor: FOND }}>
                  {t.dessin}
                </div>
                <div className="flex flex-1 flex-col justify-center px-3 pb-3.5 pt-3 text-center lg:justify-start lg:text-left lg:px-5 lg:pb-5 lg:pt-4">
                  <p className="text-balance text-[14.5px] font-bold leading-snug text-slate-900 lg:text-[16.5px]">{t.titre}</p>
                  <p className="mt-1 text-balance text-[12.5px] leading-snug text-slate-600 lg:text-[14px]">{t.ligne}</p>
                </div>
              </Trace>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
