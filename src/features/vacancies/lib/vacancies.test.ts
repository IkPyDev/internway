import type { Vacancy } from "@/types"
import {
  parseCandidatesSearch,
  parseVacanciesSearch,
  place,
  readAmount,
  salaryText,
  splitSkills,
  vacancyFields,
} from "./vacancies"

describe("vacancies lib", () => {
  it("reads search params and drops junk", () => {
    expect(
      parseVacanciesSearch({ q: "react", kind: "job", salary: "500", page: "2", schedule: "x" }),
    ).toEqual({
      q: "react",
      kind: "job",
      country: undefined,
      schedule: undefined,
      experience: undefined,
      salary: 500,
      page: 2,
    })
    expect(parseVacanciesSearch({ salary: "-5" }).salary).toBeUndefined()
    expect(parseCandidatesSearch({ status: "invited" })).toEqual({ status: "invited" })
    expect(parseCandidatesSearch({ status: "nope" })).toEqual({ status: undefined })
  })

  it("starts a new vacancy empty and copies an existing one", () => {
    expect(vacancyFields(undefined)).toMatchObject({ kind: "internship", salary_from: null, currency: "USD" })
    const v = { title: "Intern", kind: "job", salary_from: 0, deadline: "2026-12-01" } as Vacancy
    expect(vacancyFields(v)).toMatchObject({ title: "Intern", kind: "job", salary_from: 0 })
  })

  it("words salary ranges", () => {
    expect(salaryText(800, 1200, "EUR")).toEqual({ key: "range", from: "800", to: "1 200", currency: "EUR" })
    expect(salaryText(800, null, "USD").key).toBe("from")
    expect(salaryText(null, 900, "USD").key).toBe("to")
    expect(salaryText(null, null, "USD").key).toBe("none")
    expect(salaryText(0, null, "USD").key).toBe("from")
  })

  it("splits skills, joins places, reads amounts", () => {
    expect(splitSkills("React, TypeScript;SQL\n ")).toEqual(["React", "TypeScript", "SQL"])
    expect(splitSkills(null)).toEqual([])
    expect(place({ city: "", country: "Germany" })).toBe("Germany")
    expect(readAmount("")).toBeNull()
    expect(readAmount("0")).toBe(0)
    expect(readAmount("12.6")).toBe(13)
  })
})
