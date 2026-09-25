'use client'

import { useState } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/config/site.config'

interface NavLien {
  href: string
  label: string
}

/** Un sous-menu dépliable : 3 liens + « voir tout » (miroir des menus ordinateur). */
interface Groupe {
  label: string
  liens: NavLien[]
  tout: NavLien
}

export default function HeaderNavMobile({ groupes, blogEnabled }: { groupes: Groupe[]; blogEnabled: boolean }) {
  const [open, setOpen] = useState(false)
  const [deplie, setDeplie] = useState<string | null>(null)

  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg text-slate-700 transition hover:bg-slate-100 lg:hidden"
      >
        <span className={`block h-0.5 w-5 rounded bg-current transition-all duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`block h-0.5 w-5 rounded bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 w-5 rounded bg-current transition-all duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>

      {open && (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-slate-200 bg-white shadow-lg lg:hidden"
        >
          <nav aria-label="Navigation mobile" className="container-site py-4">
            <ul className="space-y-1">
              <li>
                <Link href="/" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-medium text-slate-700 hover:bg-primary/5 hover:text-primary">
                  Accueil
                </Link>
              </li>
              {groupes.map((g) => {
                const ouvert = deplie === g.label
                const idListe = `mobile-nav-${g.label.toLowerCase().replace(/[^a-z]/g, '')}`
                return (
                  <li key={g.label}>
                    <button
                      type="button"
                      aria-expanded={ouvert}
                      aria-controls={idListe}
                      onClick={() => setDeplie(ouvert ? null : g.label)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left font-medium text-slate-700 hover:bg-primary/5 hover:text-primary"
                    >
                      {g.label}
                      <svg
                        className={`h-4 w-4 shrink-0 transition-transform ${ouvert ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    <ul id={idListe} hidden={!ouvert} className="mb-1 ml-3 border-l border-slate-200 pl-2">
                      {g.liens.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-primary/5 hover:text-primary"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={g.tout.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm font-semibold text-accent-deep hover:bg-accent/10"
                        >
                          {g.tout.label} →
                        </Link>
                      </li>
                    </ul>
                  </li>
                )
              })}
              {blogEnabled && (
                <li>
                  <Link href="/conseils" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-medium text-slate-700 hover:bg-primary/5 hover:text-primary">
                    Conseils
                  </Link>
                </li>
              )}
              <li>
                <Link href="/contact" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-medium text-slate-700 hover:bg-primary/5 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-4 border-t border-slate-100 pt-4">
              <a
                href={`tel:${siteConfig.phone}`}
                className="btn-accent w-full justify-center text-base"
                onClick={() => setOpen(false)}
              >
                <PhoneIcon />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  )
}
