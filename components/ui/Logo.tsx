/**
 * Logo inline SVG, "SOS ÉLECTRICIEN / ANNECY".
 * Variante lumineuse : textColor sombre sur fond blanc (Header).
 * Variante sombre   : textColor blanc sur fond noir (Footer, Hero, socials).
 * L'éclair s'éclaircit automatiquement en mode sombre via iconColor.
 */
export default function Logo({
  textColor = '#0F172A',
  accentColor = '#F97316',
  iconColor = '#4338CA',
  className = 'h-9 w-auto',
}: {
  textColor?: string
  accentColor?: string
  iconColor?: string
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 260 48"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Éclair, pictogramme électricité */}
      <path
        d="M23 2 9 27h11l-4 19 21-27H26l4-17Z"
        fill={iconColor}
      />
      {/* Reflet premium */}
      <circle cx="19" cy="14" r="2.5" fill="white" fillOpacity="0.3" />

      {/* SOS ÉLECTRICIEN, majuscules, typographie resserrée */}
      <text
        x="48"
        y="22"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontWeight="900"
        fontSize="13"
        fill={textColor}
        letterSpacing="-0.2"
      >
        SOS ÉLECTRICIEN
      </text>

      {/* ANNECY, accent orange, agrandi, aligné sous « SOS ÉLECTRICIEN » */}
      <text
        x="48"
        y="39"
        fontFamily="system-ui,-apple-system,sans-serif"
        fontWeight="800"
        fontSize="14"
        fill={accentColor}
        letterSpacing="4"
      >
        ANNECY
      </text>
    </svg>
  )
}
