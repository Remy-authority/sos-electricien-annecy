import { SourcesLigne } from './Sources'

/**
 * Schémas SVG de la page /tarifs. Chaque schéma explique un fait sourcé de la page et
 * porte sa source dessous. Chiffres repris À L'IDENTIQUE du tableau (content/tarifs.json),
 * relevés le 25/09/2026 (détail : ../tasks/.maj-annecy/tarifs-sources.json).
 * Dessinés en largeur 400 pour rester lisibles sur téléphone (texte ≈ 13 px à 390 px),
 * plafonnés en largeur sur ordinateur. Couleurs = jetons du thème (primary, accent).
 */

function Figure({
  titre,
  sources,
  children,
  label,
}: {
  titre: string
  sources: string[]
  children: React.ReactNode
  label: string
}) {
  return (
    <figure className="my-10 rounded-card border border-slate-200 bg-light px-2 py-6 sm:px-6">
      <figcaption className="px-2 text-center font-display text-lg font-semibold text-primary">{titre}</figcaption>
      <div className="mx-auto mt-4 w-full max-w-[480px]" role="img" aria-label={label}>
        {children}
      </div>
      <SourcesLigne cles={sources} className="mx-auto mt-4 max-w-[480px] text-center" />
    </figure>
  )
}

const T = { fontFamily: 'var(--font-sora), ui-sans-serif, system-ui, sans-serif' }

/* ── 1. De quoi se compose une facture de dépannage ─────────────────────────── */
export function SchemaFacture() {
  const lignes = [
    { titre: 'Déplacement', valeur: '20 à 100 € selon les sources', signe: '' },
    { titre: "Main-d'œuvre", valeur: "30 à 75 € de l'heure en journée", signe: '+' },
    { titre: 'Pièces et fournitures', valeur: 'au prix écrit sur le devis', signe: '+' },
    { titre: 'Majoration éventuelle', valeur: '+50 à +100 % soir, week-end, férié', signe: '+' },
  ]
  const h = 72
  const pas = 96
  return (
    <Figure
      titre="De quoi se compose une facture de dépannage"
      label="Une facture de dépannage additionne le déplacement, la main-d'œuvre, les pièces et, le soir, le week-end ou un jour férié, une majoration."
      sources={['habitatpresto', 'monclubelec', 'prixpose-tableau', 'prixpose-reno']}
    >
      <svg viewBox="0 0 400 470" className="h-auto w-full" style={T} aria-hidden="true">
        {lignes.map((l, i) => {
          const y = 6 + i * pas
          const derniere = i === lignes.length - 1
          return (
            <g key={l.titre}>
              {l.signe && (
                <text x="200" y={y - 6} textAnchor="middle" className="fill-accent-deep" fontSize="24" fontWeight="700">
                  {l.signe}
                </text>
              )}
              <rect
                x="6"
                y={y}
                width="388"
                height={h}
                rx="14"
                className={derniere ? 'fill-white stroke-accent' : 'fill-white stroke-primary/30'}
                strokeWidth={derniere ? 2 : 1.5}
                strokeDasharray={derniere ? '6 5' : undefined}
              />
              <circle cx="36" cy={y + h / 2} r="17" className={derniere ? 'fill-accent/25' : 'fill-primary/10'} />
              <text x="36" y={y + h / 2 + 6} textAnchor="middle" fontSize="16" fontWeight="700" className="fill-primary">
                {i + 1}
              </text>
              <text x="64" y={y + 30} fontSize="18" fontWeight="700" className="fill-primary">
                {l.titre}
              </text>
              <text x="64" y={y + 54} fontSize="16" className="fill-slate-700">
                {l.valeur}
              </text>
            </g>
          )
        })}
        <text x="200" y="398" textAnchor="middle" className="fill-accent-deep" fontSize="24" fontWeight="700">
          =
        </text>
        <rect x="6" y="408" width="388" height="58" rx="14" className="fill-primary" />
        <text x="200" y="443" textAnchor="middle" fontSize="18" fontWeight="700" className="fill-white">
          Votre facture, TVA comprise
        </text>
      </svg>
    </Figure>
  )
}

