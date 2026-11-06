# content/drafts/

File d'attente des articles préparés en avance : ils sont **invisibles du site** (aucun loader ne lit ce dossier) jusqu'à ce que la GitHub Action `publish-article` en publie un, **chaque jour** (7 par semaine depuis le 06/11/2026, Rémy), en le déplaçant vers `content/conseils/`.

Convention : nommer chaque fichier `NNN-slug.mdx` ; le plus petit numéro part en premier, le préfixe `NNN-` est retiré à la publication. Calendrier : `docs/CALENDRIER-EDITORIAL.md`.

**Aucune image pour un brouillon** (règle portefeuille du 04/11/2026) : ni dans `public/conseils/`, ni dans un dossier `NNN-slug.assets/`. La couverture et le visuel de corps sont générés par le workflow le jour de la publication. `scripts/publish-next-draft.mjs` refuse un brouillon dont l'image existe déjà, ou dont le title (30-60), la description (120-160) ou la FAQ (3 au moins) sont hors limites.

Contrôle du stock : `node scripts/publish-next-draft.mjs --verifier` ; essai sans rien écrire : `node scripts/publish-next-draft.mjs --a-blanc`.
