import type {
  ApplicationStatus,
  CompanySize,
  Currency,
  Duration,
  Experience,
  ModerationStatus,
  PayPreference,
  ResumeCertificate,
  ResumeJob,
  ResumeLink,
  Schedule,
  StudyLevel,
  StudyYear,
  Vacancy,
  VacancyKind,
  VacancySummary,
  WorkStatus,
} from "@/types"

export interface VacanciesSearch {
  q?: string
  kind?: VacancyKind
  country?: string
  schedule?: Schedule
  experience?: Experience
  salary?: number
  /** Only postings open to Uzbekistan applicants. */
  uz?: true
  paid?: true
  page?: number
}

export interface VacancyPage {
  items: VacancySummary[]
  total: number
  page: number
  pages: number
  countries: string[]
}

/** The detail endpoint adds the company and the signed-in student's flags. */
export interface VacancyDetail extends Vacancy {
  company: {
    id: number
    name: string
    website: string
    industry: string
    size: CompanySize
    status: ModerationStatus
    logo_id: string | null
    description: string
    country: string
    city: string
  }
  uz_eligible: boolean
  applied: boolean
  saved: boolean
}

/** The employer's own list adds application counts. */
export interface MyVacancy extends Vacancy {
  company: string
  applications: number
  /** Applications nobody at the company has opened yet. */
  fresh: number
}

export interface SavedVacancy extends VacancySummary {
  /** False once the vacancy was closed or taken down. */
  open: boolean
}

/** One applicant as the employer sees them: application plus resume. */
export interface Candidate {
  id: number
  status: ApplicationStatus
  cover_letter: string
  employer_note: string
  created_at: string
  email: string
  name: string
  title: string | null
  phone: string | null
  city: string | null
  about: string | null
  skills: string | null
  languages: string | null
  education: string | null
  experience: string | null
  work_status: WorkStatus | null
  photo_id: string | null
  file_id: string | null
  jobs: ResumeJob[] | null
  links: ResumeLink[] | null
  certificates: ResumeCertificate[] | null
  first_name: string | null
  last_name: string | null
  citizenship: string | null
  university: string | null
  field_of_study: string | null
  study_level: StudyLevel | "" | null
  study_year: StudyYear | "" | null
  graduation_year: number | null
  preferred_countries: string | null
  availability: string | null
  duration: Duration | null
  pay: PayPreference | null
}

export interface CandidatesResponse {
  title: string
  items: Candidate[]
}

export interface CandidatesSearch {
  status?: ApplicationStatus
}

/** A salary range as an i18n key plus formatted numbers. */
export interface SalaryText {
  key: "range" | "from" | "to" | "none"
  from?: string
  to?: string
  currency: Currency
}

/** One line of a vacancy's details: literal text, or an i18n key with its params. */
export type Fact =
  | { text: string; i18n?: undefined; params?: undefined }
  | { i18n: string; params?: Record<string, string>; text?: undefined }
