import { ExternalLink } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { relativeDate, safeUrl } from "@/lib"
import { REGIONS } from "../constants"
import type { Internship } from "../types"

const REGION_LABEL = Object.fromEntries(REGIONS.map((r) => [r.key, r.label]))

export function InternshipCard({ item }: { item: Internship }) {
  const { t } = useTranslation()
  const when = relativeDate(item.date)

  return (
    <article className="flex animate-rise flex-col gap-2 rounded-xl border bg-card p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#cdd6ee] hover:shadow-card">
      <div className="flex items-center justify-between gap-2">
        <Badge
          variant="secondary"
          className={item.kind === "program" ? "bg-green-100 text-green-600" : "bg-[#e8edfb] text-navy-700"}
        >
          {t(`internships.kind.${item.kind}`)}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {t(`date.${when.key}`, "count" in when ? { count: when.count } : {})}
        </span>
      </div>
      <h3 className="line-clamp-2 text-[1.05rem] font-bold">
        {item.new && (
          <span
            className="mr-1.5 inline-block size-2 rounded-full bg-green-500 align-middle"
            title={t("internships.new")}
          />
        )}
        {item.title}
      </h3>
      {item.company && <p className="font-bold text-navy-700">{item.company}</p>}
      <p className="line-clamp-1 text-sm text-muted-foreground">
        {item.location || t("internships.noLocation")}
      </p>
      <div className="flex min-h-1 flex-wrap gap-1.5">
        {item.regions.slice(0, 3).map((r) => (
          <span key={r} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {t(REGION_LABEL[r])}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-dashed pt-3">
        <span className="text-xs text-muted-foreground">
          {t("internships.source", { source: item.source.split(":")[0] })}
        </span>
        <Button asChild size="sm" className="rounded-full font-bold">
          <a href={safeUrl(item.url)} target="_blank" rel="noopener noreferrer">
            {t("common.details")} <ExternalLink />
          </a>
        </Button>
      </div>
    </article>
  )
}
