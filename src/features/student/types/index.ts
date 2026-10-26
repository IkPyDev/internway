import type { ApplicationStatus, ResumeFields } from "@/types"

/** One row of the student's own applications. */
export interface MyApplication {
  id: number
  status: ApplicationStatus
  /** The employer's message: interview time, offer details or why not. */
  employer_note: string
  created_at: string
  updated_at: string
  vacancy_id: number
  title: string
  company_id: number
  company: string
  country: string
  city: string
}

/** Whatever part of a resume a screen has; a candidate without a resume has nulls. */
export type ResumeViewData = { [K in keyof ResumeFields]?: ResumeFields[K] | null }
