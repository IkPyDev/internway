import { useTranslation } from "react-i18next"
import { CardGridSkeleton, ErrorState, Field, FormError, PageShell, StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { CompanySize } from "@/types"
import { TeamSection } from "../components/TeamSection"
import { COMPANY_SIZES } from "../constants"
import { useCompanyProfile } from "../hooks/useCompanyProfile"

const TEXT_FIELDS = ["industry", "website", "country", "city"] as const

export function CompanyPage() {
  const { t } = useTranslation()
  const p = useCompanyProfile()
  const { fields, set } = p

  return (
    <PageShell title={t("company.title")} lead={t("company.lead")}>
      {p.status === "pending" && <CardGridSkeleton count={2} />}
      {p.status === "error" && <ErrorState error={p.error} onRetry={() => p.refetch()} />}
      {p.company && (
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:items-start">
          <form
            className="grid gap-5 rounded-xl border bg-card p-5 sm:grid-cols-2 sm:p-7"
            onSubmit={(e) => {
              e.preventDefault()
              p.submit()
            }}
          >
            <div className="flex flex-wrap items-center gap-2 text-sm sm:col-span-2">
              <StatusBadge status={p.company.status} />
              <span className="text-muted-foreground">{t(`company.statusHint.${p.company.status}`)}</span>
              {p.company.status === "rejected" && p.company.reject_reason && (
                <p className="w-full rounded-md bg-red-50 px-3 py-2 text-red-700">
                  {t("moderation.reason")}: {p.company.reject_reason}
                </p>
              )}
            </div>
            <fieldset disabled={!p.canEdit} className="contents">
              <Field label={t("company.fields.name")} className="sm:col-span-2">
                <Input required value={fields.name} onChange={(e) => set("name", e.target.value)} />
              </Field>
              {TEXT_FIELDS.map((key) => (
                <Field key={key} label={t(`company.fields.${key}`)}>
                  <Input
                    type={key === "website" ? "url" : "text"}
                    placeholder={key === "website" ? "https://" : undefined}
                    value={fields[key]}
                    onChange={(e) => set(key, e.target.value)}
                    className="font-normal"
                  />
                </Field>
              ))}
              <Field label={t("company.fields.size")}>
                {/* Narrowing cast: the items come from COMPANY_SIZES. */}
                <Select value={fields.size || undefined} onValueChange={(v) => set("size", v as CompanySize)}>
                  <SelectTrigger className="w-full font-normal">
                    <SelectValue placeholder={t("company.fields.sizePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_SIZES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {t("company.employees", { size: s })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label={t("company.fields.description")} className="sm:col-span-2">
                <Textarea
                  rows={6}
                  value={fields.description}
                  onChange={(e) => set("description", e.target.value)}
                  className="font-normal"
                />
              </Field>
            </fieldset>
            <div className="grid gap-3 sm:col-span-2">
              <FormError error={p.saveError} />
              {p.canEdit ? (
                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" className="rounded-full font-bold" disabled={p.saving}>
                    {t("company.save")}
                  </Button>
                  {p.saved && <span className="text-sm text-green-700">{t("company.saved")}</span>}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">{t("company.ownerOnly")}</p>
              )}
            </div>
          </form>
          <TeamSection
            members={p.company.members}
            invites={p.company.invites}
            canEdit={p.canEdit}
            busy={p.teamBusy}
            error={p.teamError}
            email={p.inviteEmail}
            onEmail={p.setInviteEmail}
            onInvite={p.sendInvite}
            onCancelInvite={p.cancelInvite}
            onRemove={p.removeMember}
          />
        </div>
      )}
    </PageShell>
  )
}
