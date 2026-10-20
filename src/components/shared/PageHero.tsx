import type { ReactNode } from "react"

interface PageHeroProps {
  eyebrow: string
  title: string
  lead: string
  actions?: ReactNode
}

export function PageHero({ eyebrow, title, lead, actions }: PageHeroProps) {
  return (
    <section className="hero-bg relative overflow-hidden pt-16 pb-24 text-white">
      <div className="chessboard absolute inset-0 opacity-[0.07]" aria-hidden />
      <div className="container-page relative">
        <span className="eyebrow text-[#7fe39b]">{eyebrow}</span>
        <h1 className="max-w-3xl text-3xl font-extrabold sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-[#c9d3f2]">{lead}</p>
        {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  )
}
