# CALENDRIER-EDITORIAL.md : Calendrier éditorial Autoblog (12 mois) — SOS Électricien Annecy

> Document de conception (agent SEO/GEO). Aucun fichier de code/contenu modifié, périmètre
> strictement `docs/`. Date de rédaction : 25/07/2026. Site neuf : **aucun article publié à ce
> jour**, ce calendrier part donc de zéro (contrairement au pilote Angers qui avait 11 articles
> déjà en ligne au moment de son propre calendrier). Périmètre couvert : 12 mois à venir, cadence
> cible 3 articles/semaine (environ 149 articles), construit à partir de `docs/SEO-GEO-PLAN.md`
> (6 pages service, 11 pages commune).

---

## 0. RAPPEL DES EXIGENCES SEO/GEO POUR L'AUTOBLOG

À respecter sur **chaque** article, sans exception :

1. **Réponse courte citable en intro** : un paragraphe factuel de 2 à 4 phrases juste après le
   titre, qui répond directement à la requête cible, formaté pour être extractible par une IA
   (façon « En bref » des pages services/zones).
2. **FAQ de 3 à 4 questions** en frontmatter (`faq: [{q, a}]`), pas dans le corps Markdown, dès
   le premier article publié (le pilote a dû corriger ça après coup, ce site part directement sur
   la bonne convention). Câblée sur `<Faq>` qui émet le `FAQPage` JSON-LD.
3. **Aucun chiffre inventé** : ni durée d'intervention, ni tarif, ni statistique de panne, ni
   certification qui ne soit pas vérifiée. En cas de doute (délai légal, seuil réglementaire),
   formuler en ordre de grandeur qualitatif ou renvoyer vers la source officielle (Consuel, Enedis,
   service-public.fr) plutôt qu'inventer un chiffre.
4. **Maillage `relatedServices`** : 1 à 2 slugs de service pertinents en frontmatter, cohérents
   avec le sujet réel de l'article (pas de maillage forcé). Les 6 slugs disponibles :
   `urgence-depannage-electrique`, `recherche-panne-electrique`,
   `remise-aux-normes-tableau-electrique`, `renovation-electrique-complete`,
   `mise-en-conformite-diagnostic-electrique`, `installation-electrique-neuve`.
5. **Zéro tiret cadratin « — »** dans le texte visible (titre, description, corps, FAQ). Virgule
   ou point à la place (règle CLAUDE.md).
6. Contenu vrai, précis, local. Pas de bourrage de mots-clés, pas de remplissage. Toute mention
   de norme (NF C 15-100, disjoncteur différentiel 30 mA, Consuel) doit rester générale et
   pédagogique, jamais présentée comme un conseil réglementaire personnalisé, ce n'est pas une
   consultation.
7. **Nuance administrative** (rappel de `SEO-GEO-PLAN.md` §3) : ne jamais présenter
   Annecy-le-Vieux, Seynod, Cran-Gevrier, Meythet ou Pringy comme des communes séparées d'Annecy,
   ce sont des secteurs/quartiers historiques depuis la fusion de 2017. Formulation correcte :
   « le secteur d'Annecy-le-Vieux », pas « la commune d'Annecy-le-Vieux ».

---

## 1. BASE ANTI-DUPLICATION

Aucun article publié à ce jour. Ce calendrier lui-même devient la référence anti-duplication à
consulter avant chaque rédaction : vérifier qu'aucun titre déjà planifié plus haut dans ce
document ne vise la même requête principale qu'un titre en cours de rédaction.

Les 6 premiers articles (semaines 1-2 de T1) reprennent le backlog de lancement de
`docs/SEO-GEO-PLAN.md` §4 : un article par service, pour qu'aucune des 6 pages service ne reste
sans maillage entrant pendant les premières semaines de mise en ligne.

---

## 1bis. VALIDATION SEO/GEO DES 10 DRAFTS AUTOBLOG (26/07/2026)

L'Autoblog a rédigé 10 drafts (`content/drafts/001-010`) avant que ce calendrier n'existe, à
partir du brief générique de la mission. Comparaison systématique des 10 titres avec les 149
titres planifiés (déjà faite par le CEO en `docs/ETAT.md` §3ter), puis validation qualité GEO et
décision de mapping par l'agent SEO (ce document).

