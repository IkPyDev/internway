import { Link } from "@tanstack/react-router"
import { Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import { CardGridSkeleton, EmptyState, ErrorState, StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { Salary, VacancyTags } from "@/features/vacancies"
import { useVacancyDetail } from "../hooks/useAdminDetail"
import { useAdminPanel } from "../hooks/useAdminPanel"
import { DetailRow, DetailSection, RejectReason } from "./DetailParts"
import { ModerationActions } from "./ModerationActions"

/** One vacancy in full, with moderation, its company and a way to its candidates. */
export function VacancyDetail({ id }: { id: number }) {
  const { t } = useTranslation()
  const panel = useAdminPanel()
  const { vacancy: v, status, error, refetch } = useVacancyDetail(id)

  if (status === "pending") return <CardGridSkeleton count={2} />
  if (status === "error") return <ErrorState error={error} onRetry={() => refetch()} />
  if (!v) return <EmptyState text={t("errors.not_found")} />
  return (
    <div className="grid gap-6">
      <div className="grid gap-2 pr-8">
        <h2 className="text-xl">{v.title}</h2>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <StatusBadge status={v.status} />
          <span>{[v.city, v.country].filter(Boolean).join(", ")}</span>
          {v.deadline && (
            <span>
              · {t("vacancies.deadline")}: {v.deadline}
            </span>
          )}
        </div>
        <p className="text-lg font-bold text-navy-900">
          <Salary from={v.salary_from} to={v.salary_to} currency={v.currency} />
        </p>
        <VacancyTags
          kind={v.kind}
          schedule={v.schedule}
          employment={v.employment}
          experience={v.experience}
        />
      </div>
      {v.company_status !== "approved" && (
        <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">
          {t("admin.companyNotApproved")}
        </p>
      )}
      <RejectReason reason={v.reject_reason} label={t("moderation.reason")} />
      {v.status !== "closed" && (
        <ModerationActions
          status={v.status}
          busy={panel.busy}
          onApprove={() => panel.approve("vacancies", v.id)}
          onReject={(reason) => panel.reject("vacancies", v.id, reason)}
        />
      )}
      <DetailSection title={t("admin.company")}>
        <ul>
          <DetailRow
            title={v.company}
            status={v.company_status}
            onOpen={() => panel.open({ company: v.company_id })}
          />
        </ul>
      </DetailSection>
      {v.skills && (
        <DetailSection title={t("vacancies.skills")}>
          <p className="text-sm">{v.skills}</p>
        </DetailSection>
      )}
      <DetailSection title={t("admin.description")}>
        <p className="text-sm whitespace-pre-line">{v.description}</p>
      </DetailSection>
      <Button asChild variant="outline" className="w-fit rounded-full">
        <Link to={ROUTES.candidates} params={{ id: String(v.id) }}>
          <Users aria-hidden /> {t("admin.openCandidates")}
        </Link>
      </Button>
    </div>
  )
}
