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
  // Numéro réel dédié au site, fourni par Rémy le 26/07/2026. E.164 pour tel:.
  phone: '+33756853125',
  phoneDisplay: '07 56 85 31 25',
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
  // 26/07/2026 : « Assurance décennale » retirée (Rémy confirme qu'il n'y en a pas,
  // on n'affiche aucune couverture non détenue). Remplacée par la promesse de rappel
  // validée par Rémy le même jour, déjà énoncée telle quelle au-dessus du formulaire
  // (« Nous vous rappelons sous 30 minutes »). Le 4e item garde la grille du hero
  // équilibrée en 2 × 2.
  usps: ['Devis gratuit', 'Sans coupure inutile', 'Artisan local', 'Rappel sous 30 min'],
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

  /* ── Persona artisan (DEMO, à remplacer par les infos du loueur) ── */
  // DEMO – à remplacer par les infos du loueur
  persona: {
    name: 'Julien Perret',
    // DEMO – photo IA générée, remplacement par photo réelle possible → public/julien-perret.jpg
    photo: '/julien-perret.jpg',
    title: 'Électricien certifié, spécialiste dépannage',
  },

  /* ── Sections visuelles, textes placeholder en attente de validation Rémy ── */
  about: {
    title: 'Votre spécialiste électricien à Annecy',
    // DEMO – à remplacer par les infos du loueur
    body: "Julien Perret dirige notre équipe spécialisée. Nous intervenons à Annecy et dans un rayon de 30 km pour diagnostiquer et réparer toute panne électrique, du simple disjoncteur qui saute jusqu'à la rénovation complète d'un tableau. Nous maîtrisons les méthodes de diagnostic non invasives et vous remettons un compte-rendu clair après chaque intervention.",
    // DEMO – à remplacer par les infos du loueur
    highlight: 'Électricien certifié, habilitation électrique à jour',
  },

  process: [
    { icon: 'phone', title: 'Vous nous appelez', desc: 'Prise en charge immédiate, diagnostic téléphonique rapide. Disponible 24h/24, 7j/7.' },
    { icon: 'search', title: 'Diagnostic sur place', desc: "Inspection du tableau électrique et des circuits pour identifier précisément l'origine de la panne." },
    { icon: 'tool', title: 'Intervention ciblée', desc: 'Réparation ou remplacement des éléments défectueux, dans le respect des normes en vigueur.' },
    { icon: 'check', title: 'Mise en sécurité & conseils', desc: "Vérification finale de l'installation et conseils pour éviter que l'incident se reproduise." },
  ],

  // DEMO – à remplacer par les infos du loueur (chiffres persona Julien Perret)
  stats: [
    { value: '+400', label: 'Pannes résolues' }, // DEMO – à remplacer par les infos du loueur
    { value: '8 ans', label: "d'expérience" }, // DEMO – à remplacer par les infos du loueur
    { value: '30 km', label: "Rayon d'intervention" },
  ],

  whyUs: [
    { icon: 'shield', title: 'Intervention sécurisée', desc: "Nous coupons et sécurisons l'installation avant toute intervention. Votre sécurité d'abord." },
    { icon: 'clock', title: 'Disponible 24h/24', desc: "Panne urgente ou programmée, nous répondons 7j/7 avec un délai d'intervention rapide." },
    // DEMO – à remplacer par les infos du loueur
    { icon: 'star', title: 'Artisan certifié indépendant', desc: "Pas d'intermédiaire, pas de franchise. Un artisan local que vous pouvez rappeler directement." },
    { icon: 'doc', title: 'Devis clair avant travaux', desc: 'Diagnostic transparent et devis détaillé avant toute intervention, sans mauvaise surprise.' },
  ],

  /* ── FAQ accueil (DEMO, contenu imaginé persona) ── */
  // DEMO – à remplacer par les infos du loueur
  homeFaq: [
    {
      q: 'Combien coûte une intervention électricien à Annecy ?',
      // DEMO – à remplacer par les infos du loueur
      a: "Le déplacement et le diagnostic de base sont gratuits et sans engagement. Le tarif de l'intervention dépend de la nature de la panne et des pièces à remplacer. Contactez-nous pour un devis personnalisé.",
    },
    {
      q: 'Intervenez-vous en urgence les week-ends et jours fériés ?',
      a: 'Oui, nous intervenons 24h/24 et 7j/7, week-ends et jours fériés inclus, sur Annecy et dans un rayon de 30 km.',
    },
    {
      q: 'Que faire en cas de coupure de courant générale ?',
      // DEMO – à remplacer par les infos du loueur
      a: "Vérifiez d'abord le disjoncteur général de votre tableau électrique : s'il a sauté, tentez de le réenclencher une fois. S'il resaute immédiatement, ne réessayez pas et appelez-nous : un court-circuit est probablement en cause.",
    },
    {
      q: 'Faites-vous la mise aux normes des installations électriques anciennes ?',
      // DEMO – à remplacer par les infos du loueur
      a: 'Oui. Nous intervenons sur les installations anciennes pour les mettre en conformité avec la norme NFC 15-100, notamment avant une vente ou une location.',
    },
    {
      q: 'Intervenez-vous dans toute la Haute-Savoie ?',
      a: "Nous couvrons Annecy (dont les secteurs d'Annecy-le-Vieux, Seynod, Cran-Gevrier, Meythet et Pringy) et son agglomération dans un rayon de 30 km : Poisy, Épagny Metz-Tessy, Argonay, Sevrier, Saint-Jorioz, Veyrier-du-Lac et les communes alentour.",
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
