import ServiceSchemaFrame from '@/components/schemas/ServiceSchemaFrame'

/**
 * Schéma (a) « Annecy, commune nouvelle depuis 2017 ».
 *
 * Source : arrêté du préfet de la Haute-Savoie du 14 juillet 2016 portant création
 * d'une commune nouvelle (JORF n°0252 du 28 octobre 2016, Légifrance) : « la commune
 * nouvelle d'Annecy est créée en lieu et place des communes d'Annecy, d'Annecy-le-Vieux,
 * de Cran-Gevrier, de Meythet, de Pringy et de Seynod à compter du 1er janvier 2017 ».
 *
 * Dessin de principe : les positions autour du centre suivent grossièrement
 * l'orientation réelle (Pringy au nord, Seynod au sud…), sans échelle, et c'est écrit
 * sous le schéma. La commune de la page est mise en valeur (`current` = slug).
 */
const COMMUNES = [
  { slug: 'pringy', nom: 'Pringy', x: 180, y: 30 },
  { slug: 'meythet', nom: 'Meythet', x: 62, y: 82 },
  { slug: 'annecy-le-vieux', nom: 'Annecy-le-Vieux', x: 298, y: 82 },
  { slug: 'cran-gevrier', nom: 'Cran-Gevrier', x: 62, y: 218 },
  { slug: 'annecy', nom: 'Annecy', x: 298, y: 218 },
  { slug: 'seynod', nom: 'Seynod', x: 180, y: 270 },
]

export const COMMUNES_FUSIONNEES = COMMUNES.map((c) => c.slug)

export default function ZoneFusionAnnecy({ current }: { current?: string }) {
  return (
    <ServiceSchemaFrame
      id="annecy-commune-nouvelle"
      title="Annecy, commune nouvelle depuis 2017"
      note="Six communes réunies en une seule le 1er janvier 2017. Positions indicatives, sans échelle."
      sources={[
        {
          label:
            'Légifrance, arrêté du 14 juillet 2016 portant création d’une commune nouvelle (JORF n°0252 du 28 octobre 2016)',
          url: 'https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000033313064',
          consulted: '25 septembre 2026',
        },
      ]}
    >
      <svg
        viewBox="0 0 360 296"
        role="img"
        aria-labelledby="schema-fusion-titre schema-fusion-desc"
        className="mx-auto block h-auto w-full max-w-[440px]"
      >
        <title id="schema-fusion-titre">Les six communes réunies dans la commune nouvelle d’Annecy</title>
        <desc id="schema-fusion-desc">
          Depuis le 1er janvier 2017, Annecy, Annecy-le-Vieux, Cran-Gevrier, Meythet, Pringy et Seynod forment
          la commune nouvelle d’Annecy.
        </desc>

        {COMMUNES.map((c) => (
          <line key={`l-${c.slug}`} x1="180" y1="150" x2={c.x} y2={c.y} className="stroke-primary/35" strokeWidth="2" />
        ))}

        <ellipse cx="180" cy="150" rx="80" ry="46" className="fill-primary" />
        <text x="180" y="142" textAnchor="middle" fontSize="16" fontWeight="700" className="fill-white">
          Annecy
        </text>
        <text x="180" y="160" textAnchor="middle" fontSize="11.5" className="fill-accent">
          commune nouvelle
        </text>
        <text x="180" y="176" textAnchor="middle" fontSize="11" className="fill-white">
          1er janvier 2017
        </text>

        {COMMUNES.map((c) => {
          const actif = c.slug === current
          return (
            <g key={c.slug}>
              <rect
                x={c.x - 58} y={c.y - 17} width="116" height="34" rx="17"
                className={actif ? 'fill-accent stroke-accent' : 'fill-white stroke-primary/40'}
                strokeWidth="1.5"
              />
              <text
                x={c.x} y={c.y + 4.5} textAnchor="middle" fontSize="12.5" fontWeight={actif ? 700 : 600}
                className={actif ? 'fill-dark' : 'fill-slate-800'}
              >
                {c.nom}
              </text>
            </g>
          )
        })}
      </svg>
    </ServiceSchemaFrame>
  )
}
