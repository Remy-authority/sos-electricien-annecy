import { sourcesDe, tarifs } from './donnees'

/** Lien vers une source extérieure : nouvel onglet, sans transmettre d'autorité. */
export function LienSource({ url, children, className = '' }: { url: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={url} target="_blank" rel="nofollow noopener noreferrer" className={`underline underline-offset-2 ${className}`}>
      {children}
    </a>
  )
}

/** Ligne courte « Sources : A, B, consultées le … » posée sous un tableau ou un schéma. */
export function SourcesLigne({ cles, className = '' }: { cles: string[]; className?: string }) {
  // Un même site cité pour deux pages n'apparaît qu'une fois ici (la liste complète, en
  // bas de page, donne chaque page).
  const noms = new Set<string>()
  const liste = sourcesDe(cles).filter((s) => (noms.has(s.nom) ? false : (noms.add(s.nom), true)))
  if (!liste.length) return null
  return (
    <p className={`text-xs leading-relaxed text-slate-500 ${className}`}>
      {liste.length > 1 ? 'Sources' : 'Source'} :{' '}
      {liste.map((s, i) => (
        <span key={s.cle}>
          {i > 0 && ', '}
          <LienSource url={s.url} className="text-slate-600 hover:text-primary">
            {s.nom}
          </LienSource>
        </span>
      ))}
      , consultée{liste.length > 1 ? 's' : ''} le {tarifs.releve}.
    </p>
  )
}

/** Liste complète des sources, en bas de page. */
export default function SourcesListe() {
  const liste = sourcesDe(Object.keys(tarifs.sources))
  return (
    <section aria-labelledby="sources-prix" className="mt-14 border-t border-slate-200 pt-8 text-center lg:text-left">
      <h2 id="sources-prix" className="text-2xl">
        Sources des prix, consultées le {tarifs.releve}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Chaque fourchette de cette page est recopiée d'une de ces pages publiques, bornes inchangées. Une source qui ne
        donnait pas le chiffre n'a pas été retenue.
      </p>
      <ul className="mt-5 space-y-3 text-left text-sm">
        {liste.map((s) => (
          <li key={s.cle} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <span className="font-semibold text-slate-800">{s.nom}</span>
            <span className="text-slate-600"> : </span>
            <LienSource url={s.url} className="break-words text-primary">
              « {s.titre} »
            </LienSource>
            <span className="text-slate-500">, consultée le {tarifs.releve}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
