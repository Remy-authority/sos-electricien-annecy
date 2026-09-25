import ServiceTableauNormes from './ServiceTableauNormes'
import ServiceDiagnosticObligatoire from './ServiceDiagnosticObligatoire'
import ServiceRecherchePanne from './ServiceRecherchePanne'

/**
 * Choix du schéma sourcé d'une page PRESTATION (règle écrite ici, pas dans le contenu).
 *
 *  - diagnostic / mise en conformité      → (c) diagnostic obligatoire, puis (b) tableau
 *  - recherche de panne, urgence dépannage → (d) étapes de recherche de panne, puis (b) tableau
 *  - toute autre prestation (tableau, rénovation, installation neuve, prestation future)
 *                                          → (b) tableau aux normes, puis (d) étapes de panne
 *
 * Le premier de la liste est LE schéma de la page ; le suivant ne sert que si la page a
 * tant de blocs sans photo qu'il faut un second visuel pour tenir la règle « jamais plus
 * de 2 blocs de texte d'affilée sans visuel » (Rémy, 23/09/2026).
 */
export type SchemaKey = 'tableau' | 'diagnostic' | 'panne'

export function serviceSchemaKeys(slug: string): SchemaKey[] {
  if (slug.includes('diagnostic') || slug.includes('conformite')) return ['diagnostic', 'tableau']
  if (slug.includes('panne') || slug.includes('urgence') || slug.includes('depannage')) return ['panne', 'tableau']
  return ['tableau', 'panne']
}

export default function ServiceSchema({ schema }: { schema: SchemaKey }) {
  if (schema === 'diagnostic') return <ServiceDiagnosticObligatoire />
  if (schema === 'panne') return <ServiceRecherchePanne />
  return <ServiceTableauNormes />
}
