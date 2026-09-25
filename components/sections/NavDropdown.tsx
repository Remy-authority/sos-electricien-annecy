'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export interface NavLien {
  href: string
  label: string
}

/**
 * Menu déroulant de l'en-tête (ordinateur).
 * S'ouvre au SURVOL (CSS `group-hover`) et au CLIC ou au clavier (Entrée / Espace sur
 * le bouton, état React). Échap le referme et rend le focus au bouton ; il se referme
 * aussi quand le focus ou un clic quitte le menu.
 * Le panneau est en `absolute top-full` sous le bouton : jamais de `fixed` sous un
 * en-tête `backdrop-blur` (le flou crée un bloc conteneur qui casse le positionnement).
 * Le `pt-2` du panneau comble l'espace bouton-panneau : le survol ne se perd pas.
 */
export default function NavDropdown({
  label,
  liens,
  toutHref,
  toutLabel,
}: {
  label: string
  liens: NavLien[]
  toutHref: string
  toutLabel: string
}) {
  const [ouvert, setOuvert] = useState(false)
  const racine = useRef<HTMLDivElement>(null)
  const bouton = useRef<HTMLButtonElement>(null)
  const id = `menu-${label.toLowerCase().replace(/[^a-z]/g, '')}`

  useEffect(() => {
    if (!ouvert) return
    const clicDehors = (e: MouseEvent) => {
      if (racine.current && !racine.current.contains(e.target as Node)) setOuvert(false)
    }
    document.addEventListener('mousedown', clicDehors)
    return () => document.removeEventListener('mousedown', clicDehors)
  }, [ouvert])

  return (
    <div
      ref={racine}
      className="group relative"
      onKeyDown={(e) => {
        if (e.key === 'Escape' && ouvert) {
          setOuvert(false)
          bouton.current?.focus()
        }
      }}
      onBlur={(e) => {
        if (!racine.current?.contains(e.relatedTarget as Node)) setOuvert(false)
      }}
    >
      <button
        ref={bouton}
        type="button"
        aria-haspopup="true"
        aria-expanded={ouvert}
        aria-controls={id}
        onClick={() => setOuvert((o) => !o)}
        className="flex items-center gap-1 rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
          className={`transition-transform ${ouvert ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      <div
        id={id}
        className={`absolute left-0 top-full z-10 w-64 pt-2 transition-all duration-150 group-hover:visible group-hover:opacity-100 ${
          ouvert ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <ul className="rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
          {liens.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOuvert(false)}
                className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-primary/5 hover:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="mt-1 border-t border-slate-100 pt-1">
            <Link
              href={toutHref}
              onClick={() => setOuvert(false)}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold text-accent-deep hover:bg-accent/10"
            >
              {toutLabel}
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
