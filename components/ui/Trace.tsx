'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

/**
 * Enveloppe d'un dessin au trait (classe `.trace` de globals.css) : tout est visible au
 * rendu serveur, masqué au montage, puis tracé quand le bloc entre à l'écran (ou juste
 * après le chargement s'il y est déjà). « Réduire les animations » : rien ne bouge.
 */
export function Trace({ className = '', style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [etat, setEtat] = useState<'fixe' | 'cache' | 'vu'>('fixe')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setEtat('cache')
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      const id = window.setTimeout(() => setEtat('vu'), 60)
      return () => window.clearTimeout(id)
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEtat('vu')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} data-etat={etat} className={`trace ${className}`} style={style}>
      {children}
    </div>
  )
}

/** Trait qui se trace ; `r` = rang dans le dessin. */
export function T({ d, r = 0, fin = false, couleur, epais }: { d: string; r?: number; fin?: boolean; couleur?: string; epais?: number }) {
  return (
    <path
      d={d}
      pathLength={1}
      data-t=""
      stroke={couleur}
      strokeWidth={epais ?? (fin ? 1.1 : undefined)}
      strokeOpacity={fin ? 0.6 : undefined}
      style={{ '--d': `${r * 110}ms` } as CSSProperties}
    />
  )
}

/** Aplat qui se pose après le trait. */
export function F({ d, r = 0, couleur = '#FCD680', opacite = 1 }: { d: string; r?: number; couleur?: string; opacite?: number }) {
  return <path d={d} fill={couleur} fillOpacity={opacite} stroke="none" data-f="" style={{ '--d': `${r * 110}ms` } as CSSProperties} />
}
