import type { Role } from "@/types"

export interface ProfileInput {
  role?: Exclude<Role, "admin">
  name: string
  company?: string
}

export interface LoginSearch {
  redirect?: string
}

export type LoginStep = "email" | "code" | "profile"
