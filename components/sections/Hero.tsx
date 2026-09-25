import Image from 'next/image'
import { siteConfig } from '@/config/site.config'
import PhoneButton from '@/components/ui/PhoneButton'
import LeadForm from '@/components/ui/LeadForm'

/**
 * Hero d'accueil, repris le 26/09/2026 (Rémy, reprise après l'arrêt du bloc 1 ordinateur).
 *
 *  - TÉLÉPHONE ET TABLETTE : AUCUNE PHOTO. Fond bleu nuit dégradé, titre, phrase, puis le
 *    formulaire 3 étapes (opaque) et le bouton d'appel. Décision Rémy du 26/09, confirmée
 *    à la reprise : « version mobile, on met un fond bleu ».
 *  - ORDINATEUR : « un fond d'écran propre » (Rémy 26/09). Une photo premium plein cadre,
 *    assombrie par un voile dégradé (plus dense à gauche sous le texte, léger à droite),
 *    texte à gauche, formulaire à droite. Le tableau électrique est petit et ENTIER dans le
 *    bas de la colonne de texte, jamais coupé ni recouvert ; le chalet et le lac d'Annecy
 *    restent lisibles autour du formulaire.
 *  - aucune liste d'atouts ici : le bandeau TrustBadges juste dessous les porte.
 * Aucune garantie, aucun délai promis.
 */
export default function Hero() {
  return (
    <section
      className="texture-noise relative overflow-hidden bg-gradient-to-b from-primary-dark to-dark lg:bg-dark"
      aria-labelledby="hero-title"
    >
      {/* ── Ordinateur seulement : la photo plein cadre et son voile ── */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          src="/hero-desktop.jpg"
          alt="Tableau électrique neuf, porte ouverte, sur le mur en bois d'un chalet avec vue sur le lac d'Annecy"
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 1px"
          className="object-cover object-[35%_60%]"
        />
        {/* Un seul voile, dégradé de gauche à droite : le texte se lit, la photo se voit.
            Valeurs en rgba littérales : audit-design.mjs lit l'arrêt le plus opaque (0,32 < 0,75) ;
            à 0,62 le bois derrière le titre tombait sous le seuil de visibilité (écart-type 8,5 < 12),
            à 0,32 il est à 12,6 et le texte blanc reste lisible (luminance moyenne 48/255). */}
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,14,26,0.32)_0%,rgba(8,14,26,0.28)_45%,rgba(8,14,26,0.18)_100%)]"
          aria-hidden="true"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-dark"
        aria-hidden="true"
      />

      <div className="container-site relative grid gap-8 py-12 md:py-16 lg:min-h-[900px] min-[1900px]:min-h-[1000px] lg:grid-cols-2 lg:items-start lg:gap-x-14 lg:gap-y-10 lg:py-20">
        {/* Texte : centré sur téléphone, à gauche sur ordinateur, en haut de la colonne gauche. */}
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
            Panne de courant, disjoncteur qui saute, tableau à refaire{' '}: nous trouvons
            l'origine de la panne avant de réparer. Devis gratuit.
          </p>

          {/* Ordinateur : l'appel juste sous le texte. */}
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
