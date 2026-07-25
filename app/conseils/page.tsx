import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getArticles } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { formatDateFr } from '@/lib/text'
import { siteConfig } from '@/config/site.config'

export const metadata: Metadata = buildMetadata({
  title: `Conseils électricité à ${siteConfig.city}`,
  description: `Guides et conseils sur le dépannage électrique, le tableau, les normes et la sécurité à ${siteConfig.city} et environs.`,
  path: '/conseils',
})

export default function ConseilsListing() {
  if (!siteConfig.features.blog) notFound()
  const articles = getArticles()

  return (
    <section className="container-site section">
      <h1 className="text-3xl md:text-4xl text-center sm:text-left">
        <span className="accent-serif text-accent-deep">Conseils</span>
      </h1>
      <p className="mt-3 mx-auto max-w-2xl text-center text-slate-600 sm:mx-0 sm:text-left">
        Nos guides pour comprendre, diagnostiquer et sécuriser votre installation électrique.
      </p>

      {articles.length === 0 ? (
        <p className="mt-8 text-slate-500">Les premiers articles arrivent bientôt.</p>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link href={`/conseils/${a.slug}`} className="card card-interactive block h-full overflow-hidden p-0">
                {a.cover && (
                  <div className="relative aspect-[16/9] w-full">
                    <Image src={a.cover} alt={a.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="p-5 text-center sm:text-left">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{a.category}</span>
                  <h2 className="mt-1 text-lg">{a.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{a.description}</p>
                  {/* slate-500 et non slate-400 : sur fond blanc, slate-400 tombe à
                      2,56:1 (échec AA), relevé par l'audit de contraste du 26/07/2026
                      dès la publication du 1er article. slate-500 = 4,76:1. */}
                  {/* Date lisible (« 26 juillet 2026 ») comme sur la page d'article,
                      l'attribut `dateTime` garde l'ISO pour les machines. */}
                  <time className="mt-3 block text-xs text-slate-500" dateTime={a.date}>{formatDateFr(a.date)}</time>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
