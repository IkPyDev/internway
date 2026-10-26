import type { ApplicationStatus, Resume, ResumeFields } from "@/types"
import { RESUME_FIELDS } from "../constants"

/** The editable part of a resume; a student without one starts from empty fields. */
export function resumeFields(resume: Resume | null | undefined): ResumeFields {
  return Object.fromEntries(
    RESUME_FIELDS.map(({ key }) => [key, resume?.[key] ?? ""]),
  ) as unknown as ResumeFields
}

/** A student may withdraw while the outcome is still open (mirrors `server/rules.ts`). */
export function canWithdraw(status: ApplicationStatus): boolean {
  return ["sent", "viewed", "invited", "offer"].includes(status)
}
