import { ExternalLink } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { safeUrl } from "@/lib"
import { COUNTRY_LABELS, PRIORITY_BADGE } from "../constants"
import type { Company } from "../types"

export function CompanyCard({ company }: { company: Company }) {
  const { t } = useTranslation()
  const badge = PRIORITY_BADGE[company.priority]
  const country = COUNTRY_LABELS[company.country] ? t(COUNTRY_LABELS[company.country]) : company.country

  return (
    <article className="flex animate-rise flex-col gap-2 rounded-xl border bg-card p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex items-center justify-between gap-2">
        <Badge variant="secondary" className={badge.className} title={t(badge.hint)}>
          {t(badge.label)}
        </Badge>
        <span className="text-right text-xs text-muted-foreground">
          {country}
          {company.city && ` · ${company.city}`}
        </span>
      </div>
      <div className="mt-1 flex items-center gap-3">
        <div
          className="grid size-11 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-navy-900 to-green-600 font-extrabold text-white"
          aria-hidden
        >
          {company.name.slice(0, 1)}
        </div>
        <h3 className="line-clamp-2 text-[1.05rem] font-bold">{company.name}</h3>
      </div>
      <p className="line-clamp-1 text-sm text-muted-foreground">{company.field}</p>
      {company.program && <p className="line-clamp-2 text-sm">{company.program}</p>}
      <dl className="grid gap-1.5 text-sm">
        {company.duration && (
          <div>
            <dt className="inline font-semibold text-muted-foreground">{t("companies.duration")}: </dt>
            <dd className="inline">{company.duration}</dd>
          </div>
        )}
        {company.eligibility && (
          <div>
            <dt className="inline font-semibold text-muted-foreground">{t("companies.eligibility")}: </dt>
            <dd className="inline">{company.eligibility}</dd>
          </div>
        )}
      </dl>
      <div className="mt-auto flex items-center justify-between gap-2 border-t border-dashed pt-3">
        <span className="text-xs text-muted-foreground">
          {t(company.verified ? "companies.fromShortlist" : "companies.fromBase")}
        </span>
        <Button asChild size="sm" variant="outline" className="rounded-full font-bold">
          <a href={safeUrl(company.url)} target="_blank" rel="noopener noreferrer">
            {t("companies.officialPage")} <ExternalLink />
          </a>
        </Button>
      </div>
    </article>
  )
}
