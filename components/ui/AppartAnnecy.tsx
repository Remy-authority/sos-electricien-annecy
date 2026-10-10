import { memo } from 'react'
import { CADRE, CADRE_MOBILE, CARTOUCHE, placerCartouche, type V2 } from '@/components/ui/appart-annecy-logique'

/**
 * AppartAnnecy, l'intervention dessinée en couleur (bloc 3 de l'accueil, scénario validé par Rémy
 * le 10/10/2026) : une résidence des années 1970 du bassin annécien, façade enlevée au 2e étage.
 * L'appartement est dans le noir, les voisins ont la lumière. Derrière, le lac et les montagnes.
 *
 * Pourquoi cet appartement : à Annecy, 86,7 % des logements sont des appartements et la période
 * de construction la plus fréquente des résidences principales est 1971-1990 (Insee, dossier
 * complet de la commune 74010, recensement 2023).
 *
 * Vue de face, coupe verticale : l'entrée et son tableau, le séjour, la cuisine, la salle de bain
 * et son chauffe-eau. Les circuits passent en haut des murs (chauffe-eau, éclairage) et en bas
 * (prises du séjour, prises de la cuisine), sans jamais se croiser. Le défaut : la prise du plan
 * de travail de la cuisine. L'immeuble est étroit et ses étages hauts pour que l'appartement
 * remplisse le cadre, téléphone compris.
 *
 * Le dessin sert la séquence `ChantierAnnecy` ; tout s'y pilote en progression globale `q`
 * (0 à 5, une unité par étape) :
 * - `data-pas="k"` + `data-debut` (0 à 1 dans l'étape) : le calque apparaît ; ses traits pleins
 *   se tracent, ses aplats arrivent en fondu ; `data-pose` : le groupe se pose d'un bloc ;
 * - `data-trace` : trait miel gardé, discret une fois l'étape passée ;
 * - `data-sort="q"` : le calque s'efface à cette progression ;
 * - `data-legende` : cartouche affiché SEULEMENT pendant son étape ;
 * - `data-engin` : objet qui se déplace le long de `data-chemin` (décalages, du départ à la place
 *   finale), selon `data-cles` (« q:s », s de 0 à 1) et l'opacité `data-opac`.
 *
 * `fixe` (repli sans animation) : l'état final seul, lumière revenue, sans outils ni cartouches.
 * Aucune cote, aucune distance, aucune durée : rien qui ne se vérifie sur place.
 */

type Cote = 'haut' | 'bas' | 'gauche' | 'droite'

const r1 = (v: number) => String(Math.round(v * 10) / 10)
const plat = (pts: V2[], ferme = false) => `M${pts.map(([a, b]) => `${r1(a)} ${r1(b)}`).join('L')}${ferme ? 'Z' : ''}`

const ENCRE = '#14202B'
const MIEL = '#FCD680'
const FOND_CARTOUCHE = '#FFF8EA'
const ROUGE = '#E0483A'
const VERT = '#3FB66B'
const CREPI = '#EFE6D4'
const BANDE = '#D8CAB0'
const BOIS = '#7A4B2A'
const VITRE = '#AFC9D6'
const LUMIERE = '#F7D88E'
const MUR_INT = '#F4EFE6'

/* ── Repères (unités du dessin) ── */
const SOL = 1060
/** Les étages de la résidence : haut et bas de chaque niveau habitable. */
const N3 = { h: 76, b: 316 }
const N2 = { h: 334, b: 574 }
const N1 = { h: 592, b: 832 }
const RDC = { h: 850, b: SOL }
const IMM = { g: 300, d: 920 }
/** Murs coupés du 2e étage et cloisons (entrée | séjour | cuisine | salle de bain). */
const MUR_G = { g: 300, d: 318 }
const MUR_D = { g: 902, d: 920 }
const CLOISONS = [430, 640, 790] as const
const TABLEAU = { x: 344, y: 372, w: 72, h: 92 }
const PRISE_CUISINE: V2 = [730, 484]
const PRISE_SEJOUR: V2 = [600, 549]
const LAMPE: V2 = [590, 404]
const BALLON = { x: 846, y: 380, w: 46, h: 90 }
/** Colonnes des fenêtres des étages voisins. */
const FENETRES = [340, 436, 532, 628, 724, 820]
/** Hauteur des cartouches : sur la dalle du 3e, au-dessus de l'appartement. */
const LIGNE = 326



