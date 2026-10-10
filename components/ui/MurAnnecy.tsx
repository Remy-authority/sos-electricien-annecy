import { memo } from 'react'
import { LOUPE, PHOTO, TEMPS, VISE, type V2 } from '@/components/ui/mur-annecy-logique'

/**
 * MurAnnecy, ce que le client paie sans jamais le voir (bloc 1 de l'accueil, scénario validé
 * par Rémy le 10/10/2026) : l'installation DANS le mur, derrière un tableau tout propre.
 *
 * Le dessin est posé dans le repère de la photo du bloc 1 (1600 x 893, `PHOTO`) : il se déplace
 * avec elle, la caméra zoome sur les deux à la fois. Au défilement :
 *  - le mur devient transparent, en cercle, à partir du tableau ;
 *  - les gaines se tracent une à une (éclairage, interrupteur par la boîte de dérivation, prises,
 *    terre), chacune nommée ;
 *  - la loupe sur le différentiel 30 mA ; une fuite sur la ligne des prises, il coupe, tout
 *    s'éteint sauf la terre ;
 *  - le testeur suit la ligne jusqu'au défaut, le différentiel se réarme, la lampe s'allume ;
 *  - le mur se referme.
 *
 * Tout se pilote par la progression `p` (0 à 1) de la piste, en clés « p:valeur » :
 *  `data-k-o` opacité, `data-k-t` part tracée d'un trait (0 à 1), `data-k-y` / `data-k-x`
 *  décalage, `data-k-s` échelle, `data-k-r` rayon (le cercle qui ouvre le mur).
 * Aucune cote, aucune durée, aucun chiffre qui ne se vérifie pas : 30 mA est la sensibilité
 * imposée par la NF C 15-100 aux différentiels des circuits d'un logement.
 *
 * Repères, temps et pilotage (poserMur, placerLoupe) : `mur-annecy-logique.ts`. Ce fichier ne
 * contient que le dessin, chargé à part au premier geste (vitesse mobile, 11/10/2026).
 */

/** Ce qui reste en photo quand le mur s'efface : le tableau, sa porte ouverte, la lampe. */
const TROU = 'M467 550H701V752H484L428 775L424 573L467 564Z M738 544H744V553H750V578L749 581L752 588L755 594L756 600L755 607H726L725 600L726 594L729 588L732 581L731 578V553H738Z'
/** Le mur : tout ce qui est à gauche de la baie vitrée. */
const MUR_D = 806

const ENCRE = '#14202B'
const MIEL = '#FCD680'
const CREME = '#FFF8EA'
const GAINE = '#F08A24'
const GRIS = '#8A94A3'
const ROUGE = '#E0483A'
const VERT = '#3FB66B'
const TERRE_V = '#3E9C4A'
const TERRE_J = '#F2D23C'

const chemin = (pts: V2[]) => `M${pts.map(([a, b]) => `${a} ${b}`).join('L')}`

/* ── Les circuits ── */
const C_ECLAIRAGE = chemin([[655, 551], [655, 34], [740, 34]])
const BOITE = { x: 502, y: 400, w: 36, h: 36 }
const C_BOITE = chemin([[520, 551], [520, BOITE.y + BOITE.h]])
const INTER = { x: 380, y: 470, w: 36, h: 40 }
const C_INTER = chemin([[BOITE.x, BOITE.y + 18], [INTER.x + 18, BOITE.y + 18], [INTER.x + 18, INTER.y]])
const C_PRISES = chemin([[560, 751], [560, 893]])
const C_TERRE = chemin([[680, 751], [680, 893]])
const FUITE: V2 = [560, 815]
const TESTEUR = { x: 478, y: 846 }

const px = (n: number) => ({ strokeWidth: `${n}px` })

function Gaine({ d, debut, fin, nom }: { d: string; debut: number; fin: number; nom: string }) {
  return (
    <g aria-label={nom}>
      <path d={d} fill="none" stroke={ENCRE} strokeOpacity="0.9" strokeLinecap="round" strokeLinejoin="round" style={px(15)} data-k-t={`${debut}:0 ${fin}:1`} />
      <path d={d} fill="none" stroke={GAINE} strokeLinecap="round" strokeLinejoin="round" style={px(10)} data-k-t={`${debut}:0 ${fin}:1`} />
      <path d={d} fill="none" stroke={MIEL} strokeLinecap="round" strokeLinejoin="round" style={px(3)} data-k-t={`${debut}:0 ${fin}:1`} />
      {/* Courant coupé : la même ligne, grise, par-dessus */}
      <path d={d} fill="none" stroke={GRIS} strokeLinecap="round" strokeLinejoin="round" style={px(10)} opacity="0" data-k-o={`${TEMPS.coupe}:0 ${TEMPS.coupe + 0.02}:1 ${TEMPS.rearme}:1 ${TEMPS.rearme + 0.02}:0`} />
    </g>
  )
}

