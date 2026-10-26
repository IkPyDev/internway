import type {
  ApplicationStatus,
  CompanyFields,
  CompanySummary,
  ModerationStatus,
  Resume,
  Role,
  Vacancy,
  VacancyStatus,
} from "@/types"

export type AdminTab = "overview" | "companies" | "vacancies" | "resumes" | "users" | "applications"
export type ModeratedTable = "companies" | "resumes" | "vacancies"

export type RoleFilter = Role | "none"

/** Everything the admin page keeps in the URL: tab, filters and the open detail. */
export interface AdminSearch {
  tab?: AdminTab
  status?: ModerationStatus
  q?: string
  role?: RoleFilter
  blocked?: boolean
  user?: number
  company?: number
  vacancy?: number
}

export type AdminView = Pick<AdminSearch, "user" | "company" | "vacancy">

export interface AdminStats {
  students: number
  employers: number
  companies: number
  live_vacancies: number
  applications: number
  hired: number
  pending_companies: number
  pending_vacancies: number
  pending_resumes: number
}

export interface AdminUser {
  id: number
  email: string
  role: Role | null
  name: string
  blocked: boolean
  created_at: string
  company: string | null
  applications: number
  resume_status: ModerationStatus | null
}

export interface AdminCompany extends CompanyFields {
  id: number
  status: ModerationStatus
  reject_reason: string | null
  owner_email: string | null
  members: number
  vacancies: number
  updated_at: string
}

export interface AdminResume extends Resume {
  email: string
  name: string
}

export interface AdminVacancy extends Vacancy {
  company: string
  company_status: ModerationStatus
}

export interface AdminApplication {
  id: number
  status: ApplicationStatus
  created_at: string
  vacancy_id: number
  title: string
  company: string
  student_id: number
  email: string
  name: string
}

export interface AdminRows {
  companies: AdminCompany[]
  resumes: AdminResume[]
  vacancies: AdminVacancy[]
  users: AdminUser[]
  applications: AdminApplication[]
}

export interface AdminUserDetail {
  id: number
  email: string
  role: Role | null
  name: string
  blocked: boolean
  created_at: string
  company: CompanySummary | null
  resume: Resume | null
  applications: Omit<AdminApplication, "student_id" | "email" | "name">[]
}

export interface AdminCompanyDetail extends Omit<AdminCompany, "members" | "vacancies"> {
  owner_id: number
  created_at: string
  members: { id: number; email: string; name: string; blocked: boolean; isOwner: boolean }[]
  vacancies: { id: number; title: string; status: VacancyStatus; created_at: string; applications: number }[]
}
