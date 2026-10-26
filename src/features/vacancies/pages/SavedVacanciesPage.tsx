import { Link } from "@tanstack/react-router"
import { BookmarkX } from "lucide-react"
import { useTranslation } from "react-i18next"
import { CardGridSkeleton, EmptyState, ErrorState, PageShell, StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { Salary } from "../components/Salary"
import { useSavedVacancies } from "../hooks/useSavedVacancies"
import { place } from "../lib/vacancies"

export function SavedVacanciesPage() {
  const { t } = useTranslation()
  const { items, status, error, refetch, remove } = useSavedVacancies()

  return (
    <PageShell title={t("saved.title")} lead={t("saved.lead")}>
      {status === "pending" && <CardGridSkeleton count={3} />}
      {status === "error" && <ErrorState error={error} onRetry={() => refetch()} />}
      {status === "success" && items.length === 0 && <EmptyState text={t("saved.empty")} />}
      <ul className="grid gap-3">
        {items.map((v) => (
          <li
            key={v.id}
            className="grid justify-items-start gap-2 rounded-xl border bg-card p-4 sm:flex sm:items-center sm:gap-3"
          >
            <div className="min-w-0 flex-1">
              <Link to={ROUTES.vacancy} params={{ id: String(v.id) }} className="font-bold hover:underline">
                {v.title}
              </Link>
              <p className="text-sm text-muted-foreground">
                {[v.company, place(v)].filter(Boolean).join(" · ")}
              </p>
              <p className="text-sm font-semibold">
                <Salary from={v.salary_from} to={v.salary_to} currency={v.currency} />
              </p>
            </div>
            {!v.open && <StatusBadge status="closed" />}
            <Button variant="ghost" size="sm" className="rounded-full" onClick={() => remove(v.id)}>
              <BookmarkX aria-hidden /> {t("saved.remove")}
            </Button>
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
