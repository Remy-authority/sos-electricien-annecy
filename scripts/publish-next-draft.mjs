/**
 * publish-next-draft.mjs — publie le plus ancien article en attente.
 *
 * Appelé par .github/workflows/publish-article.yml (chaque jour, 7 articles par semaine, Rémy 06/11/2026).
 * Logique :
 *  1. Liste content/drafts/*.mdx, tri alphabétique (préfixes 001-, 002-… => le plus petit d'abord).
 *  2. Si vide : log un avertissement clair et sort en succès (exit 0), sans rien publier.
 *  3. Sinon : déplace le 1er draft vers content/conseils/ en retirant le préfixe numérique,
 *     met `date:` du frontmatter à la date du jour (Europe/Paris), déplace un éventuel dossier
 *     d'assets « <nom-du-draft>.assets/ » vers public/conseils/.
 *  4. Écrit les sorties (published / file / slug) dans $GITHUB_OUTPUT pour l'étape commit.
 *
 * Ne fait AUCUN commit/push : c'est le workflow qui s'en charge (traçabilité + secrets).
 *
 * GARDE DE PUBLICATION (posée le 06/11/2026 sur ce site au passage à 7 articles par semaine, reprise de
 * forage-puits-bourgogne.fr, règle portefeuille #R50 et zéro deux-points du 07/10) :
 * un brouillon n'est publié que si
 *  - son title SERVI (seoTitle, ou title à défaut) fait 30 à 60 caractères ;
 *  - sa description fait 120 à 160 caractères ;
 *  - son titre affiché (H1 = `title`) ne contient aucun deux-points ;
 *  - sa FAQ compte 3 questions au moins, son texte n'a ni tiret cadratin ni « met en relation » ;
 *  - aucune image ne l'attend déjà (dossier `<brouillon>.assets/` ou couverture déjà dans
 *    public/) : les images se génèrent le jour de la publication, jamais pour un brouillon
 *    (Rémy 04/11/2026, #L572).
 * Un brouillon hors limites est signalé et sauté, le suivant qui passe est publié : la
 * cadence ne s'arrête pas. Aucun brouillon conforme : erreur, rien n'est publié.
 *
 * `--a-blanc` : dit quel brouillon serait publié et lesquels sont refusés, sans rien écrire
 * ni déplacer (test local).
 * `--verifier` : contrôle TOUS les brouillons, code 1 au premier refusé (contrôle de stock).
 * Tout autre argument est refusé (code 1, rien publié) : un `--check` inventé a publié un
 * brouillon en local le 06/11/2026.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const A_BLANC = process.argv.includes('--a-blanc')
const VERIFIER = process.argv.includes('--verifier')
// Un argument inconnu (ex. « --check ») ne doit jamais retomber sur une vraie publication (06/11/2026).
const inconnus = process.argv.slice(2).filter((a) => !['--a-blanc', '--verifier'].includes(a))
if (inconnus.length) {
  console.error(`::error::Argument(s) inconnu(s) : ${inconnus.join(' ')}. Seuls --a-blanc et --verifier existent ; rien n'a été publié.`)
  process.exit(1)
}
const DRAFTS = path.join(ROOT, 'content', 'drafts')
const CONSEILS = path.join(ROOT, 'content', 'conseils')
const PUBLIC_CONSEILS = path.join(ROOT, 'public', 'conseils')

/** Écrit une sortie GitHub Actions (no-op en local si $GITHUB_OUTPUT absent). */
function setOutput(key, value) {
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`)
  }
}

/** Date du jour au format YYYY-MM-DD dans le fuseau Europe/Paris. */
function todayParis() {
  // en-CA donne directement YYYY-MM-DD.
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date())
}

const drafts = fs.existsSync(DRAFTS)
  ? fs.readdirSync(DRAFTS).filter((f) => f.endsWith('.mdx')).sort()
  : []

if (drafts.length === 0) {
  console.warn('::warning::content/drafts/ est vide — aucun article à publier aujourd\'hui. Fin sans erreur.')
  setOutput('published', 'false')
  process.exit(0)
}

/** Le title des articles est servi tel quel, sans suffixe : app/conseils/[slug]/page.tsx sert
 * `seoTitle || title` (relu le 06/11/2026). */
const SUFFIXE = ''

/** Valeur d'une clé de premier niveau du frontmatter (chaîne YAML simple, entre guillemets ou non). */
function champ(fm, cle) {
  const m = fm.match(new RegExp(`^${cle}:[ \t]*(.*)$`, 'm'))
  if (!m) return ''
  const v = m[1].trim()
  if (v.startsWith('"') && v.endsWith('"') && v.length >= 2) return v.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
  if (v.startsWith("'") && v.endsWith("'") && v.length >= 2) return v.slice(1, -1).replace(/''/g, "'")
  return v
}

/** Défauts d'un brouillon au regard de la garde de publication (liste vide = publiable). */
function defautsBrouillon(file) {
  const texte = fs.readFileSync(path.join(DRAFTS, file), 'utf8')
  const fm = (texte.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [])[1]
  if (!fm) return ['pas de frontmatter']
  const defauts = []
  const titre = champ(fm, 'title')
  const servi = (champ(fm, 'seoTitle') || titre) + SUFFIXE
  const description = champ(fm, 'description')
  if (!titre) defauts.push('title absent')
  if (servi.length < 30 || servi.length > 60) defauts.push(`title servi ${servi.length} caractères (30 à 60) « ${servi} »`)
  if (description.length < 120 || description.length > 160) defauts.push(`description ${description.length} caractères (120 à 160)`)
  if (titre.includes(':')) defauts.push(`deux-points dans le titre affiché « ${titre} »`)
  const faq = (fm.match(/^\s*-\s+q:/gm) || []).length
  if (faq < 3) defauts.push(`FAQ de ${faq} question(s) (3 au moins)`)
  if (texte.includes('\u2014')) defauts.push('tiret cadratin dans le texte')
  if (/met(?:tons|tent|tre)? en relation/i.test(texte)) defauts.push('« met en relation » dans le texte')
  const base = file.replace(/\.mdx$/, '')
  if (fs.existsSync(path.join(DRAFTS, `${base}.assets`))) defauts.push(`image déjà présente (${base}.assets/)`)
  const cover = champ(fm, 'cover')
  if (cover && fs.existsSync(path.join(ROOT, 'public', cover.replace(/^\//, '')))) defauts.push(`image déjà présente (public${cover})`)
  return defauts
}

if (VERIFIER) {
  const fautifs = drafts.map((f) => [f, defautsBrouillon(f)]).filter(([, d]) => d.length)
  for (const [f, d] of fautifs) console.error(`REFUSÉ ${f} : ${d.join(', ')}`)
  if (fautifs.length) {
    console.error(`ECHEC : ${fautifs.length} brouillon(s) refusé(s) sur ${drafts.length}.`)
    process.exit(1)
  }
  console.log(`OK : ${drafts.length} brouillon(s) conformes (title servi 30-60, description 120-160, FAQ 3+, sans deux-points ni tiret cadratin, aucune image d'avance).`)
  process.exit(0)
}

const refuses = []
const draftFile = drafts.find((f) => {
  const defauts = defautsBrouillon(f)
  if (defauts.length) {
    refuses.push(f)
    console.warn(`::warning::${f} refusé, ${defauts.join(', ')}. Brouillon sauté.`)
  }
  return defauts.length === 0
})
if (!draftFile) {
  console.error('::error::Aucun brouillon ne respecte la garde (title servi 30-60, description 120-160, titre sans deux-points, FAQ 3+, sans tiret cadratin, aucune image d\'avance). Publication annulée.')
  setOutput('published', 'false')
  process.exit(1)
}
if (A_BLANC) {
  console.log(`À BLANC : serait publié ${draftFile} (${refuses.length} brouillon(s) refusé(s) avant lui, ${drafts.length} au total). Rien n'a été écrit.`)
  process.exit(0)
}
const draftBase = draftFile.replace(/\.mdx$/, '')
const targetFile = draftFile.replace(/^\d+[-_]/, '') // retire le préfixe 001- / 002_
const srcPath = path.join(DRAFTS, draftFile)
const destPath = path.join(CONSEILS, targetFile)

if (fs.existsSync(destPath)) {
  console.error(`::error::${targetFile} existe déjà dans content/conseils/ (collision de slug). Publication annulée, corrigez le nom du draft.`)
  process.exit(1)
}

const today = todayParis()

// Lecture + remplacement ciblé de la ligne `date:` dans le frontmatter (1re occurrence),
// sans re-sérialiser tout le YAML (préserve le fichier à l'identique ailleurs).
let raw = fs.readFileSync(srcPath, 'utf8')
const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
if (!fmMatch) {
  console.error(`::error::${draftFile} n'a pas de frontmatter YAML (--- … ---). Publication annulée.`)
  process.exit(1)
}
let fm = fmMatch[1]
if (/^date:.*$/m.test(fm)) {
  fm = fm.replace(/^date:.*$/m, `date: "${today}"`)
} else {
  fm = `date: "${today}"\n${fm}`
}
raw = raw.replace(fmMatch[0], `---\n${fm}\n---`)

fs.mkdirSync(CONSEILS, { recursive: true })
fs.writeFileSync(destPath, raw)
fs.unlinkSync(srcPath)

// Assets optionnels : content/drafts/<draftBase>.assets/* -> public/conseils/*
const assetsDir = path.join(DRAFTS, `${draftBase}.assets`)
let movedAssets = 0
if (fs.existsSync(assetsDir) && fs.statSync(assetsDir).isDirectory()) {
  fs.mkdirSync(PUBLIC_CONSEILS, { recursive: true })
  for (const asset of fs.readdirSync(assetsDir)) {
    fs.renameSync(path.join(assetsDir, asset), path.join(PUBLIC_CONSEILS, asset))
    movedAssets++
  }
  fs.rmdirSync(assetsDir)
}

const slug = targetFile.replace(/\.mdx$/, '')
console.log(`Publié : content/drafts/${draftFile} -> content/conseils/${targetFile} (date: ${today}, ${movedAssets} asset(s) déplacé(s), ${drafts.length - 1} draft(s) restant(s)).`)
setOutput('published', 'true')
setOutput('file', targetFile)
setOutput('slug', slug)
