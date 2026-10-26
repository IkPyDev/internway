import type { ReactNode } from "react"
import { cn } from "@/lib"

/** A form control with its label; the wrapping <label> ties them together without ids. */
export function Field({
  label,
  children,
  className,
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: the control arrives as children
    <label className={cn("grid gap-1.5 text-sm font-semibold", className)}>
      {label}
      {children}
    </label>
  )
}
