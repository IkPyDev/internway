import { createEntityKeys, paginate, readEnum, readPage, relativeDate, safeUrl, toWords } from "@/lib"

describe("lib", () => {
  it("createEntityKeys shares a prefix", () => {
    const keys = createEntityKeys("internships")
    expect(keys.list({ q: "x" }).slice(0, 1)).toEqual(keys.all)
  })

  it("paginate clamps the page", () => {
    expect(paginate([1, 2, 3, 4, 5], 9, 2)).toEqual({ items: [5], page: 3, pages: 3, total: 5 })
    expect(paginate([], 1, 2).pages).toBe(1)
  })

  it("search readers", () => {
    expect(toWords("  Data  Intern ")).toEqual(["data", "intern"])
    expect(readPage("3")).toBe(3)
    expect(readPage("1")).toBeUndefined()
    expect(readPage("-1")).toBeUndefined()
    expect(readEnum("uk", ["uk", "usa"] as const)).toBe("uk")
    expect(readEnum("mars", ["uk"] as const)).toBeUndefined()
  })

  it("safeUrl blocks non-http schemes", () => {
    expect(safeUrl("javascript:alert(1)")).toBe("#")
    expect(safeUrl("https://x.com")).toBe("https://x.com")
  })

  it("relativeDate", () => {
    const now = Date.parse("2026-10-20T12:00:00Z")
    expect(relativeDate("2026-10-20T01:00:00Z", now)).toEqual({ key: "today" })
    expect(relativeDate("2026-10-15T12:00:00Z", now)).toEqual({ key: "daysAgo", count: 5 })
    expect(relativeDate(null, now)).toEqual({ key: "unknown" })
  })
})
