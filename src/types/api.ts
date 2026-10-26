/** Shapes returned by the API server (`server/`). Dates are ISO strings. */

export type Role = "student" | "employer" | "admin"
export type ModerationStatus = "pending" | "approved" | "rejected"
export type VacancyStatus = ModerationStatus | "closed"
export type ApplicationStatus = "sent" | "viewed" | "invited" | "offer" | "hired" | "rejected" | "withdrawn"
export type VacancyKind = "internship" | "job" | "program"
export type Schedule = "office" | "remote" | "hybrid"
export type Employment = "full" | "part" | "project"
export type Experience = "none" | "1-3" | "3-6" | "6+"
export type Currency = "USD" | "EUR" | "UZS"
export type CompanySize = "" | "1-10" | "11-50" | "51-200" | "201-1000" | "1000+"

export interface CompanySummary {
  id: number
  name: string
  status: ModerationStatus
  isOwner: boolean
}

export interface User {
  id: number
  email: string
  role: Role | null
  name: string
  blocked: boolean
  company: CompanySummary | null
}

export interface CompanyFields {
  name: string
  description: string
  website: string
  industry: string
  size: CompanySize
  country: string
  city: string
}

export type WorkStatus = "looking" | "open" | "not_looking"

/** A past or current job; an empty `end` means it is current. Months are "YYYY-MM". */
export interface ResumeJob {
  company: string
  position: string
  start: string
  end: string
  description: string
}

export interface ResumeLink {
  label: string
  url: string
}

export interface ResumeCertificate {
  name: string
  issuer: string
  year: number | null
  file_id: string | null
}

/** A photo or PDF uploaded to the API; served at `api/files/:id` to signed-in users. */
export interface UploadedFile {
  id: string
  name: string
  mime: string
  size: number
}

/** The plain-text part of a resume. */
export interface ResumeTextFields {
  title: string
  phone: string
  city: string
  about: string
  skills: string
  languages: string
  education: string
  experience: string
}

export interface ResumeFields extends ResumeTextFields {
  work_status: WorkStatus
  photo_id: string | null
  file_id: string | null
  jobs: ResumeJob[]
  links: ResumeLink[]
  certificates: ResumeCertificate[]
}

export interface Resume extends ResumeFields {
  id: number
  user_id: number
  status: ModerationStatus
  reject_reason: string | null
  updated_at: string
}

export interface VacancyFields {
  title: string
  country: string
  city: string
  kind: VacancyKind
  schedule: Schedule
  employment: Employment
  experience: Experience
  salary_from: number | null
  salary_to: number | null
  currency: Currency
  skills: string
  description: string
  deadline: string | null
}

export interface VacancySummary {
  id: number
  title: string
  kind: VacancyKind
  schedule: Schedule
  employment: Employment
  experience: Experience
  salary_from: number | null
  salary_to: number | null
  currency: Currency
  country: string
  city: string
  deadline: string | null
  created_at: string
  company_id: number
  company: string
}

export interface Vacancy extends VacancyFields {
  id: number
  company_id: number
  created_by: number | null
  status: VacancyStatus
  reject_reason: string | null
  created_at: string
  updated_at: string
}
