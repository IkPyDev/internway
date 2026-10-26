import { Link } from "@tanstack/react-router"
import { Building2, CalendarClock, MapPin } from "lucide-react"
import { useTranslation } from "react-i18next"
import { ROUTES } from "@/constants"
import type { VacancySummary } from "@/types"
import { place } from "../lib/vacancies"
import { Salary } from "./Salary"
import { VacancyTags } from "./VacancyTags"

export function VacancyCard({ item }: { item: VacancySummary }) {
  const { t } = useTranslation()
  return (
    <article className="relative flex animate-rise flex-col gap-2 rounded-xl border bg-card p-5 transition duration-300 hover:-translate-y-0.5 hover:border-[#cdd6ee] hover:shadow-card">
      <h3 className="line-clamp-2 text-[1.05rem] font-bold">
        <Link to={ROUTES.vacancy} params={{ id: String(item.id) }} className="after:absolute after:inset-0">
          {item.title}
        </Link>
      </h3>
      <p className="text-lg font-bold">
        <Salary from={item.salary_from} to={item.salary_to} currency={item.currency} />
      </p>
      <Link
        to={ROUTES.publicCompany}
        params={{ id: String(item.company_id) }}
        className="relative z-10 flex w-fit items-center gap-1.5 font-semibold text-navy-700 hover:underline"
      >
        <Building2 className="size-4" aria-hidden /> {item.company}
      </Link>
      {place(item) && (
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4" aria-hidden /> {place(item)}
        </p>
      )}
      <VacancyTags kind={item.kind} schedule={item.schedule} experience={item.experience} />
      {item.deadline && (
        <p className="mt-auto flex items-center gap-1.5 border-t border-dashed pt-3 text-xs text-muted-foreground">
          <CalendarClock className="size-4" aria-hidden /> {t("vacancies.deadline")}: {item.deadline}
        </p>
      )}
    </article>
  )
}
