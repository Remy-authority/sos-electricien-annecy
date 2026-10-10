'use client'

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { siteConfig } from '@/config/site.config'

/**
 * Formulaire de demande, refait le 10/10/2026 (mise à jour du site, GO Rémy).
 *
 * 1. Il AVANCE AU CLIC : étape 1 = un clic sur la panne ; étape 2 = la commune puis l'urgence,
 *    un clic sur l'urgence ouvre l'étape 3. Aucun bouton « Continuer ». « Retour » visible dès
 *    l'étape 2. Commune non saisie : elle est redemandée à l'étape 3.
 * 2. NOIR OPAQUE (nuit profonde de la palette), angles de 3 px, aucune pilule, aucun halo.
 * 3. Grilles sans case orpheline : 8 situations en 2 x 4 (ou 4 x 2), 2 urgences en 2 x 1.
 * 4. Téléphone tout centré, ordinateur aligné à gauche.
 *
 * Ce qui part à /api/contact NE CHANGE PAS (chaîne de Mr Verhasselt et Rank OS) :
 * { probleme, ville, urgence, nom, telephone, email, message, company: '' }, mêmes libellés de
 * `probleme` et `urgence` qu'avant (un seul ajouté : « Disjoncteur qui saute », pour fermer la
 * grille), puis redirection vers /merci.
 */

type Step = 1 | 2 | 3

interface Fields {
  probleme: string
  ville: string
  urgence: string
  nom: string
  telephone: string
  email: string
  message: string
}

const AVANCE_MS = 280

const svg = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className: 'h-6 w-6 overflow-visible',
  'aria-hidden': true,
}

