import type { ApplicationStatus, CompanyFields, ModerationStatus, Resume, Role, Vacancy } from "@/types"

export type AdminTab = "overview" | "companies" | "vacancies" | "resumes" | "users" | "applications"
export type ModeratedTable = "companies" | "resumes" | "vacancies"

export interface AdminSearch {
  tab?: AdminTab
  status?: ModerationStatus
}

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
