import { useTranslation } from "react-i18next"
import { CardGridSkeleton, EmptyState, ErrorState, Note, PageHero } from "@/components/shared"
import { CompanyCard } from "../components/CompanyCard"
import { CompanyFilters } from "../components/CompanyFilters"
import { useCompaniesList } from "../hooks/useCompaniesList"

export function CompaniesPage() {
  const { t } = useTranslation()
  const { search, update, base, countries, items, status, error, refetch } = useCompaniesList()

  return (
    <>
      <PageHero
        eyebrow={t("companies.eyebrow")}
        title={t("companies.title")}
        lead={t("companies.lead")}
        image="/img/office.jpg"
        position="center 50%"
      />
      <section className="container-page pb-20">
        <CompanyFilters search={search} total={base} countries={countries} onChange={update} />
        <p className="my-4 font-semibold text-muted-foreground">
          {status === "success" ? t("companies.found", { count: items.length }) : t("common.loading")}
        </p>
        {status === "pending" && <CardGridSkeleton />}
        {status === "error" && <ErrorState error={error} onRetry={() => refetch()} />}
        {status === "success" && items.length === 0 && <EmptyState text={t("companies.empty")} />}
        {status === "success" && items.length > 0 && (
          <div className="card-grid">
            {items.map((c) => (
              <CompanyCard key={c.name} company={c} />
            ))}
          </div>
        )}
        <Note>{t("companies.note")}</Note>
      </section>
    </>
  )
}
