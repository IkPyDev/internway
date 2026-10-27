import type {
  ApplicationStatus,
  Currency,
  Duration,
  Eligibility,
  Employment,
  Experience,
  Housing,
  Schedule,
  VacancyKind,
  VisaSupport,
} from "@/types"

export const KINDS: VacancyKind[] = ["internship", "job", "program"]
export const SCHEDULES: Schedule[] = ["office", "remote", "hybrid"]
export const EMPLOYMENTS: Employment[] = ["full", "part", "project"]
export const EXPERIENCES: Experience[] = ["none", "1-3", "3-6", "6+"]
export const CURRENCIES: Currency[] = ["USD", "EUR", "UZS"]
export const DURATIONS: Exclude<Duration, "">[] = ["1-3", "3-6", "6-12", "12+"]
export const ELIGIBILITY: Eligibility[] = ["all", "international", "non_eu", "eu_only", "specific"]
export const VISA_OPTIONS: Exclude<VisaSupport, "">[] = ["yes", "no", "negotiable"]
export const HOUSING_OPTIONS: Exclude<Housing, "">[] = ["yes", "no"]

/** The employer's moves for a candidate, in pipeline order. */
export const PIPELINE_ACTIONS: ApplicationStatus[] = ["invited", "offer", "hired", "rejected"]

/** Filter tabs on the candidates page. */
export const CANDIDATE_FILTERS: ApplicationStatus[] = [
  "sent",
  "viewed",
  "invited",
  "offer",
  "hired",
  "rejected",
  "withdrawn",
]
