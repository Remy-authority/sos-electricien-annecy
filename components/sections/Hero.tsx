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
 *  - ORDINATEUR : la photo validée (chalet, lac, tableau éclairé à droite). Le texte ET le
 *    formulaire tiennent dans la colonne GAUCHE ; la colonne droite reste libre pour que le
 *    tableau se voie en entier, jamais recouvert par le formulaire (refus Rémy du 26/09).
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
          src="/hero-v2.jpg"
          alt="Tableau électrique neuf éclairé dans un chalet rénové, le lac d'Annecy et les montagnes au crépuscule"
          fill
          priority
          sizes="(min-width: 1024px) 100vw, 1px"
          className="object-cover object-center"
        />
        {/* Voile à gauche, sous le texte et le formulaire ; transparent à droite, sur le tableau. */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark/55 via-dark/30 via-50% to-transparent" aria-hidden="true" />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-dark"
        aria-hidden="true"
      />

      <div className="container-site relative py-12 md:py-16 lg:grid lg:grid-cols-[minmax(0,560px)_1fr] lg:gap-12 lg:py-20">
        {/* Colonne gauche : texte puis formulaire. Sur ordinateur, la colonne droite est vide,
            elle laisse voir le tableau électrique de la photo. */}
        <div className="mx-auto flex w-full max-w-lg flex-col gap-8 text-center lg:mx-0 lg:max-w-none lg:text-left">
          <div>
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
          </div>

          {/* Le formulaire 3 étapes du site, opaque, tel quel */}
          <LeadForm />

          <div className="flex justify-center lg:justify-start">
            <PhoneButton
              label={`Appeler le ${siteConfig.phoneDisplay}`}
              className="btn-accent w-full justify-center text-base shadow-glow lg:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
