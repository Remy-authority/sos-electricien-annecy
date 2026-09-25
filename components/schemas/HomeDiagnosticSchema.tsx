import Link from 'next/link'

/**
 * Schéma d'aide au choix de l'accueil : « Diagnostic électrique : quand est-il obligatoire ? »
 *
 * Source (ouverte le 25/09/2026) : service-public.gouv.fr, fiche F18692
 * « Diagnostic immobilier : état de l'installation intérieure d'électricité »,
 * vérifiée le 17/09/2026 :
 *   - obligatoire quand « l'installation d'électricité a plus de 15 ans » (vente et location) ;
 *   - vente : « réalisé depuis moins de 3 ans » ; location : « depuis moins de 6 ans » ;
 *   - « réalisé par un diagnostiqueur répondant à certains critères, notamment de certification ».
 *
 * Deux tracés du même contenu : vertical sous lg (lisible à 320 px), horizontal en lg.
 * Couleurs par les tokens (classes fill-/stroke- de Tailwind), aucune animation.
 */
const SOURCE_URL = 'https://www.service-public.gouv.fr/particuliers/vosdroits/F18692'

export default function HomeDiagnosticSchema() {
  return (
    <figure className="card order-3 !p-4 sm:!p-8 md:col-span-2" aria-labelledby="schema-diag-titre">
      <h3 id="schema-diag-titre" className="text-center text-xl md:text-2xl lg:text-left">
        Diagnostic électrique : quand est-il obligatoire ?
      </h3>
      <p className="mt-2 text-center text-sm text-slate-600 lg:text-left">
        Vous vendez ou vous louez : suivez les flèches.
      </p>

      <SchemaVertical />
      <SchemaHorizontal />

      <p className="mt-6 text-center text-sm text-slate-700 lg:text-left">
        Le diagnostic a relevé des anomalies ?{' '}
        <Link
          href="/services/mise-en-conformite-diagnostic-electrique"
          className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dark"
        >
          Nous reprenons l'installation
        </Link>
        , tableau compris.
      </p>
      <figcaption className="mt-3 text-center text-xs leading-relaxed text-slate-500 lg:text-left">
        Source :{' '}
        <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="text-slate-600 underline underline-offset-2">
          service-public.gouv.fr, « Diagnostic immobilier : état de l'installation intérieure d'électricité »
        </a>
        , fiche vérifiée le 17/09/2026, consultée le 25/09/2026.
      </figcaption>
    </figure>
  )
}

const TITRE_SVG = 'Diagnostic électrique obligatoire ou non'
const DESC_SVG =
  "Vous vendez ou louez un logement. Si l'installation électrique a plus de 15 ans, le diagnostic électricité est obligatoire et réalisé par un diagnostiqueur certifié ; il doit dater de moins de 3 ans pour une vente et de moins de 6 ans pour une location. Sinon, aucun diagnostic électricité n'est à fournir."

function Fleche({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" className="fill-primary" />
      </marker>
    </defs>
  )
}

/** Tracé vertical (téléphone, tablette) : largeur utile 300, texte à 14-15 unités
 *  pour rester lisible (au moins 12 px rendus) sur un écran de 320 px. */
function SchemaVertical() {
  const m = 'url(#diag-fleche-v)'
  return (
    <svg
      viewBox="0 0 300 462"
      className="mx-auto mt-6 h-auto w-full max-w-sm lg:hidden"
      role="img"
      aria-labelledby="diag-v-t diag-v-d"
    >
      <title id="diag-v-t">{TITRE_SVG}</title>
      <desc id="diag-v-d">{DESC_SVG}</desc>
      <Fleche id="diag-fleche-v" />

      {/* Départ */}
      <rect x="0" y="0" width="300" height="52" rx="12" className="fill-primary" />
      <text x="150" y="31" textAnchor="middle" fontSize="15" className="fill-white font-semibold">
        Vous vendez ou louez un logement
      </text>
      <path d="M150 52 V86" className="stroke-primary" strokeWidth="2" fill="none" markerEnd={m} />

      {/* Question */}
      <rect x="1.5" y="92" width="297" height="72" rx="12" className="fill-white stroke-accent" strokeWidth="2.5" />
      <text x="150" y="123" textAnchor="middle" fontSize="15" className="fill-primary font-semibold">
        L'installation électrique
      </text>
      <text x="150" y="144" textAnchor="middle" fontSize="15" className="fill-primary font-semibold">
        a-t-elle plus de 15 ans ?
      </text>

      {/* Branches */}
      <path d="M150 164 V182 M74 182 H226" className="stroke-primary" strokeWidth="2" fill="none" />
      <path d="M74 182 V210" className="stroke-primary" strokeWidth="2" fill="none" markerEnd={m} />
      <path d="M226 182 V210" className="stroke-primary" strokeWidth="2" fill="none" markerEnd={m} />
      <text x="82" y="202" fontSize="13" className="fill-slate-600 font-semibold">Non</text>
      <text x="234" y="202" fontSize="13" className="fill-slate-600 font-semibold">Oui</text>

      {/* Non */}
      <rect x="1" y="216" width="146" height="98" rx="12" className="fill-light stroke-slate-300" strokeWidth="1.5" />
      <text x="74" y="251" textAnchor="middle" fontSize="14" className="fill-slate-700">Pas de diagnostic</text>
      <text x="74" y="270" textAnchor="middle" fontSize="14" className="fill-slate-700">électricité</text>
      <text x="74" y="289" textAnchor="middle" fontSize="14" className="fill-slate-700">à fournir</text>

      {/* Oui */}
      <rect x="153" y="216" width="146" height="98" rx="12" className="fill-accent" />
      <text x="226" y="241" textAnchor="middle" fontSize="14" className="fill-dark font-semibold">Diagnostic</text>
      <text x="226" y="259" textAnchor="middle" fontSize="14" className="fill-dark font-semibold">obligatoire, par</text>
      <text x="226" y="277" textAnchor="middle" fontSize="14" className="fill-dark font-semibold">un diagnostiqueur</text>
      <text x="226" y="295" textAnchor="middle" fontSize="14" className="fill-dark font-semibold">certifié</text>
      <path d="M226 314 V342" className="stroke-primary" strokeWidth="2" fill="none" markerEnd={m} />

      {/* Validité */}
      <rect x="1" y="348" width="298" height="112" rx="12" className="fill-white stroke-primary/30" strokeWidth="1.5" />
      <text x="150" y="374" textAnchor="middle" fontSize="14" className="fill-slate-700">
        Il doit dater de moins de :
      </text>
      <path d="M150 390 V446" className="stroke-slate-200" strokeWidth="1.5" />
      <text x="76" y="418" textAnchor="middle" fontSize="28" className="fill-primary font-display font-semibold">3 ans</text>
      <text x="76" y="440" textAnchor="middle" fontSize="13" className="fill-slate-600">en cas de vente</text>
      <text x="224" y="418" textAnchor="middle" fontSize="28" className="fill-primary font-display font-semibold">6 ans</text>
      <text x="224" y="440" textAnchor="middle" fontSize="13" className="fill-slate-600">en cas de location</text>
    </svg>
  )
}

