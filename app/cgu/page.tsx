import type { Metadata } from 'next'
import { siteConfig } from '@/config/site.config'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: "Conditions générales d'utilisation",
  description: `Conditions générales d'utilisation de ${siteConfig.businessName}.`,
  path: '/cgu',
  noindex: true,
})

export default function CGU() {
  return (
    <section className="container-site section max-w-3xl">
      <h1 className="text-3xl md:text-4xl">Conditions générales d'utilisation</h1>
      <div className="mt-8 space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl">1. Acceptation</h2>
          <p className="mt-2">En naviguant sur {siteConfig.businessName}, vous acceptez les présentes CGU.</p>
        </section>
        <section>
          <h2 className="text-xl">2. Services</h2>
          <p className="mt-2">
            Ce site présente les services d'un {siteConfig.trade.toLowerCase()} à {siteConfig.city}
            {' '}({siteConfig.department}) : dépannage, tableau électrique, mise aux normes et
            rénovation électrique. Devis gratuit avant toute intervention.
          </p>
        </section>
        <section>
          <h2 className="text-xl">3. Responsabilité</h2>
          <p className="mt-2">L'éditeur ne peut être tenu responsable des dommages indirects résultant de l'utilisation du site.</p>
        </section>
        <section>
          <h2 className="text-xl">4. Droit applicable</h2>
          <p className="mt-2">CGU régies par le droit français. Tout litige relève des tribunaux français.</p>
        </section>
      </div>
    </section>
  )
}
