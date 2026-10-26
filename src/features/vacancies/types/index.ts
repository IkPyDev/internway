import type {
  ApplicationStatus,
  CompanySize,
  Currency,
  Experience,
  ModerationStatus,
  Schedule,
  Vacancy,
  VacancyKind,
  VacancySummary,
} from "@/types"

export interface VacanciesSearch {
  q?: string
  kind?: VacancyKind
  country?: string
  schedule?: Schedule
  experience?: Experience
  salary?: number
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
  }
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
