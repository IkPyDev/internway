import { useTranslation } from "react-i18next"
import { cn } from "@/lib"
import type { ApplicationStatus, VacancyStatus } from "@/types"

const TONE: Record<VacancyStatus | ApplicationStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  sent: "bg-[#e8edfb] text-navy-700",
  viewed: "bg-[#e8edfb] text-navy-700",
  invited: "bg-sky-100 text-sky-800",
  offer: "bg-violet-100 text-violet-800",
  approved: "bg-green-100 text-green-700",
  hired: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  closed: "bg-muted text-muted-foreground",
  withdrawn: "bg-muted text-muted-foreground",
}

export function StatusBadge({ status }: { status: VacancyStatus | ApplicationStatus }) {
  const { t } = useTranslation()
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold whitespace-nowrap",
        TONE[status],
      )}
    >
      {t(`status.${status}`)}
    </span>
  )
}
