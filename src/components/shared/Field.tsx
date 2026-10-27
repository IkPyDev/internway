import type { ReactNode } from "react"
import { cn } from "@/lib"

/** A form control with its label; the wrapping <label> ties them together without ids. `required` adds a star. */
export function Field({
  label,
  children,
  className,
  required,
}: {
  label: string
  children: ReactNode
  className?: string
  required?: boolean
}) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: the control arrives as children
    <label className={cn("grid gap-1.5 text-sm font-semibold", className)}>
      <span>
        {label}
        {required && (
          <span aria-hidden className="text-destructive">
            {" *"}
          </span>
        )}
      </span>
      {children}
    </label>
  )
}
