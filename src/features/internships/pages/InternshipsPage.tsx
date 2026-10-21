import { useTranslation } from "react-i18next"
import { CardGridSkeleton, EmptyState, ErrorState, PageHero, Pager } from "@/components/shared"
import { InternshipCard } from "../components/InternshipCard"
import { InternshipFilters } from "../components/InternshipFilters"
import { RegionPills } from "../components/RegionPills"
import { SourceLinks } from "../components/SourceLinks"
import { useInternshipsList } from "../hooks/useInternshipsList"

export function InternshipsPage() {
  const { t } = useTranslation()
  const { search, update, base, counts, page, links, status, error, refetch } = useInternshipsList()

  return (
    <>
      <PageHero
        eyebrow={t("internships.eyebrow")}
        title={t("internships.title")}
        lead={t("internships.lead")}
        image="/img/milan.jpg"
        position="center 70%"
      />
      <section className="container-page pb-20">
        <InternshipFilters search={search} onChange={update} />
        <RegionPills
          active={search.region}
          total={base}
          counts={counts}
          onSelect={(region) => update({ region })}
        />
        <p className="my-4 font-semibold text-muted-foreground">
          {status === "success" ? t("internships.found", { count: page.total }) : t("common.loading")}
        </p>
        {status === "pending" && <CardGridSkeleton count={9} />}
        {status === "error" && <ErrorState error={error} onRetry={() => refetch()} />}
        {status === "success" && page.total === 0 && <EmptyState text={t("internships.empty")} />}
        {status === "success" && page.total > 0 && (
          <>
            <div className="card-grid">
              {page.items.map((item) => (
                <InternshipCard key={item.url} item={item} />
              ))}
            </div>
            <Pager
              page={page.page}
              pages={page.pages}
              onChange={(p) => {
                update({ page: p })
                document.getElementById("filters")?.scrollIntoView({ behavior: "smooth" })
              }}
            />
          </>
        )}
        <SourceLinks links={links} />
      </section>
    </>
  )
}
