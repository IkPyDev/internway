import { useTranslation } from "react-i18next"
import { safeUrl } from "@/lib"
import { useModerationQueue } from "../hooks/useAdminList"
import { useAdminPanel } from "../hooks/useAdminPanel"
import { ModerationCard } from "./ModerationCard"
import { QueueStates } from "./QueueStates"

export function CompanyQueue() {
  const { t } = useTranslation()
  const panel = useAdminPanel()
  const { items, status, error, refetch } = useModerationQueue("companies", panel.status)
  return (
    <QueueStates status={status} error={error} refetch={() => refetch()} empty={items.length === 0}>
      <ul className="grid gap-4">
        {items.map((c) => (
          <ModerationCard
            key={c.id}
            title={c.name}
            meta={[c.industry, [c.city, c.country].filter(Boolean).join(", "), c.owner_email]
              .filter(Boolean)
              .join(" · ")}
            status={c.status}
            reason={c.reject_reason}
            busy={panel.busy}
            onApprove={() => panel.approve("companies", c.id)}
            onReject={(reason) => panel.reject("companies", c.id, reason)}
          >
            <dl className="grid gap-2 text-sm">
              {c.website && (
                <a
                  href={safeUrl(c.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-navy-700 underline"
                >
                  {c.website}
                </a>
              )}
              {c.size && <p>{t("company.employees", { size: c.size })}</p>}
              <p className="text-muted-foreground">
                {t("admin.companyCounts", { members: c.members, vacancies: c.vacancies })}
              </p>
              {c.description && <p className="whitespace-pre-line">{c.description}</p>}
            </dl>
          </ModerationCard>
        ))}
      </ul>
    </QueueStates>
  )
}
