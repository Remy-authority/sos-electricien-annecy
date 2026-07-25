import Link from 'next/link'
import PhoneButton from './PhoneButton'
import { siteConfig } from '@/config/site.config'
import AccentWord from './AccentWord'

export default function CtaBanner({
  title = `Une panne électrique à ${siteConfig.city} ? On intervient vite.`,
  subtitle = siteConfig.responseTime,
  /** Mot du titre mis en valeur (serif italique). Défaut : la ville de base.
   *  Les pages commune passent le nom de la commune à la place. */
  accentWord = siteConfig.city,
}: {
  title?: string
  subtitle?: string
  accentWord?: string
}) {
  return (
    <section className="section" aria-label="Nous contacter">
      <div className="container-site">
        <div className="texture-noise relative overflow-hidden rounded-2xl bg-dark px-6 py-14 text-center text-white shadow-card-hover md:px-14">
          {/* Motif grille discret, masqué en fondu radial */}
          <div className="pointer-events-none absolute inset-0 pattern-grid" aria-hidden="true" />
          {/* Halo décoratif */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/25 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative">
            <p className="mb-3 inline-block rounded-full bg-accent/20 px-4 py-1 text-sm font-semibold text-accent">
              {siteConfig.availability}
            </p>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              <AccentWord text={title} word={accentWord} className="accent-serif text-accent" />
            </h2>
            <p className="mt-2 text-slate-300">{subtitle}</p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PhoneButton label={`Appeler le ${siteConfig.phoneDisplay}`} className="btn-accent shadow-lg shadow-accent/30" />
              <Link
                href="/contact"
                className="btn-outline !border-white/30 !bg-transparent !text-white hover:!bg-white/10"
              >
                Devis gratuit en ligne
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
