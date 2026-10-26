import { readEnum, readId, readString } from "@/lib"
import { ADMIN_TABS, MODERATION_FILTERS, ROLE_FILTERS } from "../constants"
import type { AdminSearch, AdminUser, RoleFilter } from "../types"

/** The overview tab is the default; every filter and the open detail default to absent. */
export function parseAdminSearch(search: Record<string, unknown>): AdminSearch {
  return {
    tab: readEnum(search.tab, ADMIN_TABS),
    status: readEnum(search.status, MODERATION_FILTERS),
    q: readString(search.q),
    role: readEnum(search.role, ROLE_FILTERS),
    blocked: search.blocked === true || undefined,
    user: readId(search.user),
    company: readId(search.company),
    vacancy: readId(search.vacancy),
  }
}

/** Keeps rows with the given moderation status; no status keeps all. */
export function byStatus<T extends { status: string }>(rows: T[], status: string | undefined): T[] {
  return status ? rows.filter((r) => r.status === status) : rows
}

/** Keeps rows where any of the given fields contains the query, ignoring case. */
export function byQuery<T>(rows: T[], q: string | undefined, keys: (keyof T)[]): T[] {
  const needle = q?.trim().toLowerCase()
  if (!needle) return rows
  return rows.filter((r) =>
    keys.some((k) =>
      String(r[k] ?? "")
        .toLowerCase()
        .includes(needle),
    ),
  )
}

const roleOf = (u: AdminUser): RoleFilter => u.role ?? "none"

/** Users narrowed by role, blocked flag and a text query. */
export function filterUsers(users: AdminUser[], f: Pick<AdminSearch, "role" | "blocked" | "q">): AdminUser[] {
  const kept = users.filter((u) => (!f.role || roleOf(u) === f.role) && (!f.blocked || u.blocked))
  return byQuery(kept, f.q, ["email", "name", "company"])
}

/** How many users have each role, for the filter pills. */
export function roleCounts(users: AdminUser[]): Record<RoleFilter, number> {
  const counts: Record<RoleFilter, number> = { student: 0, employer: 0, admin: 0, none: 0 }
  for (const u of users) counts[roleOf(u)]++
  return counts
}
