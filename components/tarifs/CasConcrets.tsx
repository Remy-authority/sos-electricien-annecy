import { tarifs } from './donnees'
import { SourcesLigne } from './Sources'

/**
 * Cas concrets : chaque total est la simple somme (ou le produit) des fourchettes
 * sourcées affichées dans la carte, calcul écrit en clair. Scénarios types, jamais
 * présentés comme des chantiers réalisés.
 */
export default function CasConcrets() {
  const { titre, chapo, items } = tarifs.cas
  return (
    <section aria-labelledby="cas-concrets" className="mt-14">
      <h2 id="cas-concrets" className="text-center text-2xl lg:text-left">
        {titre}
      </h2>
      <p className="mt-3 text-center leading-relaxed text-slate-600 lg:text-left">{chapo}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((c) => (
          <article key={c.titre} className="card flex flex-col !p-5 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent-deep">{c.libelle}</p>
            <h3 className="mt-1 text-lg leading-snug">{c.titre}</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {c.lignes.map((l) => (
                <li key={l.libelle} className="rounded-lg bg-light px-3 py-2">
                  <span className="block text-slate-600">{l.libelle}</span>
                  <span className="block font-semibold text-slate-900">{l.valeur}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate-500">Calcul : {c.calcul}</p>
            <p className="mt-auto pt-3 font-display text-2xl font-semibold text-primary">{c.total}</p>
            {c.note && <p className="mt-2 text-xs leading-relaxed text-slate-500">{c.note}</p>}
            <SourcesLigne cles={[...c.lignes.map((l) => l.source), ...(c.noteSource ? [c.noteSource] : [])]} className="mt-2" />
          </article>
        ))}
      </div>
    </section>
  )
}
