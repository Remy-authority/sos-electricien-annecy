import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site.config'
import { buildMetadata } from '@/lib/seo'
import { getServices, getZones } from '@/lib/content'
import LeadForm from '@/components/ui/LeadForm'
import PhoneButton from '@/components/ui/PhoneButton'
import Faq from '@/components/ui/Faq'
import { ServiceIcon } from '@/components/ui/ServiceIcon'

// Mise à jour du 25/09/2026 : title 50 caractères, description 145 (comptés au script).
export const metadata: Metadata = buildMetadata({
  title: 'Contact et devis, électricien à Annecy et environs',
  description:
    'Décrivez votre panne ou votre projet électrique à Annecy en 3 étapes : dépannage, tableau, mise aux normes. Devis écrit avant toute intervention.',
  path: '/contact',
})

/**
 * FAQ propre à la page contact (écrite de zéro le 25/09/2026, angle « prendre
 * contact ») : ce qu'on prépare avant d'appeler, la suite d'une demande SANS délai
 * promis, les communes couvertes (lues dans content/zones, jamais une liste figée),
 * le devis. Rendue par `Faq`, qui émet le JSON-LD FAQPage.
 */
function contactFaq(communes: string[]) {
  return [
    {
      q: 'Quelles informations noter avant de nous décrire une panne électrique ?',
      a: "Notez ce qui ne fonctionne plus (une pièce, un seul circuit ou tout le logement), la position des disjoncteurs dans le tableau, ce qui était branché ou allumé au moment de la coupure, et si le voisinage est privé de courant lui aussi. Une photo du tableau, prise sans rien démonter, nous aide à venir avec le bon matériel.",
    },
    {
      q: "Une fois le formulaire envoyé, comment la suite s'organise-t-elle ?",
      a: "Votre demande nous parvient avec la prestation choisie, votre commune et vos coordonnées. Nous vous recontactons pour préciser la situation, puis nous convenons ensemble d'un passage. Si vous sentez une odeur de brûlé ou voyez un fil à nu, abaissez le disjoncteur général sans attendre notre appel.",
    },
    {
      q: "Dans quelles communes autour d'Annecy vous déplacez-vous ?",
      a: `En plus d'Annecy, nous couvrons ${communes.join(', ')}. Chacune de ces communes a sa propre page dans la rubrique des zones d'intervention.`,
    },
    {
      q: 'Le devis est-il gratuit, et arrive-t-il avant les travaux ?',
      a: "Oui. Le devis ne vous coûte rien et vous est remis par écrit avant toute intervention : aucun travail ne démarre sans votre accord. Pour un dépannage à domicile, le déplacement est facturé, son montant est indiqué sur notre page Tarifs.",
    },
  ]
}

export default function ContactPage() {
  const services = getServices()
  const communes = getZones().map((z) => z.name)
  const faq = contactFaq(communes)

  return (
    <>
      <section className="container-site section">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl">Contact et devis</h1>
            <p className="mt-4 text-slate-600">
              Panne électrique à {siteConfig.city} ou alentour, tableau à remettre aux normes, diagnostic
              avant une vente : appelez-nous ou décrivez votre besoin dans le formulaire en 3 étapes.
            </p>
            <div className="mt-6 space-y-3 text-slate-700">
              <p><strong>Téléphone :</strong> {siteConfig.phoneDisplay}</p>
              <p><strong>Email :</strong> {siteConfig.email}</p>
              <p><strong>Disponibilité :</strong> {siteConfig.availability}</p>
              <p><strong>Zone :</strong> {siteConfig.serviceArea.base} + rayon ~{siteConfig.serviceArea.radiusKm} km</p>
            </div>
            <div className="mt-6 flex justify-center lg:justify-start">
              <PhoneButton label={`Appeler ${siteConfig.phoneDisplay}`} />
            </div>
          </div>
          <div id="formulaire">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Prestations : la page contact n'est jamais un formulaire nu (Rémy, 03/09/2026). */}
      <section className="container-site pb-16" aria-labelledby="contact-prestations">
        <h2 id="contact-prestations" className="text-center text-2xl lg:text-left">Nos prestations</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className="flex h-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 transition hover:border-primary hover:shadow-card"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary" aria-hidden="true">
                  <ServiceIcon icon={s.icon} className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold text-slate-800">{s.navTitle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Faq items={faq} title="Questions fréquentes avant de nous écrire" />
    </>
  )
}
