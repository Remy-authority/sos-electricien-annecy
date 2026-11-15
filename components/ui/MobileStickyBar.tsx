'use client'

import type { MouseEvent } from 'react'
import { siteConfig } from '@/config/site.config'

/**
 * MobileStickyBar, barre fixe en bas d'écran sur téléphone (md:hidden).
 * À gauche l'appel, le numéro écrit en entier ; à droite « Devis gratuit », qui ramène au
 * formulaire de la page (bloc 1 de l'accueil, page contact, bloc du bas des pages intérieures) ;
 * une page sans formulaire mène à celui de la page contact (16/11/2026, #R84).
 */
export default function MobileStickyBar() {
  const versFormulaire = (e: MouseEvent<HTMLAnchorElement>) => {
    const cible = document.getElementById('formulaire') ?? document.getElementById('devis')
    if (!cible) return
    e.preventDefault()
    cible.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-slate-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.12)] md:hidden"
      role="complementary"
      aria-label="Actions rapides"
    >
      <a
        href={`tel:${siteConfig.phone}`}
        className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap bg-accent py-4 text-[13.5px] font-bold text-dark active:bg-accent/90"
        aria-label={`Appeler le ${siteConfig.phoneDisplay}`}
        data-cta="phone-sticky"
      >
        <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
        </svg>
        {siteConfig.phoneDisplay}
      </a>
      <div className="w-px bg-white/20" aria-hidden="true" />
      <a
        href="/contact#formulaire"
        onClick={versFormulaire}
        className="flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap bg-primary py-4 text-[13.5px] font-bold text-white active:bg-primary-dark"
        data-cta="devis-sticky"
      >
        <svg className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Devis gratuit
      </a>
    </div>
  )
}
