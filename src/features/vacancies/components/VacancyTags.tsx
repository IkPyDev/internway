import { useTranslation } from "react-i18next"
import type { Employment, Experience, Schedule, VacancyKind } from "@/types"

interface VacancyTagsProps {
  kind: VacancyKind
  schedule: Schedule
  employment?: Employment
  experience: Experience
}

/** Kind, work format, employment and experience as small grey tags. */
export function VacancyTags({ kind, schedule, employment, experience }: VacancyTagsProps) {
  const { t } = useTranslation()
  const tags = [
    t(`vacancies.kind.${kind}`),
    t(`vacancies.schedule.${schedule}`),
    employment && t(`vacancies.employment.${employment}`),
    t(`vacancies.experience.${experience}`),
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
