import brut from '@/content/tarifs.json'

/**
 * Données de la page /tarifs (content/tarifs.json), typées.
 * Aucun prix n'est écrit dans le code : tout chiffre vient du JSON, avec sa clé de source.
 * Le relevé complet (URL, phrase exacte lue, date) est dans ../tasks/.maj-annecy/tarifs-sources.json.
 */
export type Source = { nom: string; titre: string; url: string }
export type Releve = { fourchette: string; unite: string; source: string }
export type LignePrix = { poste: string; lien?: string; releves: Releve[] }
export type Bloc = { titre: string; corps: string[] }
export type Cas = {
  libelle: string
  titre: string
  lignes: { libelle: string; valeur: string; source: string }[]
  calcul: string
  total: string
  note?: string
  noteSource?: string
}
export type Tarifs = {
  metaTitle: string
  metaDescription: string
  h1: string
  badge: string
  image: string
  imageAlt: string
  releve: string
  intro: string
  sources: Record<string, Source>
  tableau: { titre: string; chapo: string; lignes: LignePrix[] }
  blocs: Record<'horaire' | 'urgence' | 'tableau' | 'normes' | 'diagnostic' | 'renovation' | 'neuf' | 'devis' | 'tva', Bloc>
  cas: { titre: string; chapo: string; items: Cas[] }
  formulaire: { surtitre: string; titre: string; texte: string }
  faq: { q: string; a: string }[]
}

/**
 * Espaces insécables typographiques, posés au rendu (le JSON reste lisible) : un montant
 * ou un pourcentage ne se coupe jamais en fin de ligne sur téléphone (« 2 / 500 € »).
 */
function insecable(t: string): string {
  return t
    .replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u202f')
    .replace(/(\d) (€|%|ans\b|m²)/g, '$1\u00a0$2')
    .replace(/NF C 15-100/g, 'NF\u00a0C\u00a015\u2011100')
    .replace(/« /g, '«\u00a0')
    .replace(/ »/g, '\u00a0»')
    .replace(/ ([:;?!])/g, '\u00a0$1')
}
function profond<T>(v: T): T {
  if (typeof v === 'string') return insecable(v) as T
  if (Array.isArray(v)) return v.map(profond) as T
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === 'url' || k.startsWith('meta') ? x : profond(x)])) as T
  }
  return v
}

export const tarifs = profond(brut as Tarifs)

/** Sources demandées, dans l'ordre, sans doublon ; une clé inconnue casse le build. */
export function sourcesDe(cles: string[]): (Source & { cle: string })[] {
  const vues = new Set<string>()
  return cles
    .filter((c) => (vues.has(c) ? false : (vues.add(c), true)))
    .map((c) => {
      const s = tarifs.sources[c]
      if (!s) throw new Error(`tarifs.json : source inconnue « ${c} »`)
      return { cle: c, ...s }
    })
}
