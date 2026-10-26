import { readEnum, readPage, readString } from "@/lib"
import type { Currency, Vacancy, VacancyFields } from "@/types"
import { CANDIDATE_FILTERS, EXPERIENCES, KINDS, SCHEDULES } from "../constants"
import type { CandidatesSearch, SalaryText, VacanciesSearch } from "../types"

export function parseVacanciesSearch(search: Record<string, unknown>): VacanciesSearch {
  const salary = Number(search.salary)
  return {
    q: readString(search.q),
    kind: readEnum(search.kind, KINDS),
    country: readString(search.country),
    schedule: readEnum(search.schedule, SCHEDULES),
    experience: readEnum(search.experience, EXPERIENCES),
    salary: Number.isInteger(salary) && salary > 0 ? salary : undefined,
    page: readPage(search.page),
  }
}

export function parseCandidatesSearch(search: Record<string, unknown>): CandidatesSearch {
  return { status: readEnum(search.status, CANDIDATE_FILTERS) }
}

/** The editable part of a vacancy; a new one starts empty. */
export function vacancyFields(vacancy: Vacancy | undefined): VacancyFields {
  return {
    title: vacancy?.title ?? "",
    country: vacancy?.country ?? "",
    city: vacancy?.city ?? "",
    kind: vacancy?.kind ?? "internship",
    schedule: vacancy?.schedule ?? "office",
    employment: vacancy?.employment ?? "full",
    experience: vacancy?.experience ?? "none",
    salary_from: vacancy?.salary_from ?? null,
    salary_to: vacancy?.salary_to ?? null,
    currency: vacancy?.currency ?? "USD",
    skills: vacancy?.skills ?? "",
    description: vacancy?.description ?? "",
    deadline: vacancy?.deadline ?? null,
  }
}

export function place(v: { city: string; country: string }): string {
  return [v.city, v.country].filter(Boolean).join(", ")
}

const money = new Intl.NumberFormat("ru-RU")

/** Picks the wording for a salary range: "800 – 1 200", "from 800", "up to 1 200" or none. */
export function salaryText(from: number | null, to: number | null, currency: Currency): SalaryText {
  const f = from === null ? undefined : money.format(from)
  const t = to === null ? undefined : money.format(to)
  if (f && t) return { key: from === to ? "from" : "range", from: f, to: t, currency }
  if (f) return { key: "from", from: f, currency }
  if (t) return { key: "to", to: t, currency }
  return { key: "none", currency }
}

/** "React, TypeScript; SQL" → ["React", "TypeScript", "SQL"]. */
export function splitSkills(skills: string | null | undefined): string[] {
  return (skills ?? "")
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Reads a number input: empty is null (no bound), not 0. */
export function readAmount(value: string): number | null {
  const n = Number(value)
  return value.trim() === "" || !Number.isFinite(n) ? null : Math.max(0, Math.round(n))
}
