import { Link } from "@tanstack/react-router"
import { Archive, ArchiveRestore, Pencil, Plus, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import { CardGridSkeleton, EmptyState, ErrorState, Note, PageShell, StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { CompanyFirst } from "../components/CompanyFirst"
import { Salary } from "../components/Salary"
import { useMyVacancies } from "../hooks/useMyVacancies"
import { place } from "../lib/vacancies"

export function MyVacanciesPage() {
  const { t } = useTranslation()
  const { items, status, error, refetch, companyStatus, profileComplete, setClosed, busy } = useMyVacancies()

  return (
    <PageShell
      title={t("myVacancies.title")}
      lead={t("myVacancies.lead")}
      actions={
        profileComplete && (
          <Button asChild className="rounded-full font-bold">
            <Link to={ROUTES.newVacancy}>
              <Plus aria-hidden /> {t("myVacancies.new")}
            </Link>
          </Button>
        )
      }
    >
      {!profileComplete && (
        <div className="mb-6">
          <CompanyFirst />
        </div>
      )}
      {profileComplete && companyStatus && companyStatus !== "approved" && (
        <div className="mb-6">
          <Note>
            {t(`myVacancies.company.${companyStatus}`)}{" "}
            <Link to={ROUTES.company} className="font-semibold text-navy-700 underline">
              {t("company.title")}
            </Link>
          </Note>
        </div>
      )}
      {status === "pending" && <CardGridSkeleton count={3} />}
      {status === "error" && <ErrorState error={error} onRetry={() => refetch()} />}
      {status === "success" && items.length === 0 && profileComplete && (
        <EmptyState text={t("myVacancies.empty")} />
      )}
      <ul className="grid gap-3">
        {items.map((v) => (
          <li key={v.id} className="grid gap-3 rounded-xl border bg-card p-4 lg:flex lg:items-center">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link to={ROUTES.vacancy} params={{ id: String(v.id) }} className="font-bold hover:underline">
                  {v.title}
                </Link>
                <StatusBadge status={v.status} />
              </div>
              <p className="text-sm text-muted-foreground">
                <Salary from={v.salary_from} to={v.salary_to} currency={v.currency} />
                {place(v) && ` · ${place(v)}`}
              </p>
              {v.status === "rejected" && v.reject_reason && (
                <p className="mt-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
                  {t("moderation.reason")}: {v.reject_reason}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm" className="rounded-full">
                <Link to={ROUTES.candidates} params={{ id: String(v.id) }}>
                  <Users aria-hidden /> {t("myVacancies.candidates", { count: v.applications })}
                  {v.fresh > 0 && (
                    <span className="rounded-full bg-gold px-1.5 text-xs font-bold text-navy-950">
                      +{v.fresh}
                    </span>
                  )}
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="rounded-full">
                <Link to={ROUTES.editVacancy} params={{ id: String(v.id) }}>
                  <Pencil aria-hidden /> {t("myVacancies.edit")}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
                disabled={busy}
                onClick={() => setClosed(v.id, v.status !== "closed")}
              >
                {v.status === "closed" ? <ArchiveRestore aria-hidden /> : <Archive aria-hidden />}
                {t(v.status === "closed" ? "myVacancies.reopen" : "myVacancies.close")}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
