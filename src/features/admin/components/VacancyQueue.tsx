import { Salary } from "@/features/vacancies"
import { useModerationQueue } from "../hooks/useAdminList"
import { useAdminPanel } from "../hooks/useAdminPanel"
import type { AdminVacancy } from "../types"
import { ModerationCard } from "./ModerationCard"
import { QueueStates } from "./QueueStates"

const SEARCH_KEYS: (keyof AdminVacancy)[] = ["title", "company", "city", "country", "skills"]

export function VacancyQueue() {
  const panel = useAdminPanel()
  const { items, status, error, refetch } = useModerationQueue(
    "vacancies",
    panel.status,
    panel.q,
    SEARCH_KEYS,
  )
  return (
    <QueueStates status={status} error={error} refetch={() => refetch()} empty={items.length === 0}>
      <ul className="grid gap-4">
        {items.map((v) => (
          <ModerationCard
            key={v.id}
            title={v.title}
            meta={[v.company, [v.city, v.country].filter(Boolean).join(", ")].filter(Boolean).join(" · ")}
            status={v.status}
            reason={v.reject_reason}
            busy={panel.busy}
            onOpen={() => panel.open({ vacancy: v.id })}
            onApprove={() => panel.approve("vacancies", v.id)}
            onReject={(reason) => panel.reject("vacancies", v.id, reason)}
          >
            <b className="text-foreground">
              <Salary from={v.salary_from} to={v.salary_to} currency={v.currency} />
            </b>{" "}
            · {v.description}
          </ModerationCard>
        ))}
      </ul>
    </QueueStates>
  )
}
