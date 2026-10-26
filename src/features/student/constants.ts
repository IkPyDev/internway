import type { ResumeCertificate, ResumeJob, ResumeLink, ResumeTextFields, WorkStatus } from "@/types"

/** The plain-text resume fields; long ones render as a textarea. */
export const RESUME_FIELDS: { key: keyof ResumeTextFields; long?: boolean; required?: boolean }[] = [
  { key: "title", required: true },
  { key: "phone" },
  { key: "city" },
  { key: "about", long: true },
  { key: "skills", long: true },
  { key: "languages" },
  { key: "education", long: true },
  { key: "experience", long: true },
]

export const WORK_STATUSES: WorkStatus[] = ["looking", "open", "not_looking"]

/** Mirrors the server's limits in `resume.ts`. */
export const RESUME_LISTS = {
  jobs: { max: 15, empty: { company: "", position: "", start: "", end: "", description: "" } as ResumeJob },
  links: { max: 10, empty: { label: "", url: "" } as ResumeLink },
  certificates: { max: 20, empty: { name: "", issuer: "", year: null, file_id: null } as ResumeCertificate },
}

export const PHOTO_TYPES = "image/jpeg,image/png,image/webp"
export const DOCUMENT_TYPES = "application/pdf,image/jpeg,image/png,image/webp"