/* ── 2. Diagnostic immobilier ou recherche de panne ─────────────────────────── */
export function SchemaDiagnostic() {
  const cartes = [
    {
      titre: 'Diagnostic électricité',
      sous: 'pour vendre ou louer',
      lignes: [
        'Par : un diagnostiqueur certifié',
        'Quand : installation de plus de 15 ans',
        'Validité : 3 ans (vente), 6 ans (bail)',
      ],
      prix: '65 à 190 € selon les sources',
      accent: false,
    },
    {
      titre: 'Recherche de panne',
      sous: 'quand le courant pose problème',
      lignes: ['Par : un électricien, notre métier', 'Quand : disjoncteur qui saute,', 'circuit coupé, prise sans courant'],
      prix: '100 à 200 € TTC, réparation incluse',
      accent: true,
    },
  ]
  const hc = 232
  return (
    <Figure
      titre="Deux « diagnostics », deux professionnels"
      label="Le diagnostic électricité de vente ou de location est fait par un diagnostiqueur certifié ; la recherche de panne est faite par un électricien."
      sources={['sp-diag', 'empruntis', 'dimo', 'habitatpresto']}
    >
      <svg viewBox="0 0 400 520" className="h-auto w-full" style={T} aria-hidden="true">
        {cartes.map((c, i) => {
          const y = i === 0 ? 4 : 284
          return (
            <g key={c.titre}>
              <rect
                x="4"
                y={y}
                width="392"
                height={hc}
                rx="16"
                className={c.accent ? 'fill-white stroke-accent' : 'fill-white stroke-primary/30'}
                strokeWidth="2"
              />
              <path
                d={`M4 ${y + 16} a16 16 0 0 1 16 -16 h360 a16 16 0 0 1 16 16 v52 h-392 z`}
                className={c.accent ? 'fill-accent/20' : 'fill-primary/10'}
              />
              <text x="200" y={y + 32} textAnchor="middle" fontSize="20" fontWeight="700" className="fill-primary">
                {c.titre}
              </text>
              <text x="200" y={y + 55} textAnchor="middle" fontSize="15" className="fill-slate-600">
                {c.sous}
              </text>
              {c.lignes.map((l, k) => (
                <text key={k} x="22" y={y + 100 + k * 27} fontSize="16" className="fill-slate-700">
                  {l}
                </text>
              ))}
              <rect x="18" y={y + 172} width="364" height="46" rx="10" className="fill-light" />
              <text x="200" y={y + 201} textAnchor="middle" fontSize="17" fontWeight="700" className="fill-primary">
                {c.prix}
              </text>
            </g>
          )
        })}
        <circle cx="200" cy="260" r="19" className="fill-white stroke-accent" strokeWidth="2" />
        <text x="200" y="268" textAnchor="middle" fontSize="22" fontWeight="700" className="fill-accent-deep">
          ≠
        </text>
      </svg>
    </Figure>
  )
}

/* ── 3. Prix au m² comparés (une seule source, même base TTC) ───────────────── */
export function SchemaPrixM2() {
  const max = 250
  const x0 = 14
  const largeur = 372
  const px = (v: number) => x0 + (v / max) * largeur
  const barres = [
    { titre: 'Mise en sécurité', min: 50, max: 80 },
    { titre: 'Rénovation partielle', min: 80, max: 120 },
    { titre: 'Neuf (maison sans chauffage)', min: 100, max: 150 },
    { titre: 'Rénovation complète', min: 125, max: 200 },
  ]
  return (
    <Figure
      titre="Prix au m², de la mise en sécurité à la réfection totale"
      label="Prix au m² TTC relevés sur Prix-pose : mise en sécurité 50 à 80 euros, rénovation partielle 80 à 120, installation neuve 100 à 150, rénovation complète 125 à 200."
      sources={['prixpose-reno', 'prixpose-neuf']}
    >
      <svg viewBox="0 0 400 362" className="h-auto w-full" style={T} aria-hidden="true">
        {[0, 50, 100, 150, 200, 250].map((v) => (
          <g key={v}>
            <line x1={px(v)} x2={px(v)} y1="8" y2="314" className="stroke-slate-300" strokeDasharray="3 4" />
            <text x={px(v)} y="336" textAnchor={v === 0 ? 'start' : v === 250 ? 'end' : 'middle'} fontSize="14" className="fill-slate-500">
              {v}
            </text>
          </g>
        ))}
        <text x="200" y="358" textAnchor="middle" fontSize="14" className="fill-slate-600">
          € TTC par m², pose comprise
        </text>
        {barres.map((b, i) => {
          const y = 26 + i * 76
          const complet = i === barres.length - 1
          const aGauche = px(b.max) + 110 > 400
          return (
            <g key={b.titre}>
              <text x={x0} y={y} fontSize="16" fontWeight="700" className="fill-primary">
                {b.titre}
              </text>
              <rect x={x0} y={y + 12} width={largeur} height="26" rx="13" className="fill-white" />
              <rect
                x={px(b.min)}
                y={y + 12}
                width={px(b.max) - px(b.min)}
                height="26"
                rx="13"
                className={complet ? 'fill-accent' : 'fill-primary'}
              />
              <text
                x={aGauche ? px(b.min) - 8 : px(b.max) + 8}
                y={y + 31}
                textAnchor={aGauche ? 'end' : 'start'}
                fontSize="15"
                fontWeight="700"
                className="fill-slate-800"
              >
                {b.min} à {b.max} €
              </text>
            </g>
          )
        })}
      </svg>
    </Figure>
  )
}

