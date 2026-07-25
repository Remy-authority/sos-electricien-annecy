# tasks/todo.md — SOS Électricien Annecy

> État opérationnel courant. La checklist de référence complète vit dans `docs/ETAT.md`.

## Session du 25/07/2026 (CEO)

- [x] Créer le repo GitHub `Remy-authority/sos-electricien-annecy` + push de `main`
- [x] Créer le projet Vercel `sos-electricien-annecy` + connexion git (auto-deploy sur `main`)
- [x] Poser `SEO_NOINDEX=1` sur Vercel (production + development ; preview déjà noindex par le code)
- [x] Vérifier que le premier déploiement Vercel build correctement (fix framework `nextjs` nécessaire, voir lessons.md)
- [x] Vérifier le verrou noindex en ligne (robots.txt `Disallow: /` + meta `noindex, follow` sur https://sos-electricien-annecy.vercel.app)
- [x] Vérifier que la GitHub Action `publish-article.yml` est active dans le nouveau repo
- [ ] Mettre à jour `docs/ETAT.md` en fin de session

## En attente (hors CEO)

- [ ] Rémy : acheter le domaine `sos-electricien-annecy.fr`, fournir téléphone dédié + email + nom commercial
- [x] Agent SEO : carte mots-clés + `docs/SEO-GEO-PLAN.md` + `docs/CALENDRIER-EDITORIAL.md` (fait, consigné dans ETAT.md)
- [ ] Builder : ALIGNER services/zones sur le plan SEO (divergence détectée, voir ETAT.md), puis logo, persona, images
- [ ] Builder sur Opus : passe design (référence sniperpestcontrol3dservices.fr)
- [ ] Autoblog : drafts T1 (10 drafts présents sur disque, à valider contre le calendrier éditorial)
- [x] Vérifier l'activation de la GitHub Action `publish-article.yml` dans le nouveau repo (active)

## Règle de commit en cours

Le contenu produit (`content/`, `config/`, `lib/`) reste NON commité tant que : compte-rendu
Builder reçu + alignement plan SEO + contrôle visuel CEO. Un push sur `main` déclenche un
déploiement auto (noindex, URL Vercel de travail).