**Qualité GEO des 10 drafts : conforme, aucune réécriture nécessaire.** Vérification individuelle
des 10 fichiers : réponse courte citable de 2 phrases factuelles juste après le H1 sur chacun,
FAQ de 4 questions en frontmatter sur chacun (`faq: [{q, a}]`, jamais dans le corps Markdown),
zéro tiret cadratin (`grep` sur les 10 fichiers, aucune occurrence), zéro chiffre inventé (aucune
durée, tarif ni statistique affirmée sans source), `relatedServices` renseigné avec 2 slugs
pertinents sur les 6 définitifs. Aucune cannibalisation avec les pages service/zone existantes
vérifiée : les 6 pages `content/services/*.json` ont des H1/metaTitles transactionnels (« X à
Annecy », intention d'achat) structurellement distincts des titres informationnels des drafts
(longue traîne, intention de recherche), à l'image du pilote Angers où articles de blog et pages
service cohabitent sans concurrence de mots-clés.

**Mapping validé (5 des 6 articles de lancement déjà rédigés)** :

| Draft | # calendrier | Décision | Note |
|---|---|---|---|
| 001 | **#1** | Validé tel quel | Titre réel légèrement différent (« Panne de courant à la maison : ... »), même requête cible, aucun changement requis |
| 002 | **#2** | Validé tel quel | Titre strictement identique au calendrier |
| 008 | **#3** | Validé tel quel | Titre réel « Tableau électrique vétuste : les signes qu'il est temps de le remplacer », même requête cible |
| 009 | **#4** | Validé tel quel | Titre réel localisé « ... à Annecy », couverture éditoriale meilleure que prévu (bâti ancien centre historique + pavillons 1970-1980 nommément) |
| 007 | **#5** | Validé comme #5, **#46 reprogrammé** (voir T2) | Le draft fusionne l'angle #5 (diagnostic avant vente, ce qu'il faut savoir) et l'angle #46 (pourquoi le diagnostic est obligatoire et ce qu'il vérifie) en un seul article complet et cohérent. Découper après coup gâcherait un travail déjà correct : je le compte comme #5 et je retire #46 du calendrier (remplacé par un titre à angle réellement différent, voir T2). L'angle #14 (obligations *continues* du bailleur, au-delà du diagnostic ponctuel) reste distinct et n'est pas couvert par 007, donc **conservé sans changement**, avec une note de différenciation renforcée en §3. |
| 003 | **#7** | Validé, **titre calendrier inchangé** | Correspond exactement à #7 (« Prise électrique qui chauffe ») |
| 004 | **#13** | Validé tel quel | Correspond exactement à #13 (norme NF C 15-100) |
| 005 | **#8, avec amendement du titre calendrier** | Validé comme #8, titre corrigé | Le calendrier prévoyait #8 sur l'objet « prise ou interrupteur », le draft traite en réalité l'objet « tableau électrique ». Ce n'est pas un doublon de #7/003 (qui couvre déjà l'odeur de brûlé comme un signe parmi d'autres pour l'objet prise) : c'est un objet différent avec un protocole de sécurité différent (couper le disjoncteur général, ne pas s'approcher du tableau). Le titre #8 est corrigé ci-dessous en T1 pour refléter fidèlement le contenu réel, ce qui évite en plus tout besoin futur d'un article dédié « odeur de brûlé + prise », déjà couvert par 003. |
| 006 | **Nouveau #150** | Intégré hors quota | Sujet propre (comparatif disjoncteur/fusible/différentiel), aucun équivalent dans les 149 titres. Ajouté formellement en fin de T1, voir §2. |
| 010 | **Nouveau #151** | Intégré hors quota | Sujet propre (court-circuit), aucun équivalent dans les 149 titres. Ajouté formellement en fin de T1, voir §2. |

**Service resté sans article de lancement : `installation-electrique-neuve` (#6).** Aucun des 10
drafts ne le couvre. C'est désormais le seul des 6 services sans aucun maillage entrant depuis le
blog. **Priorité n°1 pour la prochaine session Autoblog** : rédiger #6 (« Installation électrique
d'un garage ou d'une dépendance : ce qu'il faut prévoir ») avant tout autre sujet du calendrier.

**Publication** : ce sont le CEO et l'Autoblog qui publient (renommage de fichiers, retrait de
`content/drafts/`), pas cet agent (périmètre `docs/` uniquement). Les 5 titres #1 à #5 ci-dessous
et en T1 reflètent désormais l'état validé pour publication.

---

## 2. CALENDRIER ÉDITORIAL (151 TITRES : 149 PLANIFIÉS + 2 AJOUTÉS HORS QUOTA, T1 À T4)

Découpage retenu (12 mois à partir de la date de rédaction) :

- **T1 : août à octobre 2026** (semaines 1 à 13). Fin d'été (orages, surtensions), rentrée,
  remise en route des chauffages électriques, dernières piscines de la saison.
- **T2 : novembre 2026 à janvier 2027** (semaines 14 à 26). Hiver, gel, surcharge de chauffage
  électrique, illuminations de Noël, absences pendant les fêtes.
- **T3 : février à avril 2027** (semaines 27 à 39). Sortie d'hiver, saison des rénovations et des
  ventes immobilières de printemps, remise en route des piscines.
- **T4 : mai à juillet 2027** (semaines 40 à 52). Été, climatisation, orages, chantiers extérieurs
  (terrasse, piscine, dépendance), avant les vacances.

Numérotation continue #1 à #149 (référencée en section 3, anti-cannibalisation).

### T1, août à octobre 2026 (37 titres planifiés + 2 ajoutés hors quota le 26/07/2026 = 39)

#### Articles de lancement (un par service, semaines 1-2)

| # | Titre | Requête cible | Intention | `relatedServices` | Statut (validé agent SEO 26/07/2026) |
|---|---|---|---|---|---|
| 1 | Coupure de courant chez soi : que vérifier avant d'appeler un électricien | panne de courant que faire | Transac | urgence-depannage-electrique | ✅ Publié via draft 001 |
| 2 | Disjoncteur qui saute sans arrêt : les causes les plus fréquentes | disjoncteur qui saute sans arrêt | Info | recherche-panne-electrique | ✅ Publié via draft 002 |
| 3 | Tableau électrique ancien : les signes qu'il faut le remettre aux normes | tableau électrique vétuste signes | Info | remise-aux-normes-tableau-electrique | ✅ Publié via draft 008 |
| 4 | Rénover l'électricité d'une maison ancienne : par où commencer | rénovation électrique maison ancienne | Info | renovation-electrique-complete | ✅ Publié via draft 009 |
| 5 | Diagnostic électrique avant une vente : ce qu'il faut savoir | diagnostic électrique obligatoire vente | Info | mise-en-conformite-diagnostic-electrique | ✅ Publié via draft 007 (fusionne aussi l'ex-#46, voir T2) |
| 6 | Installation électrique d'un garage ou d'une dépendance : ce qu'il faut prévoir | installation électrique garage dépendance | Transac | installation-electrique-neuve | 🔴 **Aucun draft ne le couvre. Seul service sans article de lancement. Priorité n°1 Autoblog.** |

#### Symptômes / diagnostic

| # | Titre | Requête cible | Intention | `relatedServices` | Statut |
|---|---|---|---|---|---|
| 7 | Prise électrique qui chauffe : un signe à ne jamais ignorer | prise électrique qui chauffe danger | Info | recherche-panne-electrique | ✅ Publié via draft 003 |
| 8 | Odeur de brûlé près du tableau électrique : que faire immédiatement *(titre amendé le 26/07/2026, objet initialement prévu « prise/interrupteur » remplacé par « tableau », voir §1bis)* | odeur de brûlé tableau électrique que faire | Transac | urgence-depannage-electrique | ✅ Publié via draft 005 |
| 9 | Lumière qui clignote ou vacille dans toute la maison : les causes possibles | lumière qui clignote maison cause | Info | recherche-panne-electrique | À rédiger |
| 10 | Étincelles en branchant un appareil : faut-il s'inquiéter ? | étincelles prise électrique branchement | Info | recherche-panne-electrique | À rédiger |
| 11 | Une seule pièce sans électricité alors que le reste de la maison fonctionne : comment le diagnostiquer | une pièce sans électricité cause | Info | recherche-panne-electrique | À rédiger |
| 12 | Fils électriques apparents ou dénudés : le risque et la marche à suivre | fils électriques dénudés danger | Info | remise-aux-normes-tableau-electrique | À rédiger |

#### Normes / réglementation

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 13 | Norme NF C 15-100 expliquée simplement : ce qu'elle impose vraiment | norme NF C 15-100 expliquée | Info | remise-aux-normes-tableau-electrique |
| 14 | Propriétaire bailleur : vos obligations sur l'installation électrique du logement loué | obligations propriétaire installation électrique location | Info | mise-en-conformite-diagnostic-electrique |
| 15 | Diagnostic électrique obligatoire pour une installation de plus de 15 ans : ce qu'il faut savoir | diagnostic électrique obligatoire installation ancienne | Info | mise-en-conformite-diagnostic-electrique |
| 16 | Disjoncteur différentiel 30 mA : pourquoi il est obligatoire dans chaque logement | disjoncteur différentiel 30 mA obligatoire | Info | remise-aux-normes-tableau-electrique |

#### Méthodes techniques

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 17 | Comment un électricien recherche une panne dans une installation invisible | comment électricien recherche panne | Info | recherche-panne-electrique |
| 18 | Multimètre, pince ampèremétrique, caméra thermique : les outils du diagnostic électrique | outils diagnostic électrique professionnel | Info | recherche-panne-electrique |
| 19 | Pourquoi une recherche de panne électrique ne nécessite pas toujours de casser un mur | recherche de panne électrique sans casser | Transac | recherche-panne-electrique |

#### Saisonnier

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 20 | Orages de fin d'été : pourquoi ils font sauter les installations électriques | orage fait sauter électricité maison | Info | urgence-depannage-electrique |
| 21 | Surtension après un orage : les bons réflexes pour protéger ses appareils | surtension orage que faire | Info | urgence-depannage-electrique |
| 22 | Rentrée : pourquoi c'est le bon moment pour faire vérifier son tableau électrique | vérifier tableau électrique rentrée | Info | remise-aux-normes-tableau-electrique |
| 23 | Remettre en route un chauffage électrique après l'été : les points à vérifier | remise en route chauffage électrique | Info | recherche-panne-electrique |
| 24 | Dernières piscines de la saison à Annecy : bien vérifier l'installation électrique avant l'hivernage | vérifier électricité piscine avant hivernage Annecy | Locale | remise-aux-normes-tableau-electrique |

#### Local Annecy / communes

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 25 | Chalets et maisons savoyardes anciennes : les points de vigilance électrique du bâti de montagne | électricité chalet ancien Haute-Savoie | Locale | renovation-electrique-complete |
| 26 | Vieille Ville d'Annecy : rénover l'électricité d'un appartement ancien sans dénaturer le bâti | rénovation électrique appartement ancien Annecy | Locale | renovation-electrique-complete |
| 27 | Résidences secondaires autour du lac d'Annecy : sécuriser l'installation électrique en votre absence | électricité résidence secondaire lac Annecy | Locale | urgence-depannage-electrique |
| 28 | Humidité et altitude en Haute-Savoie : un facteur à prendre en compte pour l'installation électrique | humidité altitude installation électrique | Locale | remise-aux-normes-tableau-electrique |

#### Sécurité électrique

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 29 | Électricité et salle de bain : les zones de sécurité à respecter absolument | norme électricité salle de bain zones | Info | remise-aux-normes-tableau-electrique |
| 30 | Enfants en bas âge : sécuriser les prises électriques de la maison | sécuriser prises électriques enfants | Info | remise-aux-normes-tableau-electrique |
| 31 | Risque d'incendie électrique : les signes avant-coureurs à ne jamais négliger | risque incendie électrique signes | Info | urgence-depannage-electrique |

#### Rénovation / tableau électrique

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 32 | Fusibles en porcelaine : pourquoi ce type de tableau électrique doit être remplacé | fusibles porcelaine tableau électrique remplacer | Info | remise-aux-normes-tableau-electrique |
| 33 | Combien de circuits électriques dans une rénovation complète : la logique derrière le tableau | circuits électriques rénovation logement | Info | renovation-electrique-complete |
| 34 | Rénover l'électricité sans refaire toute la maison : la rénovation par étapes | rénovation électrique par étapes | Transac | renovation-electrique-complete |

#### Urgence / pratique

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 35 | Panne EDF/Enedis ou panne interne au logement : comment faire la différence | panne EDF ou panne interne différence | Info | urgence-depannage-electrique |
| 36 | Disjoncteur qui ne réarme pas : que faire avant d'appeler un électricien | disjoncteur ne réarme pas que faire | Transac | urgence-depannage-electrique |

#### Comparatif / pilier

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 37 | Lexique de l'électricité domestique : les termes expliqués simplement | lexique électricité domestique | Info | recherche-panne-electrique |

#### Articles complémentaires validés hors quota (drafts 006 et 010, ajoutés le 26/07/2026)

Ces 2 titres n'appartenaient pas aux 149 titres planifiés initialement : les drafts correspondants
ont été rédigés par l'Autoblog sur des sujets propres (aucun équivalent trouvé dans le calendrier,
détail en §1bis), l'agent SEO les intègre donc formellement ici plutôt que de les laisser hors
calendrier. Numérotés à la suite (150, 151) pour ne pas décaler la numérotation #1 à #149 déjà
référencée en section 3 (anti-cannibalisation).

