import type { Metadata } from 'next'
import Image from 'next/image'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/config/site.config'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Faq from '@/components/ui/Faq'
import CtaBanner from '@/components/ui/CtaBanner'
import LeadForm from '@/components/ui/LeadForm'
import AccentWord from '@/components/ui/AccentWord'
import { BoltBadge } from '@/components/ui/Bolt'
import { tarifs, type Bloc } from '@/components/tarifs/donnees'
import TexteLiens from '@/components/tarifs/TexteLiens'
import TableauPrix from '@/components/tarifs/TableauPrix'
import CasConcrets from '@/components/tarifs/CasConcrets'
import SourcesListe from '@/components/tarifs/Sources'
import { SchemaDiagnostic, SchemaFacture, SchemaPrixM2, SchemaTva } from '@/components/tarifs/Schemas'

/**
 * Page /tarifs (mise à jour du 25/09/2026, ../tasks/regle-mise-a-jour-site.md §1.1).
 *
 * Contenu : content/tarifs.json. Aucun prix écrit ici : chaque fourchette vient du JSON avec
 * sa source et la date de relevé affichées. Relevé complet (URL, phrase lue, date) :
 * ../tasks/.maj-annecy/tarifs-sources.json.
 * JSON-LD : BreadcrumbList (Breadcrumbs) et FAQPage (Faq), rien d'autre ; aucun prix, aucun
 * priceRange (les réponses de la FAQ ne contiennent aucun montant).
 * Rythme : jamais plus de deux blocs H2 d'affilée sans visuel (couverture, 4 schémas, 1 photo).
 * Mobile : textes centrés (`text-center lg:text-left`), tableau en cartes.
 */
export const metadata: Metadata = buildMetadata({
  title: tarifs.metaTitle,
  description: tarifs.metaDescription,
  path: '/tarifs',
  ogImage: tarifs.image,
})

function BlocTexte({ id, bloc, children }: { id: string; bloc: Bloc; children?: React.ReactNode }) {
  return (
    <section aria-labelledby={`bloc-${id}`} className="prose-content mt-12 !max-w-none text-center lg:text-left">
      <h2 id={`bloc-${id}`} className="!mt-0">
        {bloc.titre}
      </h2>
      <p>
        <TexteLiens texte={bloc.corps[0]} />
      </p>
      {children}
      {bloc.corps.slice(1).map((p) => (
        <p key={p.slice(0, 32)}>
          <TexteLiens texte={p} />
        </p>
      ))}
    </section>
  )
}

export default function TarifsPage() {
  const b = tarifs.blocs

  return (
    <>
      {/* ── En-tête nuit : même langage que les pages prestations et communes ── */}
      <header className="section-dark pb-12">
        <Breadcrumbs
          tone="dark"
          items={[
            { name: 'Accueil', path: '/' },
            { name: 'Tarifs', path: '/tarifs' },
          ]}
        />
        <div className="container-site pt-8 text-center lg:text-left">
          <BoltBadge label={tarifs.badge} />
          <h1 className="accroche mx-auto mt-4 max-w-4xl text-[2.4rem] text-white sm:text-5xl lg:mx-0 lg:text-6xl">
            <AccentWord text={tarifs.h1} word={siteConfig.city} className="not-italic text-accent" />
          </h1>

          <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-card border border-white/10 sm:aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={tarifs.image}
              alt={tarifs.imageAlt}
              fill
              sizes="(min-width: 1200px) 1152px, 100vw"
              className="object-cover"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          <p className="card-glass mt-6 text-left leading-relaxed text-slate-200 max-lg:text-center">{tarifs.intro}</p>
        </div>
      </header>

      <article className="container-site section">
        <div className="mx-auto max-w-4xl">
          {/* 1. Tableau poste par poste */}
          <section aria-labelledby="tableau-prix" className="text-center lg:text-left">
            <h2 id="tableau-prix" className="text-2xl md:text-3xl">
              {tarifs.tableau.titre}
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600">{tarifs.tableau.chapo}</p>
            <TableauPrix />
          </section>

          {/* 2. Taux horaire et déplacement, puis schéma de la facture */}
          <BlocTexte id="horaire" bloc={b.horaire} />
          <SchemaFacture />

          {/* 3-4. Urgence, tableau, puis photo du tableau */}
          <BlocTexte id="urgence" bloc={b.urgence} />
          <BlocTexte id="tableau" bloc={b.tableau} />
          <figure className="my-10">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-card border border-slate-200 shadow-sm">
              <Image
                src="/services/remise-aux-normes-tableau-electrique-pose.jpg"
                alt="Électricien raccordant les disjoncteurs modulaires d'un tableau électrique neuf sur rail"
                fill
                sizes="(min-width: 896px) 896px, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-2 text-center text-sm text-slate-500 lg:text-left">
              Un tableau modulaire se câble circuit par circuit : le nombre de rangées fait varier le prix.
            </figcaption>
          </figure>

          {/* 5-6. Mise aux normes, diagnostic, puis schéma des deux diagnostics */}
          <BlocTexte id="normes" bloc={b.normes} />
          <BlocTexte id="diagnostic" bloc={b.diagnostic} />
          <SchemaDiagnostic />

          {/* 7-8. Rénovation, installation neuve, puis échelle des prix au m² */}
          <BlocTexte id="renovation" bloc={b.renovation} />
          <BlocTexte id="neuf" bloc={b.neuf} />
          <SchemaPrixM2 />

          {/* 9-11. Cas concrets, devis, TVA (le schéma TVA est dans son bloc) */}
          <CasConcrets />
          <BlocTexte id="devis" bloc={b.devis} />
          <BlocTexte id="tva" bloc={b.tva}>
            <SchemaTva />
          </BlocTexte>

          <SourcesListe />
        </div>
      </article>

      <Faq items={tarifs.faq} title="Questions fréquentes sur nos tarifs" />

      {/* Formulaire du site (LeadForm inchangé), en bas de page */}
      <section id="devis" className="section bg-light" aria-labelledby="devis-tarifs">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <div className="mb-7 text-center lg:text-left">
              <BoltBadge label={tarifs.formulaire.surtitre} tone="light" />
              <h2 id="devis-tarifs" className="mt-4 text-3xl md:text-4xl">
                {tarifs.formulaire.titre}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">{tarifs.formulaire.texte}</p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      <CtaBanner
        title={`Un devis d'électricien clair à ${siteConfig.city}`}
        subtitle="Devis gratuit et écrit, sans engagement. Appelez-nous ou laissez vos coordonnées."
      />
    </>
  )
}
