import { useEffect, type RefObject } from 'react'

/**
 * Animations en boucle jouées seulement à l'écran (11/10/2026, vitesse mobile #R68).
 * Une icône qui clignote hors écran fait quand même recalculer la page à chaque image :
 * sur l'accueil, une trentaine de boucles (formulaire, carte, mur, chantier) coûtaient
 * trois fois le travail du navigateur et 8 points de vitesse. Le bloc porte `data-anime`
 * dès le rendu serveur (boucles en pause, règle dans globals.css) et `data-en-vue` tant
 * qu'il est à l'écran. Sans IntersectionObserver, tout joue. `cle` : à changer quand le
 * composant remplace son bloc par un autre (autre rendu), pour observer le nouveau.
 */
export function useAnimeEnVue(ref: RefObject<Element | null>, actif = true, cle?: unknown) {
  useEffect(() => {
    const el = ref.current
    if (!actif || !el) return
    if (typeof IntersectionObserver === 'undefined') {
      el.setAttribute('data-en-vue', '')
      return
    }
    const io = new IntersectionObserver(([e]) => el.toggleAttribute('data-en-vue', e.isIntersecting), { rootMargin: '12% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, actif, cle])
}