| # | Titre | Requête cible | Intention | `relatedServices` | Statut |
|---|---|---|---|---|---|
| 150 | Disjoncteur, fusible, interrupteur différentiel : quelles différences ? | disjoncteur fusible différentiel différence | Info | recherche-panne-electrique, remise-aux-normes-tableau-electrique | ✅ Publié via draft 006 |
| 151 | Court-circuit à la maison : comprendre ce qui se passe et sécuriser sans risque | court-circuit maison comprendre sécuriser | Info | urgence-depannage-electrique, recherche-panne-electrique | ✅ Publié via draft 010 |

### T2, novembre 2026 à janvier 2027 (40 titres)

#### Symptômes / diagnostic

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 38 | Chauffage électrique qui fait disjoncter : surcharge ou panne, comment distinguer | chauffage électrique fait disjoncter cause | Info | recherche-panne-electrique |
| 39 | Radiateur électrique qui ne chauffe plus : panne électrique ou appareil défectueux | radiateur électrique ne chauffe plus cause | Info | recherche-panne-electrique |
| 40 | Interrupteur qui ne répond plus : les causes possibles avant de le changer | interrupteur qui ne fonctionne plus cause | Info | recherche-panne-electrique |
| 41 | Compteur électrique qui disjoncte dès qu'on branche plusieurs appareils : surcharge de puissance | compteur disjoncte surcharge puissance | Info | remise-aux-normes-tableau-electrique |
| 42 | Ampoules qui grillent trop souvent : signe d'un problème de tension | ampoules grillent souvent cause | Info | recherche-panne-electrique |
| 43 | Prise qui ne fonctionne plus dans une seule pièce : la piste du disjoncteur divisionnaire | prise ne fonctionne plus pièce cause | Info | recherche-panne-electrique |
| 44 | Bruit de grésillement près du tableau électrique : un signal à prendre au sérieux | grésillement tableau électrique danger | Transac | urgence-depannage-electrique |
| 45 | Volets roulants électriques en panne : électricité ou moteur, comment savoir | volet roulant électrique en panne cause | Info | recherche-panne-electrique |

