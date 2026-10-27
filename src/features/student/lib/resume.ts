import type { ApplicationStatus, Resume, ResumeFields, ResumeJob } from "@/types"
import { RESUME_FIELDS } from "../constants"

// Under the server's 4 MB cap, which sits under Vercel's 4.5 MB request limit.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024

/** The editable part of a resume; a student without one starts from empty fields. */
export function resumeFields(resume: Resume | null | undefined): ResumeFields {
  const text = Object.fromEntries(RESUME_FIELDS.map(({ key }) => [key, resume?.[key] ?? ""]))
  return {
    ...(text as unknown as ResumeFields),
    study_level: resume?.study_level ?? "",
    study_year: resume?.study_year ?? "",
    graduation_year: resume?.graduation_year ?? null,
    duration: resume?.duration ?? "",
    pay: resume?.pay ?? "",
    work_status: resume?.work_status ?? "looking",
    photo_id: resume?.photo_id ?? null,
    file_id: resume?.file_id ?? null,
    jobs: resume?.jobs ?? [],
    links: resume?.links ?? [],
    certificates: resume?.certificates ?? [],
  }
}

/** The error code for a file the server would refuse, checked before uploading it. */
export function uploadError(file: File, accept: string): string | undefined {
  if (file.size > MAX_UPLOAD_BYTES) return "file_too_large"
  if (!accept.split(",").includes(file.type)) return "invalid_file"
  return undefined
}

/** "2024-03" as "03.2024" (browsers lack month names for uz); "" stays "". */
export function formatMonth(month: string): string {
  const [y, m] = month.split("-")
  return y && m ? `${m}.${y}` : ""
}

/** "03.2024 — now"; a job without an end date is current. */
export function jobPeriod(job: ResumeJob, present: string): string {
  const start = formatMonth(job.start)
  const end = job.end ? formatMonth(job.end) : present
  return start ? `${start} — ${end}` : job.end ? end : ""
}

/** Comma-separated skills as a list of tags. */
export function splitTags(value: string | null | undefined): string[] {
  return (value ?? "")
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** A student may withdraw while the outcome is still open (mirrors `rules.ts` in the API repo). */
export function canWithdraw(status: ApplicationStatus): boolean {
  return ["sent", "viewed", "invited", "offer"].includes(status)
}
