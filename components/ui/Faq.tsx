import Link from 'next/link'
import { faqJsonLd, jsonLdScript } from '@/lib/seo'
import type { FaqItem } from '@/lib/content'
import AccentWord from './AccentWord'
import { BoltBadge } from './Bolt'

/** Lien interne écrit dans une réponse : [libellé](/chemin). Seuls les chemins
 *  internes (commençant par « / ») sont reconnus : aucun lien sortant possible. */
const LIEN = /\[([^\]]+)\]\((\/[^)\s]*)\)/g

/** Texte seul, pour le JSON-LD : le lien garde son libellé. */
function texteSeul(a: string) {
  return a.replace(LIEN, '$1')
}

/** Rendu d'une réponse : texte + liens internes éventuels. */
function Reponse({ a }: { a: string }) {
  const morceaux: React.ReactNode[] = []
  let dernier = 0
  const lien = new RegExp(LIEN.source, 'g')
  let m: RegExpExecArray | null
  while ((m = lien.exec(a)) !== null) {
    const i = m.index
    if (i > dernier) morceaux.push(a.slice(dernier, i))
    morceaux.push(
      <Link key={i} href={m[2]} className="font-semibold text-accent underline underline-offset-2 hover:text-white">
        {m[1]}
      </Link>,
    )
    dernier = i + m[0].length
  }
  if (dernier < a.length) morceaux.push(a.slice(dernier))
  return <>{morceaux}</>
}

/**
 * Faq, section accordéon accessible (<details>) + JSON-LD FAQPage.
 * Rendu uniquement si des Q/R existent (aucune FAQ factice). Les Q/R viennent
 * du SEO (ST-2) / Rédacteur (ST-5) via content/*.json.
 */
export default function Faq({ items, title = 'Questions fréquentes' }: { items: FaqItem[]; title?: string }) {
  if (!items?.length) return null
  const itemsJsonLd = items.map((it) => ({ ...it, a: texteSeul(it.a) }))
  return (
    <section className="section-dark section" aria-labelledby="faq-title">
      <div className="container-site max-w-3xl">
        <div className="text-center sm:text-left">
          <BoltBadge label="FAQ" />
          <h2 id="faq-title" className="mt-4 text-3xl text-white md:text-4xl">
            <AccentWord text={title} word="fréquentes" className="accent-serif text-accent" />
          </h2>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd(itemsJsonLd)) }}
        />
        <div className="mt-7 space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-white/10 bg-white/[0.06] backdrop-blur-md transition-colors open:border-accent/30 hover:border-white/20"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-white marker:hidden [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg
                  className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div className="border-t border-white/10 px-5 pb-4 pt-3">
                <p className="leading-relaxed text-slate-300">
                  <Reponse a={item.a} />
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
