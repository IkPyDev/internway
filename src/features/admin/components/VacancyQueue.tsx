import { useTranslation } from "react-i18next"
import { Salary } from "@/features/vacancies"
import { useModerationQueue } from "../hooks/useAdminList"
import { useAdminPanel } from "../hooks/useAdminPanel"
import { ModerationCard } from "./ModerationCard"
import { QueueStates } from "./QueueStates"

export function VacancyQueue() {
  const { t } = useTranslation()
  const panel = useAdminPanel()
  const { items, status, error, refetch } = useModerationQueue("vacancies", panel.status)
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
            onApprove={() => panel.approve("vacancies", v.id)}
            onReject={(reason) => panel.reject("vacancies", v.id, reason)}
          >
            {v.company_status !== "approved" && (
              <p className="mb-2 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
                {t("admin.companyNotApproved")}
              </p>
            )}
            <p className="mb-2 text-sm font-semibold">
              <Salary from={v.salary_from} to={v.salary_to} currency={v.currency} />
            </p>
            <p className="mb-2 text-sm text-muted-foreground">
              {t(`vacancies.kind.${v.kind}`)} · {t(`vacancies.schedule.${v.schedule}`)} ·{" "}
              {t(`vacancies.employment.${v.employment}`)} · {t(`vacancies.experience.${v.experience}`)}
              {v.deadline && ` · ${t("vacancies.deadline")}: ${v.deadline}`}
            </p>
            {v.skills && <p className="mb-2 text-sm">{v.skills}</p>}
            <p className="text-sm whitespace-pre-line">{v.description}</p>
          </ModerationCard>
        ))}
      </ul>
    </QueueStates>
  )
}
