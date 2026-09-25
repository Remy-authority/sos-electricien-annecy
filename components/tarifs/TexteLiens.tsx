import { Fragment } from 'react'
import Link from 'next/link'

/**
 * TexteLiens, rend un paragraphe de content/tarifs.json en transformant la syntaxe
 * `[texte](/chemin)` en lien interne. Seuls les chemins internes (commençant par « / »)
 * deviennent des liens : un lien externe n'a rien à faire dans le corps de la page
 * (les sources sont citées à part, en nofollow).
 */
export default function TexteLiens({ texte }: { texte: string }) {
  const morceaux: React.ReactNode[] = []
  const re = /\[([^\]]+)\]\((\/[^)\s]*)\)/g
  let dernier = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(texte))) {
    if (m.index > dernier) morceaux.push(texte.slice(dernier, m.index))
    morceaux.push(
      <Link key={m.index} href={m[2]} className="font-medium text-primary underline underline-offset-2">
        {m[1]}
      </Link>,
    )
    dernier = m.index + m[0].length
  }
  if (dernier < texte.length) morceaux.push(texte.slice(dernier))
  return (
    <>
      {morceaux.map((x, i) => (
        <Fragment key={i}>{x}</Fragment>
      ))}
    </>
  )
}
