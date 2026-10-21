import type { ReactNode } from "react"

interface PageHeroProps {
  eyebrow: string
  title: string
  lead: string
  actions?: ReactNode
  /** Background photo; a dark scrim keeps the text readable. */
  image?: string
  /** CSS object-position for the photo. */
  position?: string
}

export function PageHero({ eyebrow, title, lead, actions, image, position = "center 20%" }: PageHeroProps) {
  return (
    <section className="hero-bg relative isolate overflow-hidden pt-16 pb-24 text-white">
      {image ? (
        <>
          <img
            src={image}
            alt=""
            fetchPriority="high"
            style={{ objectPosition: position }}
            className="absolute inset-0 -z-20 size-full object-cover"
          />
          <div className="hero-scrim absolute inset-0 -z-10" aria-hidden />
        </>
      ) : (
        <div className="chessboard absolute inset-0 -z-10 opacity-[0.07]" aria-hidden />
      )}
      <div className="container-page">
        <span className="eyebrow text-gold">{eyebrow}</span>
        <h1 className="max-w-3xl text-4xl leading-[1.08] sm:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-mist">{lead}</p>
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  )
}
