import { readEnum, readPage, readString } from "@/lib"
import type { Currency, Vacancy, VacancyFields } from "@/types"
import { CANDIDATE_FILTERS, EXPERIENCES, KINDS, SCHEDULES } from "../constants"
import type { CandidatesSearch, Fact, SalaryText, VacanciesSearch } from "../types"

export function parseVacanciesSearch(search: Record<string, unknown>): VacanciesSearch {
  const salary = Number(search.salary)
  return {
    q: readString(search.q),
    kind: readEnum(search.kind, KINDS),
    country: readString(search.country),
    schedule: readEnum(search.schedule, SCHEDULES),
    experience: readEnum(search.experience, EXPERIENCES),
    salary: Number.isInteger(salary) && salary > 0 ? salary : undefined,
    uz: readFlag(search.uz),
    paid: readFlag(search.paid),
    page: readPage(search.page),
  }
}

/** "1" or true in the URL turns a toggle filter on; anything else leaves it off. */
function readFlag(value: unknown): true | undefined {
  return value === true || value === 1 || value === "1" ? true : undefined
}

export function parseCandidatesSearch(search: Record<string, unknown>): CandidatesSearch {
  return { status: readEnum(search.status, CANDIDATE_FILTERS) }
}

/** The editable part of a vacancy; a new one starts empty. */
export function vacancyFields(vacancy: Vacancy | undefined): VacancyFields {
  return {
    title: vacancy?.title ?? "",
    department: vacancy?.department ?? "",
    country: vacancy?.country ?? "",
    city: vacancy?.city ?? "",
    kind: vacancy?.kind ?? "internship",
    schedule: vacancy?.schedule ?? "office",
    employment: vacancy?.employment ?? "full",
    experience: vacancy?.experience ?? "none",
    paid: vacancy?.paid ?? true,
    salary_from: vacancy?.salary_from ?? null,
    salary_to: vacancy?.salary_to ?? null,
    currency: vacancy?.currency ?? "USD",
    duration: vacancy?.duration ?? "",
    start_month: vacancy?.start_month ?? "",
    deadline: vacancy?.deadline ?? null,
    openings: vacancy?.openings ?? null,
    education_req: vacancy?.education_req ?? "",
    language_req: vacancy?.language_req ?? "",
    skills: vacancy?.skills ?? "",
    description: vacancy?.description ?? "",
    eligibility: vacancy?.eligibility ?? "all",
    nationalities: vacancy?.nationalities ?? "",
    visa: vacancy?.visa ?? "",
    housing: vacancy?.housing ?? "",
    benefits: vacancy?.benefits ?? "",
  }
}

/** The posting's details that were filled in, as [label key, value] pairs for a definition list. */
export function vacancyFacts(v: VacancyFields): [string, Fact][] {
  const eligibility: Fact = { i18n: `vacancies.eligibility.${v.eligibility}` }
  const facts: [string, Fact | null][] = [
    ["eligibility", v.eligibility === "specific" ? { text: v.nationalities } : eligibility],
    ["duration", v.duration ? { i18n: "vacancies.months", params: { range: v.duration } } : null],
    ["start", v.start_month ? { text: formatMonth(v.start_month) } : null],
    ["openings", v.openings ? { text: String(v.openings) } : null],
    ["education", v.education_req ? { text: v.education_req } : null],
    ["languages", v.language_req ? { text: v.language_req } : null],
    ["visa", v.visa ? { i18n: `vacancies.visa.${v.visa}` } : null],
    ["housing", v.housing ? { i18n: `vacancies.housing.${v.housing}` } : null],
    ["benefits", v.benefits ? { text: v.benefits } : null],
  ]
  return facts.filter((f): f is [string, Fact] => f[1] !== null)
}

/** "2027-06" as "06.2027". */
function formatMonth(month: string): string {
  const [y, m] = month.split("-")
  return y && m ? `${m}.${y}` : month
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
