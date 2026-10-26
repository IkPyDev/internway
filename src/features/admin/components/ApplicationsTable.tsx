import { useTranslation } from "react-i18next"
import { StatusBadge } from "@/components/shared"
import { useApplications } from "../hooks/useAdminList"
import { useAdminPanel } from "../hooks/useAdminPanel"
import { QueueStates } from "./QueueStates"

/** Every application; the student opens their profile, the vacancy opens the vacancy. */
export function ApplicationsTable() {
  const { t } = useTranslation()
  const panel = useAdminPanel()
  const { items, status, error, refetch } = useApplications(panel.q)
  return (
    <QueueStates status={status} error={error} refetch={() => refetch()} empty={items.length === 0}>
      <ul className="grid gap-2">
        {items.map((a) => (
          <li
            key={a.id}
            className="grid justify-items-start gap-2 rounded-xl border bg-card p-4 transition hover:border-navy-700/50 sm:flex sm:items-center sm:gap-3"
          >
            <div className="min-w-0 flex-1">
              <button
                type="button"
                onClick={() => panel.open({ user: a.student_id })}
                className="block text-left font-bold break-all hover:underline"
              >
                {a.name || a.email}
              </button>
              <button
                type="button"
                onClick={() => panel.open({ vacancy: a.vacancy_id })}
                className="block text-left text-sm text-navy-700 hover:underline"
                title={t("admin.openVacancy")}
              >
                {a.title} · {a.company}
              </button>
            </div>
            <span className="text-xs text-muted-foreground">
              {new Date(a.created_at).toLocaleDateString()}
            </span>
            <StatusBadge status={a.status} />
          </li>
        ))}
      </ul>
    </QueueStates>
  )
}
