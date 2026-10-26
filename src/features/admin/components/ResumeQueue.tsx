import { ResumeView } from "@/features/student"
import { useModerationQueue } from "../hooks/useAdminList"
import { useAdminPanel } from "../hooks/useAdminPanel"
import { ModerationCard } from "./ModerationCard"
import { QueueStates } from "./QueueStates"

export function ResumeQueue() {
  const panel = useAdminPanel()
  const { items, status, error, refetch } = useModerationQueue("resumes", panel.status)
  return (
    <QueueStates status={status} error={error} refetch={() => refetch()} empty={items.length === 0}>
      <ul className="grid gap-4">
        {items.map((r) => (
          <ModerationCard
            key={r.id}
            title={r.title}
            meta={[r.name, r.email].filter(Boolean).join(" · ")}
            status={r.status}
            reason={r.reject_reason}
            busy={panel.busy}
            onApprove={() => panel.approve("resumes", r.id)}
            onReject={(reason) => panel.reject("resumes", r.id, reason)}
          >
            <ResumeView resume={r} />
          </ModerationCard>
        ))}
      </ul>
    </QueueStates>
  )
}
