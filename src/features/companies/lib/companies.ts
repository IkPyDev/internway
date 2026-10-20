import { readEnum, readString, toWords } from "@/lib"
import { PRIORITY_OPTIONS } from "../constants"
import type { CompaniesSearch, Company } from "../types"

export function parseCompaniesSearch(raw: Partial<Record<keyof CompaniesSearch, unknown>>): CompaniesSearch {
  return {
    q: readString(raw.q),
    priority: readEnum(
      raw.priority,
      PRIORITY_OPTIONS.map((o) => o.value),
    ),
    country: readString(raw.country),
  }
}

/** Applies text and priority filters; country is applied separately so each country pill can show a count. */
export function filterCompanies(list: Company[], s: CompaniesSearch): Company[] {
  const words = toWords(s.q)
  return list.filter((c) => {
    const text = `${c.name} ${c.city} ${c.field} ${c.program}`.toLowerCase()
    const priorityOk =
      s.priority === undefined || (s.priority === "verified" ? c.verified : c.priority === s.priority)
    return priorityOk && words.every((w) => text.includes(w))
  })
}

export function byCountry(list: Company[], country: string | undefined): Company[] {
  return country === undefined ? list : list.filter((c) => c.country === country)
}

/** Countries with their company counts, most first. */
export function countCountries(list: Company[]): [string, number][] {
  const counts = new Map<string, number>()
  for (const c of list) counts.set(c.country, (counts.get(c.country) ?? 0) + 1)
  return [...counts].sort((a, b) => b[1] - a[1])
}
