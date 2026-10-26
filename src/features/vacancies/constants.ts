import type { ApplicationStatus, Currency, Employment, Experience, Schedule, VacancyKind } from "@/types"

export const KINDS: VacancyKind[] = ["internship", "job", "program"]
export const SCHEDULES: Schedule[] = ["office", "remote", "hybrid"]
export const EMPLOYMENTS: Employment[] = ["full", "part", "project"]
export const EXPERIENCES: Experience[] = ["none", "1-3", "3-6", "6+"]
export const CURRENCIES: Currency[] = ["USD", "EUR", "UZS"]

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
