import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"
import { StatusBadge } from "@/components/shared"
import type { ApplicationStatus, VacancyStatus } from "@/types"

/** A titled block inside a detail dialog. */
export function DetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-2">
      <h3 className="text-xs font-bold tracking-wide text-muted-foreground uppercase">{title}</h3>
      {children}
    </section>
  )
}

interface DetailRowProps {
  title: string
  meta?: string
  status?: VacancyStatus | ApplicationStatus
  onOpen: () => void
}

/** A clickable row that opens another detail (a member, a vacancy, an application). */
export function DetailRow({ title, meta, status, onOpen }: DetailRowProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition hover:border-navy-700 hover:bg-muted/50"
      >
        <span className="min-w-0 flex-1">
          <span className="block font-semibold break-words">{title}</span>
          {meta && <span className="block text-xs break-all text-muted-foreground">{meta}</span>}
        </span>
        {status && <StatusBadge status={status} />}
        <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
      </button>
    </li>
  )
}

/** The rejection reason the author sees. */
export function RejectReason({ reason, label }: { reason: string | null | undefined; label: string }) {
  if (!reason) return null
  return (
    <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
      {label}: {reason}
    </p>
  )
}
