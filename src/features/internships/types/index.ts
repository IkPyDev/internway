export type InternshipKind = "job" | "program"

export type RegionKey =
  | "japan"
  | "malaysia"
  | "china"
  | "germany"
  | "uk"
  | "europe"
  | "canada"
  | "asia"
  | "usa"
  | "remote"

export type FieldKey =
  | "software"
  | "data"
  | "engineering"
  | "business"
  | "finance"
  | "marketing"
  | "design"
  | "research"
  | "healthcare"
  | "education"
  | "hospitality"
  | "logistics"
  | "law"
  | "agriculture"
  | "ngo"

/** One row of public/data/internships.json, as written by scripts/collect.py. */
export interface InternshipDto {
  source: string
  kind: InternshipKind
  title: string
  company: string
  location: string
  url: string
  date: string | null
  new?: boolean
}

export interface Internship extends InternshipDto {
  regions: RegionKey[]
  fields: FieldKey[]
  search: string
}

/** URL search params; an absent key means "no filter". */
export interface InternshipsSearch {
  q?: string
  kind?: InternshipKind
  region?: RegionKey
  field?: FieldKey
  fresh?: FreshWindow
  page?: number
}

export type FreshWindow = "1" | "7" | "30"

export interface InternshipStats {
  total: number
  programs: number
  today: number
  regions: number
}

/** A ready-made search shortcut: the filters it applies and its i18n label. */
export interface PopularSearch {
  label: string
  search: InternshipsSearch
}

/** A link that runs the current search on an outside job site. */
export interface SourceLink {
  name: string
  url: string
}
