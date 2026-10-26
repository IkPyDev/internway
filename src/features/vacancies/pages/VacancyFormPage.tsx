import { useTranslation } from "react-i18next"
import { CardGridSkeleton, ErrorState, Field, FormError, Note, PageShell } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { VacancyFields } from "@/types"
import { CURRENCIES, EMPLOYMENTS, EXPERIENCES, KINDS, SCHEDULES } from "../constants"
import { useVacancyForm } from "../hooks/useVacancyForm"
import { readAmount } from "../lib/vacancies"

type Choice = "kind" | "schedule" | "employment" | "experience" | "currency"

export function VacancyFormPage() {
  const { t } = useTranslation()
  const form = useVacancyForm()
  const { fields, set } = form

  const choice = (key: Choice, options: readonly string[], label: (o: string) => string) => (
    <Field label={t(`vacancyForm.${key}`)}>
      {/* Narrowing cast: the items come from the matching option list in constants. */}
      <Select value={fields[key]} onValueChange={(v) => set(key, v as VacancyFields[Choice])}>
        <SelectTrigger className="w-full font-normal">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {label(o)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  )

  return (
    <PageShell title={t(form.editing ? "vacancyForm.editTitle" : "vacancyForm.newTitle")}>
      {form.status === "pending" && <CardGridSkeleton count={2} />}
      {form.status === "error" && <ErrorState error={form.error} onRetry={() => form.refetch()} />}
      {form.status === "success" && (
        <form
          className="grid max-w-3xl gap-5 rounded-xl border bg-card p-5 sm:grid-cols-2 sm:p-7"
          onSubmit={(e) => {
            e.preventDefault()
            form.submit()
          }}
        >
          <Field label={t("vacancyForm.title")} className="sm:col-span-2">
            <Input required value={fields.title} onChange={(e) => set("title", e.target.value)} />
          </Field>
          {choice("kind", KINDS, (o) => t(`vacancies.kind.${o}`))}
          {choice("schedule", SCHEDULES, (o) => t(`vacancies.schedule.${o}`))}
          {choice("employment", EMPLOYMENTS, (o) => t(`vacancies.employment.${o}`))}
          {choice("experience", EXPERIENCES, (o) => t(`vacancies.experience.${o}`))}
          <Field label={t("vacancyForm.salaryFrom")}>
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              value={fields.salary_from ?? ""}
              onChange={(e) => set("salary_from", readAmount(e.target.value))}
            />
          </Field>
          <Field label={t("vacancyForm.salaryTo")}>
            <Input
              type="number"
              min={0}
              inputMode="numeric"
              value={fields.salary_to ?? ""}
              onChange={(e) => set("salary_to", readAmount(e.target.value))}
            />
          </Field>
          {choice("currency", CURRENCIES, (o) => o)}
          <Field label={t("vacancies.deadline")}>
            <Input
              type="date"
              value={fields.deadline ?? ""}
              onChange={(e) => set("deadline", e.target.value || null)}
            />
          </Field>
          <Field label={t("vacancyForm.country")}>
            <Input value={fields.country} onChange={(e) => set("country", e.target.value)} />
          </Field>
          <Field label={t("vacancyForm.city")}>
            <Input value={fields.city} onChange={(e) => set("city", e.target.value)} />
          </Field>
          <Field label={t("vacancyForm.skills")} className="sm:col-span-2">
            <Input
              value={fields.skills}
              placeholder={t("vacancyForm.skillsHint")}
              onChange={(e) => set("skills", e.target.value)}
            />
          </Field>
          <Field label={t("vacancyForm.description")} className="sm:col-span-2">
            <Textarea
              required
              rows={10}
              value={fields.description}
              onChange={(e) => set("description", e.target.value)}
              className="font-normal"
            />
          </Field>
          <div className="grid gap-3 sm:col-span-2">
            <FormError error={form.saveError} />
            <Button type="submit" className="w-fit rounded-full font-bold" disabled={form.saving}>
              {t("vacancyForm.submit")}
            </Button>
          </div>
        </form>
      )}
      <div className="max-w-3xl">
        <Note>{t("vacancyForm.moderationNote")}</Note>
      </div>
    </PageShell>
  )
}