#### Normes / réglementation

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 46 | À quel moment de la vente le diagnostic électrique doit-il être remis à l'acheteur : le bon moment dans le processus *(reprogrammé le 26/07/2026, titre initial déjà couvert par le draft 007 publié en #5, voir §1bis)* | délai remise diagnostic électrique vente | Info | mise-en-conformite-diagnostic-electrique |
| 47 | Location saisonnière ou meublé de tourisme : les obligations électriques spécifiques | obligations électriques location meublée | Locale | mise-en-conformite-diagnostic-electrique |
| 48 | Attestation Consuel : dans quels cas elle est obligatoire pour une installation électrique | attestation Consuel obligatoire | Info | remise-aux-normes-tableau-electrique |
| 49 | Assurance habitation et sinistre électrique : ce qui est couvert et ce qui ne l'est pas | assurance habitation sinistre électrique couverture | Info | urgence-depannage-electrique |

#### Méthodes techniques

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 50 | Comment un électricien localise un fil coupé dans une cloison sans tout ouvrir | localiser fil coupé cloison méthode | Info | recherche-panne-electrique |
| 51 | Test de continuité et test d'isolement : à quoi servent ces vérifications électriques | test continuité isolement électricité | Info | recherche-panne-electrique |
| 52 | Pourquoi une installation électrique doit être mise hors tension avant toute intervention | mise hors tension avant intervention électricité | Info | urgence-depannage-electrique |

#### Saisonnier

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 53 | Illuminations de Noël : les précautions électriques avant de les brancher | précautions électriques illuminations Noël | Info | urgence-depannage-electrique |
| 54 | Chauffage électrique d'appoint : les précautions à prendre pour éviter la surcharge | précautions chauffage électrique appoint surcharge | Info | recherche-panne-electrique |
| 55 | Absence prolongée en hiver : sécuriser son installation électrique avant de partir | sécuriser électricité absence hiver | Info | urgence-depannage-electrique |
| 56 | Pic de consommation électrique en hiver : pourquoi certaines installations anciennes disjonctent davantage | pic consommation hiver disjoncte installation ancienne | Info | remise-aux-normes-tableau-electrique |
| 57 | Résidence secondaire à la montagne fermée l'hiver : les risques électriques à anticiper | résidence secondaire montagne électricité hiver | Locale | urgence-depannage-electrique |
| 58 | Vacances de fin d'année : le risque de surcharge électrique en logement occupé en continu | surcharge électrique vacances fin année | Info | recherche-panne-electrique |

#### Local Annecy / communes

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 59 | Habitat ancien du secteur d'Annecy-le-Vieux : les points de vigilance sur une installation électrique datée | installation électrique ancienne Annecy-le-Vieux | Locale | remise-aux-normes-tableau-electrique |
| 60 | Immeubles collectifs du secteur de Cran-Gevrier : particularités de l'installation électrique en copropriété | électricité copropriété Cran-Gevrier | Locale | remise-aux-normes-tableau-electrique |
| 61 | Pavillons des années 1970-1980 dans le secteur de Seynod : pourquoi leur tableau électrique mérite une vérification | tableau électrique ancien Seynod pavillon | Locale | remise-aux-normes-tableau-electrique |
| 62 | Climat de Haute-Savoie et gel : un facteur de risque pour les installations électriques extérieures | gel installation électrique extérieure Haute-Savoie | Locale | urgence-depannage-electrique |

#### Sécurité électrique

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 63 | Électrocution domestique : les gestes de premiers secours en attendant les secours | électrocution domestique premiers secours | Info | urgence-depannage-electrique |
| 64 | Détecteur de fumée et sécurité électrique : deux sujets liés mais différents | détecteur fumée sécurité électrique | Info | urgence-depannage-electrique |
| 65 | Rallonges et multiprises : les erreurs qui augmentent le risque d'incendie électrique | rallonge multiprise risque incendie électrique | Info | urgence-depannage-electrique |

#### Rénovation / tableau électrique

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 66 | Tableau électrique saturé : pourquoi on ne peut pas toujours ajouter un disjoncteur | tableau électrique saturé ajouter disjoncteur | Info | remise-aux-normes-tableau-electrique |
| 67 | Rénovation électrique et domotique : ce qu'il faut anticiper dès le tableau | rénovation électrique domotique anticiper | Info | renovation-electrique-complete |
| 68 | Mise à la terre absente ou défectueuse : un point de vigilance dans les logements anciens | mise à la terre défectueuse logement ancien | Info | remise-aux-normes-tableau-electrique |

#### Installation neuve

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 69 | Installation électrique d'une extension de maison : ce qu'il faut prévoir avec le tableau existant | installation électrique extension maison tableau | Info | installation-electrique-neuve |
| 70 | Raccordement électrique d'un abri de jardin ou d'un studio de jardin : les règles à respecter | raccordement électrique abri jardin studio | Info | installation-electrique-neuve |

#### Urgence / pratique

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 71 | Coupure de courant générale dans le quartier : comment savoir si c'est Enedis ou votre logement | coupure de courant quartier Enedis ou logement | Info | urgence-depannage-electrique |
| 72 | Électricien d'urgence la nuit ou un jour férié à Annecy : à quoi s'attendre | électricien urgence nuit jour férié Annecy | Locale | urgence-depannage-electrique |
| 73 | Odeur de gaz et panne électrique en même temps : la priorité absolue | odeur gaz et panne électrique simultanée | Info | urgence-depannage-electrique |

