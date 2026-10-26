import type { ModerationStatus } from "@/types"
import type { AdminTab } from "./types"

export const ADMIN_TABS: AdminTab[] = [
  "overview",
  "companies",
  "vacancies",
  "resumes",
  "users",
  "applications",
]
export const MODERATION_FILTERS: ModerationStatus[] = ["pending", "approved", "rejected"]
