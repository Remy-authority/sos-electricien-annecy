# ETAT.md — Journal de bord SOS Électricien Annecy

> Mémoire du projet. Chaque session lit ce fichier en arrivant et le met à jour avant de finir.
> Dernière mise à jour : 2026-07-26 (session Agent SEO : validation SEO/GEO des 10 drafts Autoblog
> et mapping sur `docs/CALENDRIER-EDITORIAL.md`, détail en §3nonies).

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
- [x] Autoblog : `relatedServices` des 10 drafts `content/drafts/001-010` recalé sur les 6 slugs
  de service définitifs (2 slugs pertinents par article)
- [x] Agent SEO : validation SEO/GEO des 10 drafts et mise à jour de
  `docs/CALENDRIER-EDITORIAL.md` en conséquence (détail §3nonies), faite le 26/07/2026
- [ ] CEO/Autoblog : publier les 10 drafts validés (renommage hors `content/drafts/`, retrait du
  dossier drafts, cf. §3nonies)
- [ ] Autoblog : rédiger en priorité l'article de lancement #6 (`installation-electrique-neuve`),
  seul service sans maillage entrant (aucun draft ne le couvre)
- [x] `robots.ts` reste en noindex automatique en preview ; en ligne le verrou `SEO_NOINDEX=1`
  est déjà posé sur Vercel
- [x] CEO : contenu commité et poussé (commit a6891da), redéployé sur
  https://sos-electricien-annecy.vercel.app, vérifications en ligne OK (noindex conservé,
  pages 200, zéro trace Angers), contrôle visuel CEO fait le 25/07/2026 (verdict et réserves
  en §3bis)
- [x] Builder sur Opus : itération design demandée par le CEO (voir §3bis et §3quater) : photo hero
  accueil + signature typographique/texture, faite le 25/07/2026
- [x] Builder : 3 finitions du contrôle CEO v2 (contraste RGPD, grain, écusson photo hero),
  faites le 26/07/2026, détail en §3sexies
- [x] Builder : passe d'identité visuelle (palette propre au métier, typographie, immersion,
  marque éclair) + numéro réel en config, faite le 26/07/2026, détail en §3septies
