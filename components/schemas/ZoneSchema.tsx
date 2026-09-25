import ZoneFusionAnnecy, { COMMUNES_FUSIONNEES } from './ZoneFusionAnnecy'
import ServiceSchema, { type SchemaKey } from './ServiceSchema'

/**
 * Choix du schéma sourcé d'une page COMMUNE (règle écrite ici, pas dans le contenu).
 *
 *  - commune déléguée de la commune nouvelle d'Annecy (Annecy-le-Vieux, Cran-Gevrier,
 *    Meythet, Pringy, Seynod)  → (a) « Annecy, commune nouvelle depuis 2017 »
 *  - toute autre commune        → (b) « Un tableau électrique aux normes »
 *
 * Second schéma, seulement si une page a assez de blocs pour en exiger un troisième
 * visuel : (b) pour les communes déléguées, (d) étapes de panne pour les autres.
 */
export type ZoneSchemaKey = 'fusion' | SchemaKey

export function zoneSchemaKeys(slug: string): ZoneSchemaKey[] {
  return COMMUNES_FUSIONNEES.includes(slug) ? ['fusion', 'tableau'] : ['tableau', 'panne']
}

export default function ZoneSchema({ schema, zoneSlug }: { schema: ZoneSchemaKey; zoneSlug: string }) {
  if (schema === 'fusion') return <ZoneFusionAnnecy current={zoneSlug} />
  return <ServiceSchema schema={schema} />
}
