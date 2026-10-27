import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import {
  CardGridSkeleton,
  ErrorState,
  Field,
  FormError,
  Note,
  OptionSelect,
  PageShell,
} from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CompanyFirst } from "../components/CompanyFirst"
import {
  CURRENCIES,
  DURATIONS,
  ELIGIBILITY,
  EMPLOYMENTS,
  EXPERIENCES,
  HOUSING_OPTIONS,
  KINDS,
  SCHEDULES,
  VISA_OPTIONS,
} from "../constants"
import { useVacancyForm } from "../hooks/useVacancyForm"
import { readAmount } from "../lib/vacancies"

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-5 rounded-xl border bg-card p-5 sm:grid-cols-2 sm:p-7">
      <h2 className="text-lg sm:col-span-2">{title}</h2>
      {children}
    </section>
  )
}

export function VacancyFormPage() {
  const { t } = useTranslation()
  const form = useVacancyForm()
  const { fields, set } = form

  return (
    <PageShell title={t(form.editing ? "vacancyForm.editTitle" : "vacancyForm.newTitle")}>
      {form.status === "pending" && <CardGridSkeleton count={2} />}
      {form.status === "error" && <ErrorState error={form.error} onRetry={() => form.refetch()} />}
      {form.blocked && <CompanyFirst />}
      {form.status === "success" && !form.blocked && (
        <form
          className="grid max-w-3xl gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            form.submit()
          }}
        >
          <Section title={t("vacancyForm.sections.position")}>
            <Field label={t("vacancyForm.title")} required className="sm:col-span-2">
              <Input
                required
                value={fields.title}
                placeholder={t("vacancyForm.placeholders.title")}
                onChange={(e) => set("title", e.target.value)}
                className="font-normal"
              />
            </Field>
            <Field label={t("vacancyForm.department")}>
              <Input
                value={fields.department}
                placeholder={t("vacancyForm.placeholders.department")}
                onChange={(e) => set("department", e.target.value)}
                className="font-normal"
              />
            </Field>
            <Field label={t("vacancyForm.kind")}>
              <OptionSelect
                value={fields.kind}
                options={KINDS}
                label={(o) => t(`vacancies.kind.${o}`)}
                onChange={(v) => set("kind", v)}
              />
            </Field>
            <Field label={t("vacancyForm.country")} required>
              <Input
                required
                value={fields.country}
                placeholder={t("vacancyForm.placeholders.country")}
                onChange={(e) => set("country", e.target.value)}
                className="font-normal"
              />
            </Field>
            <Field label={t("vacancyForm.city")}>
              <Input
                value={fields.city}
                placeholder={t("vacancyForm.placeholders.city")}
                onChange={(e) => set("city", e.target.value)}
                className="font-normal"
              />
            </Field>
            <Field label={t("vacancyForm.schedule")}>
              <OptionSelect
                value={fields.schedule}
                options={SCHEDULES}
                label={(o) => t(`vacancies.schedule.${o}`)}
                onChange={(v) => set("schedule", v)}
              />
            </Field>
            <Field label={t("vacancyForm.employment")}>
              <OptionSelect
                value={fields.employment}
                options={EMPLOYMENTS}
                label={(o) => t(`vacancies.employment.${o}`)}
                onChange={(v) => set("employment", v)}
              />
            </Field>
            <Field label={t("vacancyForm.experience")}>
              <OptionSelect
                value={fields.experience}
                options={EXPERIENCES}
                label={(o) => t(`vacancies.experience.${o}`)}
                onChange={(v) => set("experience", v)}
              />
            </Field>
          </Section>

          <Section title={t("vacancyForm.sections.terms")}>
            <fieldset className="sm:col-span-2">
              <legend className="mb-1.5 text-sm font-semibold">{t("vacancyForm.paid")}</legend>
              <div className="flex flex-wrap gap-2">
                {[true, false].map((paid) => (
                  <Button
                    key={String(paid)}
                    type="button"
                    size="sm"
                    variant={fields.paid === paid ? "default" : "outline"}
                    aria-pressed={fields.paid === paid}
                    className="rounded-full"
                    onClick={() => set("paid", paid)}
                  >
                    {t(paid ? "vacancies.paid" : "vacancies.unpaid")}
                  </Button>
                ))}
              </div>
            </fieldset>
            {fields.paid && (
              <div className="grid gap-5 sm:col-span-2 sm:grid-cols-3">
                <Field label={t("vacancyForm.salaryFrom")}>
                  <Input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={fields.salary_from ?? ""}
                    onChange={(e) => set("salary_from", readAmount(e.target.value))}
                    className="font-normal"
                  />
                </Field>
                <Field label={t("vacancyForm.salaryTo")}>
                  <Input
                    type="number"
                    min={0}
                    inputMode="numeric"
                    value={fields.salary_to ?? ""}
                    onChange={(e) => set("salary_to", readAmount(e.target.value))}
                    className="font-normal"
                  />
                </Field>
                <Field label={t("vacancyForm.currency")}>
                  <OptionSelect
                    value={fields.currency}
                    options={CURRENCIES}
                    label={(o) => o}
                    onChange={(v) => set("currency", v)}
                  />
                </Field>
                <p className="-mt-3 text-xs text-muted-foreground sm:col-span-3">
                  {t("vacancyForm.salaryHint")}
                </p>
              </div>
            )}
            <Field label={t("vacancyForm.duration")}>
              <OptionSelect
                value={fields.duration}
                options={DURATIONS}
                label={(o) => t("vacancies.months", { range: o })}
                onChange={(v) => set("duration", v)}
                placeholder={t("resume.choose")}
              />
            </Field>
            <Field label={t("vacancyForm.start")}>
              <Input
                type="month"
                value={fields.start_month}
                onChange={(e) => set("start_month", e.target.value)}
                className="font-normal"
              />
            </Field>
            <Field label={t("vacancyForm.deadline")}>
              <Input
                type="date"
                value={fields.deadline ?? ""}
                onChange={(e) => set("deadline", e.target.value || null)}
                className="font-normal"
              />
            </Field>
            <Field label={t("vacancyForm.openings")}>
              <Input
                type="number"
                min={1}
                max={1000}
                inputMode="numeric"
                value={fields.openings ?? ""}
                onChange={(e) => set("openings", readAmount(e.target.value) || null)}
                className="font-normal"
              />
            </Field>
          </Section>

          <Section title={t("vacancyForm.sections.requirements")}>
            <Field label={t("vacancyForm.education")} className="sm:col-span-2">
              <Input
                value={fields.education_req}
                placeholder={t("vacancyForm.placeholders.education")}
                onChange={(e) => set("education_req", e.target.value)}
                className="font-normal"
              />
            </Field>
            <Field label={t("vacancyForm.languages")}>
              <Input
                value={fields.language_req}
                placeholder={t("vacancyForm.placeholders.languages")}
                onChange={(e) => set("language_req", e.target.value)}
                className="font-normal"
              />
            </Field>
            <Field label={t("vacancyForm.skills")}>
              <Input
                value={fields.skills}
                placeholder={t("vacancyForm.skillsHint")}
                onChange={(e) => set("skills", e.target.value)}
                className="font-normal"
              />
            </Field>
            <Field label={t("vacancyForm.description")} required className="sm:col-span-2">
              <Textarea
                required
                rows={8}
                value={fields.description}
                placeholder={t("vacancyForm.placeholders.description")}
                onChange={(e) => set("description", e.target.value)}
                className="font-normal"
              />
            </Field>
          </Section>

          <Section title={t("vacancyForm.sections.eligibility")}>
            <Field label={t("vacancyForm.eligibility")} required className="sm:col-span-2">
              <OptionSelect
                required
                value={fields.eligibility}
                options={ELIGIBILITY}
                label={(o) => t(`vacancies.eligibility.${o}`)}
                onChange={(v) => set("eligibility", v)}
              />
            </Field>
            {fields.eligibility === "specific" && (
              <Field label={t("vacancyForm.nationalities")} required className="sm:col-span-2">
                <Input
                  required
                  value={fields.nationalities}
                  placeholder={t("vacancyForm.placeholders.nationalities")}
                  onChange={(e) => set("nationalities", e.target.value)}
                  className="font-normal"
                />
              </Field>
            )}
            <p className="-mt-3 text-xs text-muted-foreground sm:col-span-2">{t("vacancyForm.uzHint")}</p>
            <Field label={t("vacancyForm.visa")}>
              <OptionSelect
                value={fields.visa}
                options={VISA_OPTIONS}
                label={(o) => t(`vacancies.visa.${o}`)}
                onChange={(v) => set("visa", v)}
                placeholder={t("resume.choose")}
              />
            </Field>
            <Field label={t("vacancyForm.housing")}>
              <OptionSelect
                value={fields.housing}
                options={HOUSING_OPTIONS}
                label={(o) => t(`vacancies.housing.${o}`)}
                onChange={(v) => set("housing", v)}
                placeholder={t("resume.choose")}
              />
            </Field>
            <Field label={t("vacancyForm.benefits")} className="sm:col-span-2">
              <Input
                value={fields.benefits}
                placeholder={t("vacancyForm.placeholders.benefits")}
                onChange={(e) => set("benefits", e.target.value)}
                className="font-normal"
              />
            </Field>
          </Section>

          <div className="sticky bottom-0 z-10 flex flex-wrap items-center gap-3 rounded-xl border bg-card/95 p-4 shadow-card backdrop-blur">
            <Button type="submit" className="rounded-full font-bold" disabled={form.saving}>
              {t("vacancyForm.submit")}
            </Button>
            <span className="text-xs text-muted-foreground">{t("vacancyForm.applyVia")}</span>
            <FormError error={form.saveError} />
          </div>
        </form>
      )}
      <div className="max-w-3xl">
        <Note>{t("vacancyForm.moderationNote")}</Note>
      </div>
    </PageShell>
  )
}