#### Comparatif / pilier

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 74 | Recherche de panne en urgence ou intervention programmée : comment savoir | recherche de panne urgence ou programmée | Info | recherche-panne-electrique, urgence-depannage-electrique |
| 75 | Artisan électricien indépendant ou grande enseigne : ce qui change concrètement | artisan électricien indépendant ou enseigne | Info | recherche-panne-electrique |
| 76 | Devis gratuit pour une intervention électrique à Annecy : à quoi s'attendre lors du premier appel | devis gratuit électricien Annecy premier appel | Locale | urgence-depannage-electrique |
| 77 | « Un fusible qui saute souvent, ce n'est pas grave » : le mythe qui coûte cher | fusible qui saute souvent pas grave mythe | Info | recherche-panne-electrique |

### T3, février à avril 2027 (37 titres)

#### Symptômes / diagnostic

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 78 | Plinthe ou bas de mur chaud au toucher : un signe possible de problème électrique sous-jacent | plinthe chaude signe électrique | Info | recherche-panne-electrique |
| 79 | Chauffage au sol électrique qui ne chauffe plus : les pistes de panne | chauffage au sol électrique en panne | Info | recherche-panne-electrique |
| 80 | Va-et-vient qui ne fonctionne plus correctement : câblage ou interrupteur | va-et-vient ne fonctionne plus cause | Info | recherche-panne-electrique |
| 81 | Tableau électrique qui chauffe anormalement : un signal à ne pas ignorer | tableau électrique qui chauffe danger | Transac | urgence-depannage-electrique |
| 82 | Prise de courant desserrée ou qui bouge : un risque électrique sous-estimé | prise électrique desserrée risque | Info | recherche-panne-electrique |
| 83 | Baisse de tension ponctuelle dans le logement : les causes possibles | baisse de tension logement cause | Info | recherche-panne-electrique |
| 84 | Four ou plaque de cuisson qui fait disjoncter : appareil ou installation, comment savoir | four plaque cuisson fait disjoncter | Info | recherche-panne-electrique |
| 85 | Prise en extérieur qui ne fonctionne plus après l'hiver : humidité et étanchéité | prise extérieure en panne après hiver | Info | recherche-panne-electrique |

#### Normes / réglementation

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 86 | Diagnostic électrique d'un appartement en copropriété avant la vente : les spécificités | diagnostic électrique copropriété vente | Info | mise-en-conformite-diagnostic-electrique |
| 87 | Que faire si le diagnostic électrique révèle une anomalie avant une vente | diagnostic électrique anomalie que faire vente | Info | mise-en-conformite-diagnostic-electrique |
| 88 | Mise en conformité électrique après un diagnostic défavorable : par où commencer | mise en conformité après diagnostic défavorable | Transac | mise-en-conformite-diagnostic-electrique |
| 89 | Durée de validité d'un diagnostic électrique : ce qu'il faut savoir avant une transaction | durée validité diagnostic électrique | Info | mise-en-conformite-diagnostic-electrique |
| 90 | Acheteur ou vendeur : qui doit financer la mise en conformité électrique révélée par le diagnostic | qui paie mise en conformité électrique vente | Info | mise-en-conformite-diagnostic-electrique |

#### Méthodes techniques

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 91 | Caméra thermique en électricité : détecter un point chaud avant qu'il ne devienne un problème | caméra thermique électricité point chaud | Info | recherche-panne-electrique |
| 92 | Schéma électrique d'une maison : à quoi il sert et pourquoi le conserver | schéma électrique maison utilité | Info | renovation-electrique-complete |
| 93 | Pourquoi certaines pannes électriques sont intermittentes et plus difficiles à localiser | panne électrique intermittente difficile localiser | Info | recherche-panne-electrique |

#### Saisonnier

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 94 | Sortie d'hiver : pourquoi c'est le bon moment pour planifier une rénovation électrique | rénovation électrique sortie hiver planifier | Info | renovation-electrique-complete |
| 95 | Remise en route de la piscine au printemps : vérifier l'installation électrique avant la saison | électricité piscine remise en route printemps | Info | remise-aux-normes-tableau-electrique |
| 96 | Entretien de printemps de l'installation électrique : les vérifications simples à faire chaque année | entretien printemps installation électrique | Info | remise-aux-normes-tableau-electrique |
| 97 | Après un orage de printemps : comment vérifier que l'installation électrique n'a pas été affectée | vérifier électricité après orage printemps | Info | urgence-depannage-electrique |
| 98 | Jardin et arrosage automatique électrique : les règles de sécurité à respecter | sécurité électrique arrosage automatique jardin | Info | installation-electrique-neuve |

#### Local Annecy / communes

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 99 | Poisy et ses lotissements récents : pourquoi le tableau électrique d'une maison de 20 ans mérite un contrôle | tableau électrique maison 20 ans Poisy | Locale | remise-aux-normes-tableau-electrique |
| 100 | Épagny Metz-Tessy, commune en forte croissance : la demande d'installations électriques neuves | installation électrique neuve Épagny Metz-Tessy | Locale | installation-electrique-neuve |
| 101 | Bord du lac d'Annecy à Sevrier et Saint-Jorioz : humidité et électricité, les précautions spécifiques | humidité électricité bord de lac Annecy | Locale | remise-aux-normes-tableau-electrique |
| 102 | Argonay et ses zones pavillonnaires : les besoins électriques d'une extension de maison | électricité extension maison Argonay | Locale | installation-electrique-neuve |

#### Sécurité électrique

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 103 | Habitation avec piscine : les règles électriques spécifiques autour du bassin | règles électriques piscine sécurité | Info | remise-aux-normes-tableau-electrique |
| 104 | Local technique ou cave humide : les précautions électriques à respecter | électricité local technique cave humide | Info | remise-aux-normes-tableau-electrique |
| 105 | Prises électriques extérieures : quelle protection contre l'humidité et les intempéries | prise électrique extérieure protection humidité | Info | installation-electrique-neuve |

#### Rénovation / tableau électrique

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 106 | Rénover l'électricité d'un appartement en copropriété : les démarches spécifiques | rénovation électrique appartement copropriété démarches | Info | renovation-electrique-complete |
| 107 | Combien de temps dure une rénovation électrique complète : le déroulé chantier par étapes | déroulé rénovation électrique complète étapes | Info | renovation-electrique-complete |
| 108 | Rénovation électrique et isolation : pourquoi coordonner les deux chantiers | rénovation électrique isolation coordination | Info | renovation-electrique-complete |

