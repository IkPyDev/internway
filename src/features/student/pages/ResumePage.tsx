import { useTranslation } from "react-i18next"
import { CardGridSkeleton, ErrorState, Field, FormError, PageShell, StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RESUME_FIELDS } from "../constants"
import { useResumeForm } from "../hooks/useResumeForm"

export function ResumePage() {
  const { t } = useTranslation()
  const form = useResumeForm()

  return (
    <PageShell title={t("resume.title")} lead={t("resume.lead")}>
      {form.status === "pending" && <CardGridSkeleton count={2} />}
      {form.status === "error" && <ErrorState error={form.error} onRetry={() => form.refetch()} />}
      {form.status === "success" && (
        <form
          className="grid max-w-3xl gap-5 rounded-xl border bg-card p-5 sm:p-7"
          onSubmit={(e) => {
            e.preventDefault()
            form.submit()
          }}
        >
          {form.resume && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <StatusBadge status={form.resume.status} />
              <span className="text-muted-foreground">{t(`resume.statusHint.${form.resume.status}`)}</span>
              {form.resume.reject_reason && (
                <p className="w-full rounded-md bg-red-50 px-3 py-2 text-red-700">
                  {t("moderation.reason")}: {form.resume.reject_reason}
                </p>
              )}
            </div>
          )}
          {RESUME_FIELDS.map(({ key, long, required }) => (
            <Field key={key} label={t(`resume.fields.${key}`)}>
              {long ? (
                <Textarea
                  rows={4}
                  value={form.fields[key]}
                  onChange={(e) => form.set(key, e.target.value)}
                  className="font-normal"
                />
              ) : (
                <Input
                  required={required}
                  value={form.fields[key]}
                  onChange={(e) => form.set(key, e.target.value)}
                  className="font-normal"
                />
              )}
            </Field>
          ))}
          <FormError error={form.saveError} />
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" className="rounded-full font-bold" disabled={form.saving}>
              {t("resume.save")}
            </Button>
            {form.saved && <span className="text-sm text-green-700">{t("resume.saved")}</span>}
          </div>
        </form>
      )}
    </PageShell>
  )
}
