export type CompanyPriority = "A" | "B" | ""

/** One row of public/data/companies.json, as written by scripts/import_companies.py. */
export interface Company {
  name: string
  country: string
  city: string
  field: string
  program: string
  evidence: string
  eligibility: string
  payment: string
  accommodation: string
  duration: string
  contact: string
  fit: string
  priority: CompanyPriority
  url: string
  verified: boolean
}

export type PriorityFilter = "A" | "B" | "verified"

/** URL search params; an absent key means "no filter". */
export interface CompaniesSearch {
  q?: string
  priority?: PriorityFilter
  country?: string
}
