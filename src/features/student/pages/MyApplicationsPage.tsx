import { Link } from "@tanstack/react-router"
import { MessageSquareText, Undo2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import {
  CardGridSkeleton,
  EmptyState,
  ErrorState,
  FormError,
  PageShell,
  StatusBadge,
} from "@/components/shared"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { useMyApplications } from "../hooks/useMyApplications"
import { canWithdraw } from "../lib/resume"

export function MyApplicationsPage() {
  const { t } = useTranslation()
  const { items, status, error, refetch, withdraw, withdrawing, withdrawError } = useMyApplications()

  return (
    <PageShell title={t("myApplications.title")} lead={t("myApplications.lead")}>
      <div className="mb-4">
        <FormError error={withdrawError} />
      </div>
      {status === "pending" && <CardGridSkeleton count={3} />}
      {status === "error" && <ErrorState error={error} onRetry={() => refetch()} />}
      {status === "success" && items.length === 0 && <EmptyState text={t("myApplications.empty")} />}
      <ul className="grid gap-3">
        {items.map((a) => (
          <li key={a.id} className="card-hover grid gap-3 rounded-xl border bg-card p-4">
            <div className="grid justify-items-start gap-2 sm:flex sm:items-center sm:gap-3">
              <div className="min-w-0 flex-1">
                <Link
                  to={ROUTES.vacancy}
                  params={{ id: String(a.vacancy_id) }}
                  className="font-bold hover:underline"
                >
                  {a.title}
                </Link>
                <p className="text-sm text-muted-foreground">
                  <Link
                    to={ROUTES.publicCompany}
                    params={{ id: String(a.company_id) }}
                    className="font-semibold text-navy-700 hover:underline"
                  >
                    {a.company}
                  </Link>
                  {[a.city, a.country].filter(Boolean).map((p) => ` · ${p}`)}
                </p>
              </div>
              <span className="text-xs text-muted-foreground">
                {new Date(a.updated_at).toLocaleDateString()}
              </span>
              <StatusBadge status={a.status} />
            </div>
            {a.employer_note && (
              <p className="flex gap-2 rounded-md bg-muted p-3 text-sm whitespace-pre-line">
                <MessageSquareText className="size-4 shrink-0 text-navy-700" aria-hidden />
                {a.employer_note}
              </p>
            )}
            {canWithdraw(a.status) && (
              <Button
                variant="ghost"
                size="sm"
                className="w-fit rounded-full"
                disabled={withdrawing}
                onClick={() => withdraw(a.id)}
              >
                <Undo2 aria-hidden /> {t("myApplications.withdraw")}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </PageShell>
  )
}
