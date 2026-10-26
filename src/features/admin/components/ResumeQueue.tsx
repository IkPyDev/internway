import { ResumePhoto } from "@/features/student"
import { useModerationQueue } from "../hooks/useAdminList"
import { useAdminPanel } from "../hooks/useAdminPanel"
import type { AdminResume } from "../types"
import { ModerationCard } from "./ModerationCard"
import { QueueStates } from "./QueueStates"

const SEARCH_KEYS: (keyof AdminResume)[] = ["title", "name", "email", "city", "skills", "education"]

export function ResumeQueue() {
  const panel = useAdminPanel()
  const { items, status, error, refetch } = useModerationQueue("resumes", panel.status, panel.q, SEARCH_KEYS)
  return (
    <QueueStates status={status} error={error} refetch={() => refetch()} empty={items.length === 0}>
      <ul className="grid gap-4">
        {items.map((r) => (
          <ModerationCard
            key={r.id}
            media={<ResumePhoto id={r.photo_id} className="size-12" />}
            title={r.title}
            meta={[r.name, r.email, r.city].filter(Boolean).join(" · ")}
            status={r.status}
            reason={r.reject_reason}
            busy={panel.busy}
            onOpen={() => panel.open({ user: r.user_id })}
            onApprove={() => panel.approve("resumes", r.id)}
            onReject={(reason) => panel.reject("resumes", r.id, reason)}
          >
            {r.about || r.skills}
          </ModerationCard>
        ))}
      </ul>
    </QueueStates>
  )
}
