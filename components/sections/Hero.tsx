import Image from 'next/image'
import { siteConfig } from '@/config/site.config'
import PhoneButton from '@/components/ui/PhoneButton'
import LeadForm from '@/components/ui/LeadForm'

/**
 * Hero d'accueil, refait le 26/09/2026 (Rémy, 4e lecture du bloc 1).
 *
 *  - TÉLÉPHONE ET TABLETTE : AUCUNE PHOTO. Fond bleu nuit dégradé, titre, phrase, puis le
 *    formulaire 3 étapes (opaque) et le bouton d'appel. Décision Rémy du 26/09 : « enlève la
 *    photo, mets un fond bleu ou noir ».
 *  - ORDINATEUR : texte à gauche, formulaire à droite (mise en page des sites du portefeuille).
 *    La photo est COMPOSÉE pour cette mise en page : le tableau éclairé occupe le bas de la
 *    colonne gauche, sous le texte ; le haut à gauche est calme (plafond de bois sombre) pour
 *    le titre ; la fenêtre sur le lac est à droite, derrière le formulaire opaque. Le tableau
 *    n'est donc jamais recouvert (refus Rémy du 26/09).
 *  - aucune liste d'atouts ici : le bandeau TrustBadges juste dessous les porte.
 * Aucune garantie, aucun délai promis.
 */
export default function Hero() {
  return (
    <section
      className="texture-noise relative overflow-hidden bg-gradient-to-b from-primary-dark to-dark lg:bg-dark"
      aria-labelledby="hero-title"
    >
      {/* ── Ordinateur seulement : la photo (tableau éclairé à droite, hors du texte) ── */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/hero-v3.jpg"
          alt="Tableau électrique neuf éclairé par une applique dans un chalet en bois, le lac d'Annecy et les montagnes au crépuscule par la baie vitrée"
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 1px"
          className="object-cover object-[50%_85%]"
        />
        {/* Voile à gauche, sous le texte et le formulaire ; transparent à droite, sur le tableau. */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/25 via-dark/10 via-45% to-transparent to-70%" aria-hidden="true" />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-dark"
        aria-hidden="true"
      />

      <div className="container-site relative grid gap-8 py-12 md:py-16 lg:grid-cols-2 lg:items-start lg:gap-x-14 lg:gap-y-10 lg:py-20">
        {/* Texte : centré sur téléphone, à gauche sur ordinateur, en haut de la colonne gauche
            (le tableau de la photo est visible en dessous). */}
        <div className="mx-auto w-full max-w-lg text-center lg:col-start-1 lg:row-start-1 lg:mx-0 lg:max-w-none lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-semibold text-accent ring-1 ring-accent/30">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />
            {siteConfig.availability}
          </div>

          <h1
            id="hero-title"
            className="accroche text-[2.5rem] text-white [text-shadow:0_2px_16px_rgb(0_0_0/0.6)] sm:text-6xl lg:text-[3.6rem]"
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
            Panne de courant, disjoncteur qui saute, tableau à refaire{'\u00a0'}: nous trouvons
            l'origine de la panne avant de réparer. Devis gratuit.
          </p>

          {/* Ordinateur : l'appel juste sous le texte, au-dessus du tableau de la photo. */}
          <div className="mt-8 hidden lg:flex">
            <PhoneButton
              label={`Appeler le ${siteConfig.phoneDisplay}`}
              className="btn-accent justify-center text-base shadow-glow"
            />
          </div>
        </div>

        {/* Le formulaire 3 étapes du site, opaque, tel quel : sous le texte sur téléphone,
            colonne droite sur ordinateur. */}
        <div className="mx-auto w-full max-w-lg lg:col-start-2 lg:row-start-1 lg:mx-0 lg:max-w-none">
          <LeadForm />
        </div>

        {/* Téléphone et tablette : l'appel sous le formulaire. */}
        <div className="mx-auto flex w-full max-w-lg justify-center lg:hidden">
          <PhoneButton
            label={`Appeler le ${siteConfig.phoneDisplay}`}
            className="btn-accent w-full justify-center text-base shadow-glow"
          />
        </div>
      </div>
    </section>
  )
}
