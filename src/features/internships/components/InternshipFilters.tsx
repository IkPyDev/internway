import { Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FIELDS, FRESH_OPTIONS, KIND_OPTIONS } from "../constants"
import type { FieldKey, FreshWindow, InternshipKind, InternshipsSearch } from "../types"

const ALL = "all"

interface InternshipFiltersProps {
  search: InternshipsSearch
  onChange: (patch: Partial<InternshipsSearch>) => void
}

export function InternshipFilters({ search, onChange }: InternshipFiltersProps) {
  const { t } = useTranslation()
  const [q, setQ] = useState(search.q ?? "")

  useEffect(() => {
    if (q === (search.q ?? "")) return
    const id = setTimeout(() => onChange({ q: q.trim() || undefined }), 250)
    return () => clearTimeout(id)
  }, [q, search.q, onChange])

  return (
    <div
      className="relative -mt-16 grid scroll-mt-24 gap-3 rounded-xl border bg-card p-3 shadow-card md:grid-cols-3 lg:grid-cols-[1fr_210px_200px_180px]"
      id="filters"
    >
      <div className="relative md:col-span-3 lg:col-span-1">
        <Search
          className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("internships.searchPlaceholder")}
          aria-label={t("common.search")}
          className="h-11 pl-10"
          type="search"
        />
      </div>
      <Select
        value={search.field ?? ALL}
        onValueChange={(v) => onChange({ field: v === ALL ? undefined : (v as FieldKey) })}
      >
        <SelectTrigger className="h-11 w-full" aria-label={t("internships.fieldLabel")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>{t("internships.field.all")}</SelectItem>
          {FIELDS.map((f) => (
            <SelectItem key={f.key} value={f.key}>
              {t(f.label)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={search.kind ?? ALL}
        onValueChange={(v) => onChange({ kind: v === ALL ? undefined : (v as InternshipKind) })}
      >
        <SelectTrigger className="h-11 w-full" aria-label={t("internships.kindLabel")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>{t("internships.kind.all")}</SelectItem>
          {KIND_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {t(o.label)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={search.fresh ?? ALL}
        onValueChange={(v) => onChange({ fresh: v === ALL ? undefined : (v as FreshWindow) })}
      >
        <SelectTrigger className="h-11 w-full" aria-label={t("internships.freshLabel")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>{t("internships.fresh.all")}</SelectItem>
          {FRESH_OPTIONS.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {t(o.label)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
