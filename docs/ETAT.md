# ETAT.md — Journal de bord SOS Électricien Annecy

> Mémoire du projet. Chaque session lit ce fichier en arrivant et le met à jour avant de finir.
> Dernière mise à jour : 2026-07-25 (session Builder : contenu, config, design et images réécrits
> pour électricien/Annecy, réalignés sur le plan SEO produit en parallèle).

---

## 🔖 POINT DE REPRISE (état exact au 25/07/2026 — à lire en premier)

**Site n°2 du portefeuille** (métier : électricien d'urgence, ville : Annecy, 74). Playbook Étapes
1 et 2 TERMINÉES :
- Repo GitHub : https://github.com/Remy-authority/sos-electricien-annecy (public, auto-deploy sur `main`)
- Projet Vercel : `sos-electricien-annecy` (team remy-2817s-projects), URL de travail :
  **https://sos-electricien-annecy.vercel.app**
- **Verrou noindex vérifié en ligne** : `SEO_NOINDEX=1` posé sur Vercel (production +
  development ; preview déjà noindex par le code) → robots.txt `Disallow: /` + meta
  `noindex, follow`. À retirer uniquement à la mise en ligne validée (Étape 6).
- **Contenu réécrit et aligné sur `docs/SEO-GEO-PLAN.md`** : 6 pages service, 11 pages zone
  (build local vérifié vert, 34 pages générées). Rien n'a encore été redéployé sur Vercel avec ce
  nouveau contenu, ni commité sur git : à faire à la prochaine session (CEO ou Builder).
- GitHub Action `publish-article.yml` (autoblog) : présente et active dans le repo.

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
  GitHub Action `publish-article.yml`.
- `content/services/*.json` (6 fichiers) et `content/zones/*.json` (11 fichiers) sont écrits
  pour électricien/Annecy et alignés sur `docs/SEO-GEO-PLAN.md`.
- `config/site.config.ts`, `content/legal.json`, `public/logo.svg`, le portrait persona et 30
  images (services/zones/réalisations/og) sont électricien/Annecy. Téléphone et email restent
  **DEMO** (`06 00 00 00 00`, `contact@sos-electricien-annecy.fr`) tant que Rémy n'a pas fourni
  les vraies infos du loueur.
- `lib/config.ts` (config dupliquée obsolète, encore sur Angers, utilisée uniquement par
  `app/cgu` et `app/politique-cookies` avec des classes Tailwind inexistantes) a été **supprimée** ;
  les deux pages ont été réécrites sur le design system standard (`siteConfig` + `container-site`).

## 2. RESTE À FAIRE (checklist playbook)

- [x] Rémy : nom de domaine validé (sos-electricien-annecy.fr)
- [ ] Rémy : acheter le domaine (registrar), fournir téléphone dédié + email + nom commercial
- [x] CEO : créer le repo GitHub + le projet Vercel (Étape 1.3-1.4), fait le 25/07/2026
- [x] Builder : réécrire `content/services/*.json` (6 services) et `content/zones/*.json`
  (11 zones), alignés sur `docs/SEO-GEO-PLAN.md` §1 et §3
- [x] Builder : `config/site.config.ts` (identité, couleurs indigo/orange, persona DEMO « Julien
  Perret », `serviceArea.districts` = quartiers historiques d'Annecy-ville uniquement) +
  `content/legal.json`
- [x] Builder : logo (éclair), portrait persona, 30 images générées (hero + 2 détails/service,
  zones, réalisations, og.png)
- [x] Builder sur Opus : passe design (Logo, ServiceIcon nouvelles icônes panel/plug/certificate,
  Hero/Realisations/WhyUs/ServiceAreaMap/LeadForm réécrits pour électricien)
- [x] Agent SEO : carte mots-clés + `docs/SEO-GEO-PLAN.md` + `docs/CALENDRIER-EDITORIAL.md`
  (149 titres/12 mois)
- [ ] Autoblog : les 10 drafts déjà présents dans `content/drafts/` (001-010) restent à recaler
  sur les 6 slugs de service définitifs avant publication (`relatedServices` vide dans les
  drafts actuels, donc rien n'est cassé, juste à compléter puis publier)
- [x] `robots.ts` reste en noindex automatique en preview ; en ligne le verrou `SEO_NOINDEX=1`
  est déjà posé sur Vercel
- [ ] CEO : commiter/pousser le contenu réécrit, redéployer, contrôle visuel → validation Rémy →
  mise en ligne (Étape 6 du playbook)

## 3. RÉALIGNEMENT BUILDER ↔ PLAN SEO (25/07/2026, résolu dans la même session Builder)

Le Builder a écrit une première version du contenu (6 services, 8 zones, cf. divergence notée par
le CEO en §5) **avant** que le plan SEO n'existe (rédigé par l'agent SEO en parallèle). En
découvrant `docs/SEO-GEO-PLAN.md` à la fin de sa session (via la mise à jour de ce fichier par une
session CEO concurrente), le Builder a tout réaligné avant de livrer :
- **Services** : anciens slugs `urgence-electricien`, `remplacement-tableau-electrique`,
  `mise-aux-normes-electriques`, `installation-borne-recharge` → remplacés par les 6 slugs du plan
  (`urgence-depannage-electrique`, `recherche-panne-electrique`,
  `remise-aux-normes-tableau-electrique`, `renovation-electrique-complete`,
  `mise-en-conformite-diagnostic-electrique`, `installation-electrique-neuve`). Images renommées
  en conséquence (pas de régénération, les visuels existants collaient déjà aux nouveaux intitulés).
- **Zones** : 3 zones hors plan supprimées (Menthon-Saint-Bernard, Chavanod, Montagny-les-Lanches,
  Tier 3), 6 zones manquantes créées (Annecy-le-Vieux, Seynod, Cran-Gevrier, Meythet en secteurs
  « fusionnés 2017 » avec la nuance factuelle demandée ; Pringy idem ; Saint-Jorioz commune
  autonome), les 5 zones conservées (Poisy, Épagny Metz-Tessy, Argonay, Sevrier, Veyrier-du-Lac)
  inchangées. Total 11 zones.
- **`config/site.config.ts`** : `serviceArea.districts` corrigé pour ne plus lister
  Annecy-le-Vieux/Cran-Gevrier/Meythet/Seynod/Pringy (qui ont maintenant leur page dédiée) mais les
  vrais quartiers du centre historique (Centre-ville, Vieille Ville, Novel, Teppes, Les Romains).
- **`lib/seo.ts`** : le bug `'Plumber'` signalé par l'agent SEO était déjà corrigé en
  `'Electrician'` par le Builder avant même de lire le plan (fonction renommée
  `plumberJsonLd` → `businessJsonLd` au passage).
- Build vérifié vert après réalignement (34 pages : 6 services + 11 zones + pages utilitaires),
  contrôle visuel navigateur OK sur accueil, page service et page secteur (Annecy-le-Vieux).
- **Non fait par le Builder** (hors périmètre de cette session) : recaler les 10 drafts
  `content/drafts/001-010` sur les 6 slugs définitifs et les publier ; c'est le travail de
  l'Autoblog, pas bloquant puisque leur `relatedServices` est vide. Codes postaux « à confirmer »
  listés par le plan SEO (Meythet, Pringy, Saint-Jorioz, Veyrier-du-Lac) utilisés tels quels
  (meilleure donnée disponible), à vérifier par Rémy avant Gate C.

## 4. DÉCISIONS RÉMY

- 25/07/2026 : top 5 vague 2 validé ; Annecy (électricien) lancé en n°1, Metz (débouchage) suivra en n°2.

## 5. HISTORIQUE DES SESSIONS

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
- **25/07/2026 (Builder)** : contenu, config, design et images réécrits pour électricien/Annecy
  (session menée sans visibilité sur le plan SEO en cours de rédaction en parallèle). En
  découvrant la divergence à la relecture finale de ce journal, réalignement complet sur
  `docs/SEO-GEO-PLAN.md` avant livraison (détail en §3 ci-dessus). Build local vert, contrôle
  visuel navigateur OK. Repo non commité par le Builder (règle CLAUDE.md : le CEO gère git/commits
  de coordination), à faire à la prochaine session CEO avant contrôle Rémy.