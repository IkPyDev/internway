import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { FilterPill } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EXPERIENCES, KINDS, SCHEDULES } from "../constants"
import { readAmount } from "../lib/vacancies"
import type { VacanciesSearch } from "../types"

const ALL = "all"

interface VacancyFiltersProps {
  search: VacanciesSearch
  countries: string[]
  onChange: (patch: Partial<VacanciesSearch>) => void
  onReset: () => void
}

/** Text search (on submit) plus selects that apply at once. */
export function VacancyFilters({ search, countries, onChange, onReset }: VacancyFiltersProps) {
  const { t } = useTranslation()
  const select = <K extends keyof VacanciesSearch>(
    key: K,
    options: readonly string[],
    label: (o: string) => string,
    allLabel: string,
  ) => (
    <Select
      value={(search[key] as string | undefined) ?? ALL}
      // Narrowing cast: the items come from the option list passed in.
      onValueChange={(v) => onChange({ [key]: v === ALL ? undefined : v } as Partial<VacanciesSearch>)}
    >
      <SelectTrigger className="h-11 w-full" aria-label={allLabel}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{allLabel}</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {label(o)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  return (
    <form
      key={`${search.q ?? ""}|${search.salary ?? ""}`}
      className="relative -mt-16 grid gap-3 rounded-xl border bg-card p-3 shadow-card sm:grid-cols-2 lg:grid-cols-4"
      onSubmit={(e) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        onChange({
          q: String(form.get("q") ?? "").trim() || undefined,
          salary: readAmount(String(form.get("salary") ?? "")) || undefined,
        })
      }}
    >
      <div className="relative sm:col-span-2 lg:col-span-3">
        <Search
          className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          name="q"
          type="search"
          defaultValue={search.q}
          placeholder={t("vacancies.searchPlaceholder")}
          aria-label={t("common.search")}
          className="h-11 pl-10"
        />
      </div>
      <Button type="submit" className="h-11 rounded-full px-6 font-bold">
        {t("common.search")}
      </Button>
      {select("kind", KINDS, (o) => t(`vacancies.kind.${o}`), t("vacancies.filters.anyKind"))}
      {select("schedule", SCHEDULES, (o) => t(`vacancies.schedule.${o}`), t("vacancies.filters.anySchedule"))}
      {select(
        "experience",
        EXPERIENCES,
        (o) => t(`vacancies.experience.${o}`),
        t("vacancies.filters.anyExperience"),
      )}
      {select("country", countries, (o) => o, t("vacancies.filters.anyCountry"))}
      <Input
        name="salary"
        type="number"
        min={0}
        inputMode="numeric"
        defaultValue={search.salary}
        placeholder={t("vacancies.filters.salary")}
        aria-label={t("vacancies.filters.salary")}
        className="h-11"
      />
      <div className="flex flex-wrap items-center gap-2 sm:col-span-2">
        <FilterPill
          label={t("vacancies.filters.uz")}
          active={search.uz === true}
          onClick={() => onChange({ uz: search.uz ? undefined : true })}
        />
        <FilterPill
          label={t("vacancies.paid")}
          active={search.paid === true}
          onClick={() => onChange({ paid: search.paid ? undefined : true })}
        />
      </div>
      <Button type="button" variant="ghost" className="h-11 rounded-full" onClick={onReset}>
        {t("vacancies.filters.reset")}
      </Button>
    </form>
  )
}
