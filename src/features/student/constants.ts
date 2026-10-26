import type { ResumeFields } from "@/types"

/** Resume form fields in display order; long ones render as a textarea. */
export const RESUME_FIELDS: { key: keyof ResumeFields; long?: boolean; required?: boolean }[] = [
  { key: "title", required: true },
  { key: "phone" },
  { key: "city" },
  { key: "about", long: true },
  { key: "skills", long: true },
  { key: "languages" },
  { key: "education", long: true },
  { key: "experience", long: true },
]
