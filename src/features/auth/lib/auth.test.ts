import { parseLoginSearch, roleHome } from "./auth"

describe("auth lib", () => {
  it("keeps only same-site redirects", () => {
    expect(parseLoginSearch({ redirect: "/account/resume" })).toEqual({ redirect: "/account/resume" })
    expect(parseLoginSearch({ redirect: "//evil.com" })).toEqual({ redirect: undefined })
    expect(parseLoginSearch({ redirect: "https://evil.com" })).toEqual({ redirect: undefined })
    expect(parseLoginSearch({})).toEqual({ redirect: undefined })
  })

  it("sends each role to its own home", () => {
    const company = (complete: boolean) => ({
      id: 1,
      name: "A",
      status: "pending" as const,
      isOwner: true,
      complete,
    })
    expect(roleHome({ role: "student", company: null })).toBe("/account/resume")
    expect(roleHome({ role: "employer", company: company(true) })).toBe("/account/vacancies")
    expect(roleHome({ role: "employer", company: company(false) })).toBe("/account/company")
    expect(roleHome({ role: "admin", company: null })).toBe("/admin")
    expect(roleHome(null)).toBe("/login")
  })
})