/** Les huit situations : `id` part tel quel dans le mail, `label` est affiché. */
const TYPES: { id: string; label: string; Icon: () => JSX.Element }[] = [
  {
    id: 'Urgence dépannage',
    label: 'Plus de\u00a0courant',
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
    label: 'Disjoncteur qui saute',
    Icon: () => (
      <svg {...svg}>
        <rect x="6" y="2.5" width="12" height="19" rx="1" />
        <rect x="9.5" y="7" width="5" height="10" rx="0.5" />
        <path className="lf-bascule" d="M10.5 9.5h3" strokeWidth="2.6" />
      </svg>
    ),
  },
  {
    id: 'Recherche de panne',
    label: 'Recherche de panne',
    Icon: () => (
      <svg {...svg}>
        <rect x="5" y="2.5" width="10" height="14" rx="1" />
        <path d="M7.5 5.5h5v3h-5z" />
        <path className="lf-aiguille" d="M10 12.5 12 10" />
        <path d="M8 16.5 6 21.5M12 16.5l5.5 3 2.5-1" />
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
    id: 'Diagnostic avant vente',
    label: 'Diagnostic avant\u00a0vente',
    Icon: () => (
      <svg {...svg}>
        <path d="M6 3h9l3 3v15H6z" />
        <path className="lf-coche" d="m9 12 2 2 4-4" pathLength={1} />
        <path d="M9 18h6" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    id: 'Rénovation électrique',
    label: 'Rénovation, mise aux normes',
    Icon: () => (
      <svg {...svg}>
        <path d="M3 20c4 0 5-4 9-4s5 4 9 4" />
        <path d="M8 3v5M16 3v5" />
        <path d="M6 8h12v2.5a6 6 0 0 1-12 0Z" />
        <path className="lf-courant" d="M12 16.5v0" strokeWidth="2.4" />
      </svg>
    ),
  },
  {
    id: 'Installation neuve',
    label: 'Installation neuve',
    Icon: () => (
      <svg {...svg}>
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <circle cx="12" cy="12" r="5.5" />
        <circle cx="9.6" cy="12" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="14.4" cy="12" r="0.9" fill="currentColor" stroke="none" />
        <path className="lf-voyant" d="M12 7.6v1.2" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'Autre',
    label: 'Autre problème',
    Icon: () => (
      <svg {...svg}>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.4" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
]

/** Mêmes valeurs qu'avant la mise à jour. */
const URGENCES = ["Aujourd'hui", 'Cette semaine'] as const

const equilibre = '[text-wrap:balance]'

/** Case de choix : vrai bouton radio dans un label. Un clic, Espace ou Entrée choisit ET avance. */
function Choix({
  name,
  value,
  label,
  checked,
  onChoose,
  icone,
  compacte = false,
}: {
  name: string
  value: string
  label: string
  checked: boolean
  onChoose: () => void
  icone?: ReactNode
  compacte?: boolean
}) {
  return (
    <label className="group relative block h-full cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChoose}
        onClick={onChoose}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            onChoose()
          }
        }}
        className="peer sr-only"
      />
      <span
        className={`flex h-full w-full items-center rounded-[3px] border font-medium leading-snug transition-colors duration-150 peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-dark ${
          compacte ? 'min-h-[48px] justify-center px-2 py-2 text-center text-[14px]' : 'min-h-[54px] justify-start gap-2.5 px-3 py-2 text-left text-[13px]'
        } ${
          checked
            ? 'border-accent bg-accent text-dark'
            : 'border-white/15 bg-white/[0.06] text-white/85 group-hover:border-white/40 group-hover:bg-white/[0.1] group-hover:text-white'
        }`}
      >
        {icone && <span className={`shrink-0 ${checked ? 'text-dark' : 'text-accent'}`}>{icone}</span>}
        <span className={equilibre}>{label}</span>
      </span>
    </label>
  )
}

function Retour({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="-ml-1 inline-flex min-h-[40px] items-center gap-1.5 rounded-[3px] px-1 text-sm font-medium text-white/75 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-4 w-4" aria-hidden="true">
        <path d="m15 18-6-6 6-6" />
      </svg>
      Retour
    </button>
  )
}

function Etapes({ step, onRetour }: { step: Step; onRetour: () => void }) {
  return (
    <div>
      <div className="flex gap-1.5" aria-hidden="true">
        {([1, 2, 3] as Step[]).map((s) => (
          <div key={s} className={`h-1 flex-1 rounded-[1px] transition-colors duration-300 ${s <= step ? 'bg-accent' : 'bg-white/15'}`} />
        ))}
      </div>
      <div className="mt-2 flex min-h-[40px] items-center justify-between">
        {step > 1 ? <Retour onClick={onRetour} /> : <span />}
        <span className="text-xs font-semibold uppercase tracking-widest text-white/60">Étape {step} sur 3</span>
      </div>
    </div>
  )
}

const champ =
  'w-full rounded-[3px] border border-white/20 bg-white/[0.07] px-4 py-3 text-base text-white placeholder:text-white/40 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30'
const etiquette = `mb-1.5 block text-sm font-medium text-white/85 ${equilibre}`
const facultatif = <span className="font-normal text-white/55">facultatif</span>

/** Icônes du formulaire : l'ampoule grésille, la manette retombe, l'aiguille bat, les modules
 *  s'allument un à un, la coche s'écrit, le voyant de la prise s'allume. Coupé si l'on demande
 *  moins de mouvement. */
const CSS_FORM = `
@keyframes lf-clignote{0%,40%,48%,56%,100%{opacity:1}44%,52%{opacity:.15}}
@keyframes lf-bascule{0%,55%{transform:translateY(0)}65%,90%{transform:translateY(5px)}100%{transform:translateY(0)}}
@keyframes lf-aiguille{0%,100%{transform:rotate(-28deg)}50%{transform:rotate(18deg)}}
@keyframes lf-module{0%,100%{opacity:.35}30%,70%{opacity:1}}
@keyframes lf-coche{0%,15%{stroke-dashoffset:1}55%,100%{stroke-dashoffset:0}}
@keyframes lf-voyant{0%,100%{opacity:.25}50%{opacity:1}}
@keyframes lf-courant{0%{transform:translateY(0);opacity:1}100%{transform:translateY(5px);opacity:0}}
.lf-clignote{animation:lf-clignote 3s linear infinite}
.lf-bascule{animation:lf-bascule 3.2s ease-in-out infinite}
.lf-aiguille{transform-box:fill-box;transform-origin:0% 100%;animation:lf-aiguille 2.4s ease-in-out infinite}
.lf-module{animation:lf-module 2.8s ease-in-out infinite}
.lf-m2{animation-delay:.35s}.lf-m3{animation-delay:.7s}.lf-m4{animation-delay:1.05s}
.lf-coche{stroke-dasharray:1;animation:lf-coche 2.8s ease-out infinite}
.lf-voyant{animation:lf-voyant 2.2s ease-in-out infinite}
.lf-courant{animation:lf-courant 1.4s ease-in infinite}
@keyframes lf-in{from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:none}}
.lf-etape{animation:lf-in .3s cubic-bezier(.22,1,.36,1)}
@media (prefers-reduced-motion:reduce){.lf-clignote,.lf-bascule,.lf-aiguille,.lf-module,.lf-coche,.lf-voyant,.lf-courant,.lf-etape{animation:none}}`

export interface LeadFormProps {
  /**
   * `hero` : formulaire du bloc 1 (colonne étroite, 2 colonnes de choix).
   * `standard` : accueil (bas de page), contact et tarifs (4 colonnes dès la tablette).
   */
  variante?: 'standard' | 'hero'
}

export function LeadForm({ variante = 'standard' }: LeadFormProps) {
  const hero = variante === 'hero'
  const [step, setStep] = useState<Step>(1)
  const [fields, setFields] = useState<Fields>({
    probleme: '',
    ville: '',
    urgence: '',
    nom: '',
    telephone: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle')
  const [manque, setManque] = useState(false)
  const [communeEtape3, setCommuneEtape3] = useState(false)
  const titreRef = useRef<HTMLHeadingElement>(null)
  const premierRendu = useRef(true)
  const minuteur = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const fieldsRef = useRef(fields)
  fieldsRef.current = fields

  useEffect(() => () => clearTimeout(minuteur.current), [])

  // Focus sur le titre de chaque nouvelle étape (jamais au chargement de la page).
  useEffect(() => {
    if (premierRendu.current) {
      premierRendu.current = false
      return
    }
    titreRef.current?.focus({ preventScroll: true })
  }, [step])

  function set<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  function aller(vers: Step) {
    clearTimeout(minuteur.current)
    if (vers === 3) setCommuneEtape3(!fieldsRef.current.ville.trim())
    setManque(false)
    setStep(vers)
  }

  function avancerBientot(vers: Step) {
    clearTimeout(minuteur.current)
    minuteur.current = setTimeout(() => aller(vers), AVANCE_MS)
  }

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!fields.nom.trim() || !fields.telephone.trim() || !fields.ville.trim()) {
      setManque(true)
      if (!fields.ville.trim()) setCommuneEtape3(true)
      return
    }
    setManque(false)
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, company: '' }),
      })
      if (!res.ok) throw new Error()
      window.location.href = '/merci'
    } catch {
      setStatus('error')
    }
  }

  const Titre = hero ? 'h2' : 'h3'
  const titreClasses = `mt-3 font-display font-semibold leading-tight text-white outline-none ${equilibre} ${hero ? 'text-[1.4rem]' : 'text-xl md:text-2xl'}`

  return (
    <div
      className={`relative rounded-[3px] bg-dark text-center text-white shadow-[0_24px_60px_-20px_rgb(0_0_0/0.55)] lg:text-left ${hero ? 'p-5 md:p-7' : 'p-6 md:p-8'}`}
      role="region"
      aria-label="Formulaire de demande"
    >
      <style>{CSS_FORM}</style>
      <form onSubmit={submit} noValidate>
        {/* Piège à robots, invisible pour les humains. */}
        <div className="hidden" aria-hidden="true">
          <input type="text" name="company" tabIndex={-1} autoComplete="off" readOnly />
        </div>

        <Etapes step={step} onRetour={() => aller((step - 1) as Step)} />

        <div key={step} className="lf-etape">
          {step === 1 && (
            <fieldset>
              <legend className="w-full">
                <Titre ref={titreRef} tabIndex={-1} className={titreClasses}>
                  Quelle est la panne ?
                </Titre>
              </legend>
              <div className={`mt-4 grid grid-cols-2 gap-2 ${hero ? '' : 'md:grid-cols-4'}`}>
                {TYPES.map(({ id, label, Icon }) => (
                  <Choix
                    key={id}
                    name="probleme"
                    value={id}
                    label={label}
                    checked={fields.probleme === id}
                    onChoose={() => {
                      set('probleme', id)
                      avancerBientot(2)
                    }}
                    icone={<Icon />}
                  />
                ))}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <div>
              <Titre ref={titreRef} tabIndex={-1} className={titreClasses}>
                Où, et pour quand ?
              </Titre>
              <div className="mt-4">
                <label htmlFor={`ville-${variante}`} className={etiquette}>
                  Commune ou code postal
                </label>
                <input
                  id={`ville-${variante}`}
                  name="ville"
                  type="text"
                  autoComplete="postal-code"
                  placeholder="Annecy, Seynod, 74000"
                  value={fields.ville}
                  onChange={(e) => set('ville', e.target.value)}
                  className={champ}
                />
              </div>
              <fieldset className="mt-4">
                <legend className={etiquette}>Votre urgence</legend>
                <div className="grid grid-cols-2 gap-2">
                  {URGENCES.map((u) => (
                    <Choix
                      key={u}
                      name="urgence"
                      value={u}
                      label={u}
                      compacte
                      checked={fields.urgence === u}
                      onChoose={() => {
                        set('urgence', u)
                        avancerBientot(3)
                      }}
                    />
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {step === 3 && (
            <div>
              <Titre ref={titreRef} tabIndex={-1} className={titreClasses}>
                Comment vous joindre ?
              </Titre>
              <div className="mt-4 space-y-3">
                {communeEtape3 && (
                  <div>
                    <label htmlFor={`ville3-${variante}`} className={etiquette}>
                      Commune ou code postal
                    </label>
                    <input
                      id={`ville3-${variante}`}
                      name="ville"
                      type="text"
                      autoComplete="postal-code"
                      required
                      value={fields.ville}
                      onChange={(e) => set('ville', e.target.value)}
                      className={champ}
                    />
                  </div>
                )}
                <div className={`grid gap-3 ${hero ? '' : 'sm:grid-cols-2'}`}>
                  <div>
                    <label htmlFor={`nom-${variante}`} className={etiquette}>
                      Nom
                    </label>
                    <input
                      id={`nom-${variante}`}
                      name="nom"
                      type="text"
                      required
                      autoComplete="name"
                      value={fields.nom}
                      onChange={(e) => set('nom', e.target.value)}
                      className={champ}
                    />
                  </div>
                  <div>
                    <label htmlFor={`telephone-${variante}`} className={etiquette}>
                      Téléphone
                    </label>
                    <input
                      id={`telephone-${variante}`}
                      name="telephone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      value={fields.telephone}
                      onChange={(e) => set('telephone', e.target.value)}
                      className={champ}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor={`email-${variante}`} className={etiquette}>
                    Email {facultatif}
                  </label>
                  <input
                    id={`email-${variante}`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={(e) => set('email', e.target.value)}
                    className={champ}
                  />
                </div>
                {!hero && (
                  <div>
                    <label htmlFor={`message-${variante}`} className={etiquette}>
                      Précisions {facultatif}
                    </label>
                    <textarea
                      id={`message-${variante}`}
                      name="message"
                      rows={3}
                      value={fields.message}
                      onChange={(e) => set('message', e.target.value)}
                      className={`${champ} resize-none`}
                    />
                  </div>
                )}
              </div>

              {manque && (
                <p role="alert" className="mt-3 text-sm font-medium text-accent">
                  Il manque {!fields.ville.trim() ? 'la commune, ' : ''}votre nom ou votre téléphone.
                </p>
              )}
              {status === 'error' && (
                <p role="alert" className="mt-3 text-sm font-medium text-accent">
                  L&apos;envoi a échoué. Appelez-nous au {siteConfig.phoneDisplay}.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center rounded-[3px] bg-accent px-6 text-[15px] font-bold text-dark transition hover:bg-accent/90 disabled:cursor-wait disabled:opacity-70"
              >
                {status === 'sending' ? 'Envoi en cours' : 'Être rappelé'}
              </button>
              <p className={`mt-3 text-xs leading-relaxed text-white/55 ${equilibre}`}>
                Vos données servent à vous rappeler, jamais revendues.{' '}
                <a href="/politique-confidentialite" className="text-white/70 underline hover:text-white">
                  Confidentialité
                </a>
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}

export default LeadForm
