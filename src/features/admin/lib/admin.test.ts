import type { AdminUser } from "../types"
import { byQuery, byStatus, filterUsers, parseAdminSearch, roleCounts } from "./admin"

const user = (patch: Partial<AdminUser>) =>
  ({ email: "a@b.uz", name: "", role: "student", blocked: false, company: null, ...patch }) as AdminUser

describe("admin lib", () => {
  it("accepts only known tabs, statuses, roles and ids", () => {
    expect(parseAdminSearch({ tab: "companies", status: "pending", user: "7", blocked: true })).toEqual({
      tab: "companies",
      status: "pending",
      user: 7,
      blocked: true,
    })
    expect(
      parseAdminSearch({ tab: "x", status: "sent", role: "boss", company: "-1", blocked: "no" }),
    ).toEqual({})
  })

  it("filters by status only when one is set", () => {
    const rows = [{ status: "pending" }, { status: "approved" }]
    expect(byStatus(rows, "pending")).toEqual([{ status: "pending" }])
    expect(byStatus(rows, undefined)).toHaveLength(2)
  })

  it("searches the given fields ignoring case", () => {
    const rows = [
      { name: "Silk Road", city: "Tashkent" },
      { name: "Aurora", city: null },
    ]
    expect(byQuery(rows, " silk ", ["name"])).toHaveLength(1)
    expect(byQuery(rows, "tash", ["name"])).toHaveLength(0)
    expect(byQuery(rows, undefined, ["name"])).toHaveLength(2)
  })

  it("narrows users by role, blocked and text, and counts roles", () => {
    const users = [
      user({ email: "s@x.uz" }),
      user({ email: "e@x.uz", role: "employer", company: "Silk" }),
      user({ email: "n@x.uz", role: null, blocked: true }),
    ]
    expect(filterUsers(users, { role: "none" }).map((u) => u.email)).toEqual(["n@x.uz"])
    expect(filterUsers(users, { blocked: true })).toHaveLength(1)
    expect(filterUsers(users, { q: "silk" }).map((u) => u.role)).toEqual(["employer"])
    expect(roleCounts(users)).toEqual({ student: 1, employer: 1, admin: 0, none: 1 })
  })
})