/** Épaisseur en pixels d'écran, quel que soit le cadrage. */
const px = (n: number) => ({ strokeWidth: `calc(var(--k, 1) * ${n}px)` })

/** Trait miel cerné d'encre : les deux chemins ont la même longueur et se tracent ensemble. */
function Miel({ d, l = 3 }: { d: string; l?: number }) {
  return (
    <>
      <path d={d} fill="none" stroke={ENCRE} strokeOpacity="0.78" strokeLinecap="round" strokeLinejoin="round" style={px(l + 2.4)} />
      <path d={d} fill="none" stroke={MIEL} strokeLinecap="round" strokeLinejoin="round" style={px(l)} />
    </>
  )
}

/** Étiquette d'étape : pastille miel sur l'objet, filet miel jusqu'au cartouche crème. */
function Etiquette({ pas, debut, point, bout, cote = 'haut', texte }: { pas: number; debut: number; point: V2; bout: V2; cote?: Cote; texte: string }) {
  const h = CARTOUCHE.haut
  const w = Math.round(texte.length * 7 + CARTOUCHE.padG + CARTOUCHE.padD)
  const [bx, by] = placerCartouche(cote, w, h)
  const echelle = (p: V2) => ({ transform: `translate(${r1(p[0])}px, ${r1(p[1])}px) scale(var(--kc, var(--k, 1)))` })
  return (
    <g data-pas={pas} data-debut={debut} data-duree="0.12" data-legende="">
      <Miel d={plat([point, bout])} l={2.2} />
      <g style={echelle(point)}>
        <circle r="5.2" fill={MIEL} stroke={ENCRE} strokeWidth="1.5" />
        <circle r="1.6" fill={ENCRE} />
      </g>
      <g data-cartouche="" data-x={r1(bout[0])} data-y={r1(bout[1])} data-cote={cote} style={echelle(bout)}>
        <g data-boite="" transform={`translate(${r1(bx)} ${r1(by)})`}>
          <rect x="2" y="2.5" width={w} height={h} rx="2" fill={ENCRE} fillOpacity="0.24" />
          <rect width={w} height={h} rx="2" fill={FOND_CARTOUCHE} stroke={ENCRE} strokeWidth="1.25" />
          <text x={CARTOUCHE.padG} y={h / 2 + 4.3} fill={ENCRE} fontWeight="600" fontFamily="var(--font-sora), ui-sans-serif, system-ui" fontSize={CARTOUCHE.corps}>
            {texte}
          </text>
        </g>
      </g>
    </g>
  )
}

/* ── Les circuits, dans les murs du 2e étage (aucun ne croise un autre) ── */
const T = TABLEAU
const C_BALLON = plat([[362, T.y], [362, 346], [BALLON.x + BALLON.w / 2, 346], [BALLON.x + BALLON.w / 2, BALLON.y]])
const C_ECLAIRAGE = plat([[398, T.y], [398, 358], [LAMPE[0], 358], [LAMPE[0], LAMPE[1] - 4]])
const C_SEJOUR = plat([[362, T.y + T.h], [362, 556], [PRISE_SEJOUR[0] - 7, 556]])
const C_CUISINE = plat([[398, T.y + T.h], [398, 540], [PRISE_CUISINE[0], 540], [PRISE_CUISINE[0], PRISE_CUISINE[1] + 8]])
const DEFAUT = plat([[398, 540], [PRISE_CUISINE[0], 540], [PRISE_CUISINE[0], PRISE_CUISINE[1] + 8]])

/* ── Pièces du décor ── */

/** Le ciel, le lac et les montagnes du bassin annécien, en aplats. */
function Paysage() {
  return (
    <g>
      <rect x="-200" y="-200" width="1600" height="1400" fill="#D3E5EC" />
      <path d="M-200 560L-60 512L60 530L170 470L260 500L340 440L420 470L520 420L620 462L720 430L820 468L920 424L1010 470L1100 436L1200 476L1400 450V760H-200Z" fill="#AFC2CB" />
      {/* Le Semnoz à gauche, la Tournette à droite, plus proches. */}
      <path d="M-200 640L-40 590L80 600L180 560L250 578L300 566V760H-200Z" fill="#8FA9B4" />
      <path d="M920 600L960 548L1000 520L1036 500L1062 512L1090 494L1130 526L1200 566L1400 610V760H920Z" fill="#8AA2AD" />
      <path d="M1036 500L1062 512L1090 494L1100 502L1076 522L1050 518L1026 526Z" fill="#E9EFF1" />
      {/* Le lac, puis la rive. */}
      <rect x="-200" y="660" width="1600" height="46" fill="#7FB4CA" />
      <path d="M-120 676H120M180 690H260M960 674H1100M1150 692H1300" stroke="#B9DDEA" strokeWidth="3" strokeLinecap="round" />
      <rect x="-200" y="706" width="1600" height={SOL - 706} fill="#9DBB84" />
      <rect x="-200" y={SOL} width="1600" height="16" fill="#CBC4B6" />
      <rect x="-200" y={SOL + 16} width="1600" height="140" fill="#5A6267" />
    </g>
  )
}