#### Urgence / pratique

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 109 | Disjoncteur général introuvable en urgence : où le chercher dans une maison | disjoncteur général introuvable urgence | Transac | urgence-depannage-electrique |
| 110 | Électricien en urgence un dimanche à Annecy : à quoi s'attendre côté délai | électricien urgence dimanche Annecy délai | Locale | urgence-depannage-electrique |

#### Comparatif / pilier

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 111 | Recherche de panne en appartement : les spécificités par rapport à une maison individuelle | recherche de panne appartement spécificités | Info | recherche-panne-electrique |
| 112 | Recherche de panne en maison ancienne ou en maison récente : ce qui change | recherche de panne maison ancienne récente | Info | recherche-panne-electrique |
| 113 | Panorama des obligations réglementaires en électricité domestique en France | obligations réglementaires électricité domestique France | Info | remise-aux-normes-tableau-electrique |
| 114 | Check-list avant l'arrivée de l'électricien : ce qu'il faut préparer pour l'intervention | checklist avant intervention électricien | Transac | urgence-depannage-electrique |

### T4, mai à juillet 2027 (35 titres)

#### Symptômes / diagnostic

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 115 | Climatiseur qui fait disjoncter : appareil ou installation électrique insuffisante | climatiseur fait disjoncter cause | Info | recherche-panne-electrique |
| 116 | Odeur de plastique chaud près d'une multiprise : le réflexe à avoir immédiatement | odeur plastique chaud multiprise danger | Transac | urgence-depannage-electrique |
| 117 | Volets roulants ou portail électrique en panne l'été : électricité ou automatisme | portail électrique en panne cause | Info | recherche-panne-electrique |
| 118 | Pompe de piscine qui ne démarre plus : panne électrique ou pompe défectueuse | pompe piscine ne démarre plus cause | Info | recherche-panne-electrique |
| 119 | Baisse de puissance générale en été avec la climatisation branchée : un signe de sous-dimensionnement | baisse puissance été climatisation sous-dimensionnement | Info | remise-aux-normes-tableau-electrique |
| 120 | Prise USB ou chargeur qui fait disjoncter : un cas particulier à connaître | prise USB chargeur fait disjoncter | Info | recherche-panne-electrique |
| 121 | Éclairage extérieur de jardin qui ne fonctionne plus : les causes les plus courantes | éclairage extérieur jardin en panne cause | Info | recherche-panne-electrique |

#### Normes / réglementation

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 122 | Vendre un logement après des travaux électriques : ce qu'il faut déclarer à l'acheteur | vendre logement après travaux électriques déclaration | Info | mise-en-conformite-diagnostic-electrique |
| 123 | Location meublée et mise en conformité électrique : ce que le bailleur doit garantir | mise en conformité électrique location meublée bailleur | Info | mise-en-conformite-diagnostic-electrique |
| 124 | Installation électrique et local professionnel : particularités réglementaires à connaître | installation électrique local professionnel réglementation | Info | installation-electrique-neuve |

#### Méthodes techniques

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 125 | Rapport d'intervention électrique : ce qu'il contient et à quoi il sert pour une assurance | rapport intervention électrique contenu assurance | Info | recherche-panne-electrique |
| 126 | Détection de panne sans compteur divisionnaire : comment un électricien isole le circuit en cause | détection panne sans compteur divisionnaire | Info | recherche-panne-electrique |
| 127 | Pourquoi une seule visite ne suffit pas toujours pour une panne électrique complexe | une seule visite panne électrique complexe | Info | recherche-panne-electrique |

#### Saisonnier

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 128 | Canicule et climatisation : pourquoi les installations électriques sont plus sollicitées en été | canicule climatisation installation électrique sollicitée | Info | remise-aux-normes-tableau-electrique |
| 129 | Partir en vacances l'esprit tranquille : sécuriser son installation électrique avant de partir | sécuriser installation électrique avant vacances été | Info | urgence-depannage-electrique |
| 130 | Orages d'été en Haute-Savoie : pourquoi ils sont plus fréquents et comment protéger ses appareils | orages été Haute-Savoie protéger appareils électriques | Locale | urgence-depannage-electrique |

#### Local Annecy / communes

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 131 | Constructions neuves autour du Grand Annecy : la demande croissante d'installations électriques aux dernières normes | construction neuve installation électrique Grand Annecy | Locale | installation-electrique-neuve |
| 132 | Chalets d'alpage et électricité en Haute-Savoie : les spécificités d'un raccordement en zone isolée | électricité chalet alpage Haute-Savoie raccordement | Locale | installation-electrique-neuve |
| 133 | Bâti ancien en pierre autour d'Annecy : concilier rénovation électrique et patrimoine | rénovation électrique bâti ancien pierre Annecy | Locale | renovation-electrique-complete |
| 134 | Zones proches du lac d'Annecy : précautions électriques spécifiques pour les habitations proches de l'eau | électricité habitation bord de lac Annecy | Locale | remise-aux-normes-tableau-electrique |

#### Sécurité électrique

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 135 | Terrasse et éclairage extérieur : les règles électriques pour une installation en extérieur sécurisée | électricité terrasse extérieur sécurité | Info | installation-electrique-neuve |
| 136 | Spa ou jacuzzi extérieur : les règles électriques spécifiques à respecter | électricité spa jacuzzi extérieur règles | Info | installation-electrique-neuve |
| 137 | Enfants et piscine : sécurité électrique des équipements autour du bassin en été | sécurité électrique piscine enfants été | Info | remise-aux-normes-tableau-electrique |

#### Installation neuve

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 138 | Borne de recharge pour véhicule électrique à domicile : ce qu'implique son installation sur le tableau existant | installation borne recharge véhicule électrique maison | Transac | installation-electrique-neuve |
| 139 | Installation électrique d'une véranda ou d'un garage transformé en pièce de vie | électricité véranda garage aménagé | Info | installation-electrique-neuve |
| 140 | Panneaux solaires et installation électrique existante : ce qu'il faut anticiper avant les travaux | panneaux solaires installation électrique anticiper | Info | installation-electrique-neuve |
| 141 | Studio de jardin ou pool house : raccorder l'électricité d'une dépendance en toute sécurité | raccordement électrique pool house dépendance | Info | installation-electrique-neuve |
| 142 | Extension de maison : coordonner l'installation électrique avec le reste des travaux | coordination installation électrique extension travaux | Info | installation-electrique-neuve |

