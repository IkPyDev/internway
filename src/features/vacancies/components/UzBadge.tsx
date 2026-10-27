import { BadgeCheck } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib"

/** "Uzbekistan applicants eligible": the posting's eligibility, checked by the admin on approval. */
export function UzBadge({ long, className }: { long?: boolean; className?: string }) {
  const { t } = useTranslation()
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-800",
        className,
      )}
    >
      <BadgeCheck className="size-3.5 shrink-0" aria-hidden />{" "}
      {t(long ? "vacancies.uzEligibleLong" : "vacancies.uzEligible")}
    </span>
  )
}