/** Les arbres autour de la résidence. */
function Abords() {
  return (
    <g>
      {(
        [
          [252, 700, 44],
          [976, 690, 52],
          [1062, 724, 40],
        ] as const
      ).map(([x, y, r]) => (
        <g key={x}>
          <rect x={x - 5} y={y} width="10" height={SOL - y} fill="#6B4E36" />
          <circle cx={x} cy={y - r * 0.5} r={r} fill="#5E8C4B" />
          <circle cx={x - r * 0.4} cy={y - r * 0.15} r={r * 0.6} fill="#77A562" />
        </g>
      ))}
    </g>
  )
}

/** Une fenêtre des étages voisins, éclairée (les voisins ont du courant). */
function Fenetre({ x, y, w = 60, h = 112 }: { x: number; y: number; w?: number; h?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={LUMIERE} stroke="#FFFFFF" strokeWidth="5" />
      <path d={`M${x + w / 2} ${y}V${y + h}`} stroke="#FFFFFF" strokeWidth="3" />
      <rect x={x + 4} y={y + 4} width={w / 2 - 8} height={h * 0.35} fill="#FBE8B6" />
    </g>
  )
}

/** Un étage de la résidence vu de la rue : crépi, fenêtres, loggia en bois. */
function EtageVoisin({ haut, bas }: { haut: number; bas: number }) {
  return (
    <g>
      <rect x={IMM.g} y={haut} width={IMM.d - IMM.g} height={bas - haut} fill={CREPI} />
      {FENETRES.map((x) => (
        <Fenetre key={x} x={x} y={haut + 64} />
      ))}
      <rect x="420" y={bas - 50} width="388" height="50" fill={BOIS} />
      <path d={Array.from({ length: 19 }, (_, i) => `M${430 + i * 20} ${bas - 46}V${bas - 4}`).join('')} stroke="#5C371D" strokeWidth="3" />
      <rect x="414" y={bas - 54} width="400" height="6" fill="#5C371D" />
    </g>
  )
}

/** Dalle coupée : béton hachuré, cerné d'encre. */
function Dalle({ y }: { y: number }) {
  return <rect x={IMM.g} y={y} width={IMM.d - IMM.g} height="18" fill="url(#aa-beton)" stroke={ENCRE} strokeWidth="1.5" />
}

