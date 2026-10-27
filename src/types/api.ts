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
export type StudyLevel = "bachelor" | "master" | "phd" | "college" | "graduate"
export type StudyYear = "1" | "2" | "3" | "4" | "graduate"
/** Internship length in months; "" is not stated. */
export type Duration = "" | "1-3" | "3-6" | "6-12" | "12+"
export type PayPreference = "" | "paid" | "unpaid" | "either"
/** Who may apply; the admin checks it when approving the vacancy. */
export type Eligibility = "all" | "international" | "non_eu" | "eu_only" | "specific"
export type VisaSupport = "" | "yes" | "no" | "negotiable"
export type Housing = "" | "yes" | "no" | "assist"

export interface CompanySummary {
  id: number
  name: string
  status: ModerationStatus
  isOwner: boolean
  /** Every required field of the company form is filled; only then can it post vacancies. */
  complete: boolean
}

export interface User {
  id: number
  email: string
  role: Role | null
  name: string
  blocked: boolean
  company: CompanySummary | null
}

/** The plain-text part of the company registration form. */
export interface CompanyTextFields {
  name: string
  description: string
  website: string
  industry: string
  country: string
  city: string
  contact_name: string
  contact_position: string
  contact_email: string
  contact_phone: string
  linkedin: string
  registration_no: string
}

export interface CompanyFields extends CompanyTextFields {
  size: CompanySize
  logo_id: string | null
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

/** The plain-text part of a resume. `title` is the desired internship field. */
export interface ResumeTextFields {
  first_name: string
  last_name: string
  citizenship: string
  title: string
  phone: string
  city: string
  university: string
  field_of_study: string
  preferred_countries: string
  availability: string
  about: string
  skills: string
  languages: string
  education: string
  experience: string
}

export interface ResumeFields extends ResumeTextFields {
  /** "" until the student picks one; the server requires it. */
  study_level: StudyLevel | ""
  study_year: StudyYear | ""
  graduation_year: number | null
  duration: Duration
  pay: PayPreference
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

/** The internship posting form. `description` holds the main duties. */
export interface VacancyFields {
  title: string
  department: string
  country: string
  city: string
  kind: VacancyKind
  schedule: Schedule
  employment: Employment
  experience: Experience
  paid: boolean
  salary_from: number | null
  salary_to: number | null
  currency: Currency
  duration: Duration
  /** "YYYY-MM" or "". */
  start_month: string
  deadline: string | null
  openings: number | null
  education_req: string
  language_req: string
  skills: string
  description: string
  eligibility: Eligibility
  nationalities: string
  visa: VisaSupport
  housing: Housing
  benefits: string
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
  logo_id: string | null
  paid: boolean
  duration: Duration
  uz_eligible: boolean
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
