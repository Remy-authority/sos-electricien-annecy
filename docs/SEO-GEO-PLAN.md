# SEO-GEO-PLAN.md — Feuille de route SEO & GEO — SOS Électricien Annecy

> Document de conception (agent SEO/GEO). Site pas encore construit : `content/services/*.json`
> et `content/zones/*.json` contiennent encore les données du pilote Angers (fuite d'eau), à
> réécrire intégralement par le Builder. Ce plan lui sert de brief : structure de pages, mots-clés
> par page, contenu de départ. Aucun fichier de code/contenu modifié par cet agent, périmètre
> strictement `docs/`.
> Date : 25/07/2026.

---

## 0. Verdict en une phrase

Le socle technique (canonical, sitemap, JSON-LD, robots.ts avec crawlers IA déjà autorisés
explicitement) est hérité du pilote et solide, **mais deux points techniques doivent être
corrigés par le Builder avant publication** : le schema `LocalBusiness` est câblé en dur sur
`'Plumber'` (`lib/seo.ts`, doit devenir `Electrician`), et le contenu à écrire doit couvrir
**6 pages service** et **jusqu'à 11 pages commune** (liste priorisée ci-dessous), avec une
nuance importante à respecter sur le statut administratif de plusieurs communes voisines
(§3).

---

## 1. CARTE DE MOTS-CLÉS PAR PAGE

### Accueil (`/`)
- **Principal** : électricien urgence Annecy
- **Secondaires** : dépannage électrique Annecy, électricien Annecy 24h/24, panne électrique
  Annecy, artisan électricien Annecy

### Services (`app/services/[slug]`, 6 pages à créer)

| Slug | Mot-clé principal | Mots-clés secondaires |
|---|---|---|
| `urgence-depannage-electrique` | électricien urgence Annecy | dépannage électrique urgence, panne de courant que faire, électricien 24h/24 7j/7 Annecy, coupure électrique nuit week-end |
| `recherche-panne-electrique` | recherche de panne électrique Annecy | disjoncteur qui saute sans arrêt, court-circuit maison, prise électrique qui ne fonctionne plus, coupure électrique localisée |
| `remise-aux-normes-tableau-electrique` | mise aux normes électriques Annecy | norme NF C 15-100, tableau électrique vétuste, disjoncteur différentiel obligatoire, mise en sécurité installation électrique |
| `renovation-electrique-complete` | rénovation électrique complète Annecy | refaire l'électricité d'une maison ancienne, installation électrique vétuste, câblage électrique maison, électricien maison ancienne |
| `mise-en-conformite-diagnostic-electrique` | mise en conformité électrique avant vente Annecy | diagnostic électrique obligatoire vente, état de l'installation intérieure d'électricité, mise en conformité électrique location |
| `installation-electrique-neuve` | installation électrique neuve Annecy | électricien construction neuve, installation électrique garage dépendance, câblage maison neuve, électricien extension maison |

**Note de choix** : ces 6 services couvrent dans l'ordre de priorité CLAUDE.md, urgence
(conversion immédiate), diagnostic/panne (cœur de métier récurrent), conformité réglementaire
(NF C 15-100, valeur de panier élevée, obligatoire), rénovation (gros chantiers, bâti ancien
savoyard fréquent), transaction immobilière (diagnostic électrique, déclencheur d'appel très
concret) et neuf (extension/dépendance, CPC correct, moins saisonnier que les autres).

### Zones (`app/zones/[slug]`)
Motif identique pour chaque commune, **principal** : « électricien à [Commune] » ou « dépannage
électrique [Commune] » ; **secondaires** : « panne électrique [Commune] ([CP]) », « électricien
urgence [Commune] ». Liste et priorités détaillées en §3.

### Conseils (`/conseils`)
Aucun article publié à ce jour (site neuf). Voir `docs/CALENDRIER-EDITORIAL.md` pour le plan de
publication complet, dont les 6 premiers sujets couvrent chacun des 6 services ci-dessus (règle
CLAUDE.md : chaque service doit avoir au moins un article de maillage entrant dès le T1).

---

## 2. ESTIMATION CPC / VALEUR DU LEAD

Reprise de l'estimation du benchmark portefeuille (`RENT & RANK/docs/BENCHMARK.md`, vague 2) :
**CPC estimé 6-10 €** sur les requêtes « électricien urgence » / « dépannage électrique ». Cette
estimation est qualitative (pas de donnée Google Ads Keyword Planner vérifiée en direct) ; elle
sert à prioriser l'ordre de rédaction, pas à être affichée sur le site. Les requêtes de mise aux
normes et de diagnostic avant vente ont probablement un CPC individuellement plus bas mais un
panier moyen de prestation plus élevé (chantier vs dépannage ponctuel) : les deux catégories
méritent un traitement éditorial soigné.

---

## 3. PAGES ZONES : LISTE PRIORISÉE ET NUANCE ADMINISTRATIVE IMPORTANTE

### ⚠️ À lire avant que le Builder n'écrive les pages communes

Depuis le 1ᵉʳ janvier 2017, **Annecy, Annecy-le-Vieux, Cran-Gevrier, Meythet, Pringy et Seynod
ont fusionné en une seule commune nouvelle : « Annecy »**. Les cinq anciennes communes ne sont
plus des communes autonomes, ce sont des **communes déléguées** (quartiers historiques avec leur
propre identité, code postal et vie locale, mais sans mairie de plein exercice ni maire propre).

**Conséquence pour le contenu** : ne jamais écrire « la commune d'Annecy-le-Vieux » ou « la ville
de Seynod » comme s'il s'agissait d'entités administratives séparées d'Annecy, ça serait une
inexactitude factuelle (interdit par la doctrine CLAUDE.md). Utiliser plutôt « le secteur
d'Annecy-le-Vieux », « le quartier de Seynod », « l'ancienne commune de Cran-Gevrier ». Ça
n'empêche PAS de leur consacrer une page dédiée : ce sont des secteurs à forte identité propre,
avec un volume de recherche local réel (habitants continuent de chercher « électricien
Annecy-le-Vieux », pas « électricien Annecy secteur nord-est »), exactement comme le pilote a
traité les quartiers d'Angers en tant que secteurs. La page doit juste être honnête sur le
statut.

### Tier 1 — secteurs à très fort volume (communes déléguées d'Annecy)

| Secteur | Statut | Population (ordre de grandeur) | Code postal |
|---|---|---|---|
| Annecy-le-Vieux | Commune déléguée d'Annecy depuis 2017 | ~21 000 hab. | 74940 |
| Seynod | Commune déléguée d'Annecy depuis 2017 | ~21 500 hab. | 74600 |
| Cran-Gevrier | Commune déléguée d'Annecy depuis 2017 | ~17 600 hab. | 74960 |
| Meythet | Commune déléguée d'Annecy depuis 2017 | ~8 500 hab. | 74960 (à confirmer) |

### Tier 1 — communes autonomes limitrophes à fort volume

| Commune | Statut | Population (ordre de grandeur) | Code postal |
|---|---|---|---|
| Poisy | Commune autonome, membre du Grand Annecy | ~8 800 hab. | 74330 |
| Épagny Metz-Tessy | Commune autonome (fusion Épagny + Metz-Tessy, 2016), membre du Grand Annecy | ~8 900 hab. | 74330 |
| Argonay | Commune autonome, membre du Grand Annecy | ~3 700 hab. | 74370 |

### Tier 2 — couverture complémentaire (volume moyen, à traiter après le Tier 1)

| Commune / secteur | Statut | Population (ordre de grandeur) | Code postal |
|---|---|---|---|
| Pringy | Commune déléguée d'Annecy depuis 2017 | ~4 200 hab. | 74370 (à confirmer) |
| Sevrier | Commune autonome, bord du lac d'Annecy | ~4 300 hab. | 74320 |
| Saint-Jorioz | Commune autonome, bord du lac d'Annecy | ~6 400 hab. | 74410 (à confirmer) |
| Veyrier-du-Lac | Commune autonome, bord du lac, secteur résidentiel haut de gamme | ~2 300 hab. | 74290 (à confirmer) |

### Tier 3 — non prioritaire à ce stade
Montagny-les-Lanches (~800 hab.), Quintal, Chavanod : communes trop petites pour justifier une
page dédiée dans l'immédiat. À citer en `neighbours` (maillage) sur les pages Tier 1/2
limitrophes plutôt qu'en pages propres, à réévaluer si un locataire futur en fait la demande.

**Recommandation de lancement** : les 7 pages Tier 1 en premier (elles couvrent la quasi-totalité
du Grand Annecy en volume de recherche), les 4 pages Tier 2 dans un second temps. Total
recommandé pour le lancement : **11 pages zones**, un ordre de grandeur cohérent avec les 6 pages
service (à comparer aux 8 zones du pilote Angers).

**Codes postaux marqués « à confirmer »** : vérifier sur La Poste ou le site de la mairie avant
publication (doctrine CLAUDE.md, aucune donnée non confirmée affichée). Les populations sont des
ordres de grandeur (dernier recensement disponible au moment de la rédaction de ce plan), à ne
jamais afficher comme chiffre exact sur le site sans les arrondir et sans en faire un argument
commercial ( pas de "1er électricien de la ville de X hab." ).

---

## 4. BACKLOG DE CONTENU PRIORISÉ POUR LE LANCEMENT (T1, premières semaines)

Site neuf : aucun article publié, donc pas de « trou de maillage » à combler comme sur le
pilote. La priorité est plutôt de garantir qu'**aucun des 6 services ne reste sans article
d'appui** dès les premières semaines. Le calendrier détaillé est dans
`docs/CALENDRIER-EDITORIAL.md` ; les 6 premiers articles (un par service) y sont positionnés en
semaine 1-2 de T1.

| Service sans maillage au lancement | Premier article prévu | Requête cible |
|---|---|---|
| `urgence-depannage-electrique` | Coupure de courant chez soi : que vérifier avant d'appeler un électricien | panne de courant que faire |
| `recherche-panne-electrique` | Disjoncteur qui saute sans arrêt : les causes les plus fréquentes | disjoncteur qui saute sans arrêt |
| `remise-aux-normes-tableau-electrique` | Tableau électrique ancien : les signes qu'il faut le remettre aux normes | tableau électrique vétuste signes |
| `renovation-electrique-complete` | Rénover l'électricité d'une maison ancienne : par où commencer | rénovation électrique maison ancienne |
| `mise-en-conformite-diagnostic-electrique` | Diagnostic électrique avant une vente : ce qu'il faut savoir | diagnostic électrique obligatoire vente |
| `installation-electrique-neuve` | Installation électrique d'un garage ou d'une dépendance : ce qu'il faut prévoir | installation électrique garage dépendance |

---

## 5. GEO / CITABILITÉ IA — EXIGENCES POUR LE BUILDER

Le socle technique hérité du pilote gère déjà bien le GEO (à vérifier une fois le contenu écrit) :

- **`robots.ts`** autorise déjà explicitement GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
  Claude-Web, PerplexityBot, Google-Extended, Applebot-Extended, en plus du `*` général. Rien à
  changer ici, c'est un acquis du template. ✅
- **JSON-LD** : `lib/seo.ts` génère déjà `FAQPage`, `BreadcrumbList`, `Service`, `Article`, et un
  `LocalBusiness`. **Un seul changement technique requis** : `'@type': 'Plumber'` (ligne ~82)
  doit devenir `'@type': 'Electrician'` (sous-type valide de `HomeAndConstructionBusiness` dans le
  vocabulaire schema.org), sinon le site électricien s'annonce comme plombier aux moteurs et aux
  IA. Point technique pour le Builder, pas pour cet agent (hors périmètre `docs/`).
- **Réponse courte citable** : chaque page service/zone doit avoir un bloc `intro` factuel de 2 à
  4 phrases juste après le H1 (convention déjà en place dans le schéma JSON du pilote, à
  reproduire). C'est le format que les IA extraient le plus facilement.
- **FAQ obligatoire** : 3 à 4 questions par page service/zone, via le champ `faq` du JSON (déjà
  câblé sur le composant `<Faq>` qui émet `FAQPage`). Voir `docs/CALENDRIER-EDITORIAL.md` §0 pour
  la même règle côté articles de blog (FAQ en frontmatter, pas dans le corps Markdown, dès le
  premier article, contrairement au pilote qui a dû corriger ça après coup).
- **`llms.txt`** : absent par défaut (hérité du pilote). Opportunité simple pour le Builder,
  fichier statique `public/llms.txt` résumant l'activité (électricien d'urgence Annecy et
  agglomération), les 6 services, la zone couverte, un lien vers le sitemap. Faible effort,
  bénéfice progressif pour la citabilité par les IA génératives.