/** L'intérieur du 2e étage, façade enlevée. */
function Appartement() {
  const [cg, cs, cc] = CLOISONS
  const largeurCuisine = cc - cs - 24
  const portes = `M${cs + 16 + largeurCuisine / 3} 0V1M${cs + 16 + (2 * largeurCuisine) / 3} 0V1`
  const montants = (y0: number, y1: number) => portes.replace(/ 0V1/g, ` ${y0}V${y1}`)
  return (
    <g>
      {/* Murs du fond, pièce par pièce. */}
      <rect x={MUR_G.d} y={N2.h} width={MUR_D.g - MUR_G.d} height={N2.b - N2.h} fill={MUR_INT} />
      <rect x={cs + 8} y={N2.h} width={cc - cs - 8} height={N2.b - N2.h} fill="#EEF1EC" />
      <rect x={cc + 8} y={N2.h} width={MUR_D.g - cc - 8} height={N2.b - N2.h} fill="#E6EEF1" />
      {/* Carrelage de la salle de bain. */}
      <path
        d={
          Array.from({ length: 4 }, (_, i) => `M${cc + 8 + (i + 1) * 21} ${N2.h}V${N2.b}`).join('') +
          Array.from({ length: 9 }, (_, i) => `M${cc + 8} ${N2.h + (i + 1) * 24}H${MUR_D.g}`).join('')
        }
        stroke="#D2DEE3"
        strokeWidth="1.5"
      />

      {/* L'entrée : placard technique ouvert sur le tableau, console et vide-poche. */}
      <rect x={T.x - 10} y={T.y - 12} width={T.w + 20} height={T.h + 24} fill="#E3DACB" stroke={ENCRE} strokeWidth="1.5" />
      <rect x={T.x} y={T.y} width={T.w} height={T.h} fill="#FBFBF8" stroke={ENCRE} strokeWidth="1.5" />
      {[T.y + 12, T.y + 52].map((y) => (
        <g key={y}>
          <rect x={T.x + 5} y={y} width={T.w - 10} height="28" fill="#E9ECEE" />
          {Array.from({ length: 7 }, (_, i) => (
            <rect key={i} x={T.x + 6 + i * 8.6} y={y + 2} width="7.6" height="24" fill="#FFFFFF" stroke="#9AA4AA" strokeWidth="0.8" />
          ))}
        </g>
      ))}
      <rect x="334" y="514" width="88" height="7" fill="#B98F62" stroke={ENCRE} strokeWidth="1.2" />
      <path d="M342 521V568M414 521V568" stroke={ENCRE} strokeWidth="2.5" />
      <rect x="370" y="500" width="30" height="14" fill="#C9D6CF" stroke={ENCRE} strokeWidth="1.2" />

      {/* Le séjour : fenêtre sur le lac, suspension, canapé, plante. */}
      <rect x="452" y="376" width="84" height="80" fill="#CFE2EA" stroke="#FFFFFF" strokeWidth="5" />
      <path d="M452 430L474 414L494 424L516 404L536 418V456H452Z" fill="#9FB6C0" />
      <path d={`M${LAMPE[0]} ${N2.h}V${LAMPE[1] - 4}`} stroke={ENCRE} strokeWidth="1.5" />
      <path d={`M${LAMPE[0] - 22} ${LAMPE[1] + 14}L${LAMPE[0] - 12} ${LAMPE[1] - 4}H${LAMPE[0] + 12}L${LAMPE[0] + 22} ${LAMPE[1] + 14}Z`} fill="#3A4B5C" />
      <path d="M470 568V528Q470 516 482 516H566Q578 516 578 528V568Z" fill="#C25B3A" stroke={ENCRE} strokeWidth="1.5" />
      <rect x="464" y="540" width="120" height="22" rx="2" fill="#D9734F" stroke={ENCRE} strokeWidth="1.2" />
      <rect x="440" y="540" width="22" height="28" fill="#B66A45" />
      <path d="M451 540C438 520 434 504 444 492M451 540C456 516 466 506 474 502M451 540C450 522 452 508 450 490" stroke="#4E8A47" strokeWidth="4" fill="none" strokeLinecap="round" />
      <rect x={PRISE_SEJOUR[0] - 7} y={PRISE_SEJOUR[1] - 7} width="14" height="14" fill="#FFFFFF" stroke={ENCRE} strokeWidth="1.2" />

      {/* La cuisine : meubles hauts et bas, crédence, évier, plaque. */}
      <rect x={cs + 16} y="384" width={largeurCuisine} height="44" fill="#DDE5E0" stroke={ENCRE} strokeWidth="1.5" />
      <path d={montants(384, 428)} stroke={ENCRE} strokeWidth="1.2" />
      <rect x={cs + 16} y="468" width={largeurCuisine} height="32" fill="#E2E7DE" />
      <rect x={cs + 12} y="500" width={largeurCuisine + 8} height="9" fill="#6B5A4B" />
      <rect x={cs + 16} y="509" width={largeurCuisine} height="59" fill="#DDE5E0" stroke={ENCRE} strokeWidth="1.5" />
      <path d={montants(509, 568)} stroke={ENCRE} strokeWidth="1.2" />
      <path d="M676 500V480Q676 472 684 472H694" fill="none" stroke="#8D979C" strokeWidth="3.5" />
      <rect x="748" y="495" width="32" height="5" fill={ENCRE} />

      {/* La salle de bain : chauffe-eau, miroir, lavabo. */}
      <rect x={BALLON.x} y={BALLON.y} width={BALLON.w} height={BALLON.h} rx="10" fill="#FAFAF8" stroke={ENCRE} strokeWidth="1.5" />
      <path d={`M${BALLON.x + 14} ${BALLON.y + BALLON.h}V${BALLON.y + BALLON.h + 16}M${BALLON.x + 32} ${BALLON.y + BALLON.h}V${BALLON.y + BALLON.h + 16}`} stroke="#8D979C" strokeWidth="3" />
      <rect x="806" y="440" width="34" height="40" fill="#CFE2EA" stroke="#B9C3C7" strokeWidth="3" />
      <path d="M802 500H844L838 514H808Z" fill="#FAFAF8" stroke={ENCRE} strokeWidth="1.5" />
      <path d="M823 514V568" stroke="#8D979C" strokeWidth="4" />

      {/* Murs coupés et cloisons. */}
      <rect x={MUR_G.g} y={N2.h} width={MUR_G.d - MUR_G.g} height={N2.b - N2.h} fill="url(#aa-beton)" stroke={ENCRE} strokeWidth="1.5" />
      <rect x={MUR_D.g} y={N2.h} width={MUR_D.d - MUR_D.g} height={N2.b - N2.h} fill="url(#aa-beton)" stroke={ENCRE} strokeWidth="1.5" />
      {[cg, cs, cc].map((x) => (
        <rect key={x} x={x} y={N2.h} width="8" height={N2.b - N2.h} fill="#CFC6B8" stroke={ENCRE} strokeWidth="1.2" />
      ))}
      {/* Sol du 2e étage (parquet). */}
      <rect x={MUR_G.d} y={N2.b - 6} width={MUR_D.g - MUR_G.d} height="6" fill="#B08A63" />
    </g>
  )
}

