import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import {
  CardGridSkeleton,
  CompanyLogo,
  ErrorState,
  Field,
  FormError,
  OptionSelect,
  PageShell,
  StatusBadge,
} from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ROUTES } from "@/constants"
import { FileUpload, PHOTO_TYPES } from "@/features/student"
import { cn } from "@/lib"
import { TeamSection } from "../components/TeamSection"
import { COMPANY_SECTIONS, COMPANY_SIZES } from "../constants"
import { useCompanyProfile } from "../hooks/useCompanyProfile"

const heading = "border-t pt-5 text-lg sm:col-span-2"

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
              {!p.profileComplete && (
                <p className="w-full rounded-md border border-gold/60 bg-gold/10 px-3 py-2 text-navy-900">
                  {t("companyFirst.formHint")}
                </p>
              )}
              {p.company.status === "rejected" && p.company.reject_reason && (
                <p className="w-full rounded-md bg-red-50 px-3 py-2 text-red-700">
                  {t("moderation.reason")}: {p.company.reject_reason}
                </p>
              )}
            </div>
            <fieldset disabled={!p.canEdit} className="contents">
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <CompanyLogo id={fields.logo_id} className="size-20" />
                <div className="grid gap-1">
                  <p className="text-sm font-semibold">{t("company.fields.logo")}</p>
                  <FileUpload
                    fileId={fields.logo_id}
                    accept={PHOTO_TYPES}
                    label={t("company.uploadLogo")}
                    busy={p.uploading}
                    upload={p.upload}
                    onChange={(id) => set("logo_id", id)}
                  />
                  <p className="text-xs text-muted-foreground">{t("company.logoHint")}</p>
                </div>
              </div>
              {COMPANY_SECTIONS.map((section) => (
                <div key={section.key} className="contents">
                  <h2 className={cn(heading, section.key === "about" && "border-t-0 pt-0")}>
                    {t(`company.sections.${section.key}`)}
                  </h2>
                  {section.key === "contact" && (
                    <p className="-mt-3 text-xs text-muted-foreground sm:col-span-2">
                      {t("company.contactPrivate")}
                    </p>
                  )}
                  {section.fields.map(({ key, required, type, wide }) => (
                    <Field
                      key={key}
                      label={t(`company.fields.${key}`)}
                      required={required}
                      className={wide ? "sm:col-span-2" : undefined}
                    >
                      <Input
                        required={required}
                        type={type ?? "text"}
                        placeholder={t(`company.placeholders.${key}`)}
                        value={fields[key]}
                        onChange={(e) => set(key, e.target.value)}
                        className="font-normal"
                      />
                    </Field>
                  ))}
                  {section.key === "about" && (
                    <>
                      <Field label={t("company.fields.size")}>
                        <OptionSelect
                          value={fields.size}
                          options={COMPANY_SIZES}
                          label={(s) => t("company.employees", { size: s })}
                          onChange={(v) => set("size", v)}
                          placeholder={t("company.fields.sizePlaceholder")}
                        />
                      </Field>
                      <Field label={t("company.fields.description")} required className="sm:col-span-2">
                        <Textarea
                          required
                          rows={6}
                          value={fields.description}
                          onChange={(e) => set("description", e.target.value)}
                          placeholder={t("company.placeholders.description")}
                          className="font-normal"
                        />
                      </Field>
                    </>
                  )}
                </div>
              ))}
              <h2 className={heading}>{t("company.sections.verification")}</h2>
              <Field label={t("company.fields.registration_no")} className="sm:col-span-2">
                <Input
                  value={fields.registration_no}
                  onChange={(e) => set("registration_no", e.target.value)}
                  placeholder={t("company.placeholders.registration_no")}
                  className="font-normal"
                />
              </Field>
              <p className="-mt-3 text-xs text-muted-foreground sm:col-span-2">
                {t("company.verificationHint")}
              </p>
            </fieldset>
            <div className="grid gap-3 sm:col-span-2">
              {p.fileError && (
                <p role="alert" className="text-sm text-destructive">
                  {t(`errors.${p.fileError}`)}
                </p>
              )}
              <FormError error={p.uploadFailure} />
              <FormError error={p.saveError} />
              {p.canEdit ? (
                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" className="rounded-full font-bold" disabled={p.saving || p.uploading}>
                    {t("company.save")}
                  </Button>
                  {p.saved && <span className="text-sm text-green-700">{t("company.saved")}</span>}
                  {p.saved && p.profileComplete && (
                    <Button asChild variant="outline" className="rounded-full">
                      <Link to={ROUTES.newVacancy}>{t("companyFirst.post")} →</Link>
                    </Button>
                  )}
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