- [ ] Rémy : trancher les valeurs DEMO affichées (stats « +400 pannes résolues », « 8 ans
  d'expérience », promesses « rappel 30 min » et « 100 % panne réparée ou nous revenons »)
  avant toute mise en ligne
- [ ] Validation Rémy → mise en ligne (Étape 6 du playbook)

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

## 3bis. CONTRÔLE VISUEL CEO (25/07/2026, sur le site déployé)

QA navigateur complet (7 pages × desktop 1440 + mobile 390, double passe avec captures) :
**zéro bug bloquant.** Aucune image cassée, aucun débordement mobile, aucune erreur console,
zéro résidu Angers/fuite, zéro tiret cadratin, FAQ et CTA partout, sticky mobile OK.

Réserves avant validation finale :
1. **Hero accueil sans vraie photo** (dégradé + icônes) alors que toutes les pages
   services/zones en ont une : incohérence sur la page la plus importante.
2. **Direction artistique en retrait de la référence Sniper** : propre et pro mais palette
   indigo/orange sur blanc sans texture ni typographie signature, rendu « template SaaS
   soigné » plus que marque bespoke. Itération Builder demandée.
3. **Valeurs DEMO visibles** (stats +400 / 8 ans / rayon 20 km, promesses 30 min et 100 %) :
   conformes au playbook en phase dev, mais à faire trancher par Rémy avant mise en ligne.
4. `/conseils` vide (normal pré-lancement) ; mentions légales avec assureur « à compléter »
   (infos décennale à fournir par Rémy).

## 3ter. CANNIBALISATION AUTOBLOG : DRAFTS 001-010 vs `docs/CALENDRIER-EDITORIAL.md` (25/07/2026)

Les 10 drafts `content/drafts/001-010` ont été rédigés **avant** que le calendrier éditorial
n'existe (à partir du brief générique de la mission Autoblog, pas du calendrier). Une fois le
calendrier disponible (149 titres), comparaison systématique titre par titre : **8 des 10 drafts
recoupent fortement un titre déjà planifié**, dont 5 des 6 « articles de lancement » (§2 du
calendrier, un par service).

| Draft | Titre du draft | Titre calendrier en conflit | Sévérité |
|---|---|---|---|
| 001 | Panne de courant : ce qu'il faut vérifier avant d'appeler un électricien | **#1** Coupure de courant chez soi : que vérifier avant d'appeler un électricien | Quasi identique (même angle, même requête cible) |
| 002 | Disjoncteur qui saute sans arrêt : les causes les plus fréquentes | **#2** Disjoncteur qui saute sans arrêt : les causes les plus fréquentes | **Titre strictement identique** |
| 003 | Prise électrique qui chauffe : signes de danger et bons réflexes | **#7** Prise électrique qui chauffe : un signe à ne jamais ignorer | Même sujet, même requête cible |
| 004 | Norme électrique NF C 15-100 : ce qu'elle impose dans un logement | **#13** Norme NF C 15-100 expliquée simplement : ce qu'elle impose vraiment | Même sujet, même requête cible |
| 005 | Odeur de brûlé près du tableau électrique : que faire immédiatement | **#8** Odeur de brûlé près d'une prise ou d'un interrupteur : la conduite à tenir | Chevauchement partiel (même déclencheur « odeur de brûlé », objet différent tableau/prise) |
| 007 | Mise aux normes électriques avant une vente ou une location | **#5** Diagnostic électrique avant une vente + **#46** (vente) + recoupe aussi **#14** (bailleur/location) | Chevauchement fort, mon draft fusionne 3 angles que le calendrier différencie volontairement |
| 008 | Tableau électrique vétuste : les signes qu'il est temps de le remplacer | **#3** Tableau électrique ancien : les signes qu'il faut le remettre aux normes | Même sujet, même requête cible |
| 009 | Rénover l'électricité d'une maison ancienne à Annecy : par où commencer | **#4** Rénover l'électricité d'une maison ancienne : par où commencer | **Titre quasi identique** (le mien ajoute juste « à Annecy ») |
| 006 | Disjoncteur, fusible, interrupteur différentiel : quelles différences ? | Aucun titre équivalent. Adjacence légère avec **#37** (lexique électricité) et **#16** (différentiel 30 mA obligatoire), mais angle propre (comparatif des 3 dispositifs) | Pas de doublon, à conserver tel quel |
| 010 | Court-circuit à la maison : comprendre et sécuriser | Aucun titre « court-circuit » dans les 149 du calendrier | Pas de doublon, sujet propre, à conserver tel quel |

**Constat** : sur les 6 « articles de lancement » du calendrier (un par service, pensés pour que
chaque page service ait un maillage entrant dès le lancement), 5 sont déjà quasi rédigés dans mes
drafts (001↔#1, 002↔#2, 008↔#3, 009↔#4, 007↔#5 partiellement). Seul **#6 (installation électrique
garage/dépendance, `installation-electrique-neuve`)** n'a aucun équivalent parmi mes 10 drafts,
ce service reste donc sans article de lancement pour l'instant.

**Recommandation (à trancher par Rémy/CEO, je ne publie ni ne renomme rien)** :
- soit **traiter mes 5 drafts (001, 002, 007, 008, 009) comme remplissant directement les
  emplacements #1, #2, #5, #3, #4 du calendrier** (qualité déjà conforme aux exigences §0 du
  calendrier : réponse courte citable, FAQ en frontmatter, zéro chiffre inventé, zéro tiret
  cadratin) pour éviter de les faire réécrire une seconde fois par l'Autoblog,
  ce qui économise du travail sans dupliquer,
- soit les **écarter et laisser l'Autoblog suivre le calendrier à la lettre** dès la prochaine
  session, auquel cas 003, 004, 005 sont aussi à écarter (chevauchement avec #7, #13, #8).
- Dans les deux cas, **rédiger en priorité un article sur le service #6** (garage/dépendance,
  `installation-electrique-neuve`), seul service sans aucun contenu de lancement à ce stade.
- 006 et 010 n'ont pas d'équivalent dans le calendrier : à intégrer soit comme deux titres
  supplémentaires (hors 149), soit à faire valider par l'agent SEO pour insertion formelle dans
  `docs/CALENDRIER-EDITORIAL.md` (hors périmètre Autoblog, ce fichier n'appartient qu'à l'agent SEO).

## 3quater. ITÉRATION DESIGN BUILDER (25/07/2026, réponse aux réserves 1 et 2 du §3bis)

Objectif CEO : photo dans le hero d'accueil + sortir du rendu « template SaaS soigné » pour se
rapprocher de la référence sniperpestcontrol3dservices.fr. Analyse préalable du code source local
de la référence : sa personnalité tient à quatre leviers (police serif Fraunces en display, texture
de grain SVG, motif grille masqué en fondu, ombres à 2 couches). Ces quatre leviers ont été
transposés à la charte indigo/orange, sans copier son vert/or.

**1. Hero d'accueil avec photo.** Nouvelle image dédiée `public/hero.jpg` générée (2 candidats
comparés, retenu : électricien testant un tableau, lac d'Annecy et Alpes visibles par la baie
vitrée, ambiance heure bleue). Le second candidat, très enneigé, a été écarté pour ne pas enfermer
le site dans une saison. Empilement retenu : photo → teinte globale légère (25 %) → scrim local
dégradé sous la seule colonne de texte → fondu vertical → motif grille → halo accent animé →
grain. Voile volontairement léger après un premier essai trop dense qui rendait la photo
invisible. Carte Garantie passée en verre dépoli (`backdrop-blur-xl`) posée sur la photo.