/** Une prise murale (cadre et deux trous). */
function Prise({ p, defaut = false }: { p: V2; defaut?: boolean }) {
  return (
    <g>
      <rect x={p[0] - 8} y={p[1] - 8} width="16" height="16" fill={defaut ? '#F3D9C7' : '#FFFFFF'} stroke={defaut ? ROUGE : ENCRE} strokeWidth={defaut ? 2.5 : 1.5} />
      <circle cx={p[0] - 3} cy={p[1]} r="1.4" fill={ENCRE} />
      <circle cx={p[0] + 3} cy={p[1]} r="1.4" fill={ENCRE} />
    </g>
  )
}

/** Le téléphone posé sur le canapé, qui sonne. */
function Telephone() {
  return (
    <g>
      <g transform="rotate(-12 504 525)">
        <rect x="494" y="508" width="20" height="34" rx="3" fill={ENCRE} />
        <rect x="497" y="512" width="14" height="24" rx="1" fill="#7FC4E6" />
      </g>
      <path d="M522 506q8 12 0 24M530 498q13 18 0 38" fill="none" stroke={MIEL} strokeWidth="3" strokeLinecap="round" className="aa-sonne" />
    </g>
  )
}

/** Le testeur de l'électricien (multimètre), sondes en bas. */
function Testeur() {
  return (
    <g>
      <rect x="-14" y="-40" width="28" height="40" rx="3" fill="#F5B32B" stroke={ENCRE} strokeWidth="1.5" />
      <rect x="-9" y="-35" width="18" height="11" fill="#D7EBC9" />
      <circle cx="0" cy="-12" r="5" fill="#FFFFFF" stroke={ENCRE} strokeWidth="1.2" />
      <path d="M-6 0Q-10 8 -4 12" fill="none" stroke={ROUGE} strokeWidth="2" />
      <path d="M6 0Q10 8 4 12" fill="none" stroke={ENCRE} strokeWidth="2" />
    </g>
  )
}

