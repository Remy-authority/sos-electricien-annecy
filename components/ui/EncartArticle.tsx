/**
 * Encart de demande au fil d'un article (mise à jour du 10/10/2026, modèle de
 * drainage-agricole-normandie.fr). Trois articles sont vus en place 5 à 8 sans clic
 * vers le formulaire : l'encart pose, après le premier tiers de la lecture, une
 * demande QUI CORRESPOND AU SUJET LU, et renvoie vers le formulaire du bas de page
 * (ancre `#devis`, posée par components/ui/CtaBanner.tsx).
 *
 * Choix du message : par mots du slug d'abord, puis par mots du titre, dans l'ordre
 * de la liste (du plus précis au plus large) ; à défaut, l'encart général. Règles de
 * texte : « nous », aucun chiffre ni promesse inventés (les engagements repris sont
 * ceux du site, diagnostic sur place puis devis écrit avant travaux), aucun deux-points.
 */

import Link from 'next/link'

type Encart = { sujet: string; titre: string; texte: string; bouton: string }

const PAR_DEFAUT: Encart = {
  sujet: 'Votre installation',
  titre: 'Une panne chez vous ?',
  texte: 'Décrivez-la en trois étapes, nous revenons vers vous pour fixer le diagnostic, puis vous recevez un devis écrit avant travaux.',
  bouton: 'Décrire ma panne',
}

const REGLES: { motif: RegExp; encart: Encart }[] = [
  {
    motif: /-(clignote|clignotent|scintille|vacille|lumiere|ampoule)-/,
    encart: {
      sujet: 'Lumière qui clignote',
      titre: 'Vos lumières clignotent encore ?',
      texte: 'Nous cherchons sur place si le défaut vient d’un contact, du tableau ou du réseau, avant de réparer quoi que ce soit.',
      bouton: 'Faire chercher la cause',
    },
  },
  {
    motif: /-(surtension|orage|foudre|parafoudre)-/,
    encart: {
      sujet: 'Après un orage',
      titre: 'Quelque chose ne repart pas depuis l’orage ?',
      texte: 'Nous contrôlons le tableau, le différentiel et les circuits touchés, puis nous vous disons ce qu’il faut réparer.',
      bouton: 'Faire contrôler mon tableau',
    },
  },
  {
    motif: /-(disjoncteur|disjoncteurs|fusible|fusibles|differentiel|saute|court-circuit|coupe)-/,
    encart: {
      sujet: 'Disjoncteur et fusibles',
      titre: 'Un disjoncteur qui saute ou un fusible qui fond ?',
      texte: 'Nous isolons le circuit en défaut au testeur, puis vous recevez un devis écrit avant la réparation.',
      bouton: 'Décrire ma panne',
    },
  },
  {
    motif: /-(brule|chauffe|etincelles|incendie|denudes|odeur)-/,
    encart: {
      sujet: 'Signe de danger',
      titre: 'Une prise qui chauffe ou une odeur de brûlé ?',
      texte: 'Coupez le circuit concerné, puis décrivez-nous ce que vous voyez. Nous venons mettre en sécurité et chercher la cause.',
      bouton: 'Demander un dépannage',
    },
  },
  {
    motif: /-(diagnostic|vente|location|bailleur|proprietaire)-/,
    encart: {
      sujet: 'Diagnostic électrique',
      titre: 'Des anomalies relevées par le diagnostic ?',
      texte: 'Nous reprenons les points relevés un à un, avec un devis écrit avant de commencer.',
      bouton: 'Envoyer mes anomalies',
    },
  },
  {
    motif: /-(tableau|normes|nf-c-15-100|vetuste|porcelaine|30ma|salle-de-bain|enfants)-/,
    encart: {
      sujet: 'Mise aux normes',
      titre: 'Un tableau ou des circuits à remettre aux normes ?',
      texte: 'Nous venons voir l’installation, puis vous recevez un devis écrit, poste par poste.',
      bouton: 'Demander la visite',
    },
  },
  {
    motif: /-(renovation|ancienne|ancien|chalet|circuits|cuisine|etapes)-/,
    encart: {
      sujet: 'Rénovation',
      titre: 'Une rénovation électrique en vue ?',
      texte: 'Nous passons voir le logement et l’état du tableau, puis nous chiffrons les travaux pièce par pièce.',
      bouton: 'Demander la visite',
    },
  },
  {
    motif: /-(garage|dependance|piscine|borne|chauffage)-/,
    encart: {
      sujet: 'Nouveau circuit',
      titre: 'Un circuit à créer ou à reprendre ?',
      texte: 'Garage, piscine ou chauffage, nous vérifions ce que le tableau peut porter avant de chiffrer.',
      bouton: 'Décrire mon projet',
    },
  },
]

/** « Disjoncteur, fusible » → « -disjoncteur-fusible- ». */
function normaliser(t: string): string {
  return `-${t
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}-`
}

export function choisirEncart(slug: string, titre: string): Encart {
  for (const source of [slug.replace(/^\d+-/, ''), titre]) {
    const n = normaliser(source)
    const r = REGLES.find((x) => x.motif.test(n))
    if (r) return r.encart
  }
  return PAR_DEFAUT
}

/** Un mot à trait d'union ne se coupe jamais en fin de ligne. */
function insecable(t: string) {
  return t.split(' ').map((m, i) => (
    <span key={i}>
      {i > 0 && ' '}
      {m.includes('-') ? <span className="whitespace-nowrap">{m}</span> : m}
    </span>
  ))
}

export default function EncartArticle({ slug, titre, ancre = '#devis' }: { slug: string; titre: string; ancre?: string }) {
  const e = choisirEncart(slug, titre)
  return (
    <aside
      aria-label="Demande de diagnostic"
      className="mx-auto my-10 max-w-3xl rounded-[3px] border-l-4 border-accent bg-primary-dark px-6 py-7 text-center md:px-8 md:text-left"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-accent">{e.sujet}</p>
      <p className="mt-2 font-display text-xl font-bold leading-snug text-white [text-wrap:balance] md:text-2xl">{insecable(e.titre)}</p>
      <p className="mt-2 text-slate-300 [text-wrap:balance]">{insecable(e.texte)}</p>
      <Link href={ancre} className="btn-accent mt-5 inline-flex max-w-full items-center gap-2 whitespace-nowrap px-5 sm:px-6">
        {e.bouton}
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </Link>
    </aside>
  )
}
