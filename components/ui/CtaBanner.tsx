import { siteConfig } from '@/config/site.config'
import AccentWord from './AccentWord'
import LeadForm from './LeadForm'
import { Trace } from './Trace'

/**
 * Bloc de demande en bas des pages intérieures (10/10/2026). Remplace l'ancienne bande
 * sombre avec le numéro de téléphone au-dessus du pied de page (refus de Rémy : numéro
 * répété, bande d'appel sombre). Fond clair, le formulaire à étapes de l'accueil, les
 * mêmes champs envoyés. Ancre `#devis` : l'encart des articles y mène.
 */
export default function CtaBanner({
  title = `Une panne électrique à ${siteConfig.city} ?`,
  subtitle = 'Décrivez-la en trois étapes, nous revenons vers vous pour fixer le diagnostic.',
  /** Mot du titre mis en valeur (serif italique). Défaut : la ville de base.
   *  Les pages commune passent le nom de la commune à la place. */
  accentWord = siteConfig.city,
}: {
  title?: string
  subtitle?: string
  accentWord?: string
}) {
  return (
    <section id="devis" className="section scroll-mt-20 bg-slate-100" aria-labelledby="devis-bas">
      <div className="container-site">
        <Trace className="apparait mx-auto max-w-2xl">
          <div className="mb-6 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent-deep">Devis gratuit</p>
            <h2 id="devis-bas" className="text-balance text-2xl md:text-3xl">
              <AccentWord text={title} word={accentWord} className="accent-serif text-accent-deep" />
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-balance text-sm text-slate-600">{subtitle}</p>
          </div>
          <LeadForm />
        </Trace>
      </div>
    </section>
  )
}
