import Link from 'next/link'
import { tarifs } from './donnees'
import { LienSource, SourcesLigne } from './Sources'

/**
 * Tableau des prix poste par poste (poste, fourchette, unité, source).
 * Ordinateur : vrai tableau, le poste occupe autant de lignes qu'il a de relevés.
 * Téléphone : une carte par poste, relevés empilés, rien ne déborde à 390 px.
 */
export default function TableauPrix() {
  const { lignes } = tarifs.tableau
  const cles = lignes.flatMap((l) => l.releves.map((r) => r.source))

  return (
    <>
      {/* Ordinateur et tablette large */}
      <div className="mt-6 hidden overflow-hidden rounded-card border border-slate-200 bg-white shadow-card md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold">Poste</th>
              <th scope="col" className="px-4 py-3 font-semibold">Fourchette observée</th>
              <th scope="col" className="px-4 py-3 font-semibold">Unité</th>
              <th scope="col" className="px-4 py-3 font-semibold">Source</th>
            </tr>
          </thead>
          <tbody>
            {lignes.map((l, li) =>
              l.releves.map((r, ri) => (
                <tr
                  key={`${l.poste}-${ri}`}
                  className={`${ri === 0 ? 'border-t border-slate-200' : 'border-t border-dashed border-slate-100'} ${li % 2 ? 'bg-light/60' : ''}`}
                >
                  {ri === 0 && (
                    <th scope="row" rowSpan={l.releves.length} className="w-[30%] px-4 py-3 align-top font-semibold text-slate-900">
                      {l.lien ? (
                        <Link href={l.lien} className="text-primary hover:underline">
                          {l.poste}
                        </Link>
                      ) : (
                        l.poste
                      )}
                    </th>
                  )}
                  <td className="whitespace-nowrap px-4 py-3 align-top font-semibold text-slate-900">{r.fourchette}</td>
                  <td className="px-4 py-3 align-top text-slate-600">{r.unite}</td>
                  <td className="px-4 py-3 align-top">
                    <LienSource url={tarifs.sources[r.source].url} className="text-slate-600 hover:text-primary">
                      {tarifs.sources[r.source].nom}
                    </LienSource>
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </div>

      {/* Téléphone : cartes empilées */}
      <ul className="mt-6 space-y-3 md:hidden">
        {lignes.map((l) => (
          <li key={l.poste} className="rounded-card border border-slate-200 bg-white px-3 py-4 text-center shadow-sm">
            <p className="font-display text-lg font-semibold leading-snug text-primary">
              {l.lien ? (
                <Link href={l.lien} className="text-primary">
                  {l.poste}
                </Link>
              ) : (
                l.poste
              )}
            </p>
            <ul className="mt-3 space-y-1.5">
              {l.releves.map((r, i) => (
                <li key={i} className="rounded-lg bg-light px-3 py-2">
                  <p className="text-slate-600">
                    <span className="text-base font-bold text-slate-900">{r.fourchette}</span>{' '}
                    <span className="text-sm">{r.unite}</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    Source :{' '}
                    <LienSource url={tarifs.sources[r.source].url} className="hover:text-primary">
                      {tarifs.sources[r.source].nom}
                    </LienSource>
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <SourcesLigne cles={cles} className="mt-4 text-center lg:text-left" />
    </>
  )
}
