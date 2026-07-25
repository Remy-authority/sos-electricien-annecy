/**
 * AccentWord, met en valeur un mot-clé à l'intérieur d'un titre.
 *
 * Purement VISUEL : le texte rendu est strictement identique à celui reçu, seul
 * le style d'une portion change (serif italique, couleur primaire). Sert aux
 * titres qui viennent de `config/` ou `content/` et dans lesquels on ne peut donc
 * pas écrire de JSX directement (h1 des pages service et commune, titre About…).
 *
 * Générique et réutilisable tel quel sur les prochains sites du template (N+1) :
 * on passe le mot à accentuer (ville, nom de commune…), pas une valeur codée en dur.
 *
 * Si le mot est absent du texte, le titre est rendu inchangé (aucun risque de
 * casser un contenu SEO).
 */
export default function AccentWord({
  text,
  word,
  className = 'accent-serif text-accent-deep',
}: {
  text: string
  word?: string
  className?: string
}) {
  if (!word) return <>{text}</>

  // Recherche insensible à la casse mais on réaffiche la casse d'origine.
  const index = text.toLocaleLowerCase('fr').indexOf(word.toLocaleLowerCase('fr'))
  if (index === -1) return <>{text}</>

  return (
    <>
      {text.slice(0, index)}
      <span className={className}>{text.slice(index, index + word.length)}</span>
      {text.slice(index + word.length)}
    </>
  )
}
