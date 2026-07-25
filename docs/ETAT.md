# ETAT.md — Journal de bord SOS Électricien Annecy

> Mémoire du projet. Chaque session lit ce fichier en arrivant et le met à jour avant de finir.
> Dernière mise à jour : 2026-07-25 (session CEO : repo GitHub + projet Vercel créés, noindex vérifié).

---

## 🔖 POINT DE REPRISE (état exact au 25/07/2026 — à lire en premier)

**Site n°2 du portefeuille** (métier : électricien d'urgence, ville : Annecy, 74). Le socle
technique est déployé mais le contenu est encore celui d'Angers (modèle). Playbook Étape 1
TERMINÉE :
- Repo GitHub : https://github.com/Remy-authority/sos-electricien-annecy (public, auto-deploy sur `main`)
- Projet Vercel : `sos-electricien-annecy` (team remy-2817s-projects), URL de travail :
  **https://sos-electricien-annecy.vercel.app** (build OK, 31 pages)
- **Verrou noindex vérifié en ligne** : `SEO_NOINDEX=1` posé sur Vercel (production +
  development ; preview déjà noindex par le code) → robots.txt `Disallow: /` + meta
  `noindex, follow`. À retirer uniquement à la mise en ligne validée (Étape 6).
- GitHub Action `publish-article.yml` (autoblog) : présente et **active** dans le nouveau repo.

**Opportunité validée** par le benchmark vague 2 (détail : `RENT & RANK/docs/BENCHMARK.md`) :
verdict 🟢 Boulevard, aucun concurrent local avec site moderne ni avis (le meilleur, LBA
Électricien, a un design daté et zéro avis), CPC estimé 6-10 €, zone à fort pouvoir d'achat,
aucune saisonnalité.

**Domaine CHOISI par Rémy le 25/07/2026 : `sos-electricien-annecy.fr`** (vérifié disponible à
l'AFNIC le même jour, ACHAT À FAIRE par Rémy, ne bloque pas le dev : on travaille sur l'URL
Vercel en attendant).

**Référence design (les 2 accès pour le Builder) :**
- Site en ligne : https://sniperpestcontrol3dservices.fr
- Code source local : `/Users/zaouiremy/Desktop/Claude code/Template siteweb/Prospects/Deratisation/Sniper-pest-3d-control/`
  (lecture seule : s'en inspirer, ne JAMAIS modifier ce dossier)

---

## 1. CE QU'ON SAIT (acquis)

- Le socle technique vient du pilote et fonctionne : Next.js, composants premium, autoblog,
  GitHub Action `publish-article.yml` (à réactiver dans le nouveau repo).
- `content/services/*.json` et `content/zones/*.json` sont encore ceux d'Angers : ils servent
  de MODÈLE de structure au Builder, qui doit les réécrire intégralement pour électricien/Annecy.
- `config/site.config.ts`, `content/legal.json`, `public/logo.svg` et le portrait persona sont
  encore ceux d'Angers : à remplacer (Builder).

## 2. RESTE À FAIRE (checklist playbook)

- [x] Rémy : nom de domaine validé (sos-electricien-annecy.fr)
- [ ] Rémy : acheter le domaine (registrar), fournir téléphone dédié + email + nom commercial
- [x] CEO : créer le repo GitHub + le projet Vercel (Étape 1.3-1.4), fait le 25/07/2026
- [ ] Builder : réécrire `content/services/*.json` (services électricien) et `content/zones/*.json` (communes agglo Annecy)
- [ ] Builder : `config/site.config.ts` (identité, couleurs, persona DEMO) + `content/legal.json`
- [ ] Builder : logo, portrait persona, images (hero + 2-3 par page, règles strictes du playbook)
- [ ] Builder sur Opus : passe design (direction artistique électricien, référence sniperpestcontrol3dservices.fr)
- [x] Agent SEO : carte mots-clés + `docs/SEO-GEO-PLAN.md` + `docs/CALENDRIER-EDITORIAL.md`
- [ ] Autoblog : drafts T1 (préfixes 001-…)
- [x] Vérifier `robots.ts` en noindex tant que non validé (vérifié en ligne le 25/07/2026, verrou `SEO_NOINDEX=1`)
- [ ] Contrôle visuel CEO → validation Rémy → mise en ligne (Étape 6 du playbook)

## 3. DÉCISIONS RÉMY

- 25/07/2026 : top 5 vague 2 validé ; Annecy (électricien) lancé en n°1, Metz (débouchage) suivra en n°2.

## 4. HISTORIQUE DES SESSIONS

- **25/07/2026 (CEO-portefeuille)** : création du dossier par duplication du pilote, nettoyage
  du contenu Angers (articles conseils, drafts, images services/zones/conseils/réalisations,
  plans SEO), journal remis à neuf, git initialisé. Aucun contenu Annecy encore écrit :
  c'est le travail du Builder à la prochaine session.
- **25/07/2026 (CEO du site)** : Étape 1 du playbook terminée. Repo GitHub créé et poussé,
  projet Vercel créé et connecté au repo (auto-deploy sur `main`), `SEO_NOINDEX=1` posé,
  déploiement production OK sur https://sos-electricien-annecy.vercel.app, noindex vérifié
  en ligne (robots.txt + meta). Incident résolu : le projet Vercel créé en CLI avait
  `framework: null` → 404 total ; corrigé via l'API (preset `nextjs`), voir `tasks/lessons.md`.
  Prochaine étape : agent SEO (carte mots-clés) puis Builder (contenu + config Annecy).
- **25/07/2026 (CEO, supervision)** : ⚠️ divergence détectée entre le plan SEO et le contenu
  écrit par le Builder (travail en parallèle, le Builder n'avait pas le plan). Services : 4 slugs
  sur 6 différents, « mise en conformité/diagnostic vente » et « installation neuve » absents,
  « borne de recharge » ajouté hors plan. Zones : les 4 secteurs Tier 1 (Annecy-le-Vieux, Seynod,
  Cran-Gevrier, Meythet) + Pringy + Saint-Jorioz manquent ; Chavanod et Montagny-les-Lanches sont
  en pages dédiées alors que le plan les classe Tier 3 (maillage seulement) ; Menthon-Saint-Bernard
  hors plan. Contenu produit NON commité en attente d'alignement Builder ↔ plan SEO et du
  contrôle CEO. Message d'alignement préparé pour le Builder.
- **25/07/2026 (Agent SEO)** : `docs/SEO-GEO-PLAN.md` et `docs/CALENDRIER-EDITORIAL.md` écrits
  (aucun fichier hors `docs/` touché). Recommandation : 6 pages service (urgence, recherche de
  panne, mise aux normes tableau, rénovation complète, mise en conformité/diagnostic vente,
  installation neuve) et 11 pages commune en 2 vagues (Tier 1 : Annecy-le-Vieux, Seynod,
  Cran-Gevrier, Meythet, Poisy, Épagny Metz-Tessy, Argonay ; Tier 2 : Pringy, Sevrier,
  Saint-Jorioz, Veyrier-du-Lac). Point d'attention transmis au Builder : Annecy-le-Vieux, Seynod,
  Cran-Gevrier, Meythet et Pringy sont des communes déléguées d'Annecy depuis la fusion de 2017,
  pas des communes autonomes, à formuler comme des secteurs/quartiers. Bug technique identifié
  (hors périmètre de cet agent) : `lib/seo.ts` a le schema JSON-LD câblé sur `'Plumber'` au lieu
  d'`'Electrician'`. Calendrier éditorial : 149 titres sur 12 mois (T1 août-oct 2026 à T4
  mai-juil 2027), 6 premiers articles = un par service, 13 zones de cannibalisation identifiées
  et différenciées.
