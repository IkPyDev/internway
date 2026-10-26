import { useModerationQueue } from "../hooks/useAdminList"
import { useAdminPanel } from "../hooks/useAdminPanel"
import type { AdminCompany } from "../types"
import { ModerationCard } from "./ModerationCard"
import { QueueStates } from "./QueueStates"

const SEARCH_KEYS: (keyof AdminCompany)[] = ["name", "industry", "city", "country", "owner_email", "website"]

export function CompanyQueue() {
  const panel = useAdminPanel()
  const { items, status, error, refetch } = useModerationQueue(
    "companies",
    panel.status,
    panel.q,
    SEARCH_KEYS,
  )
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
            onOpen={() => panel.open({ company: c.id })}
            onApprove={() => panel.approve("companies", c.id)}
            onReject={(reason) => panel.reject("companies", c.id, reason)}
          >
            {c.description}
          </ModerationCard>
        ))}
      </ul>
    </QueueStates>
  )
}
