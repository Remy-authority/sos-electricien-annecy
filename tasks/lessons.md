# tasks/lessons.md — SOS Électricien Annecy

> Format : [date] | ce qui a mal tourné | règle pour l'éviter

- [2026-07-25] | `vercel env add <NAME> preview` boucle sur une question de branche même avec `--value --yes` (hook plugin) | Ne pas insister : les previews sont déjà noindex par le code (`IS_NOINDEX` vrai dès que `VERCEL_ENV !== 'production'`). Le seul verrou indispensable est `SEO_NOINDEX=1` en production.
- [2026-07-25] | Le push initial vers GitHub n'a pas déclenché de déploiement Vercel (projet pas encore connecté au repo à ce moment-là) | Ordre correct : créer le repo → créer le projet Vercel → `vercel git connect --yes` → ensuite seulement pousser (ou pousser un commit vide pour amorcer).
- [2026-07-25] | Site en 404 total malgré un build Vercel « Ready » : un projet créé par `vercel project add` a `framework: null`, donc Vercel ne sait pas servir la sortie de `next build` | Après création d'un projet Vercel en CLI, TOUJOURS poser le preset : `PATCH https://api.vercel.com/v9/projects/<id>?teamId=<team>` avec `{"framework":"nextjs"}` (token dans `~/Library/Application Support/com.vercel.cli/auth.json`), puis redéployer.
