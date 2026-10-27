import { ExternalLink } from "lucide-react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { cn, safeUrl } from "@/lib"
import type { WorkStatus } from "@/types"
import { jobPeriod, splitTags } from "../lib/resume"
import type { ResumeViewData } from "../types"
import { FileLink } from "./FileLink"
import { ResumePhoto } from "./ResumePhoto"

const STATUS_TONE: Record<WorkStatus, string> = {
  looking: "bg-green-100 text-green-700",
  open: "bg-sky-100 text-sky-800",
  not_looking: "bg-muted text-muted-foreground",
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-2">
      <h3 className="border-b pb-1 text-xs font-bold tracking-wide text-muted-foreground uppercase">
        {title}
      </h3>
      {children}
    </section>
  )
}

/** The full read-only resume, shown to employers, the admin and the student's preview. Plain text only. */
export function ResumeView({ resume: r, name }: { resume: ResumeViewData; name?: string }) {
  const { t } = useTranslation()
  const jobs = r.jobs ?? []
  const links = (r.links ?? []).filter((l) => safeUrl(l.url) !== "#")
  const certificates = r.certificates ?? []
  const skills = splitTags(r.skills)
  const contact = [r.city, r.citizenship, r.phone].filter(Boolean).join(" · ")
  const fullName = name || [r.first_name, r.last_name].filter(Boolean).join(" ")
  const study = [
    r.field_of_study,
    r.study_level && t(`resume.studyLevel.${r.study_level}`),
    r.study_year && r.study_year !== "graduate" && t(`resume.studyYear.${r.study_year}`),
    r.graduation_year && `${t("resume.fields.graduation_year")}: ${r.graduation_year}`,
  ].filter(Boolean)
  const wishes: [string, string | null | undefined][] = [
    ["preferred_countries", r.preferred_countries],
    ["availability", r.availability],
    ["duration", r.duration && t("resume.months", { range: r.duration })],
    ["pay", r.pay && t(`resume.pay.${r.pay}`)],
  ]

  if (!r.title) return <p className="text-sm text-muted-foreground">{t("resume.none")}</p>

  return (
    <div className="grid gap-6 text-sm">
      <div className="flex flex-wrap items-center gap-4">
        <ResumePhoto id={r.photo_id} />
        <div className="grid min-w-0 flex-1 gap-1">
          {fullName && <p className="text-lg font-bold">{fullName}</p>}
          <p className="text-base font-semibold text-navy-900">{r.title}</p>
          {contact && <p className="text-muted-foreground">{contact}</p>}
          {r.work_status && (
            <span
              className={cn("w-fit rounded-full px-2.5 py-0.5 text-xs font-bold", STATUS_TONE[r.work_status])}
            >
              {t(`resume.workStatus.${r.work_status}`)}
            </span>
          )}
        </div>
      </div>

      {wishes.some(([, v]) => v) && (
        <Block title={t("resume.sections.preferences")}>
          <dl className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {wishes.map(
              ([key, value]) =>
                value && (
                  <div key={key}>
                    <dt className="text-xs text-muted-foreground">{t(`resume.fields.${key}`)}</dt>
                    <dd className="font-semibold">{value}</dd>
                  </div>
                ),
            )}
          </dl>
        </Block>
      )}

      {r.about && (
        <Block title={t("resume.fields.about")}>
          <p className="whitespace-pre-line">{r.about}</p>
        </Block>
      )}

      {(jobs.length > 0 || r.experience) && (
        <Block title={t("resume.sections.jobs")}>
          <ol className="grid gap-4 border-l-2 border-navy-700/20 pl-4">
            {jobs.map((job, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: jobs have no id and never reorder here
              <li key={i} className="relative grid gap-0.5">
                <span className="absolute top-1.5 -left-[1.4rem] size-2.5 rounded-full bg-navy-700" />
                <p className="font-bold">{[job.position, job.company].filter(Boolean).join(" · ")}</p>
                <p className="text-xs text-muted-foreground">{jobPeriod(job, t("resume.present"))}</p>
                {job.description && <p className="mt-1 whitespace-pre-line">{job.description}</p>}
              </li>
            ))}
          </ol>
          {r.experience && <p className="whitespace-pre-line">{r.experience}</p>}
        </Block>
      )}

      {(r.university || r.education) && (
        <Block title={t("resume.sections.education")}>
          {r.university && (
            <div>
              <p className="font-bold">{r.university}</p>
              {study.length > 0 && <p className="text-muted-foreground">{study.join(" · ")}</p>}
            </div>
          )}
          {r.education && <p className="whitespace-pre-line">{r.education}</p>}
        </Block>
      )}

      {skills.length > 0 && (
        <Block title={t("resume.fields.skills")}>
          <ul className="flex flex-wrap gap-1.5">
            {skills.map((s) => (
              <li key={s} className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold">
                {s}
              </li>
            ))}
          </ul>
        </Block>
      )}

      {r.languages && (
        <Block title={t("resume.fields.languages")}>
          <p>{r.languages}</p>
        </Block>
      )}

      {certificates.length > 0 && (
        <Block title={t("resume.sections.certificates")}>
          <ul className="grid gap-2">
            {certificates.map((c, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: certificates have no id
              <li key={i} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-semibold">{c.name}</span>
                <span className="text-muted-foreground">{[c.issuer, c.year].filter(Boolean).join(", ")}</span>
                {c.file_id && <FileLink id={c.file_id}>{t("resume.openFile")}</FileLink>}
              </li>
            ))}
          </ul>
        </Block>
      )}

      {(links.length > 0 || r.file_id) && (
        <Block title={t("resume.sections.links")}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {r.file_id && (
              <li>
                <FileLink id={r.file_id}>{t("resume.resumeFile")}</FileLink>
              </li>
            )}
            {links.map((l) => (
              <li key={l.url}>
                <a
                  href={safeUrl(l.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold break-all text-navy-700 hover:underline"
                >
                  <ExternalLink className="size-4 shrink-0" aria-hidden /> {l.label || l.url}
                </a>
              </li>
            ))}
          </ul>
        </Block>
      )}
    </div>
  )
}