**2. Signature visuelle.**
- **Typographie** : ajout de Fraunces (serif) en `font-display`, utilisée UNIQUEMENT en italique
  sur un mot-clé des titres et sur les grands chiffres (stats, numéros d'étapes, « 100 % »).
  Composant `components/ui/AccentWord.tsx` créé : accentue un mot dans un titre venant de la
  config ou du contenu (h1 des pages service et commune, titre About, bandeau CTA), sans jamais
  modifier le texte rendu. Générique et réutilisable tel quel sur les prochains sites (N+1).
- **Textures** : utilitaires `.texture-noise` (grain SVG inline, aucune requête réseau) et
  `.pattern-grid` (motif grille masqué en fondu radial) dans `globals.css`, appliqués aux sections
  sombres (hero, bandeau stats, carte zone, bandeau CTA, formulaire, footer).
- **Profondeur** : tokens d'ombre `card` / `card-hover` / `glow` (2 couches, teintées bleu et non
  noir) dans `tailwind.config.ts` ; `.card` enrichi + variante `.card-interactive`. Le bandeau
  stats passe d'un aplat primaire à un dégradé texturé.

**3. Défauts corrigés au passage** (repérés pendant le contrôle visuel, non demandés) :
- `TrustBadges` affichait encore « Intervention non destructive », vocabulaire de recherche de
  fuite d'eau hérité du pilote. Le badge lit maintenant `siteConfig.usps[1]` (« Sans coupure
  inutile »), ce qui évite en plus de recoder ce libellé sur les prochains sites.
- `ServiceAreaMap` affichait « Déplacement sous intervention rapide sur **annecy** et réponse
  garantie en 30 min » : phrase cassée et nom propre décapitalisé, parce que le template injectait
  `responseTime.toLowerCase()` derrière « Déplacement sous » (cohérent quand cette valeur était une
  durée sur le pilote, plus du tout ici). Phrase reconstruite, promesses inchangées.
- **Accessibilité** : les liens du footer et le lien RGPD du formulaire n'avaient pas de couleur
  explicite et héritaient donc de la règle globale `a { text-primary }`, soit de l'indigo sur fond
  sombre (contraste très insuffisant). Passés en `text-slate-300` / `text-white/70`, l'effet
  `hover:text-white` déjà présent dans le code confirmait que c'était bien un oubli.

**Contrôles** : build vert (34 pages), zéro erreur console, aucun débordement horizontal en 390 px,
zéro tiret cadratin, contenu et slugs inchangés (`git status` ne montre aucune modification de
`content/services`, `content/zones` ni `config/`), valeurs DEMO intactes.

**Non traité** (hors périmètre de cette itération) : les réserves 3 et 4 du §3bis (arbitrage Rémy
sur les valeurs DEMO affichées, assureur à compléter dans les mentions légales) restent ouvertes.

## 4. DÉCISIONS RÉMY

- 25/07/2026 : top 5 vague 2 validé ; Annecy (électricien) lancé en n°1, Metz (débouchage) suivra en n°2.
- 26/07/2026 : téléphone dédié fourni : +33 7 56 85 31 25 (config : phone '+33756853125',
  phoneDisplay '07 56 85 31 25'). Email et nom commercial toujours en attente.
- 26/07/2026 : constat Rémy validé par vérification CEO : le design actuel est une copie
  re-teintée d'Angers (seul le primary change, indigo vs bleu ; accent, dark, light et
  composants identiques). Passe d'identité visuelle Builder lancée (palette propre métier,
  accroches serif italique à la Sniper, immersion sombre étendue, badge de marque éclair,
  + finitions RGPD/grain/écusson hero + numéro réel).

## 4bis. DÉCISIONS RÉMY DU 26/07/2026 (session CEO)

