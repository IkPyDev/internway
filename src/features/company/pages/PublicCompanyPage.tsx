import { Building2, Globe, MapPin, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import { CardGridSkeleton, EmptyState, ErrorState } from "@/components/shared"
import { VacancyCard } from "@/features/vacancies"
import { safeUrl } from "@/lib"
import { usePublicCompany } from "../hooks/usePublicCompany"

export function PublicCompanyPage() {
  const { t } = useTranslation()
  const { company: c, status, error, refetch } = usePublicCompany()

  return (
    <section className="container-page py-10 sm:py-14">
      {status === "pending" && <CardGridSkeleton count={3} />}
      {status === "error" && <ErrorState error={error} onRetry={() => refetch()} />}
      {c && (
        <div className="grid gap-10">
          <header className="grid gap-3">
            <span className="eyebrow">{c.industry || t("company.eyebrow")}</span>
            <h1 className="flex items-center gap-3 text-3xl sm:text-5xl">
              <Building2 className="size-9 shrink-0 text-navy-700" aria-hidden /> {c.name}
            </h1>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
              {[c.city, c.country].some(Boolean) && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" aria-hidden /> {[c.city, c.country].filter(Boolean).join(", ")}
                </span>
              )}
              {c.size && (
                <span className="flex items-center gap-1.5">
                  <Users className="size-4" aria-hidden /> {t("company.employees", { size: c.size })}
                </span>
              )}
              {c.website && (
                <a
                  href={safeUrl(c.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 break-all text-navy-700 hover:underline"
                >
                  <Globe className="size-4 shrink-0" aria-hidden /> {c.website}
                </a>
              )}
            </div>
            {c.description && (
              <p className="max-w-3xl leading-relaxed whitespace-pre-line">{c.description}</p>
            )}
          </header>
          <div>
            <h2 className="mb-5 text-2xl">{t("company.openVacancies", { count: c.vacancies.length })}</h2>
            {c.vacancies.length === 0 ? (
              <EmptyState text={t("company.noVacancies")} />
            ) : (
              <div className="card-grid">
                {c.vacancies.map((v) => (
                  <VacancyCard key={v.id} item={v} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
