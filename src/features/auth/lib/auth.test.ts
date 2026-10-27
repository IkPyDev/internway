import { parseLoginSearch, roleHome } from "./auth"

describe("auth lib", () => {
  it("keeps only same-site redirects", () => {
    expect(parseLoginSearch({ redirect: "/account/resume" })).toEqual({ redirect: "/account/resume" })
    expect(parseLoginSearch({ redirect: "//evil.com" })).toEqual({ redirect: undefined })
    expect(parseLoginSearch({ redirect: "https://evil.com" })).toEqual({ redirect: undefined })
    expect(parseLoginSearch({})).toEqual({ redirect: undefined })
  })

  it("sends each role to its own home", () => {
    expect(roleHome({ role: "student" })).toBe("/account/resume")
    expect(roleHome({ role: "employer" })).toBe("/account/company")
    expect(roleHome({ role: "admin" })).toBe("/admin")
    expect(roleHome(null)).toBe("/login")
  })
})
