import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { FilterPill } from "@/components/shared"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { COUNTRY_LABELS, PRIORITY_OPTIONS } from "../constants"
import type { CompaniesSearch, PriorityFilter } from "../types"

const ALL = "all"

interface CompanyFiltersProps {
  search: CompaniesSearch
  total: number
  countries: [string, number][]
  onChange: (patch: Partial<CompaniesSearch>) => void
}

export function CompanyFilters({ search, total, countries, onChange }: CompanyFiltersProps) {
  const { t } = useTranslation()
  return (
    <>
      <div className="relative -mt-16 grid gap-3 rounded-xl border bg-card p-3 shadow-card md:grid-cols-[1fr_240px]">
        <div className="relative">
          <Search
            className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            defaultValue={search.q ?? ""}
            onChange={(e) => onChange({ q: e.target.value.trim() || undefined })}
            placeholder={t("companies.searchPlaceholder")}
            aria-label={t("common.search")}
            className="h-11 pl-10"
          />
        </div>
        <Select
          value={search.priority ?? ALL}
          onValueChange={(v) => onChange({ priority: v === ALL ? undefined : (v as PriorityFilter) })}
        >
          <SelectTrigger className="h-11 w-full" aria-label={t("companies.priorityLabel")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>{t("companies.filter.all")}</SelectItem>
            {PRIORITY_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {t(o.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5 mb-2 flex flex-wrap gap-2">
        <FilterPill
          label={t("common.all")}
          count={total}
          active={search.country === undefined}
          onClick={() => onChange({ country: undefined })}
        />
        {countries.map(([c, n]) => (
          <FilterPill
            key={c}
            label={COUNTRY_LABELS[c] ? t(COUNTRY_LABELS[c]) : c}
            count={n}
            active={search.country === c}
            onClick={() => onChange({ country: c })}
          />
        ))}
      </div>
    </>
  )
}
