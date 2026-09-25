/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  site.config.ts, LE fichier unique qui pilote l'identité du site.
 * ─────────────────────────────────────────────────────────────────────────────
 *  C'est le cœur du template « site local N+1 ». Pour déployer un nouveau site
 *  (autre métier / ville / locataire) en < 1 jour : on édite CE fichier + le logo
 *  + les fichiers content/*.json, SANS toucher aux composants ni au SEO.
 *
 *  Personnalisation location : nom, logo, téléphone, email, couleurs, SIREN…
 *  tout est ici → un changement de locataire = édition de config, sans impact SEO.
 *
 *  ⚠️ Garde-fous (NOU-33) :
 *   - `colors` alimente les CSS variables (voir app/layout.tsx) → tailwind.config.ts.
 *   - `features.reviews=false` tant qu'il n'y a pas d'avis Google réels (aucun faux avis).
 *   - `legal` = gabarit paramétrable : NE PAS inventer SIREN / éditeur (fourni par Rémy).
 *   - `showAddress=false` par défaut : pas d'`address` dans le schema Electrician tant que
 *     Rémy n'a pas tranché (artisan à domicile vs adresse physique exposée).
 */

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  /* ── Identité commerciale (louable / remplaçable par l'artisan locataire) ── */
  businessName: 'SOS Électricien Annecy',
  trade: "Électricien d'urgence",
  city: 'Annecy',
  region: 'Haute-Savoie',
  department: '74',

  /* ── Contact ── */
  // 09 Twilio repris de toiture-beauvais.fr le 25/09/2026 (décision Rémy, stock de 09 vide), renvoi vers Rémy. E.164 pour tel:.
  phone: '+33939200338',
  phoneDisplay: '09 39 20 03 38',
  // DEMO – à remplacer par les infos du loueur
  email: 'contact@sos-electricien-annecy.fr',

  /* ── Branding : ces hex re-thèment tout le site via CSS vars ── */
  logo: '/logo.svg',
  colors: {
    // Palette « nuit + ambre électrique », propre à ce site (26/07/2026).
    // Remplace l'indigo/orange hérité du pilote d'Angers : identité de métier
    // (l'arc électrique dans la nuit) plutôt qu'une teinte générique.
    // Contrastes vérifiés AA sur tous les usages réels (cf. docs/ETAT.md §3septies).
    primary: '#17304E', // nuit navy : structure, liens, pastilles d'icônes
    primaryDark: '#0E2038',
    accent: '#F5B32B', // ambre électrique : CTA, accents, chiffres
    // ⚠️ L'ambre sur blanc ne passe pas AA (1,85:1). `accentDeep` est la variante
    // à utiliser pour du TEXTE accent sur fond clair (sur-titres, liens).
    accentDeep: '#8A5A00',
    dark: '#080E1A', // nuit profonde : fonds immersifs
    light: '#F4F6F9',
  },

  /* ── Réassurance / preuve (hero, badges, footer) ── */
  availability: '24h/24 · 7j/7',
  responseTime: 'Intervention rapide sur Annecy',
  // ⚠️ ORDRE SIGNIFIANT : `usps[1]` alimente le 2e badge de TrustBadges (engagement
  // métier). Ne pas réordonner sans vérifier components/sections/TrustBadges.tsx.
  // 25/09/2026 : « Rappel sous 30 min » retiré (délai promis, interdit) ; remplacé par
  // un fait vérifiable du déroulé (diagnostic fait chez le client). 4 items : la grille
  // du hero reste en 2 × 2.
  usps: ['Devis gratuit', 'Sans coupure inutile', 'Artisan local', 'Diagnostic sur place'],
  methods: ['Diagnostic électrique complet', 'Caméra thermique', 'Traceur de câbles'],

  /* ── Zone d'intervention (schema areaServed + bloc zones) ── */
  serviceArea: {
    base: 'Annecy',
    // 30 km validé par Rémy le 26/07/2026 (était 20) : couvre le tour du lac complet
    // et les bourgs voisins sans promettre de délai vers les stations plus lointaines.
    radiusKm: 30,
    // Quartiers du centre historique d'Annecy cités pour la couverture géo fine
    // (maillage, pas de page dédiée). Annecy-le-Vieux, Cran-Gevrier, Meythet, Seynod
    // et Pringy sont d'anciennes communes fusionnées dans la commune nouvelle d'Annecy
    // (2017) : elles ont chacune leur PAGE dédiée dans content/zones/ (cf. SEO-GEO-PLAN.md
    // §3), donc ne figurent plus ici pour éviter le doublon zone-page / district-chip.
    districts: ['Centre-ville', 'Vieille Ville', 'Novel', 'Teppes', 'Les Romains'],
  },

  /* ── Leads / formulaire ── */
  // Endpoint de soumission. Vide => l'API interne /api/contact gère le fallback
  // (log + email tier gratuit). Remplaçable par un webhook Formspree, etc.
  // Aucune dépense engagée : défaut = fallback interne sans coût.
  formEndpoint: '',

  /* ── SEO global (défauts, surchargés par page) ── */
  seo: {
    // NB: domaine pas encore acheté (25/07/2026). Preview = URL Vercel.
    canonicalBase: 'https://www.sos-electricien-annecy.fr',
    defaultOgImage: '/og.png',
    locale: 'fr_FR',
    lang: 'fr',
  },

  /* ── Feature flags ── */
  features: {
    reviews: false, // ⛔ aucun avis affiché tant que la fiche Google n'existe pas
    gallery: true, // galerie réalisations active (placeholders, photos réelles à fournir par Rémy)
    blog: true, // section /conseils (autoblog)
  },

  /* ── Bloc « À propos » (25/09/2026 : aucune personne nommée, aucune certification) ── */
  about: {
    title: 'Votre électricien à Annecy, du tableau au dernier circuit',
    body: "Notre équipe intervient à Annecy et jusqu'à 30 km autour, du disjoncteur qui refuse de se réarmer jusqu'au tableau à reprendre entièrement. Avant de réparer, nous cherchons l'origine du défaut, puis nous vous expliquons ce que nous avons trouvé et ce qu'il faut faire, devis écrit à l'appui.",
    highlight: 'Travaux réalisés selon la norme NF C 15-100',
  },

  process: [
    { icon: 'phone', title: 'Vous nous appelez', desc: 'Nous prenons votre demande et posons les premières questions pour cerner la panne. Ligne ouverte 24h/24, 7j/7.' },
    { icon: 'search', title: 'Diagnostic sur place', desc: "Inspection du tableau électrique et des circuits pour identifier précisément l'origine de la panne." },
    { icon: 'tool', title: 'Intervention ciblée', desc: 'Réparation ou remplacement des éléments défectueux, dans le respect des normes en vigueur.' },
    { icon: 'check', title: 'Mise en sécurité & conseils', desc: "Vérification finale de l'installation et conseils pour éviter que l'incident se reproduise." },
  ],

  // 25/09/2026 : les chiffres du bandeau (rayon, communes, prestations) sont calculés
  // dans components/sections/Stats.tsx à partir du contenu réel : plus aucun chiffre saisi
  // à la main (« +400 pannes » et « 8 ans » étaient inventés, retirés).

  whyUs: [
    { icon: 'shield', title: 'Intervention sécurisée', desc: "Nous coupons et sécurisons l'installation avant toute intervention. Votre sécurité d'abord." },
    { icon: 'clock', title: 'Disponible 24h/24', desc: 'Coupure subite ou travaux prévus de longue date, la ligne reste ouverte tous les jours de la semaine.' },
    { icon: 'star', title: 'Artisan indépendant', desc: "Pas d'intermédiaire, pas de franchise. Un artisan local que vous pouvez rappeler directement." },
    { icon: 'doc', title: 'Devis clair avant travaux', desc: 'Diagnostic transparent et devis détaillé avant toute intervention, sans mauvaise surprise.' },
  ],

  /* ── FAQ accueil ──
     Un lien interne s'écrit [libellé](/chemin) : components/ui/Faq.tsx le rend en lien
     et le retire du JSON-LD (texte seul). */
  homeFaq: [
    {
      q: 'Combien coûte une intervention électricien à Annecy ?',
      a: "Tout dépend de ce que nous trouvons : un disjoncteur à remplacer ne demande pas le même travail qu'un circuit à reprendre sur plusieurs mètres. Nous établissons le diagnostic sur place, puis un devis écrit avant de commencer. Les prix de référence sont sur [nos tarifs détaillés](/tarifs).",
    },
    {
      q: 'Et si la panne tombe un 15 août ou un dimanche ?',
      a: 'Oui, la ligne répond aussi les dimanches et jours fériés, pour Annecy comme pour les communes à 30 km autour, de Rumilly à Veyrier-du-Lac.',
    },
    {
      q: 'Que faire en cas de coupure de courant générale ?',
      a: "Vérifiez d'abord le disjoncteur général de votre tableau électrique : s'il a sauté, tentez de le réenclencher une fois. S'il resaute immédiatement, ne réessayez pas et appelez-nous : un court-circuit est probablement en cause.",
    },
    {
      q: 'Faites-vous la mise aux normes des installations électriques anciennes ?',
      a: "Oui. Nous reprenons les installations anciennes selon la norme NF C 15-100, par exemple pour corriger les anomalies relevées par un diagnostic électrique avant une vente ou une location.",
    },
    {
      q: "Jusqu'où intervenez-vous autour d'Annecy ?",
      a: "Nous couvrons Annecy (dont les secteurs d'Annecy-le-Vieux, Seynod, Cran-Gevrier, Meythet et Pringy) et un rayon de 30 km : Poisy, Épagny Metz-Tessy, Argonay, Sevrier, Saint-Jorioz, Veyrier-du-Lac et Rumilly.",
    },
  ],

  /* ── Légal (GABARIT, à compléter par Rémy avant prod, cf. content/legal.json) ── */
  legal: {
    // Ces champs restent le gabarit paramétrable. NE PAS inventer de valeurs.
    showAddress: false, // false => schema Electrician SANS address (défaut NOU-33)
    // address n'est utilisée QUE si showAddress=true.
    address: { street: '', postalCode: '74000', city: 'Annecy' },
  },
} as const
