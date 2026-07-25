import type { Metadata } from 'next'
import legal from '@/content/legal.json'
import { siteConfig } from '@/config/site.config'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Politique de cookies',
  description: `Politique de cookies de ${siteConfig.businessName}.`,
  path: '/politique-cookies',
  noindex: true,
})

export default function PolitiqueCookies() {
  return (
    <section className="container-site section max-w-3xl">
      <h1 className="text-3xl md:text-4xl">Politique de cookies</h1>
      <div className="mt-8 space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl">Qu'est-ce qu'un cookie ?</h2>
          <p className="mt-2">Un petit fichier texte déposé sur votre appareil lors de la visite d'un site web.</p>
        </section>
        <section>
          <h2 className="text-xl">Cookies utilisés</h2>
          <p className="mt-2">{legal.confidentialite.cookies}</p>
        </section>
        <section>
          <h2 className="text-xl">Gestion</h2>
          <p className="mt-2">Configurez votre navigateur pour refuser les cookies. La navigation reste possible.</p>
        </section>
        <section>
          <h2 className="text-xl">Contact</h2>
          <p className="mt-2">{siteConfig.email}</p>
        </section>
      </div>
    </section>
  )
}