- **Site VALIDÉ visuellement par Rémy** (« très propre, j'aime bien, validé »).
- **Téléphone : UNE SEULE ligne partagée pour tout le portefeuille tant que les sites ne sont
  pas loués** (07 56 85 31 25, déjà sur Angers). Le numéro dédié viendra avec le locataire.
- **Chiffres DEMO validés** : +400 pannes, 8 ans, rayon, rappel 30 min, garantie 100 %.
- **Drafts blog : feu vert conditionné à une validation SEO/GEO** (à faire par l'agent SEO :
  mapping sur le calendrier, intégration 006/010, contrôle cannibalisation). **Fait le
  26/07/2026, validation positive, détail §3nonies.**
- **Pas d'assurance décennale** → retirer l'USP « Assurance décennale » du hero
  (config/site.config.ts:57) et la ligne « couverture » de content/legal.json (Builder).
- **Rayon d'intervention : extension souhaitée au-delà de 20 km** ; recommandation CEO 30 km
  (couvre Rumilly, Faverges, Thônes, tour du lac complet, sans promettre des délais
  intenables vers les stations à 35 km).
- **Micro-finitions design validées** (couleur H2 fonds clairs, différenciation squelette),
  exécution Builder.
- **Domaine : achat OVH par Rémy**, instructions transmises. DNS à configurer à l'Étape 6.

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
  de coordination), à faire à la prochaine session CEO avant contrôle Rémy.- **25/07/2026 (CEO, consolidation + contrôle)** : vérification indépendante des livrables
  (slugs services/zones conformes au plan, zéro tiret cadratin, formulations secteurs 2017
  correctes, FAQ >=3 partout, build local vert 34 pages), commit et push du contenu (a6891da),
  redéploiement Vercel OK, vérifications en ligne OK (noindex conservé, pages 200, zéro trace
  Angers). Contrôle visuel CEO complet sur le site déployé : zéro bug bloquant, réserves
  consignées en §3bis (photo hero accueil, itération direction artistique vers le niveau
  Sniper, valeurs DEMO à faire trancher par Rémy). Messages préparés pour le Builder
  (itération design) et l'Autoblog (recalage relatedServices).
- **25/07/2026 (Autoblog)** : `relatedServices` des 10 drafts `content/drafts/001-010` complété
  (2 slugs pertinents par article, sur les 6 slugs définitifs). Comparaison systématique des 10
  titres avec les 149 titres de `docs/CALENDRIER-EDITORIAL.md` (désormais disponible) : 8 drafts
  sur 10 recoupent fortement un titre déjà planifié, dont 5 des 6 articles de lancement du
  calendrier (détail et recommandation en §3ter). Seuls 006 et 010 sont des sujets propres sans
  équivalent dans le calendrier. Aucune publication effectuée, aucun draft renommé ni fusionné :
  décision laissée à Rémy/CEO. Périmètre respecté (`content/drafts/` + ce journal uniquement).
- **25/07/2026 (Builder sur Opus, itération design)** : réponse aux réserves 1 et 2 du contrôle
  visuel CEO. Photo dédiée générée pour le hero d'accueil (2 candidats comparés) et signature
  visuelle ajoutée sur tout le site (serif Fraunces en accent italique, grain, motif grille,
  ombres à 2 couches), après analyse du code source local de la référence Sniper. Composant
  réutilisable `components/ui/AccentWord.tsx` créé pour accentuer un mot dans les titres pilotés
  par la config/le contenu. Trois défauts corrigés au passage : badge « Intervention non
  destructive » (vocabulaire fuite d'eau hérité du pilote), phrase cassée « Déplacement sous
  intervention rapide sur annecy » dans la carte zone, et contraste insuffisant des liens du
  footer et du lien RGPD du formulaire (héritage de la règle globale `a { text-primary }` sur
  fond sombre). Contenu, slugs et valeurs DEMO strictement inchangés. Build vert (34 pages),
  zéro erreur console, aucun débordement mobile. Détail complet en §3quater. Rien commité :
  le CEO commite après contrôle.

- **26/07/2026 (Builder, finitions)** : 3 finitions du contrôle CEO v2 traitées (détail §3sexies).
  Contraste du consentement RGPD porté de 3,81:1 à 6,99:1 (les 2 libellés « (optionnel) » du même
  formulaire, en échec AA identique, ont été remontés aussi : à signaler au CEO). Grain rendu
  visible : la cause n'était pas l'opacité mais l'absence de taille intrinsèque sur le SVG, étiré
  et donc lissé (écart-type mesuré 0,070 avant, 1,56 après sur fond sombre, 3,52 sur le bandeau
  indigo). Écusson de marque gommé sur `public/hero.jpg` par inpainting harmonique local après
  deux essais rejetés au contrôle visuel (pli fantôme, puis bloc clair) : 1 947 pixels modifiés,
  soit 0,046 % de l'image, aucune régénération. Build vert, zéro erreur console, zéro débordement
  mobile. 3 fichiers modifiés au total, contenu/config/slugs intacts. Rien commité.

- **26/07/2026 (Builder, identité visuelle)** : passe d'identité validée par Rémy (détail
  §3septies). Palette « nuit + ambre électrique » propre au métier en remplacement de
  l'indigo/orange hérité d'Angers, avec ajout d'un token `accentDeep` parce que l'ambre pur est
  illisible en texte sur fond clair, et bascule de TOUS les boutons ambre en texte nuit (le blanc
  sur ambre tombait à 1,85:1). Titraille entièrement en serif Fraunces, accroches du hero et des
  bandeaux CTA en serif italique complet. Traitement immersif étendu au-delà des bandeaux
  (services, réalisations, FAQ, barre de confiance, en-têtes des pages service et commune) via une
  classe `.section-dark` et des cartes de verre. Éclair du logo décliné en système de marque
  (`components/ui/Bolt.tsx`). Numéro de téléphone réel de Rémy en config. Audit de contraste
  automatisé écrit pour l'occasion : 0 échec AA sur 7 pages. Build vert, 0 erreur console, 0
  débordement mobile. Contenu et slugs intacts. Rien commité.

