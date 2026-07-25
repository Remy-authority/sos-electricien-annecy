# CLAUDE.md — SOS Électricien Annecy

> Fichier de règles du projet. Toute session (CEO, Builder, SEO) le lit AVANT de toucher au repo.
> Les règles ici priment sur tout comportement par défaut.

---

## 1. CONTEXTE DU PROJET

- **Modèle économique : rank & rent.** On construit un site local, on le classe en SEO
  (référencement naturel + citations par les IA), on capte des demandes de clients, puis on
  **loue** le site à un artisan de la zone. On ne vend pas de prestation nous-mêmes.
- **Ce site : électricien d'urgence à Annecy (74), site n°2 du portefeuille.** Domaine pressenti
  `sos-electricien-annecy.fr` (disponible, pas encore acheté). Dupliqué le 25/07/2026 depuis le
  site pilote `sos-fuite-angers.fr` (recherche de fuite d'eau, Angers), qui reste la référence
  de structure du template.
- **Ce repo est un TEMPLATE.** Il servira de base aux prochains sites (autre métier / ville /
  locataire). Objectif : déployer un site N+1 en changeant surtout la **config** + le **contenu**,
  sans réécrire le code. Tout ce qu'on décide ici doit rester générique et réutilisable.

---

## 2. STANDARD DE DESIGN — NON NÉGOCIABLE

- **Référence unique et obligatoire : https://sniperpestcontrol3dservices.fr**
  (site créé par Rémy, réussi). C'est LE mètre-étalon. Tout écran produit se compare à lui.
- Exigences : **direction artistique forte, rendu premium, ancrage local.** Le visiteur doit
  sentir un artisan sérieux et haut de gamme, pas un template acheté.
- **Interdits absolus :**
  - Design générique / « template » reconnaissable.
  - Pages 100 % texte, sans visuel, sans rythme, sans hiérarchie.
  - Sections plates copiées-collées d'une page à l'autre sans intention.
- Chaque page doit avoir : visuels de qualité, respiration, hiérarchie claire, CTA visibles,
  cohérence de la charte (couleurs eau + accent urgence).
- **Pas de vide/trou asymétrique** : une colonne de texte doit être centrée ou occuper une
  largeur cohérente, jamais collée à gauche avec un grand blanc à droite.
- **Typographie — INTERDIT : le tiret cadratin « — ».** Nulle part dans le texte visible.
  On utilise une **virgule** ou un **point** à la place. Vaut pour tout agent (Builder, Autoblog).

---

## 3. DOCTRINE SEO

- **Pas de fiche Google Business, pas d'avis clients.** Tout repose sur le **SEO organique**
  et le **GEO** (être cité par les IA : ChatGPT, Perplexity, AI Overviews).
- **Structure du site :**
  - 1 page d'accueil
  - 1 page par **service**
  - 1 page par **commune voisine**
  - 1 **blog conseils**
  - **mentions légales** conformes (droit français)
- **FAQ sur chaque page** (utile utilisateur + données structurées + citabilité IA).
- **Interdits absolus :**
  - Bourrage de mots-clés.
  - Chiffres inventés (nombre d'interventions, années d'expérience…) non validés par Rémy.
  - Fausses certifications / faux labels.
  - Phrases creuses de remplissage.
- Contenu vrai, précis, local. Si une donnée n'est pas confirmée → on ne l'affiche pas.

---

## 4. RÈGLE DE MÉMOIRE & DÉPLOIEMENT

- **À chaque session : lire `docs/ETAT.md` en arrivant**, et **le mettre à jour avant de finir.**
  C'est le journal de bord unique du projet.
- **Rien ne se déploie (merge sur `main` / mise en prod) sans la validation explicite de Rémy.**
- Marquer les valeurs non confirmées comme `DEMO` tant que Rémy n'a pas tranché.

---

## 5. FONCTIONNEMENT DES RÔLES

- **CEO (coordinateur)** : **NE CODE JAMAIS le site (code produit = Builder, TOUJOURS).**
  Le CEO pilote, audite, coordonne les agents, et prépare des messages prêts à coller entre
  balises `=== MESSAGE POUR [AGENT] ===`. Il traduit tout en langage simple (zéro jargon).
- **ZÉRO fainéantise du CEO.** Le CEO utilise SES PROPRES accès et outils (git, gh, build,
  APIs) pour récupérer lui-même ce dont Rémy a besoin — ex. aller chercher une URL de preview
  Vercel et la donner directement, plutôt que d'envoyer Rémy cliquer dans 4 menus. On ne
  délègue JAMAIS à Rémy une tâche que le CEO peut faire seul. On ne lui fait pas répéter.
  Le CEO ne demande à Rémy QUE ce que lui seul peut faire (validation, décisions, accès
  externes type OVH/paiement).
- **Ce que le CEO PEUT faire (coordination/ops, pas du code produit)** : git (consolidation,
  commits sur branches, push de preview), lancer les builds pour vérifier, récupérer des infos
  via gh/API. Interdiction absolue : écrire/modifier le code du site (`app/`, `components/`,
  `lib/`, `content/`, `config/`) → ça part au Builder.
- **Builder** : code (design + intégration). Reçoit des consignes précises du CEO.
- **SEO** (plus tard) : contenu et optimisation, dans le respect de la doctrine SEO ci-dessus.
