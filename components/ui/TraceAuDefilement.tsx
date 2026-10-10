'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useAnimeEnVue } from '@/lib/anime-en-vue'

/**
 * Enveloppe qui pose `data-etat` sur son bloc : « fixe » au rendu serveur (tout
 * visible, robots et sans JavaScript), « cache » au montage si le bloc est encore
 * sous l'écran, puis « vu » quand il y entre. Le CSS du bloc fait le reste
 * (traits qui se tracent, aplats qui se posent). « Réduire les animations » :
 * on reste en « fixe ». `boucles` : le bloc a des animations en boucle, jouées
 * seulement à l'écran (useAnimeEnVue).
 */
export function TraceAuDefilement({ className, boucles = false, children }: { className?: string; boucles?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [etat, setEtat] = useState<'fixe' | 'cache' | 'vu'>('fixe')
  useAnimeEnVue(ref, boucles)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return
    setEtat('cache')
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEtat('vu')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -18% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} data-etat={etat} data-anime={boucles ? '' : undefined} className={className}>
      {children}
    </div>
  )
}
