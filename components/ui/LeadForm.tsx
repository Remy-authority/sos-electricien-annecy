'use client'

import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/config/site.config'
import { useAnimeEnVue } from '@/lib/anime-en-vue'

/**
 * Formulaire court (16/11/2026, règle #R84, tasks/regle-formulaire.md), UN SEUL dessin sur tout le
 * site : bloc 1, bas de l'accueil, contact, tarifs, prestations, communes, articles.
 *
 * 1. « Quel est votre projet ? » : quatre vraies prestations en 2 x 2, un clic avance.
 * 2. « C'est pour quand ? » : un clic avance.
 * 3. Nom | Prénom, Téléphone | Code postal (qui trouve la commune), Précisions (facultatif).
 *
 * Ce qui part à /api/contact NE CHANGE PAS (chaîne de D.E.A-74 et de Rank OS) : mêmes clés, même
 * ordre { probleme, ville, urgence, nom, telephone, email, message, company: '' }, mêmes valeurs de
 * `probleme`. L'email n'est plus demandé : la clé part vide. Seul ajout : l'urgence, que l'envoi ne
 * lisait pas, devient la première ligne de `message` (« Urgence : Aujourd'hui »).
 */

type Etape = 1 | 2 | 3
type Manque = 'nom' | 'telephone' | 'lieu'

const svg = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-[22px] w-[22px] shrink-0 overflow-visible sm:h-6 sm:w-6',
  'aria-hidden': true,
}

/** Les quatre prestations : `id` part tel quel dans le mail (valeurs d'avant, au caractère près),
 *  `label` est affiché. Les quatre autres valeurs d'avant restent acceptées par l'envoi. */