/** Tracé horizontal (ordinateur). */
function SchemaHorizontal() {
  const m = 'url(#diag-fleche-h)'
  return (
    <svg
      viewBox="0 0 960 250"
      className="mt-8 hidden h-auto w-full lg:block"
      role="img"
      aria-labelledby="diag-h-t diag-h-d"
    >
      <title id="diag-h-t">{TITRE_SVG}</title>
      <desc id="diag-h-d">{DESC_SVG}</desc>
      <Fleche id="diag-fleche-h" />

      {/* Départ */}
      <rect x="0" y="85" width="190" height="80" rx="14" className="fill-primary" />
      <text x="95" y="120" textAnchor="middle" fontSize="14" className="fill-white font-semibold">Vous vendez ou</text>
      <text x="95" y="140" textAnchor="middle" fontSize="14" className="fill-white font-semibold">vous louez un logement</text>
      <path d="M190 125 H224" className="stroke-primary" strokeWidth="2" fill="none" markerEnd={m} />

      {/* Question */}
      <rect x="230" y="80" width="210" height="90" rx="14" className="fill-white stroke-accent" strokeWidth="2.5" />
      <text x="335" y="120" textAnchor="middle" fontSize="15" className="fill-primary font-semibold">L'installation électrique</text>
      <text x="335" y="141" textAnchor="middle" fontSize="15" className="fill-primary font-semibold">a-t-elle plus de 15 ans ?</text>

      {/* Branches */}
      <path d="M440 125 H466 M466 45 V205" className="stroke-primary" strokeWidth="2" fill="none" />
      <path d="M466 45 H494" className="stroke-primary" strokeWidth="2" fill="none" markerEnd={m} />
      <path d="M466 205 H494" className="stroke-primary" strokeWidth="2" fill="none" markerEnd={m} />
      <text x="458" y="41" textAnchor="end" fontSize="13" className="fill-slate-600 font-semibold">Non</text>
      <text x="458" y="209" textAnchor="end" fontSize="13" className="fill-slate-600 font-semibold">Oui</text>

      {/* Non */}
      <rect x="500" y="10" width="200" height="70" rx="14" className="fill-light stroke-slate-300" strokeWidth="1.5" />
      <text x="600" y="41" textAnchor="middle" fontSize="15" className="fill-slate-700">Pas de diagnostic</text>
      <text x="600" y="61" textAnchor="middle" fontSize="15" className="fill-slate-700">électricité à fournir</text>

      {/* Oui */}
      <rect x="500" y="160" width="200" height="86" rx="14" className="fill-accent" />
      <text x="600" y="190" textAnchor="middle" fontSize="15" className="fill-dark font-semibold">Diagnostic obligatoire,</text>
      <text x="600" y="209" textAnchor="middle" fontSize="15" className="fill-dark font-semibold">par un diagnostiqueur</text>
      <text x="600" y="228" textAnchor="middle" fontSize="15" className="fill-dark font-semibold">certifié</text>
      <path d="M700 203 H734" className="stroke-primary" strokeWidth="2" fill="none" markerEnd={m} />

      {/* Validité */}
      <rect x="740" y="126" width="218" height="120" rx="14" className="fill-white stroke-primary/30" strokeWidth="1.5" />
      <text x="849" y="152" textAnchor="middle" fontSize="14" className="fill-slate-700">Il doit dater de moins de :</text>
      <path d="M849 166 V234" className="stroke-slate-200" strokeWidth="1.5" />
      <text x="794" y="200" textAnchor="middle" fontSize="28" className="fill-primary font-display font-semibold">3 ans</text>
      <text x="794" y="224" textAnchor="middle" fontSize="13" className="fill-slate-600">en vente</text>
      <text x="904" y="200" textAnchor="middle" fontSize="28" className="fill-primary font-display font-semibold">6 ans</text>
      <text x="904" y="224" textAnchor="middle" fontSize="13" className="fill-slate-600">en location</text>
    </svg>
  )
}
