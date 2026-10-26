import { Link } from "@tanstack/react-router"
import { StatusBadge } from "@/components/shared"
import { ROUTES } from "@/constants"
import { useAdminList } from "../hooks/useAdminList"
import { QueueStates } from "./QueueStates"

export function ApplicationsTable() {
  const { items, status, error, refetch } = useAdminList("applications")
  return (
    <QueueStates status={status} error={error} refetch={() => refetch()} empty={items.length === 0}>
      <ul className="grid gap-2">
        {items.map((a) => (
          <li
            key={a.id}
            className="grid justify-items-start gap-2 rounded-xl border bg-card p-4 sm:flex sm:items-center sm:gap-3"
          >
            <div className="min-w-0 flex-1">
              <p className="font-bold break-all">{a.name || a.email}</p>
              <Link
                to={ROUTES.candidates}
                params={{ id: String(a.vacancy_id) }}
                className="text-sm text-navy-700 hover:underline"
              >
                {a.title} · {a.company}
              </Link>
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
