import ServiceSchemaFrame from './ServiceSchemaFrame'

/**
 * Schéma (c) « Diagnostic électrique obligatoire : plus de 15 ans, 3 ans vente,
 * 6 ans location ». Les trois chiffres et la mention du diagnostiqueur certifié
 * viennent de la fiche service-public.gouv.fr F18692 (vérifiée le 17 septembre 2026
 * par la DILA, ouverte le 25 septembre 2026).
 */
export default function ServiceDiagnosticObligatoire() {
  return (
    <ServiceSchemaFrame
      id="diagnostic-obligatoire"
      title="Diagnostic électrique obligatoire : plus de 15 ans, 3 ans vente, 6 ans location"
      sources={[
        {
          label:
            'Service-public.gouv.fr, « Diagnostic immobilier : état de l’installation intérieure d’électricité »',
          url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F18692',
          consulted: '25 septembre 2026',
        },
      ]}
    >
      <svg
        viewBox="0 0 360 318"
        role="img"
        aria-labelledby="schema-diag-titre schema-diag-desc"
        className="mx-auto block h-auto w-full max-w-[440px]"
      >
        <title id="schema-diag-titre">Quand le diagnostic électricité est obligatoire et combien de temps il reste valable</title>
        <desc id="schema-diag-desc">
          Si l’installation électrique a plus de 15 ans, le vendeur ou le bailleur fournit un diagnostic
          électricité. En vente, il doit dater de moins de 3 ans à la promesse ou à l’acte de vente. En location,
          de moins de 6 ans à la signature du bail. Il est réalisé par un diagnostiqueur certifié.
        </desc>

        {/* Déclencheur : installation de plus de 15 ans */}
        <rect x="30" y="8" width="300" height="70" rx="12" className="fill-primary" />
        <text x="180" y="36" textAnchor="middle" fontSize="13" className="fill-white">
          Installation électrique de
        </text>
        <text x="180" y="62" textAnchor="middle" fontSize="20" fontWeight="700" className="fill-accent">
          plus de 15 ans
        </text>

        <line x1="180" y1="78" x2="180" y2="100" className="stroke-primary" strokeWidth="2" />
        <text x="190" y="94" fontSize="11" className="fill-slate-500">diagnostic à fournir</text>
        <line x1="92" y1="100" x2="268" y2="100" className="stroke-primary" strokeWidth="2" />
        <line x1="92" y1="100" x2="92" y2="114" className="stroke-primary" strokeWidth="2" />
        <line x1="268" y1="100" x2="268" y2="114" className="stroke-primary" strokeWidth="2" />
        <path d="M86 114 L98 114 L92 121 Z" className="fill-primary" />
        <path d="M262 114 L274 114 L268 121 Z" className="fill-primary" />

        {/* Deux cas : vente / location */}
        {[
          { x: 12, titre: 'Vente', duree: '3 ans', l1: 'au plus, à la date de', l2: 'la promesse ou de l’acte' },
          { x: 188, titre: 'Location', duree: '6 ans', l1: 'au plus, à la date de', l2: 'signature du bail' },
        ].map((c) => (
          <g key={c.titre}>
            <rect x={c.x} y="122" width="160" height="138" rx="12" className="fill-accent/15 stroke-accent" strokeWidth="1.5" />
            <text x={c.x + 80} y="148" textAnchor="middle" fontSize="13" fontWeight="700" className="fill-slate-800">
              {c.titre}
            </text>
            <text x={c.x + 80} y="194" textAnchor="middle" fontSize="34" fontWeight="700" className="fill-primary">
              {c.duree}
            </text>
            <text x={c.x + 80} y="222" textAnchor="middle" fontSize="11.5" className="fill-slate-600">
              {c.l1}
            </text>
            <text x={c.x + 80} y="239" textAnchor="middle" fontSize="11.5" className="fill-slate-600">
              {c.l2}
            </text>
          </g>
        ))}

        {/* Qui le réalise */}
        <rect x="30" y="276" width="300" height="36" rx="18" className="fill-light stroke-slate-300" strokeWidth="1.5" />
        <text x="180" y="299" textAnchor="middle" fontSize="12" className="fill-slate-700">
          Réalisé par un diagnostiqueur certifié
        </text>
      </svg>
    </ServiceSchemaFrame>
  )
}
