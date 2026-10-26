import { byStatus, parseAdminSearch } from "./admin"

describe("admin lib", () => {
  it("accepts only known tabs and statuses", () => {
    expect(parseAdminSearch({ tab: "companies", status: "pending" })).toEqual({
      tab: "companies",
      status: "pending",
    })
    expect(parseAdminSearch({ tab: "x", status: "sent" })).toEqual({ tab: undefined, status: undefined })
  })

  it("filters by status only when one is set", () => {
    const rows = [{ status: "pending" }, { status: "approved" }]
    expect(byStatus(rows, "pending")).toEqual([{ status: "pending" }])
    expect(byStatus(rows, undefined)).toHaveLength(2)
  })
})
