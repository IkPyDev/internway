import type { Company } from "../types"
import { byCountry, countCountries, filterCompanies, parseCompaniesSearch } from "./companies"

const base: Omit<Company, "name" | "country" | "priority" | "verified" | "field"> = {
  city: "",
  program: "",
  evidence: "",
  eligibility: "",
  payment: "",
  accommodation: "",
  duration: "",
  contact: "",
  fit: "",
  url: "",
}
const LIST: Company[] = [
  { ...base, name: "Ferrari", country: "Italy", field: "Automotive", priority: "", verified: false },
  { ...base, name: "Chiesi", country: "Italy", field: "Pharma", priority: "A", verified: true },
  {
    ...base,
    name: "Darktrace",
    country: "United Kingdom",
    field: "Cybersecurity",
    priority: "B",
    verified: true,
  },
]
const EMPTY = {}

describe("companies lib", () => {
  it("filters by priority and text", () => {
    expect(filterCompanies(LIST, { ...EMPTY, priority: "A" }).map((c) => c.name)).toEqual(["Chiesi"])
    expect(filterCompanies(LIST, { ...EMPTY, priority: "verified" })).toHaveLength(2)
    expect(filterCompanies(LIST, { ...EMPTY, q: "auto" }).map((c) => c.name)).toEqual(["Ferrari"])
  })

  it("groups by country", () => {
    expect(countCountries(LIST)).toEqual([
      ["Italy", 2],
      ["United Kingdom", 1],
    ])
    expect(byCountry(LIST, "United Kingdom")).toHaveLength(1)
  })

  it("parseCompaniesSearch drops unknown priority", () => {
    expect(parseCompaniesSearch({ priority: "Z", country: "Italy" })).toEqual({
      q: undefined,
      priority: undefined,
      country: "Italy",
    })
  })
})
