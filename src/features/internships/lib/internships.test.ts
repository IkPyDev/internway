import type { InternshipsSearch } from "../types"
import {
  byRegion,
  countFields,
  countRegions,
  fieldsOf,
  filterInternships,
  normalizeInternships,
  parseInternshipsSearch,
  regionsOf,
  sourceLinks,
} from "./internships"

const EMPTY: InternshipsSearch = {}

describe("internships lib", () => {
  it("regionsOf", () => {
    expect(regionsOf("Berlin, Germany").sort()).toEqual(["europe", "germany"])
    expect(regionsOf("Toronto, ON")).toEqual(["canada"])
    expect(regionsOf("San Francisco, CA")).toEqual(["usa"])
    expect(regionsOf("Remote")).toEqual(["remote"])
    expect(regionsOf("Kuala Lumpur").sort()).toEqual(["asia", "malaysia"])
    expect(regionsOf("")).toEqual([])
  })

  it("fieldsOf", () => {
    expect(fieldsOf("Software Engineer Intern")).toEqual(["software"])
    expect(fieldsOf("Werkstudent Marketing & Social Media (m/w/d)")).toEqual(["marketing"])
    expect(fieldsOf("AI Scientist Intern").sort()).toEqual(["data", "research"])
    expect(fieldsOf("Air Quality Intern")).toEqual([])
    expect(fieldsOf("Summer Analyst Programme")).toEqual([])
  })

  it("sourceLinks fills keywords and location", () => {
    const [linkedin, , eures] = sourceLinks({ field: "marketing", region: "germany" })
    expect(linkedin.url).toBe(
      "https://www.linkedin.com/jobs/search/?keywords=Marketing%20internship&location=Germany",
    )
    expect(eures.url).toContain("keywordsEverywhere=Marketing%20internship")
    expect(sourceLinks({ q: "summer internship" })[1].url).toBe(
      "https://www.indeed.com/jobs?q=summer%20internship&l=",
    )
  })

  it("filters by text, kind, freshness and region", () => {
    const now = Date.parse("2026-10-20T12:00:00Z")
    const list = normalizeInternships([
      {
        source: "greenhouse:stripe",
        kind: "job",
        title: "Data Intern",
        company: "Stripe",
        location: "Dublin, Ireland",
        url: "https://a",
        date: "2026-10-19T12:00:00Z",
      },
      {
        source: "profellow",
        kind: "program",
        title: "UN Junior Fellows",
        company: "",
        location: "",
        url: "https://b",
        date: "2020-01-01T00:00:00Z",
      },
    ])
    expect(filterInternships(list, { ...EMPTY, q: "stripe data" }, now)).toHaveLength(1)
    expect(filterInternships(list, { ...EMPTY, kind: "program" }, now)).toHaveLength(1)
    expect(filterInternships(list, { ...EMPTY, fresh: "7" }, now)).toHaveLength(1)
    expect(byRegion(list, "europe")).toHaveLength(1)
    expect(countRegions(list).europe).toBe(1)
    expect(filterInternships(list, { ...EMPTY, field: "data" }, now)).toHaveLength(1)
    expect(countFields(list).data).toBe(1)
  })

  it("parseInternshipsSearch drops unknown values", () => {
    expect(parseInternshipsSearch({ q: "x", kind: "nope", region: "uk", page: "abc" })).toEqual({
      q: "x",
      kind: undefined,
      region: "uk",
      field: undefined,
      fresh: undefined,
      page: undefined,
    })
  })
})