#### Rénovation / tableau électrique

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 143 | Rénovation électrique et revente : quel impact sur la valeur d'un bien immobilier | rénovation électrique impact valeur bien immobilier | Info | renovation-electrique-complete |
| 144 | Rénover l'électricité avant de louer : ce qui rassure les futurs locataires | rénover électricité avant location | Transac | mise-en-conformite-diagnostic-electrique, renovation-electrique-complete |

#### Urgence / pratique

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 145 | Coupure de courant pendant un événement ou une réception à domicile : la solution de repli en urgence | coupure électricité pendant réception domicile | Transac | urgence-depannage-electrique |

#### Comparatif / pilier

| # | Titre | Requête cible | Intention | `relatedServices` |
|---|---|---|---|---|
| 146 | Recherche de panne dans une maison entière : comment s'organise l'intervention | recherche de panne maison entière organisation | Info | recherche-panne-electrique |
| 147 | Devis d'installation électrique refusé par une assurance ou un diagnostiqueur : les erreurs à éviter en amont | devis installation électrique refusé assurance erreurs | Info | remise-aux-normes-tableau-electrique |
| 148 | Les qualifications reconnues en électricité (Qualifélec, IRVE) : ce qu'il faut savoir avant de choisir un prestataire | qualification Qualifélec IRVE choisir électricien | Info | recherche-panne-electrique |
| 149 | « Un vieux tableau électrique, ça tient encore » : le mythe qui coûte cher en assurance | vieux tableau électrique tient encore mythe | Info | remise-aux-normes-tableau-electrique |

---

## 3. RÈGLES ANTI-CANNIBALISATION ET ZONES À RISQUE

### Règle générale

Avant rédaction, l'Autoblog vérifie systématiquement : (1) le calendrier ci-dessus dans son
intégralité (aucun article publié à comparer pour l'instant, mais la règle reste active pour les
publications futures), (2) les titres déjà publiés au moment de la rédaction. Si deux titres
visent une requête trop proche, soit on fusionne les deux en un seul article plus complet, soit on
différencie explicitement l'angle (étape du parcours client, objet précis, saison, échelle
individuelle/collective) et on le mentionne dans l'intro de l'article le plus tardif.

### Zones à risque identifiées dans ce calendrier

| Titres concernés | Nature du risque | Différenciation retenue |
|---|---|---|
| #5 (publié, draft 007), #46 (reprogrammé), #86, #87, #89, #90 | Diagnostic électrique avant vente, plusieurs angles | **Mise à jour 26/07/2026** : #5 est publié (draft 007) et couvre déjà entièrement l'ancien angle #46 (« pourquoi le diagnostic est obligatoire et ce qu'il vérifie ») ; #46 a donc été reprogrammé sur un angle procédural distinct (délai de remise à l'acheteur), voir T2. Angles restants à respecter à la rédaction : #86 = spécificité copropriété. #87 = que faire après une anomalie détectée. #89 = durée de validité, angle calendaire. #90 = qui paie la mise en conformité, angle financier. Toujours comparer tout nouvel article de ce cluster à 007/#5 avant rédaction, pas seulement aux titres du calendrier. |
| #13, #48, #113 | Trio réglementaire général | #13 = la norme NF C 15-100 elle-même (contenu technique). #48 = l'attestation Consuel (document, pas la norme). #113 = panorama global de toutes les obligations (page pilier qui renvoie vers les deux autres plutôt que de les redévelopper). |
| #35 vs #71 | Même thème « panne EDF/Enedis ou panne interne » | #35 = angle diagnostic individuel (comment savoir chez soi). #71 = angle collectif (coupure affectant tout un quartier). Si le recoupement est trop fort à la rédaction, fusionner en un seul article. |
| #27, #55, #57, #129 | Quatuor « sécuriser l'électricité en cas d'absence » | #27 = résidence secondaire au bord du lac, toute saison. #55 = absence hivernale courte à moyenne, tout logement. #57 = résidence secondaire montagne fermée spécifiquement l'hiver (risque gel). #129 = absence estivale, checklist générale avant vacances. Différenciés par durée, saison et type de bien ; à rédiger dans cet ordre pour maillage croisé sans répétition. |
| #22 vs #96 | Paire saisonnière volontaire, même structure | Différenciés par la saison (vérification de rentrée en septembre vs entretien de sortie d'hiver au printemps) : format similaire assumé, contenu et exemples doivent rester spécifiques à la saison concernée, à l'image de la paire équivalente du pilote Angers. |
| #72 vs #110 | Même thème urgence + horaires atypiques + local Annecy | #72 = nuit et jours fériés en général (à qui s'adresser). #110 = spécifiquement le dimanche, angle délai. Si la rédaction fait ressortir un recoupement trop fort, fusionner les deux en un seul article. |
| #38, #54, #56 | Trio chauffage électrique / surcharge | #38 = diagnostic quand le chauffage fait disjoncter (symptôme précis). #54 = précautions avec un chauffage d'appoint (préventif, matériel mobile). #56 = angle saisonnier global (pic de consommation hiver sur installation ancienne). Rédiger dans cet ordre pour permettre le maillage croisé sans répétition. |
| #41, #66, #119 | Trio « puissance insuffisante / tableau saturé » | #41 = symptôme (le compteur disjoncte avec plusieurs appareils). #66 = angle rénovation (pourquoi on ne peut pas juste ajouter un disjoncteur). #119 = angle saisonnier été (climatisation). Chacun garde un contexte déclencheur différent. |
| #33, #92, #107 | Trio rénovation électrique, angle technique | #33 = logique du nombre de circuits (dimensionnement). #92 = le schéma électrique en tant que document (utilité, conservation). #107 = déroulé chronologique du chantier (étapes). Trois objets distincts (dimensionnement, document, planning), pas une redite. |
| #14, #123, #144, (et 007/#5 publié) | Trio bailleur / location et électricité | #14 = obligations légales *continues* du propriétaire bailleur pendant toute la durée de la location (entretien, décence du logement), pas seulement l'obligation ponctuelle de diagnostic déjà couverte par le draft 007/#5 publié, qui ne fait qu'effleurer la location en comparaison de la vente. #123 = cas spécifique de la location meublée. #144 = angle rénovation avant mise en location (argument commercial pour le bailleur, pas les obligations). **Point de vigilance ajouté le 26/07/2026** : à la rédaction de #14, bien vérifier le contenu déjà publié de 007 pour ne pas répéter sa partie sur le diagnostic et se concentrer sur les obligations qui vont au-delà. À garder distincts, avec renvoi croisé plutôt que fusion. |
| #111, #112, #146 | Trio « organisation de la recherche de panne » | #111 = spécificités appartement (vs maison). #112 = ancien vs récent (âge du bâti). #146 = organisation logistique d'une intervention sur une maison entière (déroulé du jour J, pas le type de bien). Si la rédaction fait ressortir trop de contenu commun entre #111 et #146, fusionner. |
| #91 vs #18 | Même outil (caméra thermique) mentionné deux fois | #18 = présentation générale des outils de diagnostic (caméra thermique parmi d'autres). #91 doit se concentrer strictement sur le cas d'usage « point chaud électrique » et ne pas redévelopper la présentation générale de l'outil déjà faite dans #18. |
| #138 (borne de recharge) | Sujet en tendance, risque de sur-promettre une compétence non confirmée | À rédiger uniquement sur l'angle générique « ce qu'implique une installation sur le tableau existant » (dimensionnement, protection dédiée), sans jamais affirmer une certification IRVE si Rémy ne l'a pas confirmée pour le locataire du site. Mentionner la qualification IRVE comme un critère à vérifier auprès du prestataire (cf. #148), pas comme un acquis du site. |
| #8 (publié, draft 005) vs #7 (publié, draft 003) | Même déclencheur « odeur de brûlé » évoqué dans les deux, objets différents | **Ajouté le 26/07/2026** : #7/003 traite l'objet « prise qui chauffe » et cite l'odeur de brûlé comme un signe parmi d'autres. #8/005 traite spécifiquement l'objet « tableau électrique » avec un protocole de sécurité dédié (couper le disjoncteur général, ne pas s'approcher). Les deux sont publiés et suffisent à couvrir le sujet « odeur de brûlé » : ne pas commander un troisième article sur ce déclencheur pour un autre objet (ex. « odeur de brûlé + interrupteur ») sans un angle vraiment nouveau. |
| #150 (draft 006) vs #16, #37 | Le comparatif disjoncteur/fusible/différentiel recoupe deux titres du calendrier | **Ajouté le 26/07/2026** : #16 traite uniquement le différentiel 30 mA (un seul des 3 dispositifs, angle obligation réglementaire). #37 est un lexique généraliste de tous les termes de l'électricité domestique (pas un comparatif approfondi des 3 dispositifs de protection). #150/006 reste distinct : c'est le seul article qui compare les 3 dispositifs entre eux en détail. Si #37 est rédigé plus tard, son entrée « différentiel » doit renvoyer vers #150 plutôt que de le réexpliquer. |

