import type { CompanyFields, ModerationStatus, VacancySummary } from "@/types"

export interface Member {
  id: number
  email: string
  name: string
  isOwner: boolean
}

export interface Invite {
  id: number
  email: string
  created_at: string
}

/** The employer's own company with its team. */
export interface CompanyProfile extends CompanyFields {
  id: number
  owner_id: number
  status: ModerationStatus
  reject_reason: string | null
  isOwner: boolean
  members: Member[]
  invites: Invite[]
}

/** The public page shows the company, never its contact person or registration number. */
export interface PublicCompany
  extends Pick<
    CompanyFields,
    "name" | "logo_id" | "description" | "website" | "linkedin" | "industry" | "size" | "country" | "city"
  > {
  id: number
  created_at: string
  vacancies: VacancySummary[]
}
