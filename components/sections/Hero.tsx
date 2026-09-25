import Link from 'next/link'
import { getImageProps } from 'next/image'
import { siteConfig } from '@/config/site.config'
import PhoneButton from '@/components/ui/PhoneButton'

/**
 * Hero d'accueil.
 *
 * Photo d'intervention plein cadre + UN SEUL voile plein cadre (25/09/2026, contrôle
 * audit-design : voile cumulé 0,92 = aplat sombre, ramené sous 0,6). Le voile est plus
 * dense à gauche, derrière le texte, et s'éclaircit vers le lac à droite ; en mobile il
 * est uniforme car le texte occupe toute la largeur. Un fondu bas étroit (hors plein
 * cadre) raccorde la photo au bandeau nuit qui suit.
 *
 * La carte « Garantie 100 % » a été retirée le 25/09/2026 (garantie et délai inventés).
 */
// Photo du bloc 1 en direction artistique (25/09/2026) : une composition EN HAUTEUR pour le
// téléphone et la tablette (1536 x 2752), une EN LARGEUR pour l'ordinateur (2400 x 1340).
// Une seule image est visible à la fois ; étirer la photo large dans le cadre haut du
// téléphone la rendait floue (Rémy, 25/09). Le 26/09, Rémy refuse la version téléphone où
// le tableau disparaissait sous le texte : on sert un gros plan qui remplit tout l'écran.
const HERO_ALT = 'Tableau électrique neuf, rangées de disjoncteurs modulaires et câblage soigné'

function HeroPicture() {
  const common = { alt: HERO_ALT, fill: true, sizes: '100vw', priority: true }
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: '/hero-v2.jpg' })
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: '/hero-mobile-tableau-v2.jpg' })
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <source srcSet={mobile} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...rest} className="object-cover object-center" />
    </picture>
  )
}

export default function Hero() {
  return (
    <section
      className="texture-noise relative overflow-hidden bg-dark"
      aria-labelledby="hero-title"
    >
      {/* ── Couche 1 : photo d'intervention plein cadre ──
          alt descriptif (relecture du 25/09/2026) : la photo montre le métier. `priority` car c'est le plus grand visuel above-the-fold (LCP). */}
      <HeroPicture />

      {/* ── Couche 2 : voile de lisibilité, UN seul calque plein cadre ──
          Mobile : teinte uniforme (texte centré sur toute la largeur).
          Ordinateur : dégradé gauche vers droite, arrêt le plus opaque à 0,55. */}
      <div
        className="pointer-events-none absolute inset-0 bg-dark/55 lg:bg-transparent lg:bg-gradient-to-r lg:from-dark/55 lg:via-dark/40 lg:to-dark/10"
        aria-hidden="true"
      />
      {/* Fondu bas étroit : raccord avec le bandeau nuit, ne couvre pas la photo */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-dark"
        aria-hidden="true"
      />

      {/* ── Couche 4 : halo accent animé, chaleur « courant » ──
          Désactivé si prefers-reduced-motion (motion-safe). */}
      <div
        className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-accent/10 blur-3xl motion-safe:animate-hero-glow"
        aria-hidden="true"
      />

      {/* ── Couche 5 : balayage lumineux diagonal, façon référence ── */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 motion-safe:animate-hero-shine"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
        }}
      />

      <div className="container-site relative grid gap-10 py-16 md:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* ── Colonne texte : centrée sur téléphone et tablette, à gauche en lg ── */}
        <div className="text-center lg:text-left">
          {/* Badge urgence avec pulse */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-semibold text-accent ring-1 ring-accent/25 backdrop-blur-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />
            {siteConfig.availability}
          </div>

          {/* H1 : l'accroche ENTIÈRE en grand serif italique, la ville en ambre.
              Le titre est ici le visuel principal, pas seulement un libellé. */}
          <h1
            id="hero-title"
            className="accroche text-[2.6rem] text-white drop-shadow-sm sm:text-6xl lg:text-[4.2rem]"
          >
            Électricien d'urgence à{' '}
            <span className="relative inline-block text-accent">
              {siteConfig.city}
              {/* Trait dégradé sous « Annecy » */}
              <span
                className="absolute -bottom-1 left-0 h-[3px] w-4/5 rounded-full"
                style={{
                  background:
                    'linear-gradient(90deg, rgb(var(--color-accent-rgb)) 0%, transparent 100%)',
                }}
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base [text-shadow:0_1px_10px_rgb(0_0_0/0.5)] leading-relaxed text-slate-100 sm:text-lg lg:mx-0">
            Panne de courant, disjoncteur qui saute, tableau à refaire{'\u00a0'}: nous trouvons
            l'origine de la panne avant de réparer. Devis gratuit.
          </p>

          {/* Liste des atouts retirée le 26/09/2026 (Rémy) : elle répétait mot pour mot le
              bandeau TrustBadges placé juste dessous. */}

          {/* CTAs mobile */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center md:hidden">
            <PhoneButton
              label={`Appeler le ${siteConfig.phoneDisplay}`}
              className="btn-accent justify-center text-base shadow-glow"
            />
            <Link
              href="/contact"
              className="btn-outline !border-white/30 !bg-white/5 !text-white backdrop-blur-sm hover:!bg-white/10 justify-center"
            >
              Devis en 30 s →
            </Link>
          </div>

          {/* CTAs desktop */}
          <div className="mt-8 hidden md:flex md:items-center md:justify-center md:gap-4 lg:justify-start">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-3 rounded-2xl bg-accent px-6 py-4 text-dark shadow-glow transition hover:bg-accent/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={`Appeler le ${siteConfig.phoneDisplay}`}
            >
              <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              <div>
                <p className="text-xs font-semibold text-dark/70">Appelez maintenant</p>
                <p className="text-xl font-bold tracking-wide">{siteConfig.phoneDisplay}</p>
              </div>
            </a>
            <Link
              href="/contact"
              className="rounded-2xl border border-white/25 bg-white/10 px-5 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/15"
            >
              Devis en 30 s →
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
