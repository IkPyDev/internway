import { useTranslation } from "react-i18next"
import { CardGridSkeleton, EmptyState, ErrorState, PageHero, Pager } from "@/components/shared"
import { VacancyCard } from "../components/VacancyCard"
import { VacancyFilters } from "../components/VacancyFilters"
import { useVacanciesList } from "../hooks/useVacanciesList"

export function VacanciesPage() {
  const { t } = useTranslation()
  const { search, update, reset, data, status, error, refetch } = useVacanciesList()

  return (
    <>
      <PageHero
        eyebrow={t("vacancies.eyebrow")}
        title={t("vacancies.title")}
        lead={t("vacancies.lead")}
        image="/img/office-meeting.jpg"
        position="center 40%"
      />
      <section className="container-page pb-20">
        <VacancyFilters search={search} countries={data?.countries ?? []} onChange={update} onReset={reset} />
        <p className="my-4 font-semibold text-muted-foreground">
          {data ? t("vacancies.found", { count: data.total }) : t("common.loading")}
        </p>
        {status === "pending" && <CardGridSkeleton count={6} />}
        {status === "error" && <ErrorState error={error} onRetry={() => refetch()} />}
        {data && data.total === 0 && <EmptyState text={t("vacancies.empty")} />}
        {data && data.total > 0 && (
          <>
            <div className="card-grid">
              {data.items.map((item) => (
                <VacancyCard key={item.id} item={item} />
              ))}
            </div>
            <Pager
              page={data.page}
              pages={data.pages}
              onChange={(page) => {
                update({ page })
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
            />
          </>
        )}
      </section>
    </>
  )
}
