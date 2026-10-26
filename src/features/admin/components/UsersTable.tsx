import { ChevronRight } from "lucide-react"
import { useTranslation } from "react-i18next"
import { FilterPill, StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { useSession } from "@/features/auth"
import { ROLE_FILTERS } from "../constants"
import { useUsers } from "../hooks/useAdminList"
import { useAdminPanel } from "../hooks/useAdminPanel"
import { QueueStates } from "./QueueStates"

/** Users split by role (students, employers, admins), each row opening the full profile. */
export function UsersTable() {
  const { t } = useTranslation()
  const panel = useAdminPanel()
  const { user: me } = useSession()
  const { items, counts, total, status, error, refetch } = useUsers(panel)
  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap gap-2">
        <FilterPill
          label={t("common.all")}
          count={total}
          active={!panel.role}
          onClick={() => panel.update({ role: undefined })}
        />
        {ROLE_FILTERS.map((role) => (
          <FilterPill
            key={role}
            label={t(`admin.roleFilters.${role}`)}
            count={counts[role]}
            active={panel.role === role}
            onClick={() => panel.update({ role })}
          />
        ))}
        <FilterPill
          label={t("admin.blockedOnly")}
          active={Boolean(panel.blocked)}
          onClick={() => panel.update({ blocked: panel.blocked ? undefined : true })}
        />
      </div>
      <QueueStates status={status} error={error} refetch={() => refetch()} empty={items.length === 0}>
        <ul className="grid gap-2">
          {items.map((u) => (
            <li
              key={u.id}
              className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4 transition hover:border-navy-700/50 hover:shadow-card"
            >
              <button
                type="button"
                onClick={() => panel.open({ user: u.id })}
                className="flex min-w-0 flex-1 basis-full flex-wrap items-center gap-x-3 gap-y-1 text-left sm:basis-0"
              >
                <span className="min-w-48 flex-1">
                  <span className="block font-bold break-all hover:underline">{u.name || u.email}</span>
                  <span className="block text-sm break-all text-muted-foreground">
                    {[u.name && u.email, u.company, t(`roles.${u.role ?? "none"}`)]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </span>
                {u.role === "student" && (
                  <span className="text-xs text-muted-foreground">
                    {t("admin.applicationsCount", { count: u.applications })}
                  </span>
                )}
                {u.resume_status && <StatusBadge status={u.resume_status} />}
                {u.blocked && (
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
                    {t("admin.blocked")}
                  </span>
                )}
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              </button>
              {u.id !== me?.id && (
                <Button
                  size="sm"
                  variant={u.blocked ? "outline" : "destructive"}
                  className="rounded-full"
                  disabled={panel.busy}
                  onClick={() => panel.setBlocked(u.id, !u.blocked)}
                >
                  {t(u.blocked ? "admin.unblock" : "admin.block")}
                </Button>
              )}
            </li>
          ))}
        </ul>
      </QueueStates>
    </div>
  )
}
