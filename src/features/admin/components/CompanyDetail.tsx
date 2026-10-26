import { ExternalLink } from "lucide-react"
import { useTranslation } from "react-i18next"
import { CardGridSkeleton, ErrorState, StatusBadge } from "@/components/shared"
import { safeUrl } from "@/lib"
import { useCompanyDetail } from "../hooks/useAdminDetail"
import { useAdminPanel } from "../hooks/useAdminPanel"
import { DetailRow, DetailSection, RejectReason } from "./DetailParts"
import { ModerationActions } from "./ModerationActions"

/** One company: the full profile with moderation, its team and every vacancy. */
export function CompanyDetail({ id }: { id: number }) {
  const { t } = useTranslation()
  const panel = useAdminPanel()
  const { data: c, status, error, refetch } = useCompanyDetail(id)

  if (status === "pending") return <CardGridSkeleton count={2} />
  if (status === "error") return <ErrorState error={error} onRetry={() => refetch()} />
  const facts = [
    c.industry,
    [c.city, c.country].filter(Boolean).join(", "),
    c.size && t("company.employees", { size: c.size }),
  ].filter(Boolean)
  return (
    <div className="grid gap-6">
      <div className="grid gap-2 pr-8">
        <h2 className="text-xl">{c.name}</h2>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <StatusBadge status={c.status} />
          <span>{facts.join(" · ")}</span>
        </div>
        {c.website && (
          <a
            href={safeUrl(c.website)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 text-sm break-all text-navy-700 hover:underline"
          >
            <ExternalLink className="size-4 shrink-0" aria-hidden /> {c.website}
          </a>
        )}
      </div>
      <RejectReason reason={c.reject_reason} label={t("moderation.reason")} />
      <ModerationActions
        status={c.status}
        busy={panel.busy}
        onApprove={() => panel.approve("companies", c.id)}
        onReject={(reason) => panel.reject("companies", c.id, reason)}
      />
      <DetailSection title={t("admin.about")}>
        <p className="text-sm whitespace-pre-line">{c.description || t("admin.noDescription")}</p>
      </DetailSection>
      <DetailSection title={t("admin.team", { count: c.members.length })}>
        <ul className="grid gap-2">
          {c.members.map((m) => (
            <DetailRow
              key={m.id}
              title={m.name || m.email}
              meta={[
                m.name && m.email,
                t(m.isOwner ? "admin.owner" : "admin.manager"),
                m.blocked && t("admin.blocked"),
              ]
                .filter(Boolean)
                .join(" · ")}
              onOpen={() => panel.open({ user: m.id })}
            />
          ))}
        </ul>
      </DetailSection>
      <DetailSection title={t("admin.vacanciesTitle", { count: c.vacancies.length })}>
        {c.vacancies.length ? (
          <ul className="grid gap-2">
            {c.vacancies.map((v) => (
              <DetailRow
                key={v.id}
                title={v.title}
                meta={`${new Date(v.created_at).toLocaleDateString()} · ${t("admin.applicationsCount", { count: v.applications })}`}
                status={v.status}
                onOpen={() => panel.open({ vacancy: v.id })}
              />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">{t("admin.empty")}</p>
        )}
      </DetailSection>
    </div>
  )
}
