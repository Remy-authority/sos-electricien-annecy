import type { Metadata } from 'next'
import legal from '@/content/legal.json'
import { siteConfig } from '@/config/site.config'
import { buildMetadata } from '@/lib/seo'

/*
 * Mentions légales, conformité droit FR (éditeur identifié).
 * GABARIT piloté par content/legal.json. Les champs vides s'affichent « À compléter »
 * (données éditeur / SIREN à fournir par Rémy avant la prod, Gate C).
 * INDEXABLE (signal E-E-A-T, cf. brief SEO §7).
 */
export const metadata: Metadata = buildMetadata({
  title: 'Mentions légales',
  description: `Mentions légales de ${siteConfig.businessName}.`,
  path: '/mentions-legales',
})

// Affiche la valeur, ou un marqueur « À compléter » si vide (jamais de valeur factice).
function V({ children }: { children?: string }) {
  const val = (children || '').trim()
  return val ? <>{val}</> : <em className="text-amber-700">À compléter</em>
}

export default function MentionsLegales() {
  const e = legal.editeur
  // Assurance : bloc affiché UNIQUEMENT si une police est réellement détenue.
  // Rémy a confirmé le 26/07/2026 qu'il n'y a pas de décennale, et l'éditeur du site
  // n'est pas le prestataire des interventions : on n'annonce donc aucune couverture.
  // Les références de l'artisan locataire seront renseignées dans content/legal.json
  // à la location, ce qui fera réapparaître le bloc sans toucher au code.
  const a = legal.assurance
  const hasAssurance = Boolean(a.assureur.trim() || a.police.trim())
  return (
    <section className="container-site section max-w-3xl">
      <h1 className="text-3xl md:text-4xl">Mentions légales</h1>

      <div className="mt-8 space-y-8 text-slate-700">
        <section>
          <h2 className="text-xl">Éditeur du site</h2>
          <ul className="mt-2 space-y-3">
            <li><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Dénomination</p><p><V>{e.raisonSociale}</V></p></li>
            <li><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Forme juridique</p><p><V>{e.formeJuridique}</V></p></li>
            <li><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Numéro d'immatriculation</p><p><V>{e.numeroImmatriculation}</V>, <V>{e.registre}</V></p></li>
            <li><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Siège social</p><p><V>{e.adresse}</V></p></li>
            <li><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Directeur de la publication</p><p><V>{e.directeurPublication}</V></p></li>
            <li><p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Contact</p><p>{e.emailContact} · {e.telephone}</p></li>
          </ul>
        </section>

        {hasAssurance && (
          <section>
            <h2 className="text-xl">Assurance professionnelle</h2>
            <p className="mt-2">
              <strong>Assureur</strong> <V>{a.assureur}</V>, <strong>police n°</strong> <V>{a.police}</V>
            </p>
          </section>
        )}

        <section>
          <h2 className="text-xl">Hébergeur</h2>
          <p className="mt-2">
            {legal.hebergeur.nom}, {legal.hebergeur.adresse}.{' '}
            <a href={legal.hebergeur.site} className="underline" rel="noopener noreferrer" target="_blank">
              {legal.hebergeur.site}
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-xl">Propriété intellectuelle</h2>
          <p className="mt-2">
            Les textes et images de ce site sont des œuvres couvertes par le droit d'auteur.
            Sauf mention contraire, leur reproduction, même partielle, exige l'accord écrit de
            l'éditeur.
          </p>
        </section>

        <section>
          <h2 className="text-xl">Données personnelles</h2>
          <p className="mt-2">
            Voir notre{' '}
            <a href="/politique-confidentialite" className="underline">politique de confidentialité</a>.
          </p>
        </section>
      </div>
    </section>
  )
}
