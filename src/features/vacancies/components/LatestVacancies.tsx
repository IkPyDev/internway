import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { Section } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { useLatestVacancies } from "../hooks/useLatestVacancies"
import { VacancyCard } from "./VacancyCard"

/** Home-page section with the newest approved vacancies; hidden while loading, on error or when there are none. */
export function LatestVacancies({ limit = 8 }: { limit?: number }) {
  const { t } = useTranslation()
  const { items, total } = useLatestVacancies(limit)
  if (!items.length) return null
  return (
    <Section
      eyebrow={t("home.vacancies.eyebrow")}
      title={t("home.vacancies.title")}
      lead={t("home.vacancies.lead")}
    >
      <div className="card-grid max-sm:[&>*:nth-child(n+5)]:hidden">
        {items.map((item) => (
          <VacancyCard key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button asChild size="lg" className="rounded-full px-7 font-bold">
          <Link to={ROUTES.vacancies}>{t("home.vacancies.all", { count: total })} →</Link>
        </Button>
      </div>
    </Section>
  )
}