/* ── 4. TVA à 10 % ou à 20 % ────────────────────────────────────────────────── */
export function SchemaTva() {
  return (
    <Figure
      titre="TVA à 10 % ou à 20 % : quel taux pour vos travaux ?"
      label="Logement achevé depuis plus de deux ans et travaux d'amélioration, d'aménagement ou d'entretien : TVA à 10 %. Logement de moins de deux ans : 20 %. Restent à 20 % l'agrandissement de plus de 10 % de la surface et le matériel acheté soi-même."
      sources={['impots']}
    >
      <svg viewBox="0 0 400 522" className="h-auto w-full" style={T} aria-hidden="true">
        <defs>
          <marker id="tva-fleche" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 10 5 0 10z" className="fill-primary" />
          </marker>
        </defs>
        <rect x="20" y="4" width="360" height="68" rx="14" className="fill-white stroke-primary/40" strokeWidth="1.5" />
        <text x="200" y="32" textAnchor="middle" fontSize="17" fontWeight="700" className="fill-primary">
          Logement achevé depuis
        </text>
        <text x="200" y="56" textAnchor="middle" fontSize="17" fontWeight="700" className="fill-primary">
          plus de 2 ans ?
        </text>

        <path d="M100 72 V118" className="stroke-primary" strokeWidth="2" fill="none" markerEnd="url(#tva-fleche)" />
        <text x="110" y="102" fontSize="15" fontWeight="700" className="fill-slate-600">
          Non
        </text>
        <rect x="6" y="124" width="188" height="100" rx="14" className="fill-primary" />
        <text x="100" y="172" textAnchor="middle" fontSize="34" fontWeight="700" className="fill-white">
          20 %
        </text>
        <text x="100" y="202" textAnchor="middle" fontSize="15" className="fill-white">
          taux normal
        </text>

        <path d="M300 72 V118" className="stroke-primary" strokeWidth="2" fill="none" markerEnd="url(#tva-fleche)" />
        <text x="310" y="102" fontSize="15" fontWeight="700" className="fill-slate-600">
          Oui
        </text>
        <rect x="206" y="124" width="188" height="100" rx="14" className="fill-white stroke-primary/40" strokeWidth="1.5" />
        <text x="300" y="155" textAnchor="middle" fontSize="15" fontWeight="600" className="fill-primary">
          Amélioration,
        </text>
        <text x="300" y="178" textAnchor="middle" fontSize="15" fontWeight="600" className="fill-primary">
          aménagement
        </text>
        <text x="300" y="201" textAnchor="middle" fontSize="15" fontWeight="600" className="fill-primary">
          ou entretien ?
        </text>
        <path d="M300 224 V266" className="stroke-primary" strokeWidth="2" fill="none" markerEnd="url(#tva-fleche)" />
        <text x="310" y="252" fontSize="15" fontWeight="700" className="fill-slate-600">
          Oui
        </text>
        <rect x="206" y="272" width="188" height="100" rx="14" className="fill-accent" />
        <text x="300" y="320" textAnchor="middle" fontSize="34" fontWeight="700" className="fill-dark">
          10 %
        </text>
        <text x="300" y="350" textAnchor="middle" fontSize="15" className="fill-dark">
          taux réduit
        </text>

        <rect x="6" y="392" width="388" height="126" rx="14" className="fill-white stroke-accent" strokeWidth="1.5" strokeDasharray="6 5" />
        <text x="200" y="422" textAnchor="middle" fontSize="15" fontWeight="700" className="fill-primary">
          Restent à 20 %, même dans l'ancien :
        </text>
        <text x="200" y="449" textAnchor="middle" fontSize="15" className="fill-slate-700">
          un agrandissement de plus de 10 %
        </text>
        <text x="200" y="473" textAnchor="middle" fontSize="15" className="fill-slate-700">
          de la surface de plancher,
        </text>
        <text x="200" y="497" textAnchor="middle" fontSize="15" className="fill-slate-700">
          le matériel acheté par vous-même.
        </text>
      </svg>
    </Figure>
  )
}