/** Cartouche crème, centré sur (x, y). La largeur suit le texte (Sora, 17 px). */
function Cartouche({ x, y, texte, o, fort = false }: { x: number; y: number; texte: string; o: string; fort?: boolean }) {
  const t = 17
  const w = Math.round(texte.length * t * 0.62 + 26)
  const h = 32
  return (
    <g opacity="0" data-k-o={o} transform={`translate(${x - w / 2} ${y - h / 2})`}>
      <rect x="2" y="3" width={w} height={h} rx="2" fill={ENCRE} fillOpacity="0.35" />
      <rect width={w} height={h} rx="2" fill={fort ? MIEL : CREME} stroke={ENCRE} strokeWidth="1.5" />
      <text x={w / 2} y={h / 2 + 6} textAnchor="middle" fill={ENCRE} fontWeight="600" fontFamily="var(--font-sora), ui-sans-serif, system-ui" fontSize={t}>
        {texte}
      </text>
    </g>
  )
}

const o = (a: number, b: number, c?: number, d?: number) => (c === undefined ? `${a}:0 ${b}:1` : `${a}:0 ${b}:1 ${c}:1 ${d}:0`)

function MurAnnecyBase({ svgRef, className, style }: { svgRef?: React.Ref<SVGSVGElement>; className?: string; style?: React.CSSProperties }) {
  const [lx, ly] = LOUPE.ordi
  return (
    <svg ref={svgRef} viewBox={`0 0 ${PHOTO.l} ${PHOTO.h}`} className={className} style={style} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="mur-ouvert">
          <circle cx={VISE.x} cy={VISE.y} r="0" data-k-r={`${TEMPS.ouvre[0]}:0 ${TEMPS.ouvre[1]}:980 ${TEMPS.ferme[0]}:980 ${TEMPS.ferme[1]}:0`} />
        </clipPath>
        <pattern id="mur-trame" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke={MIEL} strokeOpacity="0.09" strokeWidth="1" />
        </pattern>
        <radialGradient id="mur-halo">
          <stop offset="0" stopColor="#FFE7A8" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#FCD680" stopOpacity="0.35" />
          <stop offset="1" stopColor="#FCD680" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Tout ce qui est dans le mur vit dans le cercle qui l'ouvre, et disparaît quand il se referme.
          Le mur transparent : un voile d'encre tramé sur tout le mur, percé au tableau. */}
      <g clipPath="url(#mur-ouvert)">
        <path
          d={`M0 0H${MUR_D}V${PHOTO.h}H0Z ${TROU}`}
          fill={ENCRE}
          fillOpacity="0.86"
          fillRule="evenodd"
        />
        <path d={`M0 0H${MUR_D}V${PHOTO.h}H0Z ${TROU}`} fill="url(#mur-trame)" fillRule="evenodd" />
        {/* Rails de la cloison */}
        {[120, 300, 780].map((x) => (
          <path key={x} d={`M${x} 0V${PHOTO.h}`} stroke={MIEL} strokeOpacity="0.22" strokeDasharray="6 10" style={px(2)} />
        ))}
        <path d={`M${MUR_D} 0V${PHOTO.h}`} stroke={MIEL} strokeOpacity="0.6" style={px(2)} />

      {/* Les gaines, une à une */}
      {/* Le fil de la lampe, du plafond à la douille */}
      <path d="M741 34V546" stroke={CREME} strokeOpacity="0.7" style={px(2)} data-k-t="0.29:0 0.31:1" />
      <Gaine d={C_ECLAIRAGE} debut={0.24} fin={0.3} nom="Éclairage" />
      <Gaine d={C_BOITE} debut={0.27} fin={0.29} nom="Boîte de dérivation" />
      <Gaine d={C_INTER} debut={0.29} fin={0.34} nom="Interrupteur" />
      <Gaine d={C_PRISES} debut={0.33} fin={0.37} nom="Prises" />

      {/* La terre, vert et jaune, jamais coupée */}
      <g>
        <path d={C_TERRE} fill="none" stroke={ENCRE} style={px(12)} strokeLinecap="round" data-k-t="0.36:0 0.4:1" />
        <path d={C_TERRE} fill="none" stroke={TERRE_V} style={px(8)} strokeLinecap="round" data-k-t="0.36:0 0.4:1" />
        <path d={C_TERRE} fill="none" stroke={TERRE_J} style={px(8)} strokeDasharray="14 14" opacity="0" data-k-o="0.39:0 0.4:1" />
      </g>

      {/* Boîte de dérivation et boîte de l'interrupteur */}
      <g opacity="0" data-k-o={o(0.28, 0.3)}>
        <rect x={BOITE.x} y={BOITE.y} width={BOITE.w} height={BOITE.h} rx="2" fill={CREME} stroke={ENCRE} strokeWidth="3" />
        <path d={`M${BOITE.x + 9} ${BOITE.y + 12}h18M${BOITE.x + 9} ${BOITE.y + 24}h18`} stroke={ENCRE} strokeWidth="3" strokeLinecap="round" />
      </g>
      <g opacity="0" data-k-o={o(0.33, 0.35)}>
        <rect x={INTER.x} y={INTER.y} width={INTER.w} height={INTER.h} rx="2" fill={CREME} stroke={ENCRE} strokeWidth="3" />
        <rect x={INTER.x + 11} y={INTER.y + 9} width="14" height="22" rx="2" fill="none" stroke={ENCRE} strokeWidth="2.5" />
      </g>

      {/* Les noms, le temps de les lire */}
      <Cartouche x={590} y={250} texte="Éclairage" o={o(0.28, 0.3, 0.42, 0.44)} />
      <Cartouche x={520} y={370} texte="Boîte de dérivation" o={o(0.29, 0.31, 0.42, 0.44)} />
      <Cartouche x={505} y={490} texte="Interrupteur" o={o(0.33, 0.35, 0.42, 0.44)} />
      <Cartouche x={508} y={800} texte="Prises" o={o(0.36, 0.38, 0.42, 0.44)} />
      <Cartouche x={728} y={800} texte="Terre" o={o(0.39, 0.41, 0.42, 0.44)} />

      {/* La fuite, sur la ligne des prises */}
      <g opacity="0" data-k-o={o(TEMPS.fuite, TEMPS.fuite + 0.015, TEMPS.trouve, TEMPS.trouve + 0.02)}>
        <g className="mur-etincelle" style={{ transformOrigin: `${FUITE[0]}px ${FUITE[1]}px` }}>
          <path
            d={`M${FUITE[0]} ${FUITE[1] - 30}l7 20 21-5-14 15 14 15-21-5-7 20-7-20-21 5 14-15-14-15 21 5z`}
            fill={ROUGE}
            stroke={ENCRE}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </g>
      </g>

      {/* Le testeur arrive par la gauche, sa pointe sur la ligne des prises, au défaut */}
      <g opacity="0" data-k-o={o(TEMPS.testeur[0], TEMPS.testeur[0] + 0.02, TEMPS.rearme, TEMPS.rearme + 0.03)} data-k-x={`${TEMPS.testeur[0]}:-260 ${TEMPS.testeur[1]}:0`} data-k-y={`${TEMPS.testeur[0]}:40 ${TEMPS.testeur[1]}:0`}>
        <path d={`M${TESTEUR.x} ${TESTEUR.y - 32}C${TESTEUR.x} ${FUITE[1] - 26} ${FUITE[0] - 40} ${FUITE[1] - 22} ${FUITE[0] - 9} ${FUITE[1]}`} fill="none" stroke={ENCRE} strokeWidth="6" strokeLinecap="round" />
        <path d={`M${TESTEUR.x} ${TESTEUR.y - 32}C${TESTEUR.x} ${FUITE[1] - 26} ${FUITE[0] - 40} ${FUITE[1] - 22} ${FUITE[0] - 9} ${FUITE[1]}`} fill="none" stroke={ROUGE} strokeWidth="3" strokeLinecap="round" />
        <path d={`M${FUITE[0] - 12} ${FUITE[1]}h10`} stroke={ENCRE} strokeWidth="5" strokeLinecap="round" />
        <rect x={TESTEUR.x - 22} y={TESTEUR.y - 34} width="44" height="68" rx="3" fill={MIEL} stroke={ENCRE} strokeWidth="3" />
        <rect x={TESTEUR.x - 14} y={TESTEUR.y - 26} width="28" height="18" rx="2" fill="#DCE8D2" stroke={ENCRE} strokeWidth="2" />
        <circle cx={TESTEUR.x} cy={TESTEUR.y + 14} r="10" fill="none" stroke={ENCRE} strokeWidth="2.5" />
        <path d={`M${TESTEUR.x} ${TESTEUR.y + 14}l5 -6`} stroke={ENCRE} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g opacity="0" data-k-o={o(TEMPS.trouve, TEMPS.trouve + 0.015, TEMPS.rearme, TEMPS.rearme + 0.03)}>
        <circle cx={FUITE[0] + 36} cy={FUITE[1]} r="17" fill={VERT} stroke={ENCRE} strokeWidth="2.5" />
        <path d={`M${FUITE[0] + 28} ${FUITE[1]}l6 6 11 -12`} fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Tout coupe : l'ampoule de la photo s'éteint jusqu'au réarmement */}
      <path d="M731 578H749L752 588L755 594L756 600L755 607H726L725 600L726 594L729 588Z" fill={ENCRE} fillOpacity="0.62" opacity="0" data-k-o={o(TEMPS.coupe, TEMPS.coupe + 0.01, TEMPS.rearme, TEMPS.rearme + 0.01)} />

      {/* Le courant revient : la lampe s'allume */}
      <circle cx="740" cy="585" r="120" fill="url(#mur-halo)" opacity="0" data-k-o={o(TEMPS.rearme + 0.01, TEMPS.rearme + 0.04, TEMPS.ferme[0], TEMPS.ferme[1])} />

      </g>

      {/* La loupe sur le différentiel 30 mA (placée selon le format par HeroTableau) */}
      <g data-loupe="" opacity="0" data-k-o={o(TEMPS.loupe[0], TEMPS.loupe[1], TEMPS.rearme + 0.03, TEMPS.rearme + 0.06)}>
        <path data-loupe-fil="" d={`M${LOUPE.vise[0]} ${LOUPE.vise[1]}L${lx} ${ly}`} stroke={MIEL} strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
        <circle cx={LOUPE.vise[0]} cy={LOUPE.vise[1]} r="16" fill="none" stroke={MIEL} strokeWidth="3.5" />
        <g data-loupe-corps="" transform={`translate(${lx} ${ly})`}>
          <circle r={LOUPE.r + 6} fill={ENCRE} fillOpacity="0.35" />
          <circle r={LOUPE.r} fill={CREME} stroke={ENCRE} strokeWidth="4" />
          {/* Le module différentiel : deux pôles, le levier, le bouton test */}
          <rect x="-46" y="-92" width="92" height="132" rx="4" fill="#FFFFFF" stroke={ENCRE} strokeWidth="3.5" />
          <rect x="-30" y="-74" width="60" height="62" rx="3" fill="#E9EDF2" stroke={ENCRE} strokeWidth="2.5" />
          <g data-k-y={`${TEMPS.coupe - 0.01}:0 ${TEMPS.coupe}:30 ${TEMPS.rearme - 0.01}:30 ${TEMPS.rearme}:0`}>
            <rect x="-14" y="-70" width="28" height="26" rx="2" fill={ENCRE} />
          </g>
          <circle cx="0" cy="8" r="9" fill={MIEL} stroke={ENCRE} strokeWidth="2.5" />
          <text x="0" y="12.5" textAnchor="middle" fontSize="12" fontWeight="700" fill={ENCRE} fontFamily="var(--font-sora), ui-sans-serif, system-ui">
            T
          </text>
          <text x="0" y="34" textAnchor="middle" fontSize="15" fontWeight="700" fill={ENCRE} fontFamily="var(--font-sora), ui-sans-serif, system-ui">
            30 mA
          </text>
          <text x="0" y="78" textAnchor="middle" fontSize="17" fontWeight="600" fill={ENCRE} fontFamily="var(--font-sora), ui-sans-serif, system-ui">
            Différentiel
          </text>
          {/* Voyant : vert sous tension, rouge coupé */}
          <circle cx="32" cy="-84" r="5" fill={VERT} />
          <circle cx="32" cy="-84" r="5" fill={ROUGE} opacity="0" data-k-o={`${TEMPS.coupe - 0.005}:0 ${TEMPS.coupe}:1 ${TEMPS.rearme - 0.005}:1 ${TEMPS.rearme}:0`} />
        </g>
      </g>

      {/* Ce qui se passe, en une ligne, au-dessus du fil de la loupe */}
      <g clipPath="url(#mur-ouvert)">
        <Cartouche x={615} y={470} texte="Fuite de courant, tout coupe" o={o(TEMPS.coupe, TEMPS.coupe + 0.02, TEMPS.testeur[1], TEMPS.testeur[1] + 0.02)} />
        <Cartouche x={615} y={470} texte="Trouvée au testeur, réparée" o={o(TEMPS.testeur[1] + 0.02, TEMPS.testeur[1] + 0.04, TEMPS.rearme, TEMPS.rearme + 0.02)} />
        <Cartouche x={615} y={470} texte="Le courant revient" fort o={o(TEMPS.rearme + 0.02, TEMPS.rearme + 0.04, TEMPS.fin, TEMPS.fin + 0.02)} />
      </g>
    </svg>
  )
}

const MurAnnecy = memo(MurAnnecyBase)
export default MurAnnecy