function AppartAnnecy({ className, fixe = false, svgRef }: { className?: string; fixe?: boolean; svgRef?: React.Ref<SVGSVGElement> }) {
  const testeur: V2 = [PRISE_CUISINE[0] + 22, PRISE_CUISINE[1] - 8]
  return (
    <svg
      ref={svgRef}
      viewBox={`${CADRE.x} ${CADRE.y} ${CADRE.w} ${CADRE.h}`}
      className={className}
      role="img"
      aria-label="Coupe d'une résidence des années 1970 à Annecy : au deuxième étage, l'appartement en panne, son tableau électrique dans l'entrée, les circuits dans les murs jusqu'au séjour, à la cuisine et au chauffe-eau. L'électricien coupe le courant, cherche la panne au testeur, remplace la prise de cuisine en défaut, puis la lumière revient."
      overflow="hidden"
    >
      <defs>
        <pattern id="aa-beton" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <rect width="9" height="9" fill="#B9B3A8" />
          <path d="M0 0v9" stroke="#9C968B" strokeWidth="1.6" />
        </pattern>
        <radialGradient id="aa-halo">
          <stop offset="0" stopColor="#FFE7A3" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFE7A3" stopOpacity="0" />
        </radialGradient>
        <style>{`.aa-sonne{animation:aa-sonne 1s ease-in-out infinite}@keyframes aa-sonne{0%,100%{opacity:.25}50%{opacity:1}}@media (prefers-reduced-motion:reduce){.aa-sonne{animation:none}}`}</style>
      </defs>

      <Paysage />

      {/* ── La résidence : toit, étages voisins éclairés, rez-de-chaussée ── */}
      <rect x="720" y="14" width="80" height="26" fill={BANDE} stroke={ENCRE} strokeWidth="1.5" />
      <rect x={IMM.g - 10} y="40" width={IMM.d - IMM.g + 20} height="20" fill={BANDE} stroke={ENCRE} strokeWidth="1.5" />
      <rect x={IMM.g} y="60" width={IMM.d - IMM.g} height="16" fill={BANDE} />
      <EtageVoisin haut={N3.h} bas={N3.b} />
      <EtageVoisin haut={N1.h} bas={N1.b} />
      <rect x={IMM.g} y={RDC.h} width={IMM.d - IMM.g} height={RDC.b - RDC.h} fill="#E7DCC7" />
      <rect x="560" y="930" width="100" height={SOL - 930} fill={VITRE} stroke="#FFFFFF" strokeWidth="5" />
      <path d={`M610 930V${SOL}`} stroke="#FFFFFF" strokeWidth="4" />
      {FENETRES.filter((x) => x < 530 || x > 640).map((x) => (
        <Fenetre key={x} x={x} y={RDC.h + 50} h={96} />
      ))}
      <rect x={IMM.g} y={SOL - 26} width="240" height="26" fill="#5E8C4B" />
      <rect x="680" y={SOL - 26} width="240" height="26" fill="#5E8C4B" />
      <Dalle y={N3.b} />
      <Dalle y={N2.b} />
      <Dalle y={N1.b} />
      <rect x={IMM.g} y="60" width={IMM.d - IMM.g} height={SOL - 60} fill="none" stroke={ENCRE} strokeWidth="1.5" />

      <Appartement />
      <Prise p={PRISE_CUISINE} />
      <Abords />

      {/* Le noir dans l'appartement, jusqu'aux essais. */}
      {!fixe && <rect x={MUR_G.d} y={N2.h} width={MUR_D.g - MUR_G.d} height={N2.b - N2.h - 6} fill="#0B1830" fillOpacity="0.52" data-sort="4.32" />}

      {/* ── Étape 1 : l'appel ── */}
      {!fixe && (
        <>
          <g data-pas="1" data-debut="0.02" data-pose="" data-sort="1.9">
            <Telephone />
          </g>
          <Etiquette pas={1} debut={0.1} point={[504, 508]} bout={[504, LIGNE]} texte="Votre appel, le prix annoncé" />
        </>
      )}

      {/* ── Étape 2 : la mise en sécurité au tableau ── */}
      {!fixe && (
        <>
          {/* La manette générale s'abaisse, puis se relève aux essais. */}
          <g data-engin="" data-chemin="0 0, 0 12" data-cles="1.3:0 1.45:1 4.1:1 4.24:0">
            <rect x={T.x + 7} y={T.y + 15} width="6" height="8" fill={ENCRE} />
          </g>
          <g data-pas="2" data-debut="0.3" data-pose="" data-sort="4.1">
            <path d={`M410 478V471Q410 ${T.y + T.h} 417 ${T.y + T.h}Q424 ${T.y + T.h} 424 471V478`} fill="none" stroke={ENCRE} strokeWidth="2.2" />
            <rect x="404" y="477" width="26" height="18" rx="2" fill="#E8692D" stroke={ENCRE} strokeWidth="1.5" />
          </g>
          <g data-pas="2" data-debut="0.45" data-pose="" data-sort="2.9">
            <rect x="320" y="402" width="12" height="34" rx="2" fill="#F5B32B" stroke={ENCRE} strokeWidth="1.3" />
            <circle cx="326" cy="412" r="2.5" fill={VERT} />
            <path d="M326 402V392" stroke={ENCRE} strokeWidth="2" />
          </g>
          <Etiquette pas={2} debut={0.2} point={[T.x + T.w / 2, T.y]} bout={[T.x + T.w / 2, LIGNE]} texte="Courant coupé, absence de tension vérifiée" />
        </>
      )}

      {/* ── Étape 3 : les circuits se dessinent, le testeur remonte jusqu'au défaut ── */}
      <g data-pas="3" data-debut="0" data-duree="0.3" data-trace="">
        <Miel d={C_BALLON} />
      </g>
      <g data-pas="3" data-debut="0.08" data-duree="0.3" data-trace="">
        <Miel d={C_ECLAIRAGE} />
      </g>
      <g data-pas="3" data-debut="0.16" data-duree="0.3" data-trace="">
        <Miel d={C_SEJOUR} />
      </g>
      <g data-pas="3" data-debut="0.24" data-duree="0.3" data-trace="">
        <Miel d={C_CUISINE} />
      </g>
      {!fixe && (
        <>
          <g data-engin="" data-chemin={`${420 - testeur[0]} ${534 - testeur[1]}, ${PRISE_CUISINE[0] - 26 - testeur[0]} ${534 - testeur[1]}, 0 0`} data-cles="2.3:0 2.72:1" data-opac="2.25:0 2.3:1 3.9:1 3.96:0">
            <g transform={`translate(${testeur[0]} ${testeur[1]})`}>
              <Testeur />
            </g>
          </g>
          {/* Le défaut : la prise humide, son circuit en rouge. */}
          <g data-pas="3" data-debut="0.7" data-duree="0.2" data-sort="3.62">
            <path d={DEFAUT} fill="none" stroke={ROUGE} strokeLinecap="round" strokeLinejoin="round" style={px(3)} />
          </g>
          <g data-pas="3" data-debut="0.72" data-pose="" data-sort="3.62">
            <Prise p={PRISE_CUISINE} defaut />
            <path d={`M${PRISE_CUISINE[0] - 16} ${PRISE_CUISINE[1] - 18}q-3 5 0 7q3-2 0-7M${PRISE_CUISINE[0] - 24} ${PRISE_CUISINE[1] - 4}q-3 5 0 7q3-2 0-7`} fill="#5FA9D0" />
          </g>
          <Etiquette pas={3} debut={0.75} point={PRISE_CUISINE} bout={[PRISE_CUISINE[0], LIGNE]} texte="Le défaut, une prise de cuisine humide" />
        </>
      )}

      {/* ── Étape 4 : la prise remplacée ── */}
      <g data-pas="4" data-debut="0.15" data-pose="">
        <Prise p={PRISE_CUISINE} />
      </g>
      {!fixe && (
        <>
          <g data-pas="4" data-debut="0.05" data-pose="" data-sort="4.2">
            <path d={`M${PRISE_CUISINE[0] - 34} ${PRISE_CUISINE[1] + 4}l14 -14 6 6 -14 14z`} fill="#8D979C" stroke={ENCRE} strokeWidth="1.2" />
            <path d={`M${PRISE_CUISINE[0] - 20} ${PRISE_CUISINE[1] - 10}l9 -9`} stroke={ENCRE} strokeWidth="3" strokeLinecap="round" />
          </g>
          <Etiquette pas={4} debut={0.25} point={PRISE_CUISINE} bout={[PRISE_CUISINE[0], LIGNE]} texte="Prise remplacée, circuit contrôlé" />
        </>
      )}

      {/* ── Étape 5 : les essais, la lumière revient ── */}
      <g data-pas="5" data-debut="0.3" data-pose="">
        <circle cx={LAMPE[0]} cy={LAMPE[1] + 40} r="110" fill="url(#aa-halo)" />
        <path d={`M${LAMPE[0] - 18} ${LAMPE[1] + 14}H${LAMPE[0] + 18}`} stroke="#FFE7A3" strokeWidth="4" />
      </g>
      <g data-pas="5" data-debut="0.1" data-pose="">
        {Array.from({ length: 7 }, (_, i) => (
          <rect key={i} x={T.x + 7 + i * 8.6} y={T.y + 5} width="5.6" height="4" fill={VERT} />
        ))}
      </g>
      {!fixe && <Etiquette pas={5} debut={0.35} point={[LAMPE[0], LAMPE[1] + 14]} bout={[LAMPE[0], LIGNE]} texte="Essais au tableau, le courant revient" />}
    </svg>
  )
}

export default memo(AppartAnnecy)
