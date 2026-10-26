import type { Resume } from "@/types"
import { canWithdraw, resumeFields } from "./resume"

describe("resumeFields", () => {
  it("starts empty and copies only editable fields", () => {
    expect(resumeFields(null).title).toBe("")
    const resume = { id: 1, title: "Dev", skills: "React", status: "approved" } as Resume
    const fields = resumeFields(resume)
    expect(fields).toMatchObject({ title: "Dev", skills: "React", about: "" })
    expect("status" in fields).toBe(false)
  })
})

describe("canWithdraw", () => {
  it("allows withdrawing only while the outcome is open", () => {
    expect(canWithdraw("offer")).toBe(true)
    expect(canWithdraw("hired")).toBe(false)
    expect(canWithdraw("withdrawn")).toBe(false)
  })
})
