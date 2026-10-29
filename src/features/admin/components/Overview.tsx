import { useTranslation } from "react-i18next"
import { CardGridSkeleton, ErrorState } from "@/components/shared"
import { useAdminStatsQuery } from "../api/queries/useAdminStatsQuery"
import { useAdminPanel } from "../hooks/useAdminPanel"
import type { AdminStats, ModeratedTable } from "../types"

const TOTALS: (keyof AdminStats)[] = [
  "students",
  "employers",
  "companies",
  "live_vacancies",
  "applications",
  "hired",
]
const QUEUES: { table: ModeratedTable; key: keyof AdminStats }[] = [
  { table: "companies", key: "pending_companies" },
  { table: "vacancies", key: "pending_vacancies" },
  { table: "resumes", key: "pending_resumes" },
]

/** Platform totals and the moderation queues, each a shortcut to its tab. */
export function Overview() {
  const { t } = useTranslation()
  const { update } = useAdminPanel()
  const { data, status, error, refetch } = useAdminStatsQuery()

  if (status === "pending") return <CardGridSkeleton count={3} />
  if (status === "error") return <ErrorState error={error} onRetry={() => refetch()} />
  return (
    <div className="grid gap-8">
      <div>
        <h2 className="mb-3 text-xl">{t("admin.queues")}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {QUEUES.map(({ table, key }) => (
            <button
              key={table}
              type="button"
              onClick={() => update({ tab: table, status: "pending" })}
              className="grid gap-1 rounded-xl border bg-card p-5 text-left transition hover:border-navy-700 hover:shadow-card"
            >
              <span
                className={`text-4xl font-bold ${data[key] ? "text-amber-700" : "text-muted-foreground"}`}
              >
                {data[key]}
              </span>
              <span className="font-semibold">{t(`admin.stats.${key}`)}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-3 text-xl">{t("admin.totals")}</h2>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {TOTALS.map((key) => (
            <div key={key} className="card-hover rounded-xl border bg-card p-4">
              <dd className="text-3xl font-bold text-navy-900">{data[key]}</dd>
              <dt className="text-sm text-muted-foreground">{t(`admin.stats.${key}`)}</dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