const PROJETS: { id: string; label: string; Icon: () => JSX.Element }[] = [
  {
    id: 'Urgence dépannage',
    label: 'Plus de courant',
    Icon: () => (
      <svg {...svg}>
        <path d="M9 17h6M10 20h4" />
        <path d="M8.5 14.5a6 6 0 1 1 7 0c-.6.5-1 1.3-1 2.1V17h-5v-.4c0-.8-.4-1.6-1-2.1Z" />
        <path className="lf-clignote" d="M12 1.5V0M4.5 4.5 3.4 3.4M19.5 4.5l1.1-1.1" />
      </svg>
    ),
  },
  {
    id: 'Disjoncteur qui saute',
    label: 'Disjoncteur qui saute',
    Icon: () => (
      <svg {...svg}>
        <rect x="6" y="2.5" width="12" height="19" rx="1" />
        <rect x="9.5" y="7" width="5" height="10" rx="0.5" />
        <path className="lf-bascule" d="M10.5 9.5h3" strokeWidth="2.6" />
      </svg>
    ),
  },
  {
    id: 'Tableau électrique',
    label: 'Tableau électrique',
    Icon: () => (
      <svg {...svg}>
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <path d="M3 11.5h18" />
        <path className="lf-module lf-m1" d="M6.5 6v3" />
        <path className="lf-module lf-m2" d="M10 6v3" />
        <path className="lf-module lf-m3" d="M13.5 6v3" />
        <path className="lf-module lf-m4" d="M17 6v3" />
        <path d="M6.5 15h11M6.5 18h7" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    id: 'Rénovation électrique',
    label: 'Rénovation, mise aux normes',
    Icon: () => (
      <svg {...svg}>
        <path d="M3 20c4 0 5-4 9-4s5 4 9 4" />
        <path d="M8 3v5M16 3v5" />
        <path d="M6 8h12v2.5a6 6 0 0 1-12 0Z" />
        <path className="lf-courant" d="M12 16.5v0" strokeWidth="2.4" />
      </svg>
    ),
  },
]

/** « C'est pour quand ? » : les deux valeurs d'avant, plus « Dans le mois » pour une rénovation. */
const QUAND: { valeur: string; Icon: () => JSX.Element }[] = [
  {
    valeur: "Aujourd'hui",
    Icon: () => (
      <svg {...svg}>
        <path className="lf-clignote" d="M13 2 5 13.5h6L10 22l9-12h-6z" />
      </svg>
    ),
  },
  {
    valeur: 'Cette semaine',
    Icon: () => (
      <svg {...svg}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="1" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
        <path className="lf-module lf-m1" d="M7.5 14h2" strokeWidth="2.2" />
        <path className="lf-module lf-m2" d="M11 14h2" strokeWidth="2.2" />
        <path className="lf-module lf-m3" d="M14.5 14h2" strokeWidth="2.2" />
      </svg>
    ),
  },
  {
    valeur: 'Dans le mois',
    Icon: () => (
      <svg {...svg}>
        <rect x="3.5" y="5" width="17" height="15.5" rx="1" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
        <path d="M7.5 13.5h2M11 13.5h2M14.5 13.5h2M7.5 17h2M11 17h2" strokeWidth="1.5" />
        <path className="lf-coche" d="m14 17 1.3 1.3 2.4-2.6" pathLength={1} />
      </svg>
    ),
  },
]

const TITRES: Record<Etape, { titre: string; aide: string }> = {
  1: { titre: 'Quel est votre projet ?', aide: 'Devis gratuit en 30 secondes.' },
  2: { titre: "C'est pour quand ?", aide: 'Un clic, pour organiser notre passage.' },
  3: { titre: 'Où vous rappeler ?', aide: 'Nous vous rappelons pour fixer le diagnostic.' },
}

const NOM_DU_MANQUE: Record<Manque, string> = {
  nom: 'votre nom',
  telephone: 'votre téléphone',
  lieu: 'votre code postal',
}

/** Les communes d'un département (« 74 » : { "74600": ["Seynod", …] }), chargées une fois. */
const cacheCp = new Map<string, Promise<Record<string, string[]>>>()
function communesDuDepartement(deux: string) {
  let p = cacheCp.get(deux)
  if (!p) {
    p = fetch(`/cp/${deux}.json`)
      .then((r) => (r.ok ? r.json() : {}))
      .catch(() => ({}))
    cacheCp.set(deux, p)
  }
  return p
}

/** Icônes : l'ampoule grésille, la manette retombe, les modules s'allument un à un, la coche
 *  s'écrit. Jouées seulement à l'écran (data-anime), coupées si l'on demande moins de mouvement. */
const CSS_FORM = `
@keyframes lf-clignote{0%,40%,48%,56%,100%{opacity:1}44%,52%{opacity:.15}}
@keyframes lf-bascule{0%,55%{transform:translateY(0)}65%,90%{transform:translateY(5px)}100%{transform:translateY(0)}}
@keyframes lf-module{0%,100%{opacity:.35}30%,70%{opacity:1}}
@keyframes lf-coche{0%,15%{stroke-dashoffset:1}55%,100%{stroke-dashoffset:0}}
@keyframes lf-courant{0%{transform:translateY(0);opacity:1}100%{transform:translateY(5px);opacity:0}}
.lf-clignote{animation:lf-clignote 3s linear infinite}
.lf-bascule{animation:lf-bascule 3.2s ease-in-out infinite}
.lf-module{animation:lf-module 2.8s ease-in-out infinite}
.lf-m2{animation-delay:.35s}.lf-m3{animation-delay:.7s}.lf-m4{animation-delay:1.05s}
.lf-coche{stroke-dasharray:1;animation:lf-coche 2.8s ease-out infinite}
.lf-courant{animation:lf-courant 1.4s ease-in infinite}
@media (prefers-reduced-motion:reduce){.lf-clignote,.lf-bascule,.lf-module,.lf-coche,.lf-courant{animation:none}}`

/* Classes écrites en entier (jamais assemblées par variable, Tailwind les lit dans ce fichier). */
const TUILE_FORME =
  'flex min-h-[68px] [@media(max-height:620px)]:min-h-[58px] w-full flex-col items-center justify-center gap-1.5 rounded-[4px] border px-1.5 py-2.5 transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:min-h-[88px] sm:gap-2.5 sm:px-2 sm:py-4 lg:items-start lg:px-4'
const TUILE_LIBRE =
  'border-white/15 bg-primary text-white [@media(hover:hover)]:hover:border-accent [@media(hover:hover)]:hover:bg-primary-dark'
const TUILE_CHOISIE = 'border-accent bg-accent text-dark'
const LIBELLE = 'text-balance text-center font-semibold leading-tight text-[13px] sm:text-[14.5px] lg:text-left'
const ETIQUETTE = 'mb-1.5 block text-[13px] font-semibold text-white/90'
const CHAMP =
  'w-full rounded-[4px] border bg-white/[0.07] px-3 py-2.5 text-[16px] text-white transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30'
const CHAMP_OK = 'border-white/20'
const CHAMP_ROUGE = 'border-red-400 ring-1 ring-red-400'

export interface LeadFormProps {
  /** Carte du premier écran (bloc 1) : translucide sur la photo, noire dès le premier choix. */
  ecran1?: boolean
  /** Préfixe des id de champs (deux formulaires peuvent vivre sur une même page). */
  idPrefix?: string
}

export function LeadForm({ ecran1 = false, idPrefix = 'devis-' }: LeadFormProps) {
  const [etape, setEtape] = useState<Etape>(1)
  const [projet, setProjet] = useState('')
  const [urgence, setUrgence] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [telephone, setTelephone] = useState('')
  const [lieu, setLieu] = useState('')
  const [precision, setPrecision] = useState('')
  // La commune trouvée (« Seynod 74600 ») et les communes du code postal à toucher.
  const [commune, setCommune] = useState('')
  const [propositions, setPropositions] = useState<string[]>([])
  const [manques, setManques] = useState<Manque[]>([])
  const [statut, setStatut] = useState<'repos' | 'envoi' | 'erreur'>('repos')

  const racineRef = useRef<HTMLDivElement>(null)
  const titreRef = useRef<HTMLHeadingElement>(null)
  const aBouge = useRef(false)
  useAnimeEnVue(racineRef)

  // Nouvelle étape : le titre reçoit le focus (lecteurs d'écran) sans faire défiler, et l'étape
  // est comptée par `SuiviVisite` (Rémy 13/11/2026 : savoir à quelle étape on abandonne).
  useEffect(() => {
    if (!aBouge.current) return
    titreRef.current?.focus({ preventScroll: true })
    if (etape > 1) window.dispatchEvent(new CustomEvent('rr-etape', { detail: etape }))
  }, [etape])

  // La carte change de hauteur (étape, communes, cases en rouge) : elle revient entière à l'écran
  // si une partie en est sortie (52 px : la barre fixe du bas, au téléphone). Jamais au chargement.
  useEffect(() => {
    if (!aBouge.current) return
    const carte = racineRef.current
    if (!carte) return
    const r = carte.getBoundingClientRect()
    const barreDuBas = window.innerWidth < 768 ? 60 : 12
    if (r.top < 72 || r.bottom > window.innerHeight - barreDuBas) {
      carte.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'nearest' })
    }
  }, [etape, manques.length, propositions.length, commune])

  // Dès deux chiffres, le département se charge ; au cinquième, la commune est trouvée. Une seule :
  // retenue toute seule. Plusieurs : proposées à toucher. Code inconnu : le code postal part seul.
  useEffect(() => {
    if (lieu.length < 2) return
    let fini = false
    communesDuDepartement(lieu.slice(0, 2)).then((codes) => {
      if (fini || lieu.length !== 5 || commune) return
      const noms = codes[lieu] ?? []
      if (noms.length === 1) setCommune(`${noms[0]} ${lieu}`)
      else setPropositions(noms)
    })
    return () => {
      fini = true
    }
  }, [lieu, commune])

  function allerA(n: Etape) {
    aBouge.current = true
    setEtape(n)
  }

  function retirerManque(cle: Manque) {
    setManques((prev) => (prev.includes(cle) ? prev.filter((m) => m !== cle) : prev))
  }

  function saisirLieu(valeur: string) {
    setLieu(valeur.replace(/\D/g, '').slice(0, 5))
    setCommune('')
    setPropositions([])
    retirerManque('lieu')
  }

  const id = (cle: string) => `${idPrefix}${cle}`

  async function envoyer() {
    const cp = lieu.trim()
    const oublis: Manque[] = []
    if (!nom.trim()) oublis.push('nom')
    if (telephone.replace(/\D/g, '').length < 8) oublis.push('telephone')
    if (cp.length !== 5) oublis.push('lieu')
    setManques(oublis)
    if (oublis.length > 0) {
      document.getElementById(id(oublis[0]))?.focus()
      return
    }

    // Mêmes clés, même ordre qu'avant le 16/11/2026.
    const champs = {
      probleme: projet,
      ville: commune || cp,
      urgence,
      nom: [prenom.trim(), nom.trim()].filter(Boolean).join(' '),
      telephone: telephone.trim(),
      email: '',
      message: [urgence ? `Urgence : ${urgence}` : '', precision.trim()].filter(Boolean).join('\n'),
    }

    setStatut('envoi')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...champs, company: '' }),
      })
      if (!res.ok) throw new Error()
      window.location.href = '/merci'
    } catch {
      setStatut('erreur')
    }
  }

  const carte = ecran1
    ? projet
      ? 'border-white/10 bg-dark'
      : 'border-white/20 bg-dark/55 backdrop-blur-[2px]'
    : 'border-white/10 bg-dark'

  const champ = (cle?: Manque) => `${CHAMP} ${cle && manques.includes(cle) ? CHAMP_ROUGE : CHAMP_OK}`

  return (
    <div
      ref={racineRef}
      data-clic-formulaire
      data-lead-form=""
      data-anime=""
      role="region"
      aria-label="Formulaire de devis gratuit"
      className={`scroll-mb-20 scroll-mt-24 rounded-[4px] border p-5 text-center text-white shadow-[0_30px_70px_-30px_rgb(0_0_0/0.8)] transition-colors duration-300 [@media(max-height:620px)]:p-4 sm:p-7 lg:text-left ${carte}`}
    >
      <style>{CSS_FORM}</style>
      {/* Piège à robots, toujours vide */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="company" tabIndex={-1} autoComplete="off" readOnly />
      </div>

      {/* Progression, avec « Retour » dès l'étape 2 */}
      <div className="flex items-center gap-3">
        {etape > 1 && (
          <button
            type="button"
            onClick={() => allerA((etape - 1) as Etape)}
            className="-my-2 -ml-1 inline-flex shrink-0 items-center gap-1 rounded-[4px] py-2 pl-1 pr-1.5 text-[13px] font-semibold text-white/80 transition-colors hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Retour
          </button>
        )}
        <div className="flex flex-1 gap-1.5" aria-hidden="true">
          {([1, 2, 3] as Etape[]).map((n) => (
            <span
              key={n}
              className={`h-1 flex-1 rounded-[2px] transition-colors duration-300 ${
                n < etape ? 'bg-accent/50' : n === etape ? 'bg-accent' : 'bg-white/15'
              }`}
            />
          ))}
        </div>
        <span className="shrink-0 text-[11.5px] font-bold uppercase tracking-[0.14em] text-white/65">Étape {etape}/3</span>
      </div>

      <h3 ref={titreRef} tabIndex={-1} className="mt-4 font-display text-[1.3rem] [@media(max-height:620px)]:mt-3 font-semibold tracking-tight text-white outline-none sm:mt-5 sm:text-[1.55rem]">
        {TITRES[etape].titre}
      </h3>
      <p className="mt-1 whitespace-nowrap text-[13.5px] text-white/75">{TITRES[etape].aide}</p>

      {/* ── Étape 1 : la prestation, un clic avance ─────────────────────── */}
      {etape === 1 && (
        <div className="mt-4 grid grid-cols-2 gap-2 [@media(max-height:620px)]:mt-3 sm:mt-5 sm:gap-2.5">
          {PROJETS.map(({ id: valeur, label, Icon }) => {
            const choisi = projet === valeur
            return (
              <button
                key={valeur}
                type="button"
                data-clic-formulaire
                aria-pressed={choisi}
                onClick={() => {
                  setProjet(valeur)
                  allerA(2)
                }}
                className={`${TUILE_FORME} ${choisi ? TUILE_CHOISIE : TUILE_LIBRE}`}
              >
                <span className={choisi ? 'text-dark' : 'text-accent'}>
                  <Icon />
                </span>
                <span className={LIBELLE}>{label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* ── Étape 2 : quand, un clic avance (la 3e case prend toute la ligne) ── */}
      {etape === 2 && (
        <div className="mt-4 grid grid-cols-2 gap-2 [@media(max-height:620px)]:mt-3 sm:mt-5 sm:gap-2.5">
          {QUAND.map(({ valeur, Icon }, i) => {
            const choisi = urgence === valeur
            return (
              <div key={valeur} className={i === QUAND.length - 1 ? 'col-span-2' : ''}>
                <button
                  type="button"
                  data-clic-formulaire
                  aria-pressed={choisi}
                  onClick={() => {
                    setUrgence(valeur)
                    allerA(3)
                  }}
                  className={`${TUILE_FORME} ${choisi ? TUILE_CHOISIE : TUILE_LIBRE}`}
                >
                  <span className={choisi ? 'text-dark' : 'text-accent'}>
                    <Icon />
                  </span>
                  <span className={LIBELLE}>{valeur}</span>
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Étape 3 : deux champs par ligne, puis l'envoi ──────────────── */}
      {etape === 3 && (
        <div className="mt-4 text-left sm:mt-5">
          <div className="grid grid-cols-2 gap-x-2.5 gap-y-3">
            <div>
              <label htmlFor={id('nom')} className={ETIQUETTE}>
                Nom
              </label>
              <input
                id={id('nom')}
                name="nom"
                type="text"
                autoComplete="family-name"
                autoCapitalize="words"
                aria-invalid={manques.includes('nom')}
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value)
                  retirerManque('nom')
                }}
                className={champ('nom')}
              />
            </div>
            <div>
              <label htmlFor={id('prenom')} className={ETIQUETTE}>
                Prénom
              </label>
              <input
                id={id('prenom')}
                name="prenom"
                type="text"
                autoComplete="given-name"
                autoCapitalize="words"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className={champ()}
              />
            </div>
            <div>
              <label htmlFor={id('telephone')} className={ETIQUETTE}>
                Téléphone
              </label>
              <input
                id={id('telephone')}
                name="telephone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={manques.includes('telephone')}
                value={telephone}
                onChange={(e) => {
                  setTelephone(e.target.value)
                  retirerManque('telephone')
                }}
                className={champ('telephone')}
              />
            </div>
            <div>
              <label htmlFor={id('lieu')} className={ETIQUETTE}>
                Code postal
              </label>
              <input
                id={id('lieu')}
                name="ville"
                type="text"
                autoComplete="postal-code"
                inputMode="numeric"
                maxLength={5}
                aria-invalid={manques.includes('lieu')}
                value={lieu}
                onChange={(e) => saisirLieu(e.target.value)}
                className={champ('lieu')}
              />
            </div>
          </div>

          {/* La commune trouvée, ou les communes du code postal à toucher (une ligne qui défile). */}
          {commune && (
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[13px] font-semibold text-accent lg:justify-end">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
              {commune}
            </p>
          )}
          {!commune && propositions.length > 0 && (
            <div className="mt-2 flex w-0 min-w-full gap-1.5 overflow-x-auto pb-1" role="group" aria-label="Votre commune">
              {propositions.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setCommune(`${p} ${lieu}`)
                    setPropositions([])
                  }}
                  className="shrink-0 whitespace-nowrap rounded-[4px] border border-white/20 bg-white/[0.06] px-2.5 py-1.5 text-[13px] font-semibold text-white hover:border-accent"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <div className="mt-3">
            <label htmlFor={id('precision')} className={ETIQUETTE}>
              Précisions <span className="font-normal text-white/60">(facultatif)</span>
            </label>
            <input
              id={id('precision')}
              name="message"
              type="text"
              maxLength={300}
              value={precision}
              onChange={(e) => setPrecision(e.target.value)}
              className={champ()}
            />
          </div>

          {manques.length > 0 && (
            <p role="alert" className="mt-3 text-center text-[13px] font-semibold text-red-300 lg:text-left">
              Complétez les cases en rouge.
              <span className="sr-only"> Il nous manque {manques.map((m) => NOM_DU_MANQUE[m]).join(' et ')}.</span>
            </p>
          )}
          {statut === 'erreur' && (
            <p role="alert" className="mt-3 rounded-[4px] bg-red-500/15 px-4 py-3 text-[14px] font-medium text-red-200">
              L&apos;envoi a échoué. Appelez-nous au {siteConfig.phoneDisplay}.
            </p>
          )}

          <button
            type="button"
            onClick={envoyer}
            disabled={statut === 'envoi'}
            data-cta={ecran1 ? 'devis-hero-carte' : 'devis-envoi'}
            className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center whitespace-nowrap rounded-[4px] bg-accent px-6 text-[15px] font-bold text-dark transition hover:bg-accent/90 disabled:cursor-wait disabled:opacity-70"
          >
            {statut === 'envoi' ? 'Envoi en cours…' : 'Demander mon devis gratuit'}
          </button>
          <p className="mt-2.5 text-center text-[13px] text-white/75 lg:text-left">
            ou appelez le{' '}
            <a href={`tel:${siteConfig.phone}`} data-cta="phone-form" className="font-semibold text-white underline underline-offset-2 hover:text-accent">
              {siteConfig.phoneDisplay}
            </a>
          </p>
          <p className="mt-1.5 text-center text-[12px] text-white/55 lg:text-left">
            Uniquement pour vous rappeler.{' '}
            <a href="/politique-confidentialite" className="underline underline-offset-2 hover:text-white">
              Confidentialité
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

export default LeadForm

