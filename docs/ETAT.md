# ETAT.md — Journal de bord SOS Électricien Annecy

> Mémoire du projet. Chaque session lit ce fichier en arrivant et le met à jour avant de finir.
> Dernière mise à jour : 2026-07-25 (création du dossier, session CEO-portefeuille).

---

## 🔖 POINT DE REPRISE (état exact au 25/07/2026 — à lire en premier)

**Site n°2 du portefeuille** (métier : électricien d'urgence, ville : Annecy, 74). Rien n'est
en ligne : le dossier vient d'être créé par duplication du template `sos-fuite-angers.fr`
(playbook Étapes 1-2 faites : copie complète, contenu Angers supprimé, git initialisé).

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
- [ ] CEO : créer le repo GitHub + le projet Vercel (Étape 1.3-1.4)
- [ ] Builder : réécrire `content/services/*.json` (services électricien) et `content/zones/*.json` (communes agglo Annecy)
- [ ] Builder : `config/site.config.ts` (identité, couleurs, persona DEMO) + `content/legal.json`
- [ ] Builder : logo, portrait persona, images (hero + 2-3 par page, règles strictes du playbook)
- [ ] Builder sur Opus : passe design (direction artistique électricien, référence sniperpestcontrol3dservices.fr)
- [ ] Agent SEO : carte mots-clés + `docs/SEO-GEO-PLAN.md` + `docs/CALENDRIER-EDITORIAL.md`
- [ ] Autoblog : drafts T1 (préfixes 001-…)
- [ ] Vérifier `robots.ts` en noindex tant que non validé
- [ ] Contrôle visuel CEO → validation Rémy → mise en ligne (Étape 6 du playbook)

## 3. DÉCISIONS RÉMY

- 25/07/2026 : top 5 vague 2 validé ; Annecy (électricien) lancé en n°1, Metz (débouchage) suivra en n°2.

## 4. HISTORIQUE DES SESSIONS

- **25/07/2026 (CEO-portefeuille)** : création du dossier par duplication du pilote, nettoyage
  du contenu Angers (articles conseils, drafts, images services/zones/conseils/réalisations,
  plans SEO), journal remis à neuf, git initialisé. Aucun contenu Annecy encore écrit :
  c'est le travail du Builder à la prochaine session.
