import { Eye } from "lucide-react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { CardGridSkeleton, ErrorState, Field, FormError, PageShell, StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { ResumeTextFields, WorkStatus } from "@/types"
import { FileUpload } from "../components/FileUpload"
import { ListEditor } from "../components/ListEditor"
import { ResumePhoto } from "../components/ResumePhoto"
import { ResumeView } from "../components/ResumeView"
import { DOCUMENT_TYPES, PHOTO_TYPES, RESUME_FIELDS, RESUME_LISTS, WORK_STATUSES } from "../constants"
import { useResumeForm } from "../hooks/useResumeForm"

function Card({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 rounded-xl border bg-card p-5 sm:p-7">
      <div>
        <h2 className="text-lg">{title}</h2>
        {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </section>
  )
}

export function ResumePage() {
  const { t } = useTranslation()
  const form = useResumeForm()
  const { fields, set } = form

  const text = (key: keyof ResumeTextFields, rows = 4) => {
    const { long, required } = RESUME_FIELDS.find((f) => f.key === key) ?? {}
    return (
      <Field label={t(`resume.fields.${key}`)}>
        {long ? (
          <Textarea
            rows={rows}
            value={fields[key]}
            onChange={(e) => set(key, e.target.value)}
            placeholder={t(`resume.placeholders.${key}`)}
            className="font-normal"
          />
        ) : (
          <Input
            required={required}
            value={fields[key]}
            onChange={(e) => set(key, e.target.value)}
            className="font-normal"
          />
        )}
      </Field>
    )
  }

  return (
    <PageShell title={t("resume.title")} lead={t("resume.lead")}>
      {form.status === "pending" && <CardGridSkeleton count={2} />}
      {form.status === "error" && <ErrorState error={form.error} onRetry={() => form.refetch()} />}
      {form.status === "success" && (
        <form
          className="grid max-w-3xl gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            form.submit()
          }}
        >
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {form.resume && (
              <>
                <StatusBadge status={form.resume.status} />
                <span className="text-muted-foreground">{t(`resume.statusHint.${form.resume.status}`)}</span>
              </>
            )}
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" size="sm" variant="outline" className="ml-auto rounded-full">
                  <Eye aria-hidden /> {t("resume.preview")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogTitle>{t("resume.previewTitle")}</DialogTitle>
                <ResumeView resume={fields} />
              </DialogContent>
            </Dialog>
            {form.resume?.reject_reason && (
              <p className="w-full rounded-md bg-red-50 px-3 py-2 text-red-700">
                {t("moderation.reason")}: {form.resume.reject_reason}
              </p>
            )}
          </div>

          <Card title={t("resume.sections.basics")}>
            <div className="flex flex-wrap items-center gap-4">
              <ResumePhoto id={fields.photo_id} />
              <div className="grid gap-1">
                <FileUpload
                  fileId={fields.photo_id}
                  accept={PHOTO_TYPES}
                  label={t("resume.uploadPhoto")}
                  busy={form.uploading}
                  upload={form.upload}
                  onChange={(id) => set("photo_id", id)}
                />
                <p className="text-xs text-muted-foreground">{t("resume.photoHint")}</p>
              </div>
            </div>
            {text("title")}
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label={t("resume.fields.work_status")}>
                <Select value={fields.work_status} onValueChange={(v) => set("work_status", v as WorkStatus)}>
                  <SelectTrigger className="w-full font-normal">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {WORK_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {t(`resume.workStatus.${s}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              {text("phone")}
              {text("city")}
            </div>
          </Card>

          <Card title={t("resume.sections.about")} hint={t("resume.hints.about")}>
            {text("about", 7)}
          </Card>

          <Card title={t("resume.sections.jobs")} hint={t("resume.hints.jobs")}>
            <ListEditor
              items={fields.jobs}
              empty={RESUME_LISTS.jobs.empty}
              max={RESUME_LISTS.jobs.max}
              addLabel={t("resume.add.jobs")}
              onChange={(jobs) => set("jobs", jobs)}
            >
              {(job, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label={t("resume.job.company")}>
                      <Input
                        required
                        value={job.company}
                        onChange={(e) => update({ company: e.target.value })}
                        className="font-normal"
                      />
                    </Field>
                    <Field label={t("resume.job.position")}>
                      <Input
                        value={job.position}
                        onChange={(e) => update({ position: e.target.value })}
                        className="font-normal"
                      />
                    </Field>
                    <Field label={t("resume.job.start")}>
                      <Input
                        type="month"
                        value={job.start}
                        onChange={(e) => update({ start: e.target.value })}
                        className="font-normal"
                      />
                    </Field>
                    <Field label={t("resume.job.end")}>
                      <Input
                        type="month"
                        value={job.end}
                        onChange={(e) => update({ end: e.target.value })}
                        className="font-normal"
                      />
                    </Field>
                  </div>
                  <p className="-mt-1 text-xs text-muted-foreground">{t("resume.job.endHint")}</p>
                  <Field label={t("resume.job.description")}>
                    <Textarea
                      rows={3}
                      value={job.description}
                      onChange={(e) => update({ description: e.target.value })}
                      placeholder={t("resume.job.descriptionPlaceholder")}
                      className="font-normal"
                    />
                  </Field>
                </>
              )}
            </ListEditor>
            {text("experience", 3)}
          </Card>

          <Card title={t("resume.sections.education")}>
            {text("education", 3)}
            {text("skills", 3)}
            {text("languages")}
          </Card>

          <Card title={t("resume.sections.certificates")} hint={t("resume.hints.certificates")}>
            <ListEditor
              items={fields.certificates}
              empty={RESUME_LISTS.certificates.empty}
              max={RESUME_LISTS.certificates.max}
              addLabel={t("resume.add.certificates")}
              onChange={(certificates) => set("certificates", certificates)}
            >
              {(cert, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-[2fr_2fr_1fr]">
                    <Field label={t("resume.cert.name")}>
                      <Input
                        required
                        value={cert.name}
                        onChange={(e) => update({ name: e.target.value })}
                        className="font-normal"
                      />
                    </Field>
                    <Field label={t("resume.cert.issuer")}>
                      <Input
                        value={cert.issuer}
                        onChange={(e) => update({ issuer: e.target.value })}
                        className="font-normal"
                      />
                    </Field>
                    <Field label={t("resume.cert.year")}>
                      <Input
                        type="number"
                        min={1950}
                        max={2100}
                        value={cert.year ?? ""}
                        onChange={(e) => update({ year: e.target.value ? Number(e.target.value) : null })}
                        className="font-normal"
                      />
                    </Field>
                  </div>
                  <FileUpload
                    fileId={cert.file_id}
                    accept={DOCUMENT_TYPES}
                    label={t("resume.cert.file")}
                    busy={form.uploading}
                    upload={form.upload}
                    onChange={(file_id) => update({ file_id })}
                  />
                </>
              )}
            </ListEditor>
          </Card>

          <Card title={t("resume.sections.links")} hint={t("resume.hints.links")}>
            <ListEditor
              items={fields.links}
              empty={RESUME_LISTS.links.empty}
              max={RESUME_LISTS.links.max}
              addLabel={t("resume.add.links")}
              onChange={(links) => set("links", links)}
            >
              {(link, update) => (
                <div className="grid gap-3 sm:grid-cols-[1fr_2fr]">
                  <Field label={t("resume.link.label")}>
                    <Input
                      value={link.label}
                      onChange={(e) => update({ label: e.target.value })}
                      placeholder="GitHub"
                      className="font-normal"
                    />
                  </Field>
                  <Field label={t("resume.link.url")}>
                    <Input
                      required
                      type="url"
                      value={link.url}
                      onChange={(e) => update({ url: e.target.value })}
                      placeholder="https://"
                      className="font-normal"
                    />
                  </Field>
                </div>
              )}
            </ListEditor>
            <div className="grid gap-1 border-t pt-4">
              <p className="text-sm font-semibold">{t("resume.resumeFile")}</p>
              <FileUpload
                fileId={fields.file_id}
                accept={DOCUMENT_TYPES}
                label={t("resume.uploadFile")}
                busy={form.uploading}
                upload={form.upload}
                onChange={(id) => set("file_id", id)}
              />
              <p className="text-xs text-muted-foreground">{t("resume.fileHint")}</p>
            </div>
          </Card>

          <div className="sticky bottom-0 z-10 flex flex-wrap items-center gap-3 rounded-xl border bg-card/95 p-4 shadow-card backdrop-blur">
            <Button type="submit" className="rounded-full font-bold" disabled={form.saving || form.uploading}>
              {t("resume.save")}
            </Button>
            {form.saved && <span className="text-sm text-green-700">{t("resume.saved")}</span>}
            {form.fileError && (
              <p role="alert" className="text-sm text-destructive">
                {t(`errors.${form.fileError}`)}
              </p>
            )}
            <FormError error={form.uploadFailure} />
            <FormError error={form.saveError} />
          </div>
        </form>
      )}
    </PageShell>
  )
}
