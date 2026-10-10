import Link from 'next/link'
import { Fragment, type CSSProperties } from 'react'
import { faqJsonLd, jsonLdScript } from '@/lib/seo'
import type { FaqItem } from '@/lib/content'
import AccentWord from './AccentWord'
import { BoltBadge } from './Bolt'
import { Trace } from './Trace'

/** Lien interne écrit dans une réponse : [libellé](/chemin). Seuls les chemins
 *  internes (commençant par « / ») sont reconnus : aucun lien sortant possible. */
const LIEN = /\[([^\]]+)\]\((\/[^)\s]*)\)/g

/** Texte seul, pour le JSON-LD : le lien garde son libellé. */
function texteSeul(a: string) {
  return a.replace(LIEN, '$1')
}

/** Rendu d'une réponse : texte + liens internes éventuels. */
function Reponse({ a, clair = false }: { a: string; clair?: boolean }) {
  const morceaux: React.ReactNode[] = []
  let dernier = 0
  const lien = new RegExp(LIEN.source, 'g')
  let m: RegExpExecArray | null
  while ((m = lien.exec(a)) !== null) {
    const i = m.index
    if (i > dernier) morceaux.push(a.slice(dernier, i))
    morceaux.push(
      <Link key={i} href={m[2]} className={clair ? 'font-semibold text-primary underline underline-offset-2 hover:text-accent-deep' : 'font-semibold text-accent underline underline-offset-2 hover:text-white'}>
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
export default function Faq({
  items,
  title = 'Questions fréquentes',
  tone = 'dark',
}: {
  items: FaqItem[]
  title?: string
  /** `light` : FAQ claire de l'accueil (10/10/2026), cartes séparées alignées à gauche, titre seul. */
  tone?: 'dark' | 'light'
}) {
  if (!items?.length) return null
  const itemsJsonLd = items.map((it) => ({ ...it, a: texteSeul(it.a) }))
  const clair = tone === 'light'
  return (
    <section className={clair ? 'section bg-white' : 'section-dark section'} aria-labelledby="faq-title">
      <div className="container-site max-w-3xl">
        <div className={clair ? 'text-left' : 'text-center sm:text-left'}>
          {!clair && <BoltBadge label="FAQ" />}
          <h2 id="faq-title" className={clair ? 'text-3xl text-slate-900 md:text-4xl' : 'mt-4 text-3xl text-white md:text-4xl'}>
            <AccentWord text={title} word="fréquentes" className={clair ? 'accent-serif text-accent-deep' : 'accent-serif text-accent'} />
          </h2>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd(itemsJsonLd)) }}
        />
        <div className="mt-7 space-y-3">
          {items.map((item, i) => {
            const carte = (
            <details
              className={
                clair
                  ? 'group rounded-[3px] border border-slate-200 bg-light transition-colors open:border-accent/60 hover:border-slate-300'
                  : 'group rounded-[3px] border border-white/10 bg-white/[0.06] backdrop-blur-md transition-colors open:border-accent/30 hover:border-white/20'
              }
            >
              <summary
                className={`flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold marker:hidden [&::-webkit-details-marker]:hidden ${clair ? 'text-slate-900' : 'text-white'}`}
              >
                {item.q}
                <svg
                  className={`h-5 w-5 shrink-0 transition-transform group-open:rotate-180 ${clair ? 'text-accent-deep' : 'text-accent'}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div className={`border-t px-5 pb-4 pt-3 ${clair ? 'border-slate-200' : 'border-white/10'}`}>
                <p className={`text-left leading-relaxed ${clair ? 'text-slate-600' : 'text-slate-300'}`}>
                  <Reponse a={item.a} clair={clair} />
                </p>
              </div>
            </details>
            )
            return clair ? (
              <Trace key={i} className="apparait" style={{ '--t': `${i * 70}ms` } as CSSProperties}>
                {carte}
              </Trace>
            ) : (
              <Fragment key={i}>{carte}</Fragment>
            )
          })}
        </div>
      </div>
    </section>
  )
}
