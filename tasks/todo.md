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
