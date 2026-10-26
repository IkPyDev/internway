import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { useSession } from "@/features/auth"
import { useAdminList } from "../hooks/useAdminList"
import { useAdminPanel } from "../hooks/useAdminPanel"
import { QueueStates } from "./QueueStates"

export function UsersTable() {
  const { t } = useTranslation()
  const panel = useAdminPanel()
  const { user: me } = useSession()
  const { items, status, error, refetch } = useAdminList("users")
  return (
    <QueueStates status={status} error={error} refetch={() => refetch()} empty={items.length === 0}>
      <ul className="grid gap-2">
        {items.map((u) => (
          <li
            key={u.id}
            className="grid justify-items-start gap-2 rounded-xl border bg-card p-4 sm:flex sm:items-center sm:gap-3"
          >
            <div className="min-w-0 flex-1">
              <p className="font-bold break-all">{u.email}</p>
              <p className="text-sm text-muted-foreground">
                {[u.name, u.company, t(`roles.${u.role ?? "none"}`)].filter(Boolean).join(" · ")}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">
              {u.role === "student" && t("admin.applicationsCount", { count: u.applications })}
            </span>
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
  )
}
