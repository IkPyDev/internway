import { ROUTES } from "@/constants"
import type { Role } from "@/types"

type CabinetRoute = (typeof ROUTES)[
  | "resume"
  | "myApplications"
  | "saved"
  | "myVacancies"
  | "company"
  | "admin"]

/** The cabinet tabs each role sees above its account pages. */
export const ACCOUNT_LINKS: Record<Role, { to: CabinetRoute; label: string }[]> = {
  student: [
    { to: ROUTES.resume, label: "resume.title" },
    { to: ROUTES.myApplications, label: "myApplications.title" },
    { to: ROUTES.saved, label: "saved.title" },
  ],
  employer: [
    { to: ROUTES.company, label: "company.title" },
    { to: ROUTES.myVacancies, label: "myVacancies.title" },
  ],
  admin: [{ to: ROUTES.admin, label: "admin.title" }],
}
