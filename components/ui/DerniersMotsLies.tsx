'use client'

/**
 * Jamais un mot seul en dernière ligne (10/10/2026, contrôle check-lignes).
 * `text-wrap: balance` ne joue que jusqu'à 6 lignes et `pretty` laisse encore passer
 * des mots seuls sur les longs paragraphes au téléphone : on lie donc les deux derniers
 * mots de chaque texte par une espace insécable. Le texte servi dans le HTML ne change
 * pas (mêmes mots, mêmes expressions), seule la coupure de fin de ligne est tenue.
 */

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const CIBLES = 'main :is(p, li, dt, dd, th, td, h1, h2, h3, h4, summary, figcaption, blockquote, [data-titre])'
const INSECABLE = ' '
/** Remplace par une insécable l'espace qui précède le dernier mot du texte de `el`,
 *  quitte à remonter d'un nœud (dernier mot seul dans un lien, un gras, un span). */
function lier(el: Element) {
  const marcheur = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const textes: Text[] = []
  for (let n = marcheur.nextNode(); n; n = marcheur.nextNode()) textes.push(n as Text)
  let i = textes.length - 1
  while (i >= 0 && !(textes[i].nodeValue ?? '').trim()) i--
  if (i < 0) return
  let motVu = false
  for (; i >= 0; i--) {
    const v = textes[i].nodeValue ?? ''
    // Avant le dernier mot : la dernière espace du texte sans ses espaces de fin ;
    // une fois le mot passé : n'importe quelle espace, même en bout de nœud.
    const zone = motVu ? v : v.trimEnd()
    const k = zone.lastIndexOf(' ')
    if (k > 0 || (motVu && k === 0)) {
      const debut = zone.lastIndexOf(' ', k - 1) + 1
      const fin = v.slice(debut, k) + INSECABLE + v.slice(k + 1)
      textes[i].nodeValue = v.slice(0, debut) + fin
      // Les deux derniers mots ne se coupent pas non plus à leur trait d'union
      // (« intervenez-vous ») : ils passent dans un span insécable, texte inchangé.
      const parent = textes[i].parentElement
      if (fin.includes('-') && parent) {
        // Dans un parent en flex ou grid (question de FAQ), le span deviendrait une colonne
        // à part : tout le texte passe d'abord dans un span unique.
        if (/flex|grid/.test(getComputedStyle(parent).display)) {
          const ligne = document.createElement('span')
          textes[i].replaceWith(ligne)
          ligne.appendChild(textes[i])
        }
        const reste = textes[i].splitText(debut)
        const bloc = document.createElement('span')
        bloc.style.whiteSpace = 'nowrap'
        reste.replaceWith(bloc)
        bloc.appendChild(reste)
      }
      return
    }
    if (zone.trim()) motVu = true
  }
}

export default function DerniersMotsLies() {
  const chemin = usePathname()
  useEffect(() => {
    document.querySelectorAll(CIBLES).forEach((el) => {
      if (el.hasAttribute('data-lie') || el.closest('svg,form,[aria-hidden="true"]') || el.querySelector('p,li,ul,ol,div')) return
      el.setAttribute('data-lie', '')
      lier(el)
    })
  }, [chemin])
  return null
}
