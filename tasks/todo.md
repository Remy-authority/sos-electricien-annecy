# tasks/todo.md — SOS Électricien Annecy

> État opérationnel courant. La checklist de référence complète vit dans `docs/ETAT.md`.

## Session du 26/07/2026 (Builder, retouches post-validation Rémy)

- [x] USP « Assurance décennale » supprimée, remplacée par « Rappel sous 30 min » ;
  `usps[1]` inchangé, badge TrustBadges vérifié sur le rendu
- [x] `content/legal.json` : ligne « couverture » retirée, bloc assurance de
  /mentions-legales masqué tant qu'aucune police n'est renseignée
- [x] Rayon 20 → 30 km : 34 remplacements, 18 fichiers, re-grep à 0
- [x] H2 des sections claires en navy via la règle de base CSS ; audit de contraste refait
  et étendu à la page d'article : 0 échec AA sur 8 pages
- [x] `BoltDivider` mis en service entre les blocs des 6 pages service
- [x] Build vert 35 pages, 0 erreur console, 0 débordement 320→1440 px, consigné en §3undecies
- [x] Rien commité (contrôle CEO d'abord)

## Session du 26/07/2026 (Builder, 3 corrections visuelles Rémy, site en production)

- [x] 11 photos héro uniques par commune (`public/zones/<slug>.jpg`), cohérentes avec le
  caractère réel du lieu, série homogène ; mapping avec détection du fichier sur disque
  et ancien pool en filet de sécurité ; image de corps et sa position variées par commune
- [x] Logo : « ANNECY » en ambre de la DA via le token, éclair plus coupé, tracé unifié sur
  `BOLT_PATH` (logo + favicon), header/footer/logo.svg/favicon vérifiés en capture zoomée
- [x] `BoltWatermark` supprimé des 5 emplacements + du composant
- [x] Build vert, 11 pages zones ouvertes et comparées, 0 erreur console, 0 débordement
- [x] Rien commité (contrôle CEO d'abord)

## À traiter par le CEO après contrôle

- [ ] Arbitrage possible : 4e USP « Rappel sous 30 min » ou retour à 3 USP
- [ ] `content/drafts/011-installation-electrique-garage-dependance.mdx` existe en local mais
  n'est PAS suivi par git : c'est l'article de lancement #6, à contrôler et mettre en file
- [x] Détail hub blog : date des cartes /conseils formatée en français, `formatDateFr`
  mutualisée dans `lib/text.ts`, fait le 26/07/2026 (§3terdecies)

## Décisions attendues de Rémy

- [ ] Email + nom commercial (téléphone déjà intégré : 07 56 85 31 25, ligne partagée assumée)
- [ ] Achat domaine : payé sur OVH le 26/07, commande à confirmer (AFNIC encore NOT FOUND)
- [ ] Références d'assurance de l'artisan locataire (à la location, pas maintenant)

## Points ouverts

- [ ] Autoblog : article de lancement #6 (installation-electrique-neuve), priorité n°1
- [ ] Mise en ligne (Étape 6) : retrait de `SEO_NOINDEX=1` + DNS, sur validation Rémy

## Mise à jour du 25/09/2026 (CEO Opus 5.5, règle tasks/regle-mise-a-jour-site.md)

### État des lieux Search Console (28 j au 25/09 : 1 056 vues, 1 clic ; source cockpit/data/gsc)

**Liste 1, pages vues 10 fois ou plus sans clic (titre ET description à réécrire)**
- [ ] /zones/cran-gevrier : 128 vues, position 30.2
- [ ] /services/mise-en-conformite-diagnostic-electrique : 102 vues, position 57.4
- [ ] /contact : 93 vues, position 67.8
- [ ] /conseils/lumiere-qui-clignote-cause : 87 vues, position 4.7
- [ ] /zones/seynod : 84 vues, position 23.1
- [ ] /services/installation-electrique-neuve : 78 vues, position 75.3
- [ ] /zones/meythet : 60 vues, position 17.2
- [ ] /services/renovation-electrique-complete : 54 vues, position 72.5
- [ ] /zones/epagny-metz-tessy : 54 vues, position 29.4
- [ ] /zones : 50 vues, position 46.1
- [ ] /conseils/surtension-apres-orage-que-faire : 49 vues, position 10.2
- [ ] /services/recherche-panne-electrique : 48 vues, position 57.2
- [ ] /zones/sevrier : 37 vues, position 55.6
- [ ] /conseils/disjoncteur-fusible-differentiel-differences : 19 vues, position 7.3
- [ ] /zones/poisy : 19 vues, position 56.4
- [ ] /conseils/installation-electrique-garage-dependance : 13 vues, position 26.5

**Liste 2, gains rapides (requêtes en position 5 à 30, 28 j)**
- [ ] « remise aux normes électrique à meythet » : 33 vues, position 20.3
- [ ] « remise aux normes électrique à seynod » : 33 vues, position 5.8
- [ ] « remise aux normes électrique à cran-gevrier » : 29 vues, position 12.1
- [ ] « dépannage électrique à cran-gevrier » : 28 vues, position 13.6
- [ ] « dépannage électrique à meythet » : 25 vues, position 19.2
- [ ] « dépannage électrique à seynod » : 25 vues, position 17.6
- [ ] « électricien à cran-gevrier » : 25 vues, position 19.1
- [ ] « électricien à epagny metz-tessy » : 19 vues, position 23.3
- [ ] « dépannage électrique à epagny metz-tessy » : 17 vues, position 18.1

**Liste 3, requêtes de prix, coût, devis** : aucune sur 28 et 90 jours. La page /tarifs sert à en créer.

**Liste 4, page PILIER** : /zones/cran-gevrier (128 vues, position 30,2), puis Seynod (84), Meythet (60), Épagny Metz-Tessy (54).

**Défauts vus au curl et en capture (production, 25/09)**
- /tarifs répond 404 et sert le title de l'accueil.
- Personne fictive « Julien Perret » avec photo générée (bloc À propos), chiffres inventés (+400 pannes, 8 ans), certifications auto-attribuées (« électricien certifié, habilitation à jour », « artisan certifié indépendant »), garantie « panne réparée ou nous revenons 100 % », « réponse garantie en 30 min », « déplacement et diagnostic gratuits », réalisations présentées comme vraies : tout est à retirer ou reformuler (règle absolue, correction d'office).
- Numéro affiché 04 65 71 00 74 : marqué DEMO, absent de tasks/annuaire-09.json, décision de Rémy attendue.
- Série sur la production : design ECHEC (voile du bloc 1 à 0,92, 451 caractères au bloc 1, aucun schéma, colonne décalée, 11 zones pour une promesse large), blocs-pages ECHEC (11 zones sans visuel de corps), navigation ECHEC (aucun menu déroulant, contact sans FAQ ni prestations), visuels-articles OK (37 publiés, 42 brouillons).
- Pied de page mobile long, sans volets ; texte du bloc 1 mobile aligné à gauche.
- Photo « réalisations » salle de bain : prise allemande à griffes (type F), à remplacer.

**Décisions de Rémy (25/09/2026, questions du début)**
- Téléphone : ACHETER un 09 dédié (GO achat explicite), renvoyé comme les autres sites.
- Ordinateur : corriger les 5 points du contrôle design + 2 menus déroulants, avant/après soumis au GO.
- 12e commune : Rumilly (74225, 16 442 hab., geo.api.gouv.fr).
- Mesure DataForSEO « électricien annecy » et variantes : OK (~0,10 $).
- Note AVANT : 0/10 (1 ❌ 2 ❌ 3 ❌ 4 ❌ 5 ❌ 6 ❌ 7 ❌ 8 ❌ 9 ❌ 10 ❌).
- Téléphone (2e question, 25/09) : stock Twilio de 09 VIDE ; Rémy choisit de PRENDRE LE 09 DE BEAUVAIS (09 39 20 03 38, +33939200338, 0 appel, 1 clic/28 j). À faire au GO : config + legal.json d'Annecy, Beauvais à `phone: ''` (+ legal.json), Twilio friendly_name, annuaire-09.json, sites.json des deux, check-twilio CODE 0.
- Requête d'argent mesurée : « électricien annecy » 590/mois, CPC 4,77 € (tasks/.maj-annecy/volumes-25-09.txt).

## ✅ REPRISE du 26/09/2026 (session Fable) : GO RÉMY, MISE À JOUR EN LIGNE (main b4409f6)
Décision Rémy : bloc 1 = fond bleu nuit partout, aucune photo, ordinateur compris. NE JAMAIS reproposer de photo au bloc 1.
- [x] Bloc 1 sans photo, dégradé bleu, texte à gauche + formulaire à droite, colonnes alignées en haut (b4409f6)
- [x] Merge `maj-25-09` → `main`, production READY, curl 200 avec le vrai title, /tarifs 200
- [x] Téléphone : Twilio renommé Annecy, annuaire-09.json, Beauvais formulaire seul (4d5b1f2, en ligne), sites.json des deux, check-twilio CODE 0
- [x] check-fin-de-site CODE 0 « aucun défaut » ; blocs, navigation, visuels CODE 0 ; design 1 défaut voulu (aplat) ; footprint relancé sur b4409f6
- [x] Rank OS c570ee4 : travaux (0 → 9), notes, autoblogEndsAt 25/12, 12 pages Indexation, 5 tâches cochées, capture refaite
- [x] Protection Vercel remise (all_except_custom_domains), serveurs locaux tués, ETAT.md, lessons (#L270 portefeuille)
- [ ] Rémy : demander l'indexation des 12 pages depuis Rank OS › Tâches › Indexation
Reste ouvert : rien côté site. Prochain relevé automatique lundi 06 h (noter-parc).

## ARRÊT le 26/09/2026 vers 03 h (Rémy) : « on arrête tout », nouvelle conversation à ouvrir
État : branche `maj-25-09` (fbb7819) poussée, RIEN sur main. Aperçu : https://sos-electricien-annecy-iz3ephv6e-remy-2817s-projects.vercel.app
FAIT et vert : /tarifs (30 prix sourcés), 12 communes (Rumilly ajoutée), 5 piliers, 58 titres et descriptions, 80 backlinks internes,
menus déroulants, pied de page mobile en volets, 92 photos refaites (prises françaises), 65 brouillons, cron 5/semaine, 09 39 20 03 38
posé (repris de Beauvais, GO Rémy), relecture critique faite (12 corrections), contrôles blocs/navigation/visuels/anti-copie verts.
BLOQUÉ : le BLOC 1 ORDINATEUR, refusé 6 fois par Rémy le 26/09. Téléphone : ACCEPTÉ (fond bleu nuit, titre, formulaire 3 étapes, appel).
Ordinateur, ce que Rémy a refusé : tableau caché par le formulaire ; texte+formulaire empilés à gauche (moitié droite vide) ;
tableau « dans un tiroir » avec lampe qui mange le texte ; tableau géant coupé en bas sur mur bleu (fbb7819, en ligne sur l'aperçu).
Ce qu'il veut : une mise en page classique (texte à gauche, formulaire à droite), une photo PREMIUM où l'on voit le métier sans
que le formulaire le cache, le tout en UN essai, deux au maximum. Photos candidates non intégrées : tasks/.maj-annecy/hero/g1..g4.jpg
(g1 : tableau sur bois sombre, fenêtre lac à droite ; g3 idem avec sac ; g2 électricien accroupi ; g4 mur gris).
Contrôle design : refuse un titre sur fond uni (aplat) ; Rémy a demandé un fond uni pour lire : à arbitrer avec lui.
Reste après GO : merge main, Beauvais phone '' + annuaire-09 + sites.json + Twilio friendly_name, check-twilio, check-fin-de-site,
Rank OS (travaux, cadence 5, autoblogEndsAt, notes > 120 car.), indexation-a-ajouter.json (12 pages), taches.json, protection Vercel
remise (ssoProtection all_except_custom_domains, coupée le 25/09), ETAT.md, lessons.

## MISE À JOUR du 10/10/2026 (CEO Opus 5.5, GO Rémy, modèle sos-debouchage-metz.fr) : branche maj/scrollytelling-2026-10

### §0 État des lieux (production main 933a86f, relevé du 10/10)
Search Console : 28 j = 701 vues, 2 clics ; 7 j = 183 vues, 1 clic. Partenaire D.E.A-74 (Pringy), 10 €/demande depuis le 29/09, bilan le 29/10.

**Liste 1, pages vues 10 fois ou plus sans clic (28 j)** : /conseils/lumiere-qui-clignote-cause 115 (place 5,2) ; /zones/cran-gevrier 71 (26) ;
/zones/seynod 57 (31,8) ; /zones/meythet 54 (14,8) ; /zones/epagny-metz-tessy 53 (25,2) ; /services/installation-electrique-neuve 48 (73) ;
/services/mise-en-conformite-diagnostic-electrique 48 (71) ; /zones 48 (53) ; /services/recherche-panne-electrique 42 (59) ; /contact 38 (74) ;
/ 35 (52,5) ; /conseils/disjoncteur-fusible-differentiel-differences 24 (7,5) ; /zones/sevrier 24 (63) ; /services/renovation-electrique-complete 23 ;
/conseils/panne-edf-enedis-ou-panne-interne-difference 22 (45) ; /conseils/depannage-electrique-cran-gevrier-acces-tableau 16 ; garage-dependance 15 ;
une-piece-sans-electricite-cause 15 (13) ; remise-aux-normes-electrique-seynod-logement-occupe 14 ; remise-aux-normes-appartement-cran-gevrier 12 ;
risque-incendie-electrique-signes 12 (6,8). Plus /conseils/surtension-apres-orage-que-faire 122 vues, 2 clics (6,8).
**Liste 2, gains rapides (90 j, place 8 à 30)** : remise aux normes électrique à seynod 79 (9,5) ; dépannage électrique à cran-gevrier 75 (17,8) ;
remise aux normes électrique à cran-gevrier 72 (14,5) ; électricien à cran-gevrier 70 (23,5) ; dépannage électrique à seynod 67 (27,1) ;
dépannage électrique à epagny metz-tessy 25 (16,1) ; électricien à epagny metz-tessy 23 (29,3) ; électricien à meythet 24 (30,4) ; electricien seynod (21).
**Liste 3, prix / devis** : aucune requête (90 j). /tarifs 9 vues, place 57,8.
**Liste 4, page pilier** : /zones/cran-gevrier (317 vues sur 90 j, 3 requêtes en page 2), puis /zones/seynod (207).
**Enjeu n°1** : Annecy même. Accueil place 52,5 ; « dépannage électrique à annecy » 58 vues place 65 ; « remise aux normes électrique à annecy » 62 place 73 ;
« coupure electricite annecy » 61 place 54 ; « électricien annecy » 1 vue place 17.

**Note AVANT : 6/10** (1 ✅ 2 ✅ 3 ✅ 4 ✅ 5 ❌ 6 ✅ 7 ❌ 8 ✅ 9 ❌ 10 ❌)
5 ❌ articles en place 5 à 8 sans clic (titres non réécrits) ; 7 ❌ bloc 1 fond bleu, boutons pilules, « Continuer », case orpheline (7 options) ;
9 ❌ 55 brouillons à 5/sem = 11 semaines (< 3 mois) ; 10 ❌ design 1 défaut (aplat), texte ECHEC (accueil 803 mots, paragraphe 48 mots ; intérieures 92, 116, 78 mots).

**Contrôles sur la production (933a86f)** : footprint CODE 0 OK (10 frères d'urgence) ; blocs-pages CODE 0 ; navigation CODE 0 ; visuels-articles CODE 0 ;
design CODE 1 (aplat bloc 1) ; check-texte accueil CODE 1 (803 / 48), recherche-panne CODE 1 (92), seynod CODE 1 (116), tarifs CODE 1 (78).
**Vitesse mobile production** : 98 / 97 / 97, médiane 97, LCP médiane 2,30 s (tasks/.maj-annecy/vitesse-avant.txt).

### §1 quater A : expressions à garder (Search Console page + requête, 90 j, ≥ 5 vues ou 1 clic ; tasks/.maj-annecy/gsc-page-query-90j.txt)
- Accueil : électricien + Annecy (title, H1) ; dépannage électrique à annecy ; dépannage électrique à meythet ; dépannage électrique à seynod ;
  coupure electricite annecy ; dépannage onduleur annecy (21 vues, mot ABSENT du HTML aujourd'hui : à placer une fois, FAQ) ; 24h/24 7j/7 (gardé).
- /zones/cran-gevrier : dépannage électrique à cran-gevrier ; remise aux normes électrique à cran-gevrier ; électricien à cran-gevrier.
- /zones/seynod : remise aux normes électrique à seynod ; dépannage électrique à seynod ; électricien à seynod.
- /zones/meythet : remise aux normes électrique à meythet ; électricien à meythet ; dépannage électrique à meythet.
- /zones/epagny-metz-tessy : dépannage, électricien, remise aux normes électrique à epagny metz-tessy.
- /services/recherche-panne-electrique : coupure electricite annecy ; dépannage électrique à annecy.
- /contact : dépannage électrique à annecy ; sos électricité.

### Faits sourcés pour les scénarios
- INSEE, dossier complet Annecy (74010), RP 2023 : 86,7 % d'appartements ; résidences principales 1971-1990 = 31,4 % (période la plus fréquente).
- Legrand, FAQ « Pourquoi un interrupteur différentiel disjoncte-t-il ? » : fuite de courant par un appareil défectueux, un câble desserré ou l'humidité
  dans les gaines ; méthode : abaisser les disjoncteurs divisionnaires puis les réenclencher un à un.

### Argent
Solde images (fal.ai) lu le 10/10 : 0,15 $. DataForSEO : non utilisé (Search Console seule).

### Plan d'exécution (GO Rémy du 10/10 : scénarios + 0,60 $ d'images, compte à recharger)
- [x] 1. Angles 3 px sur tout le site (boutons, cartes, encadrés), plus aucune pilule
- [x] 2. Formulaire noir qui avance au clic, 8 choix en 2 x 4, mêmes champs envoyés (JSON comparé)
- [x] 3. Bloc 3 : coupe en couleur d'un appartement 1970-1990, cadre fixe, 5 étapes (scrollytelling)
- [x] 4. Bloc 1 : photo plein écran (lac et tableau, 1 image 0,15 $) + mur qui s’ouvre, circuits, fuite, testeur, retour, a90e663
- [x] 5. Accueil à 750 mots, 25 mots par paragraphe, icônes dessinées animées, carte des communes en bloc 7-8, FAQ fermée
- [x] 6. Titres des communes (Seynod, Cran-Gevrier, Meythet, Épagny) avec les recherches vues, sans deux-points
- [x] 7. Trois articles : titres et descriptions réécrits + encart vers le formulaire sur chaque article
- [x] 8. Pages intérieures à 45 mots par paragraphe (prestations, Seynod, tarifs)
- [x] 9. Réserve d’articles portée à 13 semaines (65 brouillons à 5 par semaine, 080 à 088 ajoutés, dernier le 12/01/2027)
- [ ] 10. Contrôles x2, relecture à froid, vitesse, expressions gardées, aperçu à Rémy
