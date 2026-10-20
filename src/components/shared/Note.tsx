import type { ReactNode } from "react"

export function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 rounded-md border-l-[3px] border-gold bg-muted px-4 py-3 text-sm text-muted-foreground">
      {children}
    </p>
  )
}
