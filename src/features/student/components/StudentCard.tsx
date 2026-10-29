import { ExternalLink, Phone } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn, safeUrl } from "@/lib"
import { STATUS_TONE } from "../constants"
import type { StudentCardData } from "../types"
import { FileLink } from "./FileLink"
import { ResumePhoto } from "./ResumePhoto"

/** One directory card; the name reads "Candidate" unless the viewer is a verified employer. */
export function StudentCard({ student: s }: { student: StudentCardData }) {
  const { t } = useTranslation()
  const name = s.full
    ? [s.first_name, s.last_name].filter(Boolean).join(" ")
    : t("portfolio.directory.candidate")
  const place = [s.city, s.university].filter(Boolean).join(" · ")
  const links = (s.links ?? []).filter((l) => safeUrl(l.url) !== "#")

  return (
    <article className="flex animate-rise flex-col gap-3 rounded-2xl border bg-card p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-card">
      <div className="flex items-center gap-3">
        <ResumePhoto id={s.photo_id} className="size-11" />
        <div className="min-w-0">
          <p className={cn("truncate font-semibold", !s.full && "text-muted-foreground")}>{name}</p>
          {place && <p className="truncate text-xs text-muted-foreground">{place}</p>}
        </div>
      </div>
      <h3 className="line-clamp-2 text-lg font-bold">{s.title}</h3>
      {s.about && <p className="line-clamp-3 text-sm text-muted-foreground">{s.about}</p>}
      {s.full && (s.phone || links.length > 0 || s.file_id) && (
        <div className="grid gap-1.5 text-sm">
          {s.phone && (
            <a
              href={`tel:${s.phone}`}
              className="inline-flex items-center gap-1.5 font-semibold text-navy-700 hover:underline"
            >
              <Phone className="size-4" aria-hidden /> {s.phone}
            </a>
          )}
          {links.map((l) => (
            <a
              key={l.url}
              href={safeUrl(l.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-navy-700 hover:underline"
            >
              <ExternalLink className="size-4" aria-hidden /> {l.label || l.url}
            </a>
          ))}
          {s.file_id && <FileLink id={s.file_id}>{t("portfolio.directory.cv")}</FileLink>}
        </div>
      )}
      {s.work_status && (
        <span
          className={cn("mt-auto w-fit rounded-full px-3 py-1 text-xs font-bold", STATUS_TONE[s.work_status])}
        >
          {t(`resume.workStatus.${s.work_status}`)}
        </span>
      )}
    </article>
  )
}
