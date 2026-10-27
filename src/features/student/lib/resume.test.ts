import type { Resume } from "@/types"
import { canWithdraw, formatMonth, jobPeriod, resumeFields, splitTags, uploadError } from "./resume"

describe("resumeFields", () => {
  it("starts empty and copies only editable fields", () => {
    expect(resumeFields(null)).toMatchObject({
      title: "",
      first_name: "",
      study_level: "",
      graduation_year: null,
      work_status: "looking",
      jobs: [],
      photo_id: null,
    })
    const resume = {
      id: 1,
      title: "Dev",
      skills: "React",
      status: "approved",
      links: [],
    } as unknown as Resume
    const fields = resumeFields(resume)
    expect(fields).toMatchObject({ title: "Dev", skills: "React", about: "" })
    expect("status" in fields).toBe(false)
  })
})

describe("uploadError", () => {
  it("refuses big files and types outside the list", () => {
    const file = (size: number, type: string) => new File([new Uint8Array(size)], "f", { type })
    expect(uploadError(file(10, "image/png"), "image/png,application/pdf")).toBeUndefined()
    expect(uploadError(file(10, "image/svg+xml"), "image/png")).toBe("invalid_file")
    expect(uploadError(file(5 * 1024 * 1024, "image/png"), "image/png")).toBe("file_too_large")
  })
})

describe("jobPeriod", () => {
  it("formats months and treats a missing end as current", () => {
    expect(formatMonth("")).toBe("")
    expect(formatMonth("2024-03")).toBe("03.2024")
    const job = { company: "A", position: "", start: "2024-03", end: "", description: "" }
    expect(jobPeriod(job, "now")).toBe("03.2024 — now")
    expect(jobPeriod({ ...job, end: "2025-01" }, "now")).toBe("03.2024 — 01.2025")
    expect(jobPeriod({ ...job, start: "" }, "now")).toBe("")
  })
})

describe("splitTags", () => {
  it("splits on commas, semicolons and lines", () => {
    expect(splitTags("React, TS;\nGit ,")).toEqual(["React", "TS", "Git"])
    expect(splitTags(null)).toEqual([])
  })
})

describe("canWithdraw", () => {
  it("allows withdrawing only while the outcome is open", () => {
    expect(canWithdraw("offer")).toBe(true)
    expect(canWithdraw("hired")).toBe(false)
    expect(canWithdraw("withdrawn")).toBe(false)
  })
})