- **26/07/2026 (Agent SEO)** : validation SEO/GEO des 10 drafts Autoblog demandée par Rémy en
  réponse à la cannibalisation détectée par le CEO en §3ter (détail complet §3nonies). Qualité
  GEO conforme sur les 10 drafts (intro citable, FAQ frontmatter, zéro tiret cadratin, zéro
  chiffre inventé, aucune cannibalisation avec les pages service). Mapping tranché : 001, 002,
  003, 004, 008, 009 validés tels quels (#1, #2, #7, #13, #3, #4) ; 007 validé comme #5 sans
  découpage (fusionne l'ex-#46, reprogrammé sur un angle procédural distinct, #14 conservé avec
  différenciation renforcée) ; 005 validé comme #8 avec titre corrigé (objet réel = tableau, pas
  prise/interrupteur). 006 et 010 intégrés formellement au calendrier en #150/#151 (hors quota).
  `docs/CALENDRIER-EDITORIAL.md` mis à jour en conséquence (§1bis ajouté, tableaux T1/T2 et
  anti-cannibalisation amendés, mix thématique et résumé recalculés sur 151 titres). Signalé :
  `installation-electrique-neuve` (#6) reste sans article de lancement, priorité n°1 Autoblog.
  Aucun fichier hors `docs/` touché.

## 3quinquies. CONTRÔLE VISUEL CEO v2 (26/07/2026, après itération design)

Vérifications CEO indépendantes avant commit : périmètre Builder respecté (contenu/config
intacts), 0 tiret cadratin ajouté, relatedServices des 10 drafts valides, build vert 34 pages.
Commit 499ef7a poussé et déployé, noindex conservé.

QA navigateur v2 (accueil + service + zone, desktop/mobile, mesures DOM) : **OK pour
validation, zéro bloquant.**
- Réserve « hero sans photo » : **LEVÉE** (photo lac d'Annecy heure bleue, srcset propre,
  glassmorphism réel sur la carte garantie).
- Réserve « direction artistique » : **partiellement levée** (accents Fraunces, grain, ombres,
  bandeau texturé confirmés). Écart restant vs Sniper : accent italique limité à un mot vs
  accroche entière serif chez Sniper ; traitement premium cantonné aux bandeaux sombres ;
  pas d'iconographie de marque forte au-delà de l'éclair.
- 2 finitions mineures relevées : contraste du texte de consentement RGPD (blanc 40 %
  d'opacité ≈3,8:1, sous le seuil AA 4,5:1, à remonter vers 0.55-0.6) et grain quasi
  imperceptible (grille visible mais pas d'effet filmique).
- Point CEO supplémentaire : petit écusson type marque de vêtement sur la veste de la photo
  hero (`public/hero.jpg`), contraire à la règle « aucun texte/logo/marque » : à gommer par
  retouche (pas de régénération complète).

Arbitrages en attente de Rémy : (a) itération design supplémentaire vers le niveau Sniper ou
validation du niveau actuel + finitions mineures seulement ; (b) valeurs DEMO affichées ;
(c) cannibalisation drafts/calendrier (§3ter, recommandation CEO : garder les drafts en les
mappant sur les emplacements du calendrier, écrire l'article #6 en priorité, faire valider
006/010 par l'agent SEO).


## 3sexies. FINITIONS BUILDER (26/07/2026, réponse aux 3 points du §3quinquies)

Périmètre strictement limité aux 3 finitions demandées : **3 fichiers modifiés**
(`app/globals.css`, `components/ui/LeadForm.tsx`, `public/hero.jpg`). Contenu, slugs et config
non touchés (vérifié par `git status`).

**1. Contraste du consentement RGPD (LeadForm).** Mesure avant : blanc 40 % sur `#0F172A` =
**3,81:1**, sous le seuil AA. Passé à 60 % = **6,99:1**. Le lien « politique de confidentialité »
reste inchangé (blanc 70 %) comme demandé. Les deux libellés « (optionnel) » (Email, Précisions)
étaient au même blanc 40 % dans le même formulaire, donc en échec AA identique : ils ont été
remontés à 60 % eux aussi. **À signaler au CEO** : c'est une sortie du « rien d'autre », assumée
parce qu'il s'agit du même défaut, dans le même composant, à corriger d'un seul geste. Trivial à
annuler si le CEO préfère s'en tenir au seul texte de consentement.

**2. Grain `texture-noise`.** Cause du problème identifiée par la mesure, pas à l'œil : le SVG
n'avait ni taille intrinsèque ni `background-size`, il était donc **étiré à la taille de la
section**, ce qui lissait le grain fin jusqu'à le supprimer. Écart-type haute fréquence mesuré sur
une zone sombre plate du bandeau CTA : **0,070 avant** (soit rien). Corrections : `width`/`height`
sur le SVG + `background-size: 160px` + `stitchTiles='stitch'` (répétition invisible), et opacité
portée de 0,035 à **0,65**. `mix-blend-mode: overlay` conservé volontairement : il est fortement
atténué sur fond sombre (d'où l'opacité élevée) mais il **préserve la luminosité moyenne**, là où
`screen` ou un mélange normal délaveraient le noir. Résultat mesuré : **1,56** d'écart-type sur le
bandeau sombre et **3,52** sur le bandeau stats indigo (le grain est naturellement plus lisible en
demi-teinte, comme sur une vraie pellicule), sans dérive de couleur. Le noir remonte de 28,3 à
32,6 sur 255, différence non perceptible.

**3. Écusson de marque sur `public/hero.jpg`.** Retouche **locale**, aucune régénération.
Emprise de l'écusson mesurée par détection colorimétrique (r-b>60 et r>110) : x 1433..1456,
y 802..861. Méthode retenue après deux essais infructueux, tous deux repérés au contrôle visuel :
un premier remplissage transplantait le grain d'une zone située plus bas, qui contenait des plis
de manche, et réimprimait un **pli fantôme** ; un second, par rampe linéaire, propageait la clarté
d'un pli lumineux tombant pile sur la ligne d'échantillonnage et laissait un **bloc rectangulaire
clair**. Version retenue : **inpainting harmonique** (équation de Laplace résolue par itérations
de Jacobi) qui épouse exactement les 4 bords et prolonge les dégradés, plus un grain synthétique
calibré sur l'écart-type du tissu voisin (aucune structure importée). **1 947 pixels modifiés,
soit 0,046 % de l'image**, zone y 799..863 / x 1430..1459, reste de l'image bit à bit identique.
Le zip doré du blouson est conservé : c'est un élément normal du vêtement, pas une marque.
Sauvegarde de l'original hors dépôt pendant l'opération.

**Contrôles** : build vert (34 pages), zéro erreur console, zéro débordement horizontal en 390 px
(accueil, page service, page commune) et en 1440 px, parcours du formulaire jusqu'à l'étape 3
vérifié en capture. Rien commité : le CEO contrôle puis commite.

## 3septies. PASSE D'IDENTITÉ VISUELLE (26/07/2026, mission validée par Rémy)

Objectif : sortir de la « copie re-teintée du pilote d'Angers » et donner une identité propre au
métier, au niveau de la référence Sniper. Structure des pages et contenu (textes, slugs, metas)
strictement inchangés : `git status` ne montre aucune modification de `content/services`,
`content/zones` ni des textes SEO. Seule la peau change.

**1. Palette « nuit + ambre électrique ».** L'indigo `#4338CA` + orange `#F97316` (partagés avec
Angers) sont remplacés par une identité à deux couleurs : nuit navy `#17304E` (structure, liens,
pastilles), nuit profonde `#080E1A` (fonds immersifs) et ambre électrique `#F5B32B` (CTA, accents,
chiffres). Métaphore : l'arc électrique dans la nuit.
- **Découverte importante** : le blanc sur ambre tombe à **1,85:1**, très loin du seuil AA. Tous
  les boutons ambre du site sont donc passés en **texte nuit** (10,45:1) : `.btn-accent`, sticky
  mobile, bouton flottant, bandeau footer, boutons du formulaire, puces de méthode, numéros
  d'étape des pages service.
- Un **6e token `accentDeep` (`#8A5A00`)** a été ajouté à la config : l'ambre pur est illisible en
  texte sur fond clair, cette variante monte à 5,93:1 sur blanc. Elle sert aux sur-titres et aux
  mots accentués des sections claires. Le token est générique, réutilisable en N+1.
- **Audit de contraste automatisé** écrit pour l'occasion (parcours du DOM rendu, composition des
  couleurs semi-transparentes, seuils 4,5:1 et 3:1 selon la taille) : **0 échec sur 7 pages**.
  Il a fait remonter 3 vrais défauts, corrigés : codes postaux du hub zones (2,56:1), numéros
  d'étape décoratifs, et 2 faux positifs identifiés (texte SVG du logo qui se colore via `fill`,
  bandeau stats posé sur un dégradé). Les contrôles désactivés et les éléments `aria-hidden` sont
  exemptés, conformément à WCAG 1.4.3.

**2. Typographie.** Fraunces passe de « un mot accentué » à **toute la titraille** : `h1/h2/h3`
sont en serif, et les accroches du hero et des bandeaux CTA sont **entièrement en serif italique**
(classe `.accroche`), avec le nom de lieu en ambre. La police est chargée en variable (tout l'axe
de graisse) au lieu de deux graisses figées.

**3. Immersion.** Le traitement premium ne se limite plus aux bandeaux : nouvelle classe
`.section-dark` (nuit + grain + motif grille en une classe) et cartes `.card-glass`. Sont passées
en nuit : barre de confiance (elle prolonge le hero au lieu de le couper), **section services**
(pièce maîtresse, cartes de verre à pastilles ambre), réalisations, FAQ, et les **en-têtes des
pages service et commune** (fil d'Ariane, badge, accroche, photo, intro en carte de verre). Le
rythme sombre/clair alterne ensuite avec À propos, Méthode, Devis, Pourquoi nous, Zone.

**4. Marque.** L'éclair du logo devient un système : `components/ui/Bolt.tsx` expose `BoltIcon`,
`BoltBadge` (sur-titre de section, remplace le texte majuscule nu), `BoltWatermark` (filigrane
géant en fond de section sombre) et `BoltDivider`. Même tracé que le logo, aucune couleur codée en
dur. Logo, favicon et `public/logo.svg` réalignés sur la nouvelle palette.

**5. Numéro réel.** `phone` / `phoneDisplay` passent au numéro dédié fourni par Rémy
(07 56 85 31 25). Email et nom commercial restent DEMO.

**Contrôles** : build vert (34 pages), 0 erreur console, 0 débordement horizontal en 390 px et
1440 px (accueil, page service, page commune), 0 tiret cadratin, aucun chiffre inventé.
Rien commité : contrôle CEO d'abord.

**Point d'attention pour le CEO** : le `BoltDivider` est livré mais pas encore utilisé, il est
disponible pour aérer une section future. Les réserves ouvertes du §3quinquies (valeurs DEMO
affichées, assureur des mentions légales, cannibalisation des drafts) ne sont pas concernées par
cette passe et restent en attente d'arbitrage.

## 3octies. CONTRÔLE VISUEL CEO v3 (26/07/2026, après passe d'identité) : NIVEAU SNIPER ATTEINT

Vérifications CEO : périmètre 33 fichiers côté peau respecté (0 fichier content/), numéro réel
en config, 0 tiret ajouté, build vert. Commit 58a8ca1 déployé, numéro réel vérifié en ligne,
noindex conservé.

QA v3 (Annecy + comparaisons Angers et Sniper, desktop/mobile, mesures DOM) + contrôle visuel
CEO sur captures :
- **Les 3 écarts Sniper de la v2 sont comblés** (accroches serif italique entières, immersion
  sombre 4 sections + en-têtes, 16 occurrences du système éclair). **Verdict : niveau Sniper
  atteint.** Zéro régression, contrastes tous AA+ (bouton ambre 10,4:1, FAQ nuit 13-19:1).
- **Différenciation vs Angers : nette sur la peau** (typo, palette, sombre, iconographie,
  photo), squelette de mise en page encore commun (assumé : c'est le template). 2 finitions
  possibles non bloquantes : couleur des H2 sur fonds clairs (gris-bleu générique), squelette.

⚠️ **ALERTE TÉLÉPHONE (vérifiée par le CEO, 49 occurrences)** : le numéro fourni pour Annecy
(07 56 85 31 25) est DÉJÀ le numéro affiché en production par le pilote sos-fuite-angers.fr.
Deux sites du portefeuille partageraient la même ligne (doctrine : téléphone dédié par site).
Décision Rémy requise : fournir un numéro dédié Annecy OU assumer la ligne partagée. Site
Annecy toujours noindex, donc aucun impact immédiat. Aucune modification côté Angers depuis
cette session (interdit).

**État : le site est prêt pour la validation visuelle finale de Rémy** (sous réserve de
l'arbitrage téléphone, des valeurs DEMO, de l'email/nom commercial et de l'assurance).

## 3nonies. VALIDATION SEO/GEO DES DRAFTS AUTOBLOG (26/07/2026, agent SEO)

Mission : trancher le sort des 10 drafts `content/drafts/001-010` conditionné par Rémy (§4bis),
en repartant de la cannibalisation détectée par le CEO en §3ter. Détail complet et tableaux dans
`docs/CALENDRIER-EDITORIAL.md` §1bis et §3 (mis à jour). Périmètre respecté : uniquement
`docs/`, aucun fichier `content/` touché.

**Qualité GEO : conforme sur les 10 drafts, aucune réécriture nécessaire.** Vérification
individuelle : réponse courte citable (2 phrases factuelles) après chaque H1, FAQ de 4 questions
en frontmatter sur chacun, zéro tiret cadratin (`grep` sur les 10 fichiers), zéro chiffre
inventé, `relatedServices` correct. Aucune cannibalisation avec les pages service existantes :
les 6 `content/services/*.json` ont des H1 transactionnels (« X à Annecy ») structurellement
distincts des titres informationnels longue traîne des drafts.

**Mapping tranché** :
- **001→#1, 002→#2, 008→#3, 009→#4, 003→#7, 004→#13 : validés tels quels**, titres identiques
  ou quasi identiques aux emplacements du calendrier.
- **007→#5 : validé comme #5, PAS découpé.** Le draft fusionne l'angle #5 (diagnostic avant
  vente) et l'ancien angle #46 (ce que vérifie le diagnostic, pourquoi il est obligatoire) en un
  article complet et cohérent : le découper après coup aurait gâché un travail déjà correct.
  **#46 reprogrammé** sur un angle procédural distinct (délai de remise du diagnostic à
  l'acheteur dans le processus de vente) pour ne pas dupliquer 007. **#14** (obligations
  *continues* du bailleur pendant la location, au-delà du diagnostic ponctuel) reste au
  calendrier sans changement, avec une note de différenciation renforcée pour la rédaction
  future : 007 ne fait qu'effleurer la location, #14 doit se concentrer sur ce que 007 ne couvre
  pas.
- **005→#8 : validé avec titre amendé.** Le calendrier prévoyait l'objet « prise/interrupteur »
  pour #8, le draft traite en réalité l'objet « tableau électrique » (protocole de sécurité
  différent : couper le disjoncteur général). Titre et requête cible de #8 corrigés dans le
  calendrier pour refléter fidèlement le contenu réel. Pas de doublon avec #7/003 (prise qui
  chauffe, qui cite déjà l'odeur de brûlé comme un signe parmi d'autres) : objets différents,
  couverture complémentaire.
