import Image from 'next/image'
import { siteConfig } from '@/config/site.config'
import PhoneButton from '@/components/ui/PhoneButton'
import LeadForm from '@/components/ui/LeadForm'

/**
 * Hero d'accueil, refait le 26/09/2026 (Rémy, 3e lecture du bloc 1 mobile).
 *
 * Règles du portefeuille appliquées :
 *  - le bloc 1 porte le FORMULAIRE 3 étapes (18/09), OPAQUE, la lecture prime (19/09) ;
 *  - on voit le métier : sur téléphone, le tableau éclairé de la photo validée sur
 *    ordinateur occupe le haut du bloc, NET, sans texte dessus ; le titre se pose plus bas,
 *    sur le fond nuit, en blanc lisible (« blanc sur blanc » refusé le 26/09) ;
 *  - aucune liste d'atouts dans le bloc 1 : le bandeau TrustBadges juste dessous les porte ;
 *  - ordinateur : photo du chalet et du lac en fond (validée le 26/09), texte à gauche,
 *    formulaire à droite.
 * Aucune garantie, aucun délai promis (carte « Garantie 100 % » retirée le 25/09).
 */
export default function Hero() {
  return (
    <section className="texture-noise relative overflow-hidden bg-dark" aria-labelledby="hero-title">
      {/* ── Téléphone et tablette : le tableau éclairé, net, en haut du bloc ── */}
      <div className="absolute inset-x-0 top-0 h-[400px] md:h-[480px] lg:hidden">
        <Image
          src="/hero-mobile-chalet.jpg"
          alt="Tableau électrique neuf éclairé par une baladeuse dans un chalet rénové près du lac d'Annecy"
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 1px"
          className="object-cover object-[55%_45%]"
        />
        {/* Fondu court vers le fond nuit, sous le tableau, là où commence le texte. */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-dark" aria-hidden="true" />
      </div>

      {/* ── Ordinateur : chalet, lac et tableau éclairé (photo validée le 26/09) ── */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/hero-v2.jpg"
          alt="Tableau électrique neuf éclairé dans un chalet rénové, le lac d'Annecy et les montagnes au crépuscule"
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 1px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/60 via-dark/35 to-dark/40" aria-hidden="true" />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-dark"
        aria-hidden="true"
      />

      <div className="container-site relative grid gap-8 pb-14 pt-[370px] md:pt-[450px] lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14 lg:py-20">
        {/* ── Texte : centré sur téléphone, à gauche sur ordinateur ── */}
        <div className="text-center lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-semibold text-accent ring-1 ring-accent/30">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />
            {siteConfig.availability}
          </div>

          <h1
            id="hero-title"
            className="accroche text-[2.5rem] text-white [text-shadow:0_2px_16px_rgb(0_0_0/0.6)] sm:text-6xl lg:text-[4rem]"
          >
            Électricien d'urgence à{' '}
            <span className="relative inline-block text-accent">
              {siteConfig.city}
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

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-100 [text-shadow:0_1px_10px_rgb(0_0_0/0.6)] sm:text-lg lg:mx-0">
            Panne de courant, disjoncteur qui saute, tableau à refaire{' '}: nous trouvons
            l'origine de la panne avant de réparer. Devis gratuit.
          </p>

          {/* Appel : sous le texte sur ordinateur (le formulaire est à droite). */}
          <div className="mt-8 hidden lg:flex">
            <PhoneButton
              label={`Appeler le ${siteConfig.phoneDisplay}`}
              className="btn-accent justify-center text-base shadow-glow"
            />
          </div>
        </div>

        {/* ── Le formulaire 3 étapes du site, opaque, tel quel ── */}
        <div className="mx-auto w-full max-w-lg lg:max-w-none">
          <LeadForm />
        </div>

        {/* Appel : sous le formulaire sur téléphone et tablette. */}
        <div className="flex justify-center lg:hidden">
          <PhoneButton
            label={`Appeler le ${siteConfig.phoneDisplay}`}
            className="btn-accent w-full max-w-lg justify-center text-base shadow-glow"
          />
        </div>
      </div>
    </section>
  )
}
