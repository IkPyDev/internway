import { useTranslation } from "react-i18next"
import { cn } from "@/lib"
import type { VacancyFields } from "@/types"
import { vacancyFacts } from "../lib/vacancies"

/** The posting's filled-in details (eligibility, length, start, requirements, perks) as a definition list. */
export function VacancyFacts({ vacancy, className }: { vacancy: VacancyFields; className?: string }) {
  const { t } = useTranslation()
  return (
    <dl className={cn("grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2", className)}>
      {vacancyFacts(vacancy).map(([key, value]) => (
        <div key={key}>
          <dt className="text-xs text-muted-foreground">{t(`vacancyForm.${key}`)}</dt>
          <dd className="font-semibold whitespace-pre-line">
            {value.i18n ? t(value.i18n, value.params) : value.text}
          </dd>
        </div>
      ))}
    </dl>
  )
}
