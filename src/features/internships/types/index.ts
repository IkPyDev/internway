export type InternshipKind = "job" | "program"

export type RegionKey = "germany" | "uk" | "europe" | "canada" | "asia" | "usa" | "remote"

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
  search: string
}

/** URL search params; an absent key means "no filter". */
export interface InternshipsSearch {
  q?: string
  kind?: InternshipKind
  region?: RegionKey
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
