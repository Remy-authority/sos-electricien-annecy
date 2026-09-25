import ServiceSchemaFrame from './ServiceSchemaFrame'

/**
 * Schéma (d) « Recherche de panne : les étapes ». Étapes de méthode, AUCUN chiffre.
 * Chaque étape reprend un geste de la fiche Promotelec « Coupures de courant : les
 * erreurs à éviter pour ne pas aggraver la situation » (14 novembre 2025) : se
 * renseigner auprès des voisins et du gestionnaire de réseau, débrancher les
 * appareils sensibles avant de réarmer, ne pas forcer un disjoncteur qui retombe,
 * faire appel à un professionnel qualifié si le problème persiste.
 */
const ETAPES = [
  { titre: 'Regarder chez les voisins', ligne: 'Tout le quartier coupé : panne du réseau' },
  { titre: 'Repérer ce qui est tombé', ligne: 'Au tableau, le disjoncteur abaissé' },
  { titre: 'Débrancher les appareils sensibles', ligne: 'Ordinateur, télévision, box du circuit' },
  { titre: 'Réarmer, sans forcer', ligne: 'Le courant revient et tient : c’est réglé' },
  { titre: 'Ça retombe : on s’arrête', ligne: 'Un professionnel cherche la cause' },
]

export default function ServiceRecherchePanne() {
  const pas = 64
  const h = 16 + ETAPES.length * pas
  return (
    <ServiceSchemaFrame
      id="recherche-panne"
      title="Recherche de panne : les étapes"
      sources={[
        {
          label: 'Promotelec, « Coupures de courant : les erreurs à éviter pour ne pas aggraver la situation »',
          url: 'https://www.promotelec.com/particuliers/fiche/coupures-de-courant-les-erreurs-a-eviter-pour-ne-pas-aggraver-la-situation/',
          consulted: '25 septembre 2026',
        },
      ]}
    >
      <svg
        viewBox={`0 0 360 ${h}`}
        role="img"
        aria-labelledby="schema-panne-titre schema-panne-desc"
        className="mx-auto block h-auto w-full max-w-[440px]"
      >
        <title id="schema-panne-titre">Les étapes d’une recherche de panne électrique</title>
        <desc id="schema-panne-desc">
          {ETAPES.map((e, i) => `Étape ${i + 1} : ${e.titre}. ${e.ligne}.`).join(' ')}
        </desc>

        {/* fil qui relie les étapes */}
        <line x1="30" y1="34" x2="30" y2={16 + (ETAPES.length - 1) * pas + 18} className="stroke-primary/30" strokeWidth="3" />

        {ETAPES.map((e, i) => {
          const y = 16 + i * pas
          const dernier = i === ETAPES.length - 1
          return (
            <g key={e.titre}>
              <circle cx="30" cy={y + 18} r="17" className={dernier ? 'fill-accent' : 'fill-primary'} />
              <text
                x="30" y={y + 23} textAnchor="middle" fontSize="14" fontWeight="700"
                className={dernier ? 'fill-dark' : 'fill-white'}
              >
                {i + 1}
              </text>
              <rect
                x="58" y={y} width="296" height="48" rx="10"
                className={dernier ? 'fill-accent/15 stroke-accent' : 'fill-light stroke-slate-200'}
                strokeWidth="1.5"
              />
              <text x="70" y={y + 20} fontSize="13" fontWeight="700" className="fill-slate-800">
                {e.titre}
              </text>
              <text x="70" y={y + 38} fontSize="11.5" className="fill-slate-600">
                {e.ligne}
              </text>
            </g>
          )
        })}
      </svg>
    </ServiceSchemaFrame>
  )
}
