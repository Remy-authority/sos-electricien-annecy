import type { ReactNode } from 'react'

/**
 * Cadre commun des schémas sourcés (pages prestations ET pages communes).
 *
 * Règle Rémy du 23/09/2026 : un schéma explique un FAIT SOURCÉ de la page, jamais un
 * décor. Chaque schéma porte donc un titre court, un dessin simple (SVG inline, couleurs
 * par tokens CSS via les classes Tailwind `fill-primary`, `stroke-accent`…, aucune
 * animation) et, dessous, la source que l'on a ouverte soi-même avec sa date de
 * consultation. Le titre n'est ni un H2 ni un H3 : il ne casse pas la hiérarchie des
 * blocs de la page (check-blocs-pages compte les H2 de contenu).
 */
export interface SchemaSource {
  /** Nom lisible de la source (organisme + page). */
  label: string
  url: string
  /** Date de consultation, en toutes lettres. */
  consulted: string
}

export default function ServiceSchemaFrame({
  id,
  title,
  sources,
  children,
  note,
}: {
  id: string
  title: string
  sources: SchemaSource[]
  children: ReactNode
  note?: ReactNode
}) {
  return (
    <figure
      data-schema={id}
      className="not-prose mx-auto my-10 w-full max-w-2xl rounded-card border border-slate-200 bg-white p-3 shadow-card sm:p-7"
    >
      <div className="text-center font-display text-lg font-semibold leading-snug text-primary sm:text-xl lg:text-left">
        {title}
      </div>
      <div className="mt-5">{children}</div>
      <figcaption className="mt-5 space-y-1 border-t border-slate-100 pt-3 text-center text-xs leading-relaxed text-slate-500 lg:text-left">
        {note && <div>{note}</div>}
        {sources.map((s) => (
          <div key={s.url}>
            Source :{' '}
            <a
              href={s.url}
              target="_blank"
              rel="nofollow noopener"
              className="font-medium text-primary underline underline-offset-2"
            >
              {s.label}
            </a>
            , consulté le {s.consulted}.
          </div>
        ))}
      </figcaption>
    </figure>
  )
}
