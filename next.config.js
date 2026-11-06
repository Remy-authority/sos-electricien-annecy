/** @type {import('next').NextConfig} */

// Articles retirés le 06/11/2026 (passage à 7 articles par semaine, Rémy) : 8 articles de ville
// qui doublonnaient les pages de zones et de services, 8 doublons fusionnés dans l'article le plus fort.
const articlesRetires = {
  'cuisine-circuits-electriques-epagny-metz-tessy': '/zones/epagny-metz-tessy',
  'depannage-electrique-seynod-deroulement': '/zones/seynod',
  'disjoncteur-general-coupe-tout-meythet': '/zones/meythet',
  'electricite-chalet-ancien-haute-savoie': '/services/renovation-electrique-complete',
  'electricite-residence-secondaire-lac-annecy': '/services/mise-en-conformite-diagnostic-electrique',
  'renovation-electrique-appartement-ancien-annecy': '/services/renovation-electrique-complete',
  'renovation-electrique-maison-ancienne-annecy': '/services/renovation-electrique-complete',
  'verifier-electricite-piscine-avant-hivernage-annecy': '/services/mise-en-conformite-diagnostic-electrique',
  'garage-independant-amener-electricite': '/conseils/installation-electrique-garage-dependance',
  'orage-fait-sauter-installation-electrique': '/conseils/surtension-apres-orage-que-faire',
  'comment-electricien-recherche-panne': '/conseils/recherche-panne-electrique-sans-casser-mur',
  'outils-diagnostic-electrique-professionnel': '/conseils/recherche-panne-electrique-sans-casser-mur',
  'fusibles-porcelaine-tableau-electrique-remplacer': '/conseils/fusible-grille-changer-ou-passer-au-disjoncteur',
  'remise-en-route-chauffage-electrique': '/conseils/radiateur-electrique-ne-chauffe-plus-cause',
  'obligations-proprietaire-bailleur-electricite': '/conseils/mise-aux-normes-electriques-vente-location',
  'verifier-tableau-electrique-rentree': '/conseils/tableau-electrique-vetuste-signes-remplacement',
}

const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || '.next',
  async redirects() {
    return Object.entries(articlesRetires).map(([slug, destination]) => ({
      source: `/conseils/${slug}`,
      destination,
      statusCode: 301,
    }))
  },
}
module.exports = nextConfig
