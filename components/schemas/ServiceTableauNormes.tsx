import ServiceSchemaFrame from './ServiceSchemaFrame'

/**
 * Schéma (b) « Un tableau électrique aux normes, de l'arrivée aux circuits ».
 *
 * Chaque élément dessiné vient de la fiche Promotelec sur la norme NF C 15-100
 * (compteur, disjoncteur général, tableau qui regroupe les circuits, dispositifs
 * différentiels haute sensibilité 30 mA, disjoncteurs à l'origine de chaque circuit
 * contre les surintensités, liaison à la terre). Le parafoudre n'est obligatoire que
 * selon le lieu et le bâtiment (fiche Promotelec « Quand faut-il installer un
 * parafoudre ? ») : il est dessiné en pointillé. Seul chiffre : 30 mA, sourcé.
 * Les noms de circuits (éclairage, prises…) sont des exemples, sans quantité.
 */
export default function ServiceTableauNormes() {
  return (
    <ServiceSchemaFrame
      id="tableau-normes"
      title="Un tableau électrique aux normes, de l'arrivée aux circuits"
      note="Schéma de principe, sans échelle. Les circuits cités sont des exemples."
      sources={[
        {
          label: 'Promotelec, « NF C 15-100, norme de référence pour l’installation électrique »',
          url: 'https://www.promotelec.com/particuliers/fiche/nf-c-15-100-la-norme-de-reference-pour-linstallation-electrique/',
          consulted: '25 septembre 2026',
        },
        {
          label: 'Promotelec, « Quand faut-il installer un parafoudre ? »',
          url: 'https://www.promotelec.com/professionnels/fiche/quand-faut-il-installer-un-parafoudre/',
          consulted: '25 septembre 2026',
        },
      ]}
    >
      <svg
        viewBox="0 0 360 446"
        role="img"
        aria-labelledby="schema-tableau-titre schema-tableau-desc"
        className="mx-auto block h-auto w-full max-w-[440px]"
      >
        <title id="schema-tableau-titre">Schéma d’un tableau électrique aux normes NF C 15-100</title>
        <desc id="schema-tableau-desc">
          Du haut vers le bas : arrivée du réseau et compteur, disjoncteur de branchement qui coupe tout le
          logement, puis dans le tableau deux interrupteurs différentiels 30 mA, chacun protégeant une rangée
          de disjoncteurs divisionnaires, un par circuit. Un parafoudre s’ajoute si le lieu ou le bâtiment
          l’exige. L’ensemble est relié à la terre.
        </desc>

        {/* 1. Arrivée + compteur */}
        <rect x="40" y="8" width="280" height="44" rx="10" className="fill-light stroke-slate-300" strokeWidth="1.5" />
        <text x="180" y="27" textAnchor="middle" fontSize="13" fontWeight="700" className="fill-slate-800">
          Arrivée du réseau et compteur
        </text>
        <text x="180" y="43" textAnchor="middle" fontSize="11.5" className="fill-slate-500">
          mesure l’électricité consommée
        </text>

        <line x1="180" y1="52" x2="180" y2="70" className="stroke-primary" strokeWidth="2" />
        <path d="M174 70 L186 70 L180 78 Z" className="fill-primary" />

        {/* 2. Disjoncteur de branchement */}
        <rect x="40" y="80" width="280" height="48" rx="10" className="fill-primary" />
        <text x="180" y="100" textAnchor="middle" fontSize="13" fontWeight="700" className="fill-white">
          Disjoncteur de branchement
        </text>
        <text x="180" y="118" textAnchor="middle" fontSize="11.5" className="fill-accent">
          coupe le courant de tout le logement
        </text>

        {/* Contour du tableau */}
        <rect
          x="8" y="140" width="344" height="246" rx="14"
          className="fill-none stroke-primary/40" strokeWidth="1.5" strokeDasharray="6 5"
        />
        <text x="22" y="160" fontSize="12" fontWeight="700" className="fill-primary">Tableau électrique</text>
        <text x="22" y="176" fontSize="11" className="fill-slate-500">regroupe tous les circuits</text>

        {/* Ligne principale + parafoudre en option */}
        <line x1="180" y1="128" x2="180" y2="196" className="stroke-primary" strokeWidth="2" />
        <line x1="180" y1="166" x2="210" y2="166" className="stroke-slate-400" strokeWidth="1.5" strokeDasharray="4 3" />
        <rect x="210" y="147" width="132" height="40" rx="8" className="fill-white stroke-slate-400" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="276" y="163" textAnchor="middle" fontSize="12" fontWeight="700" className="fill-slate-700">Parafoudre</text>
        <text x="276" y="179" textAnchor="middle" fontSize="11" className="fill-slate-500">si le lieu l’exige</text>

        {/* Répartition vers les deux différentiels */}
        <line x1="95" y1="196" x2="265" y2="196" className="stroke-primary" strokeWidth="2" />
        <line x1="95" y1="196" x2="95" y2="206" className="stroke-primary" strokeWidth="2" />
        <line x1="265" y1="196" x2="265" y2="206" className="stroke-primary" strokeWidth="2" />
        <path d="M89 206 L101 206 L95 213 Z" className="fill-primary" />
        <path d="M259 206 L271 206 L265 213 Z" className="fill-primary" />

        {/* 3. Interrupteurs différentiels 30 mA */}
        {[20, 190].map((x) => (
          <g key={x}>
            <rect x={x} y="214" width="150" height="50" rx="10" className="fill-accent/20 stroke-accent" strokeWidth="1.5" />
            <text x={x + 75} y="235" textAnchor="middle" fontSize="12.5" fontWeight="700" className="fill-slate-800">
              Interrupteur
            </text>
            <text x={x + 75} y="253" textAnchor="middle" fontSize="12.5" fontWeight="700" className="fill-slate-800">
              différentiel 30 mA
            </text>
          </g>
        ))}

        {/* 4. Disjoncteurs divisionnaires, un par circuit */}
        {[
          { from: 95, mods: [{ x: 24, label: 'Éclairage' }, { x: 100, label: 'Prises' }] },
          { from: 265, mods: [{ x: 194, label: 'Cuisson' }, { x: 270, label: 'Chauffage' }] },
        ].map((g) => (
          <g key={g.from}>
            <line x1={g.from} y1="264" x2={g.from} y2="280" className="stroke-primary" strokeWidth="2" />
            <line x1={g.mods[0].x + 33} y1="280" x2={g.mods[1].x + 33} y2="280" className="stroke-primary" strokeWidth="2" />
            {g.mods.map((m) => (
              <g key={m.label}>
                <line x1={m.x + 33} y1="280" x2={m.x + 33} y2="290" className="stroke-primary" strokeWidth="2" />
                <rect x={m.x} y="290" width="66" height="48" rx="7" className="fill-white stroke-primary" strokeWidth="1.5" />
                {/* manette du disjoncteur modulaire */}
                <rect x={m.x + 28} y="297" width="10" height="14" rx="2" className="fill-primary" />
                <text x={m.x + 33} y="329" textAnchor="middle" fontSize="11" className="fill-slate-700">
                  {m.label}
                </text>
              </g>
            ))}
          </g>
        ))}
        <text x="180" y="358" textAnchor="middle" fontSize="12.5" fontWeight="700" className="fill-slate-800">
          Disjoncteurs divisionnaires, un par circuit
        </text>
        <text x="180" y="374" textAnchor="middle" fontSize="11.5" className="fill-slate-500">
          protection contre les surintensités
        </text>

        {/* 5. Terre */}
        <line x1="180" y1="386" x2="180" y2="404" className="stroke-slate-500" strokeWidth="2" />
        <line x1="166" y1="404" x2="194" y2="404" className="stroke-slate-500" strokeWidth="2" />
        <line x1="171" y1="409" x2="189" y2="409" className="stroke-slate-500" strokeWidth="2" />
        <line x1="176" y1="414" x2="184" y2="414" className="stroke-slate-500" strokeWidth="2" />
        <text x="180" y="434" textAnchor="middle" fontSize="12" className="fill-slate-700">
          Liaison à la terre, pour la sécurité des personnes
        </text>
      </svg>
    </ServiceSchemaFrame>
  )
}
