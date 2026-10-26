import { Mail } from "lucide-react"
import { useTranslation } from "react-i18next"
import { CardGridSkeleton, ErrorState, StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { useSession } from "@/features/auth"
import { ResumeView } from "@/features/student"
import { useUserDetail } from "../hooks/useAdminDetail"
import { useAdminPanel } from "../hooks/useAdminPanel"
import { DetailRow, DetailSection, RejectReason } from "./DetailParts"
import { ModerationActions } from "./ModerationActions"

/** One user: account, company, the full resume with moderation, and every application. */
export function UserDetail({ id }: { id: number }) {
  const { t } = useTranslation()
  const panel = useAdminPanel()
  const { user: me } = useSession()
  const { data: u, status, error, refetch } = useUserDetail(id)

  if (status === "pending") return <CardGridSkeleton count={2} />
  if (status === "error") return <ErrorState error={error} onRetry={() => refetch()} />
  return (
    <div className="grid gap-6">
      <div className="grid gap-1 pr-8">
        <h2 className="text-xl break-all">{u.name || u.email}</h2>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-full bg-navy-900 px-2.5 py-0.5 text-xs font-bold text-white">
            {t(`roles.${u.role ?? "none"}`)}
          </span>
          {u.blocked && (
            <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700">
              {t("admin.blocked")}
            </span>
          )}
          <span>{t("admin.joined", { date: new Date(u.created_at).toLocaleDateString() })}</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${u.email}`}
          className="flex items-center gap-1.5 text-sm break-all text-navy-700 hover:underline"
        >
          <Mail className="size-4 shrink-0" aria-hidden /> {u.email}
        </a>
        {u.id !== me?.id && (
          <Button
            size="sm"
            variant={u.blocked ? "outline" : "destructive"}
            className="ml-auto rounded-full"
            disabled={panel.busy}
            onClick={() => panel.setBlocked(u.id, !u.blocked)}
          >
            {t(u.blocked ? "admin.unblock" : "admin.block")}
          </Button>
        )}
      </div>

      {u.company && (
        <DetailSection title={t("admin.company")}>
          <ul>
            <DetailRow
              title={u.company.name}
              meta={t(u.company.isOwner ? "admin.owner" : "admin.manager")}
              status={u.company.status}
              onOpen={() => panel.open({ company: u.company?.id })}
            />
          </ul>
        </DetailSection>
      )}

      {u.role === "student" && (
        <DetailSection title={t("admin.resume")}>
          {u.resume ? (
            <div className="grid gap-4 rounded-xl border p-4">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={u.resume.status} />
                <span className="text-xs text-muted-foreground">
                  {t("admin.updated", { date: new Date(u.resume.updated_at).toLocaleString() })}
                </span>
              </div>
              <RejectReason reason={u.resume.reject_reason} label={t("moderation.reason")} />
              <ModerationActions
                status={u.resume.status}
                busy={panel.busy}
                onApprove={() => u.resume && panel.approve("resumes", u.resume.id)}
                onReject={(reason) => u.resume && panel.reject("resumes", u.resume.id, reason)}
              />
              <div className="border-t pt-4">
                <ResumeView resume={u.resume} />
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t("resume.none")}</p>
          )}
        </DetailSection>
      )}

      {u.applications.length > 0 && (
        <DetailSection title={t("admin.applicationsTitle", { count: u.applications.length })}>
          <ul className="grid gap-2">
            {u.applications.map((a) => (
              <DetailRow
                key={a.id}
                title={a.title}
                meta={`${a.company} · ${new Date(a.created_at).toLocaleDateString()}`}
                status={a.status}
                onOpen={() => panel.open({ vacancy: a.vacancy_id })}
              />
            ))}
          </ul>
        </DetailSection>
      )}
    </div>
  )
}
