import type { ReactNode } from "react"

/** The plain header + body used by account and admin pages. */
export function PageShell({
  title,
  lead,
  actions,
  children,
}: {
  title: string
  lead?: string
  actions?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="container-page py-10 sm:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl">{title}</h1>
          {lead && <p className="mt-2 text-muted-foreground">{lead}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  )
}