- **006 et 010 intégrés formellement au calendrier**, numérotés #150 et #151 (hors quota des 149
  initiaux, pour ne pas décaler la numérotation déjà référencée en anti-cannibalisation). Sujets
  propres confirmés sans équivalent parmi les 149 titres.

**Résultat : les 10 drafts sont validés pour publication, aucune réécriture requise.** Seuls 2
titres du calendrier ont été ajustés (#8, #46) pour rester cohérents avec le contenu réel ;
`content/drafts/*.mdx` n'a pas été modifié (hors périmètre de cet agent).

**⚠️ Signalé pour la suite** : sur les 6 services, **`installation-electrique-neuve` (#6) reste
sans aucun article de lancement**, aucun des 10 drafts ne le couvre. C'est désormais le seul
service sans maillage entrant depuis le blog. **Priorité n°1 pour la prochaine session Autoblog**,
avant tout autre sujet du calendrier : rédiger #6 (« Installation électrique d'un garage ou d'une
dépendance : ce qu'il faut prévoir »).

**15 zones de cannibalisation au total** dans `docs/CALENDRIER-EDITORIAL.md` §3 (13 initiales + 2
ajoutées : #8 vs #7, #150 vs #16/#37).

**Non fait par cet agent** (hors périmètre `docs/`) : publication effective des drafts (renommage,
sortie de `content/drafts/`), rédaction de l'article #6. À faire par le CEO/Autoblog.