- **Aucune fiche Google Business, aucun avis** : conforme à la doctrine, rien à faire de
  particulier ici, juste vigilance à ne jamais introduire d'`AggregateRating`/`Review` dans
  `lib/seo.ts` par erreur lors d'une future évolution.

---

## 6. CHECKLIST TECHNIQUE (état hérité du template, à vérifier une fois le contenu écrit)

| Point | État constaté (code actuel, contenu encore Angers) | Action Builder |
|---|---|---|
| Schema `LocalBusiness` | 🔴 Câblé en dur sur `'Plumber'` (`lib/seo.ts`) | Changer en `'Electrician'` |
| Canonical | ⚠️ À vérifier | `siteConfig.seo.canonicalBase` doit pointer sur `sos-electricien-annecy.fr` dès le domaine acheté et branché (voir ETAT.md, achat en attente de Rémy), Vercel en attendant |
| `public/og.png` | ⚠️ À vérifier | Le pilote avait ce bug (image OG absente) au même stade ; s'assurer qu'un `og.png` (1200×630) est bien généré pour ce site avant Gate C |
| Sitemap | ✅ Générique, fonctionne dès que `content/services` et `content/zones` sont réécrits | Rien à faire côté SEO |
| Robots.txt | ✅ Déjà configuré avec crawlers IA explicites + noindex preview | Rien à faire |
| Contenu `services/*.json`, `zones/*.json` | 🔴 Encore intégralement Angers/fuite d'eau | Réécrire selon §1 et §3 de ce plan |
| `config/site.config.ts` | 🔴 Encore Angers (téléphone, ville, `serviceArea.districts`) | À réécrire (identité électricien Annecy, `serviceArea.districts` = éventuels quartiers d'Annecy-ville historique à citer en maillage sans page dédiée, ex. Vieille Ville, Novel, Teppes, Les Romains) |
| `content/legal.json` | 🔴 Encore Angers | À réécrire avec les infos fournies par Rémy (SIREN réel, ne rien inventer) |

---

## 7. RÉSUMÉ POUR RÉMY

**6 pages service à créer** : dépannage électrique urgence, recherche de panne électrique, mise
aux normes du tableau électrique, rénovation électrique complète, diagnostic électrique avant
vente/location, installation électrique neuve.

**11 pages commune recommandées pour le lancement**, en deux vagues :
- Vague 1 (Tier 1, 7 pages) : Annecy-le-Vieux, Seynod, Cran-Gevrier, Meythet, Poisy, Épagny
  Metz-Tessy, Argonay.
- Vague 2 (Tier 2, 4 pages) : Pringy, Sevrier, Saint-Jorioz, Veyrier-du-Lac.

**Point d'attention à transmettre au Builder** : Annecy-le-Vieux, Seynod, Cran-Gevrier, Meythet
et Pringy ne sont plus des communes autonomes depuis 2017 (fusionnées dans « Annecy »), il faut
les présenter comme des secteurs/quartiers historiques, pas comme des villes séparées, pour
rester factuellement exact.

**Un seul vrai bug technique hérité du pilote à corriger** : le schema JSON-LD est câblé sur
`Plumber` au lieu d'`Electrician`.

Calendrier éditorial complet (12 mois, 6 premiers articles = un par service) dans
`docs/CALENDRIER-EDITORIAL.md`.
