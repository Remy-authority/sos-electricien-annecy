import Link from 'next/link'
import PhoneButton from './PhoneButton'
import { siteConfig } from '@/config/site.config'
import AccentWord from './AccentWord'
import { BoltIcon } from './Bolt'

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
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              <BoltIcon className="h-3.5 w-3.5" />
              {siteConfig.availability}
            </p>
            {/* Accroche entière en serif italique : le titre est le visuel */}
            <h2 className="accroche mx-auto max-w-3xl text-3xl text-white md:text-[2.75rem]">
              <AccentWord text={title} word={accentWord} className="not-italic text-accent" />
            </h2>
            <p className="mt-4 text-slate-300">{subtitle}</p>
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
