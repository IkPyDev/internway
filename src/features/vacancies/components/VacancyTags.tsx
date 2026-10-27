import { useTranslation } from "react-i18next"
import type { Duration, Employment, Experience, Schedule, VacancyKind } from "@/types"

interface VacancyTagsProps {
  kind: VacancyKind
  schedule: Schedule
  employment?: Employment
  experience: Experience
  duration?: Duration
}

/** Kind, work format, employment, experience and length as small grey tags. */
export function VacancyTags({ kind, schedule, employment, experience, duration }: VacancyTagsProps) {
  const { t } = useTranslation()
  const tags = [
    t(`vacancies.kind.${kind}`),
    t(`vacancies.schedule.${schedule}`),
    employment && t(`vacancies.employment.${employment}`),
    t(`vacancies.experience.${experience}`),
    duration && t("vacancies.months", { range: duration }),
  ].filter(Boolean)
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li key={tag} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
          {tag}
        </li>
      ))}
    </ul>
  )
}
