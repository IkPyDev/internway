import type {
  Duration,
  PayPreference,
  ResumeCertificate,
  ResumeJob,
  ResumeLink,
  ResumeTextFields,
  StudyLevel,
  StudyYear,
  WorkStatus,
} from "@/types"

/** The plain-text resume fields; long ones render as a textarea. `required` mirrors the server. */
export const RESUME_FIELDS: {
  key: keyof ResumeTextFields
  long?: boolean
  required?: boolean
  type?: string
}[] = [
  { key: "first_name", required: true },
  { key: "last_name", required: true },
  { key: "citizenship", required: true },
  { key: "city", required: true },
  { key: "phone", required: true, type: "tel" },
  { key: "university", required: true },
  { key: "field_of_study", required: true },
  { key: "title", required: true },
  { key: "preferred_countries" },
  { key: "availability", required: true },
  { key: "about", long: true },
  { key: "skills", long: true },
  { key: "languages" },
  { key: "education", long: true },
  { key: "experience", long: true },
]

export const WORK_STATUSES: WorkStatus[] = ["looking", "open", "not_looking"]
export const STUDY_LEVELS: StudyLevel[] = ["bachelor", "master", "phd", "college", "graduate"]
export const STUDY_YEARS: StudyYear[] = ["1", "2", "3", "4", "graduate"]
export const DURATIONS: Exclude<Duration, "">[] = ["1-3", "3-6", "6-12", "12+"]
export const PAY_PREFERENCES: Exclude<PayPreference, "">[] = ["paid", "unpaid", "either"]

/** Mirrors the server's limits in `resume.ts`. */
export const RESUME_LISTS = {
  jobs: { max: 15, empty: { company: "", position: "", start: "", end: "", description: "" } as ResumeJob },
  links: { max: 10, empty: { label: "", url: "" } as ResumeLink },
  certificates: { max: 20, empty: { name: "", issuer: "", year: null, file_id: null } as ResumeCertificate },
}

export const PHOTO_TYPES = "image/jpeg,image/png,image/webp"
export const DOCUMENT_TYPES = "application/pdf,image/jpeg,image/png,image/webp"
/** The CV may also be a Word document. */
export const CV_TYPES = `application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document`

/** Badge colours for the job-search status. */
export const STATUS_TONE: Record<WorkStatus, string> = {
  looking: "bg-green-100 text-green-700",
  open: "bg-sky-100 text-sky-800",
  not_looking: "bg-muted text-muted-foreground",
}
