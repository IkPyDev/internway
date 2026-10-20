import type { ReactNode } from "react"
import { cn } from "@/lib"

interface SectionProps {
  eyebrow?: string
  title: string
  lead?: string
  tint?: boolean
  id?: string
  children: ReactNode
}

export function Section({ eyebrow, title, lead, tint, id, children }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 sm:py-24", tint && "bg-muted")}>
      <div className="container-page">
        <div className="mb-10 max-w-2xl">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
          {lead && <p className="mt-3 text-lg text-muted-foreground">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
