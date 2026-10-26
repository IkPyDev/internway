import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import type { VacancyStatus } from "@/types"
import { ModerationActions } from "./ModerationActions"

interface ModerationCardProps {
  title: string
  meta: string
  status: VacancyStatus
  reason: string | null
  busy: boolean
  onOpen: () => void
  onApprove: () => void
  onReject: (reason: string) => void
  /** A short preview; the full record opens in the detail dialog. */
  children?: ReactNode
  media?: ReactNode
}

/** One item in a moderation queue: a preview that opens the full record, then approve or reject. */
export function ModerationCard({
  title,
  meta,
  status,
  reason,
  busy,
  onOpen,
  onApprove,
  onReject,
  children,
  media,
}: ModerationCardProps) {
  const { t } = useTranslation()
  return (
    <li className="grid gap-3 rounded-xl border bg-card p-5 transition hover:border-navy-700/50 hover:shadow-card">
      <button type="button" onClick={onOpen} className="flex flex-wrap items-center gap-3 text-left">
        {media}
        <div className="min-w-0 flex-1">
          <p className="font-bold hover:underline">{title}</p>
          <p className="text-sm break-all text-muted-foreground">{meta}</p>
        </div>
        <StatusBadge status={status} />
      </button>
      {reason && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {t("moderation.reason")}: {reason}
        </p>
      )}
      {children && <div className="line-clamp-3 text-sm text-muted-foreground">{children}</div>}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <ModerationActions status={status} busy={busy} onApprove={onApprove} onReject={onReject} />
        <Button size="sm" variant="ghost" className="rounded-full text-navy-700" onClick={onOpen}>
          {t("moderation.details")} <ChevronRight aria-hidden />
        </Button>
      </div>
    </li>
  )
}
