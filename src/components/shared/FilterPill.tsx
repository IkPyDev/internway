import { cn } from "@/lib"

interface FilterPillProps {
  label: string
  count?: number
  active: boolean
  onClick: () => void
}

export function FilterPill({ label, count, active, onClick }: FilterPillProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-4 py-1.5 text-sm font-semibold transition",
        active ? "border-navy-900 bg-navy-900 text-white" : "bg-white hover:border-navy-900",
      )}
    >
      {label}
      {count !== undefined && (
        <b className={cn("text-xs", active ? "text-[#9fb2ef]" : "text-muted-foreground")}>{count}</b>
      )}
    </button>
  )
}