### Règle de vigilance continue

À chaque nouvelle série d'articles, l'Autoblog doit relire ce tableau et l'enrichir : tout titre
futur qui recoupe un thème déjà listé ici (ou publié) doit être explicitement différencié avant
rédaction, avec la même logique (étape du parcours, objet précis, saison, échelle individuelle ou
collective).

---

## 4. MIX THÉMATIQUE (VÉRIFICATION DE L'ÉQUILIBRE)

Répartition des 151 titres (149 planifiés + 150/006 et 151/010 ajoutés le 26/07/2026) par grande
famille, tous trimestres confondus :

| Famille | Nombre de titres | Part |
|---|---|---|
| Symptômes / diagnostic | 31 | 21 % |
| Saisonnier | 19 | 13 % |
| Normes / réglementation | 18 | 12 % |
| Local Annecy / communes | 16 | 11 % |
| Comparatif / pilier / mythes | 14 | 9 % |
| Méthodes techniques | 12 | 8 % |
| Sécurité électrique | 12 | 8 % |
| Rénovation / tableau électrique | 12 | 8 % |
| Urgence / pratique | 9 | 6 % |
| Installation neuve | 8 | 5 % |

Chaque trimestre mélange systématiquement symptômes, normes, méthodes, saisonnier et local (voir
sous-titres dans les tableaux de la section 2) : aucun trimestre n'est mono-thématique. Les
sujets saisonniers sont calés au bon trimestre (orages et rentrée en T1, gel et absences
hivernales en T2, sortie d'hiver et rénovation de printemps en T3, climatisation et chantiers
extérieurs en T4). La famille « Installation neuve » monte en puissance en T4 (chantiers d'été,
bornes de recharge, dépendances) pour accompagner la haute saison des travaux extérieurs.

---

## 5. RÉSUMÉ

- **Fichier livré** : `docs/CALENDRIER-EDITORIAL.md` (ce fichier). Aucun autre fichier modifié.
- **Base anti-duplication** : mise à jour le 26/07/2026 suite à la validation des 10 drafts
  Autoblog (`content/drafts/001-010`, détail en §1bis). 7 titres sont désormais publiés (#1, #2,
  #3, #4, #5, #150, #151), 2 titres ont été amendés pour rester exacts ou distincts (#8 : objet
  corrigé prise→tableau ; #46 : reprogrammé sur un angle procédural après fusion dans #5).
- **Nombre de titres par trimestre** (149 planifiés + 2 ajoutés hors quota) :
  - T1 (août à octobre 2026) : **37 titres planifiés + 2 ajoutés (#150, #151) = 39**
  - T2 (novembre 2026 à janvier 2027) : **40 titres**
  - T3 (février à avril 2027) : **37 titres**
  - T4 (mai à juillet 2027) : **35 titres**
  - **Total : 151 titres**, cadence 3/semaine tenue sur 12 mois.
- **15 zones de risque de cannibalisation** signalées explicitement en section 3 (13 initiales +
  2 ajoutées le 26/07/2026 sur #8/#7 et #150/#16-#37), avec la différenciation d'angle à respecter
  pour chacune (ou la fusion recommandée si le recoupement s'avère trop fort à la rédaction).
- **Service sans article de lancement** : `installation-electrique-neuve` (#6). Aucun draft ne le
  couvre, c'est la priorité n°1 de la prochaine session Autoblog.

Rémy, les 10 drafts (001 à 010) sont validés SEO/GEO et peuvent être publiés tels quels par le
CEO/Autoblog : aucun ne nécessite de réécriture. Seuls deux titres du calendrier (#8 et #46) ont
été ajustés pour rester cohérents avec le contenu réel publié, le contenu des fichiers `.mdx`
lui-même n'a pas été touché (hors périmètre `docs/` de cet agent). Prochaine tâche Autoblog :
rédiger l'article de lancement #6 (`installation-electrique-neuve`), seul service encore sans
maillage entrant. Aucune écriture hors `docs/CALENDRIER-EDITORIAL.md`.
